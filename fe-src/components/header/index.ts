const patita = require("../../img/patita.png");
import { Router } from "@vaadin/router";
import { stat } from "fs";
import { state } from "../../state";

export class Header extends HTMLElement {

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
            <header class="header">
            <div class="foot">
            <image src="${patita}"></image>
            </div>
            <div class="container-links">
            <a href="http://localhost:1234/signin" class="as">Mis datos</a>
            <a href="http://localhost:1234/pets" class="as">Mis mascotas perdidas</a>
            <a href="http://localhost:1234/around" class="as">Mascotas cerca</a>
            <a href="http://localhost:1234/reports" class="as">Reportar mascota</a>
            <a href="http://localhost:1234/" class="close-sesion">Cerrar sesion</a>
            </div>
            </header>
            
        `
        style.innerHTML = `
            .header{
                width:740px;
                height: 60px;
                padding:20px;
                background-color: #FF6868;
                display:flex;
                flex-direction: row;
                justify-content: space-between;
            }
            .container-links{
                display:flex;
                flex-direction:row;
                justify-content: space-evenly;
                
               
                
                
            }
            as{
                padding:20px;
                margin-left: 10px;
            }
            close-sesion{
                padding:20px;
                margin-left: 10px;
            }

        `
        div.className = variant;
        shadow.appendChild(div);
        shadow.appendChild(style);

        const cs = state.getState();
        const cerrarSesion = this.shadowRoot.querySelector(".close-sesion");
        cerrarSesion.addEventListener("click",(e)=>{
            e.preventDefault();
            cs.email = ""
            cs.token = ""
            cs.lat = ""
            cs.lng = ""
            localStorage.removeItem("storage");
            Router.go("/signin")
        })
    }
}
customElements.define("custom-header", Header);