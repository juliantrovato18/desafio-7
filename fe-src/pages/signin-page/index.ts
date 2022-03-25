import { state } from "../../state";
import { Router } from "@vaadin/router";


class initiSigninPage extends HTMLElement {
    
    shadow: ShadowRoot;
    type;
    placeholder;
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
            <section class="section1">
                <div>
                </div>
                <custom-header></custom-header>
            </section>
            <form class="section">
                <custom-text variant= "title">Mis datos</custom-text>
                <div class= "input-container">
                    <label class ="label">Nombre</label>
                    <input type="petname-input" name="name" class="input" placeholder="Tu nombre" class="name"></input>
                    <label class ="label">Email</label>
                    <input type="email" name="email" class="input email"></input>
                    <label class ="label">Contraseña</label>
                    <input type="password"  name="password" class="input"></input>
                    <label class ="label">Repetir contraseña</label>
                    <input type="password" name="password1" class="input"></input>
                </div>
                <div class="container-button">
                    <button class="button"> Guardar </button>
                </div>
            </form>
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
                width: 312px;
                height: 50px;
                border: solid 1px black;
                border-radius: 4px;
                padding: 10px;    
            }
        `;

        div.appendChild(style);
        this.shadow.appendChild(div);

        const currentState = state.getState();
        const form = this.shadow.querySelector(".section");
        // console.log(form);

        form.addEventListener("submit", (e)=> {
            e.preventDefault();

            // console.log(e.target);
            // console.log(e.target["name"].value);
            // console.log(e.target["email"].value);
             console.log(e.target["password"].value);

            currentState.name = e.target["name"].value;
            currentState.email = e.target["email"].value;
            currentState.password = e.target["password"].value;
            
            console.log(currentState);
            state.singup(()=>{
                Router.go("/ingresar");
            })

        });
    }
}
customElements.define("signin-page", initiSigninPage);