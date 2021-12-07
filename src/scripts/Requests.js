import { deleteRequest, getRequests } from "./dataAccess.js";

const mainContainer = document.querySelector(".container");

export const Requests = () => {
    const requests = getRequests();

    let html = `
        <ul>
            ${
                requests.map(req => {
                    return `<li>
                            ${req.description}
                            <button class="request_delete button" id="request--${req.id}">Delete</button>
                            </li>`
                }).join("")
            }
        </ul>`

    return html;
}

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestID] = click.target.id.split("--");
        deleteRequest(parseInt(requestID));
    }
})