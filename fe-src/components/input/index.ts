
export class Input extends HTMLElement {
    constructor() {    
        super();
        this.render();
    }
        
    render(){
        const shadow = this.attachShadow({mode: 'open'});
        const input = document.createElement("input");
        const style = document.createElement("style");
        input.className = "root";

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
        shadow.appendChild(input);
        shadow.appendChild(style);
    }
}
customElements.define("input-comp", Input);
