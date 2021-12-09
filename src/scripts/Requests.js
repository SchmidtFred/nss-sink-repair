import { deleteRequest, getRequests, getPlumbers, saveCompletion } from "./dataAccess.js";

const mainContainer = document.querySelector(".container");

export const Requests = () => {
	const requests = getRequests();
    const plumbers = getPlumbers();

	let html = `
        <ul class="requestList">
            ${requests
				.map((req) => {
					return `<li class="request completed--${req.completed}">
                            ${req.description}
                            <select class="plumbers" id="plumbers">
                                <option value="">Choose</option>
                                ${plumbers
									.map((plumber) => {
										return `<option value="${req.id}--${plumber.id}">${plumber.name}</option>`;
									})
									.join("")}
                            </select>
                            <button class="request_delete button" id="request--${
								req.id
							}">Delete</button>
                            </li>`;
				})
				.join("")}
        </ul>`;

	return html;
};

mainContainer.addEventListener("click", (click) => {
	if (click.target.id.startsWith("request--")) {
		const [, requestID] = click.target.id.split("--");
		deleteRequest(parseInt(requestID));
	}
});

//now add the completed request to applicationState
mainContainer.addEventListener("change", (event) => {
    if (event.target.id === "plumbers") {
        const [requestId, plumberId] = event.target.value.split("--")
        //save it to an object
        const completion = {
            reqId: parseInt(requestId),
            plumbId: parseInt(plumberId),
            dateCompleted: new Date().toDateString()
        }

        saveCompletion(completion);
    }
})