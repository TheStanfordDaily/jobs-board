const { REACT_APP_ENDPOINT_URL } = process.env;

const JOBS_ENDPOINT = `${REACT_APP_ENDPOINT_URL}/wp-json/tsd/v1/jobs`;

export async function getJobs() {
    const response = await fetch(`${JOBS_ENDPOINT}`).then(e => e.json());
    return response;
}

export async function getJob(id) {
    const response = await fetch(`${JOBS_ENDPOINT}/${id}`).then(e => e.json());
    return response;
}

export async function addJob(data) {
    const response = await fetch(`${JOBS_ENDPOINT}`, {
        method: "POST",
        body: JSON.stringify(data)
    }).then(e => e.json());
    return response.id;
}

export async function getArticles() {
    const response = await fetch(`${REACT_APP_ENDPOINT_URL}/wp-json/wp/v2/posts?_embed&tags=16534,8248,24207,406,318&per_page=3`).then(e => e.json());
    return response;
}