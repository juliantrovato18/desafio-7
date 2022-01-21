export function button(){
    class Button extends HTMLElement {
        constructor() {    
          super();
          this.render();
        }
        
        render(){
            const shadow = this.attachShadow({mode: 'open'});
            const button = document.createElement("button");
            const style = document.createElement("style");
            button.className = "root";

            style.innerHTML = `
                .root{
                    width: 100%;
                    height: 87px;
                    border: solid 4px blue;
                    border-radius: 4px;
                    background-color: #FF9DF5;
                    padding: 20px;
                }
            `
            button.textContent= this.textContent;
            shadow.appendChild(button);
            shadow.appendChild(style);

        }
    }
    customElements.define("button-comp", Button);

}