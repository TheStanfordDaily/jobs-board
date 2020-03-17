import queryString from "query-string";

const { REACT_APP_COGNITO_ENDPOINT_URL, REACT_APP_COGNITO_CLIENT_ID } = process.env;


/* Parse code from query string; this is what is returned once the user
 * logs in with Stanford and gets redirected back to the site.
 * For example: http://localhost:3000/?code=...
 * 
 * If the code is found, exchange the auth code to set the user's JWT.
 */
export async function parseCodeFromQuery() {
  const search = queryString.parse(window.location.search);
  if (search && search.code) {
    await exchangeAuthCode(search.code);
    // Clear window.location.search without refreshing the page.
    window.history.pushState({}, document.title, window.location.pathname);
    return true;
  }
  return false;
}

async function exchangeAuthCode(code) {
  let data = new URLSearchParams();
  data.append('grant_type', 'authorization_code');
  data.append('client_id', REACT_APP_COGNITO_CLIENT_ID);
  data.append('code', code);
  data.append('redirect_uri', window.location.origin);
  await callTokenEndpoint(data);
};

async function callTokenEndpoint(data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data.toString()
  };
  let res = await fetch(`${REACT_APP_COGNITO_ENDPOINT_URL}/oauth2/token`, options);
  /*
    // https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html
    {
    "access_token":"...",
    "refresh_token":"...",
    "id_token":"...",
    "token_type":"Bearer", 
    "expires_in":3600
    }
  */
  let response = await res.json();
  if (response) {
    setJwt(response.id_token);
    // TODO: handle refresh tokens?
    // localStorage.setItem("refresh_token", response.refresh_token);
  } else {
    throw new Error("no response");
  }
}

function setJwt(jwt) {
  localStorage.setItem("jwt", jwt);
}

/* Get JWT from localStorage.
 */
function getJwt() {
  return localStorage.getItem("jwt");
}

export function logout() {
    localStorage.removeItem("jwt");
    window.location = "/";
    // window.location.href = `${LOGIN_URL}/logout?redirect=${window.location.href}`;
}

export function parseJwt(token) {
  var base64UrlSplit = token.split('.');
  if (!base64UrlSplit) return null;
  const base64Url = base64UrlSplit[1];
  if (!base64Url) return null;
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

const getCurrentUser = async () => {
  const jwt = getJwt();
  if (jwt) {
    /*
    ud: 
    auth_time: 
    cognito:username: 
    email: 
    email_verified: 
    event_id: 
    exp: 1533331712
    iat: 1533328112
    iss: 
    name: 
    sub: 
    token_use: 
    website: 
    */

    // Verify JWT here.
    const parsed = parseJwt(jwt);
    if (!parsed) {
      console.log("JWT invalid");
    }
    else if (new Date().getTime() / 1000 >= parseInt(parsed.exp)) {
      console.log("JWT expired");
      // TODO: add refresh token logic if we want here.
    }
    else {
      // console.log("parsed", parsed);
      let attributes = { "name": parsed["name"], "email": parsed["email"], "email_verified": parsed["email_verified"], "cognito:groups": parsed["cognito:groups"] };
      return await {
        "username": parsed["sub"],
        attributes
      };
    }
  }

  // If JWT from SAML has expired, or if there is no JWT in the first place, run this code.
  throw new Error("No current user");
}

export async function checkLoginStatus() {
    try {
        const user = await getCurrentUser();
        if (!user) throw new Error("No credentials");
        return user;
    } catch(e) {
        // TODO: Redirect.
        // window.location.href = `${LOGIN_URL}?redirect=${window.location.href}`;
        // window.location.reload();
        console.error(e);
        return null;
    };
}