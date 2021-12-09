const applicationState = {
	requests: [],
	plumbers: [],
	completions: []
};

const API = "http://localhost:8088";
const mainContainer = document.querySelector(".container");

//request stuff
export const fetchRequests = () => {
	return fetch(`${API}/requests`)
		.then((res) => res.json())
		.then((serviceRequests) => {
			//store what i find in the applicationState object
			applicationState.requests = serviceRequests;
		});
};

export const getRequests = () => {
	const array = applicationState.requests
		.map((req) => ({ ...req }))
		.map((req) => {
			 req.completed = applicationState.completions.some(
				(comp) => comp.reqId === req.id
			)
			return req;
		}).sort((a, b) => a.completed - b.completed);
	return array;
};

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

//plumber stuff
export const fetchPlumbers = () => {
	return fetch(`${API}/plumbers`)
		.then((res) => res.json())
		.then((plumbersFromAPI) => {
			applicationState.plumbers = plumbersFromAPI;
		});
};

export const getPlumbers = () => {
	return applicationState.plumbers.map((plum) => ({ ...plum }));
};

//completed request stuff
export const fetchCompletions = () => {
	return fetch(`${API}/completions`)
		.then((res) => res.json())
		.then((completionsFromAPI) => {
			applicationState.completions = completionsFromAPI;
		});
};

export const saveCompletion = (jobThatIsCompleted) => {
	const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(jobThatIsCompleted)
	};

	return fetch(`${API}/completions`, fetchOptions)
		.then((res) => res.json())
		.then(() => {
			mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
		});
};
