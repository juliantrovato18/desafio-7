import { state } from "../../state";
import { Router } from "@vaadin/router";

class IngresarPage extends HTMLElement {
    
    shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        this.render();
    }
    render() {
        const div = document.createElement("div");
        div.innerHTML = `
            <section class= "section1">
                <div>
                    <custom-patita class="patita" variant="small"></custom-patita>
                </div>
                <custom-header></custom-header>
            </section>
            <section class= "section">
                <custom-text variant= "title">Ingresar</custom-text>
                <div class= "input-container">
                    <label class ="label">Email</label>
                    <input type="email"  name="email" class="input"></input>
                    <div class= "container-button">
                        <button-comp class="button">
                            <custom-text variant= "body">Siguiente</custom-text>
                        </button-comp>
                    </div>
                </div>    
            </section>
        `;
        
        const style = document.createElement("style");
        style.innerHTML = `
            * {
                box-sizing: border-box;
            }
            body {
                margin: 0;
            }
            .section1{
                display:flex;
                flex-direction: row;
                background-color: #FF6868;
            }
            .patita{
                padding: 10px;
                margin-left: 20px;
            }
            .section{
                min-width: 375px;
                min-height: 670px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
            }
            .input-container{
                display: flex;
                justify-content:center;
                flex-direction:column;
            }
            .container-button{
                display: flex;
                padding: 20px;
            }
            .button{
                width:335px;
                height:50px;
                font-size:30px;
                font-weight:bold;
                text-align:center;
                text-justify:center;
                background-color: #FF9DF5;
                align-items:center;
                justify-content:center;
            }
            .input{
                width: 100%;
                margin-left: 30px;     
            }
            .label{
                margin-left: 30px;
            }
            .input{
                width: 312px;
                height: 50px;
                border: solid 1px black;
                border-radius: 4px;
                padding: 10px;    
            }
        `;
        
        div.appendChild(style);
        this.shadow.append(div);
        const cs = state.getState();
        const mail = (this.shadow.querySelector(".input") as HTMLInputElement)
        
        this.shadow.querySelector(".button").addEventListener("click",()=>{
            if(mail.value == cs.email){
                Router.go("/pass");
                
            }else{
                Router.go("/signin");
            }
            
        });
    }
}
customElements.define("ingresar-page", IngresarPage)