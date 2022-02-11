import { discover } from "dropzone";


export class Input extends HTMLElement {
    shadow: ShadowRoot;
    type;
    placeholder;
    name;
    constructor() {    
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.type = this.getAttribute("type");
        this.name = this.getAttribute("name");
        this.placeholder = this.getAttribute("placeholder")
        
        
    
    }
    connectedCallback(){
        this.render();
    }
    render(){
        const input = document.createElement("input");
        const style = document.createElement("style");
        input.className = "root";
        

        input.innerHTML = `
            <input name=${this.name} type=${this.type} placeholder=${this.placeholder} style="style"></input>
        `

        style.innerHTML = `
            .root{
                width: 280px;
                height: 40px;
                border: solid 2px black;
                border-radius: 1px;
                padding: 10px;
            }
        `;
        
        

        input.textContent= this.textContent;
        input.appendChild(style);
        this.shadow.appendChild(input);
        
    }
}
customElements.define("input-comp", Input);
