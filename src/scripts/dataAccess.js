const applicationState = {
	requests: []
};

const API = "http://localhost:8088";

export const fetchRequests = () => {
	return fetch(`${API}/requests`)
		.then((res) => res.json())
		.then((serviceRequests) => {
			//store what i find in the applicationState object
			applicationState.requests = serviceRequests;
		});
};

export const getRequests = () => {
	return applicationState.requests.map((req) => ({ ...req }));
};

const mainContainer = document.querySelector(".container");

export const sendRequest = (userServiceRequest) => {
	const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(userServiceRequest)
	};

	return fetch(`${API}/requests`, fetchOptions)
		.then((res) => res.json())
		.then(() => {
			mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
		});
};

export const deleteRequest = (id) => {
	return fetch(`${API}/requests/${id}`, { method: "DELETE" }).then(() =>
		mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
	);
};
