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
            <section class= "section1">
                <div>
                    <custom-patita class="patita" variant="small"></custom-patita>
                </div>
                <custom-header></custom-header>
            </section>
            <form class= "section">
                <custom-text variant= "title">Mis datos</custom-text>
                <div class= "input-container">
                    <label class ="label">Nombre</label>
                    <input-comp type="petname-input" name="name" placeholder="Nombre de tu mascota" class="name"></input-comp>
                    <label class ="label">Email</label>
                    <input-comp type="email" name="email" class="email"></input-comp>
                    <label class ="label">Contraseña</label>
                    <input-comp type="password" class="input"></input-comp>
                    <label class ="label">Repetir contraseña</label>
                    <input-comp type="password" class="input"></input-comp>
                </div>
                <div class= "container-button">
                    <button-comp class="button">Guardar</button-comp>
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
                width: 100%;     
            }
        `;

        div.appendChild(style);
        this.shadow.appendChild(div);

        const currentState = state.getState();
        const input = this.shadow.querySelector(".section");
        console.log(input);
        input.addEventListener("submit", (res:any)=> {
            res.preventDefault();

            console.log(res.detail.text);
            currentState.name = res.detail.name
            currentState.email = res.detail.email
            currentState.password = res.detail.password
            const newState = state.setState(currentState);
            console.log(newState);
        });

        const nombre =  (this.shadow.querySelector(".name") as HTMLInputElement);
        const email = (this.shadow.querySelector(".email") as HTMLInputElement);
        console.log(nombre.value, email.value);

        this.shadow.querySelector(".button").addEventListener("click",(e:any)=>{
            
            currentState.name = e.target.nombre
            currentState.email = email.value;
            console.log(state.getState());
            
            state.singup(()=>{
                Router.go("/reports");
            });
        });
    }
}
customElements.define("signin-page", initiSigninPage);