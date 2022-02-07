const patita = require("../../img/patita.png");

export class Patita extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        const variant = this.getAttribute("variant") || "small"
        const shadow = this.attachShadow({ mode: 'open' });
        const div = document.createElement("div");
        const style = document.createElement("style");
        div.innerHTML = `
            <img variant="small" class="patita" src=${patita}> 
        `;

        style.innerHTML = `
        .big{
            width: 157px;
            height: 300px;
        }
        .small{
            width: 40px;
            height: 34px;
        }
        .tijeras{
            width:100%;
        }
        `;

        div.className = variant;
        shadow.appendChild(div);
        shadow.appendChild(style);
    }
}
customElements.define("custom-patita", Patita);
