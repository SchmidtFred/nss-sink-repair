const applicationState = {
    requests: []
}

const API = "http://localhost:8088";

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(res => res.json())
        .then((serviceRequests) => {
            //store what i find in the applicationState object
            applicationState.requests = serviceRequests;
        }
        )
}