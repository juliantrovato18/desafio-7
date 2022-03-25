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
        const styleMenu = document.createElement("style");
        const menuAbierto = document.createElement("div");
        div.innerHTML = `
            <header class="header">
            <div class="foot">
            <image src="${patita}"></image>
            </div>
            <div class="button-desplegable">
            <button class="cerrar-ventana">X</button>
            </div>
            <div class="cerrar-ventana2">
            <button class="cerrar-ventana21">X</button>
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
        menuAbierto.innerHTML=`
            <div class="menu">
            <h3 class="datos">Mis datos</h3>
            <h3 class="pets">Mis mascotas perdidas</h3>
            <h3 class="around">Mascotas cerca</h3>
            <h3 class="report">Reportar mascota</h3>
            <h3 class="close-sesion">Cerrar sesion</h3>
            </div>
        `
        styleMenu.innerHTML = `
            .menu{
                display:none;
            }
            .cerrar-ventana2{
                display:none;
            }
        `

        style.innerHTML = `
            .header{
                min-width:580px;
                height: 60px;
                padding:20px;
                background-color: #FF6868;
                display:flex;
                flex-direction: row;
                justify-content: space-between;
            }
            @media (min-width: 375px){
                .header{
                    max-width:400px;
                }
            }
            .container-links{
                display:none;
                
             
            @media (min-width: 415px){
                .container-links{
                    display:none;
                }
            } 

            .menu{
                
            }
            .button-desplegable{
                display:flex;
            }
            .ventana{
                display:none;
            }
            .abre-ventana{
                display:none;
            }
            @media (min-width:375px){
                .abre-ventana{
                    display:inherit;
                }
            }
                
                
            }
            as{
                padding:20px;
                margin-left: 10px;
                cursor:pointer;
            }
            close-sesion{
                padding:20px;
                margin-left: 10px;
                cursor:pointer;
            }

        `
        div.className = variant;
        shadow.appendChild(div);
        shadow.appendChild(menuAbierto);
        menuAbierto.appendChild(styleMenu);
        shadow.appendChild(style);

        const button = this.shadowRoot.querySelector(".button-desplegable");
        
        button.addEventListener("click", (e)=>{
            e.preventDefault();
            styleMenu.innerHTML = `
            .menu{
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: fixed;
                background-color: aqua;
                
            }
            .cerrar-ventana2{
                display:flex;
            }
            .cerrar-ventana{
                display:none;
            }
            
            `
                
            
            

        })
        const buttonCerrar = this.shadowRoot.querySelector(".cerrar-ventana2");
        buttonCerrar.addEventListener("click", (e)=>{
            e.preventDefault();
            console.log("llega el bot");
            styleMenu.innerHTML = `
                .menu{
                display: none;
                }
                .cerrar-ventana2{
                display:none;
                }
            `
        })


        const misDatos = this.shadowRoot.querySelector(".datos");
        misDatos.addEventListener("click", ()=>{
            Router.go("/signin");
        })

        const pets = this.shadowRoot.querySelector(".pets");
        pets.addEventListener("click", ()=>{
            Router.go("/pets");
        })


        const around = this.shadowRoot.querySelector(".around");
        around.addEventListener("click", ()=>{
            Router.go("/around");
        })

        const report = this.shadowRoot.querySelector(".report");
        report.addEventListener("click", ()=>{
            Router.go("/reports");
        })

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