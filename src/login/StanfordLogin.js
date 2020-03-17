import React, { useRef } from "react";

const { REACT_APP_COGNITO_ENDPOINT_URL, REACT_APP_COGNITO_CLIENT_ID } = process.env;

export default ( {children} ) => {
    const ref = useRef();
    return (<form ref={ref} action={`${REACT_APP_COGNITO_ENDPOINT_URL}/oauth2/authorize`} method="GET" className="stanford-login-button">
        <input type="hidden" name="response_type" value="code" />
        <input type="hidden" name="client_id" value={REACT_APP_COGNITO_CLIENT_ID} />
        <input type="hidden" name="redirect_uri" value={window.location.origin} />
        <input type="hidden" name="scope" value="aws.cognito.signin.user.admin email openid phone profile" />
        <input type="hidden" name="identity_provider" value="Stanford" />
        {!children && <button type="submit" className={"btn btn-stanford"}>Sign in with Stanford</button>}
        {children && children}
    </form>);
}