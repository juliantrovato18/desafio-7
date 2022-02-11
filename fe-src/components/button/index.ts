
export class Button extends HTMLElement {

    shadow: ShadowRoot;
    class;
    constructor() {    
        super();
        this.class = this.getAttribute("class");
    }
    connectedCallback() {
        this.render();
    }
    render(){
        this.shadow = this.attachShadow({mode: 'open'});
        const button = document.createElement("button");
        const style = document.createElement("style");
        button.className = "root";

        button.innerHTML = `
            <button class=${this.class}></button>
        `;

        style.innerHTML = `
            .root{
                width: 100%;
                height: 87px;
                border: solid 4px blue;
                border-radius: 4px;
                background-color: #FF9DF5;
                padding: 20px;
            }
        `;
        
        button.textContent= this.textContent;
        this.shadow.appendChild(button);
        this.shadow.appendChild(style);
    }
}
customElements.define("button-comp", Button);