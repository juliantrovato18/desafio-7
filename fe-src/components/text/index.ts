export function customText(){
class TextComponent extends HTMLElement {
    constructor() {    
      super();
      this.render();
    }
    
    render(){
        const variant = this.getAttribute("variant") || "body"
        const shadow = this.attachShadow({mode: 'open'});
        const div = document.createElement("div");
        const style = document.createElement("style");
        style.innerHTML=`
            .title{
                font-size: 40px;
                font-weight: bold;
                color: black;
                padding:0px;

            }
            .body{
                font-size: 40px;
                
            }
        `


        div.className = variant;
        div.textContent = this.textContent;
        shadow.appendChild(div);
        shadow.appendChild(style);
    }
    
  }
  customElements.define("custom-text", TextComponent);
}