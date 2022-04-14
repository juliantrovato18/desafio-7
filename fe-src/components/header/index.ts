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
            <a href="http://localhost:1234/signin" class="close">Cerrar Sesion</a>
            </div>
            </header>
            
        `
        menuAbierto.innerHTML=`
            <div class="menu">
            <h3 class="datos">Registrarme</h3>
            <h3 class="pets">Mis mascotas perdidas</h3>
            <h3 class="around">Mascotas cerca</h3>
            <h3 class="report">Reportar mascota</h3>
            <h3 id="close" class="close-sesion">Cerrar Sesion</h3>
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
                    min-width:980px;
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
            .as{
                padding:20px;
                margin-left: 10px;
                cursor:pointer;
            }
            .close-sesion{
                padding:20px;
                
                margin-left: 10px;
                cursor:pointer;
            }
            .datos{
                cursor:pointer;
            }
            .pets{
                cursor:pointer;
            }
            .around{
                cursor:pointer;
            }
            .report{
                cursor:pointer;
            }

        `
        div.className = variant;
        shadow.appendChild(div);
        shadow.appendChild(menuAbierto);
        shadow.appendChild(style);
        menuAbierto.appendChild(styleMenu);

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

        const cs = state.getState();
        const misDatos = this.shadowRoot.querySelector(".datos");
        misDatos.addEventListener("click", ()=>{
            if(cs.token){
                Router.go("/ingresar");
             }else{
                 Router.go("/signin")
             }

        })

        const pets = this.shadowRoot.querySelector(".pets");
        pets.addEventListener("click", ()=>{
            if(cs.token){
                Router.go("/pets");
            }else{
                Router.go("/ingresar");
            }
        })


        const cerrarSesion = this.shadowRoot.querySelector(".close-sesion");
        cerrarSesion.addEventListener("click", ()=>{
            console.log("apreta close");
            cs.email = ""
            cs.token = ""
            cs.lat = ""
            cs.lng = ""
            localStorage.removeItem("storage");
            localStorage.removeItem("email");
            localStorage.removeItem("lat");
            localStorage.removeItem("lng");
            Router.go("/welcome")
        })

        const around = this.shadowRoot.querySelector(".around");
        around.addEventListener("click", ()=>{
            if(cs.token){
                Router.go("/around");
            }else{
                Router.go("/ingresar");
            }
        })

        const report = this.shadowRoot.querySelector(".report");
        report.addEventListener("click", ()=>{
            if(cs.token){
                Router.go("/reports");
            }else{
                Router.go("/ingresar");
            }
        })

        
        
    }
}
customElements.define("custom-header", Header);