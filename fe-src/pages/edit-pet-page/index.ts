import { state } from "../../state";
import { Router } from "@vaadin/router";

class InitEditPetPage extends HTMLElement {

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
            <section class="section-2">
            <card-comp></card-comp>
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
                min-height: 750px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
            }
            .input-container{
                min-height: 350px;
                display: flex;
                justify-content:space-between;
                flex-direction:column;
            }
            .container-button{
                display: flex;
                padding: 0px;
            }
            .button{
                width:320px;
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
            }
            .label{
            }

            .search-form {
                background-color: coral;
                padding: 10px;
            }
            body,
            input,
            button {
                font-size: 24px;
            }
            body {
                margin: 0;
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            html {
                height: 100%;
            }
        `;

        div.appendChild(style);
        this.shadow.appendChild(div);

        const currentState = state.getState();
        const input = this.shadow.querySelector(".section");
        console.log(input);
        input.addEventListener("submit", (res:any)=>{
            res.preventDefault();

            console.log(res.detail.text);
            currentState.name = res.detail.name
            const newState = state.setState(currentState);
            console.log(newState);
        });

        div.querySelector(".button").addEventListener("click",(e)=>{
            e.preventDefault();

            const clase2 = document.querySelector(".name");
            const nombre =  clase2.shadowRoot.querySelector("input").value;
            currentState.name = nombre;
            console.log(state.getState());

        // state.singup(()=>{
        //     Router.go("/welcome");
        // });
        });
    }
}
customElements.define("edit-page", InitEditPetPage);
