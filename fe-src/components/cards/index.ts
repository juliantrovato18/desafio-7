import {Router} from "@vaadin/router"
import { state } from "../../state";
const x = require("../../img/Vector.jpg")

export class Card extends HTMLElement {
    shadow: ShadowRoot;
    image;
    petName;
    ubi;
    
    constructor() {    
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.petName = this.getAttribute("petName");
        this.image = this.getAttribute("image");
        this.ubi = this.getAttribute("ubi");
        
        
        
    }
     connectedCallback(){
         this.render();
     }  
     
     
    listeners(){
        const currentState = state.getState();
        const  { token } = currentState;
        const reportPage = document.createElement("div");
        reportPage.className = "pet-founded";
        const reportPageStyle = document.createElement("style");


        const reportPetSeen = this.shadow.querySelector(".report-button").addEventListener('click', () => {
            


        const CustomPetEvent = new CustomEvent('report', {
            
            detail: {
                petName: this.petName,
                image: this.image,
                ubi: this.ubi,
                
            },
            bubbles: true
        });
        

        const lostPets = this.shadow.querySelectorAll(".div");
            lostPets.forEach((lostPet) => {

            const petSeen = lostPet.querySelector(".report-button");
            petSeen.addEventListener('report', (e:any) => {
                e.preventDefault();
                console.log("detail", e.detail);
        reportPage.innerHTML = `
                <img src=${x} class="button-cerrar" />
                <h2>Reportar info de bobby</h2>
                <form class="form">
                <label class="user-name">
                <p class="nombre">Tu Nombre</p>
                <input class="input-name" />
                </label>
                <label class="phone-number">
                <p class="phone">Tu Numero de telefono</p>
                <input class="input-phone" />
                </label>
                <label class="info-pet">
                <p class="phone">¿Donde lo viste?</p>
                <textarea class="input-phone"> </textarea>
                </label>
                <button class="send-button"></button>
                </form>
                
                
        `

        reportPageStyle.innerHTML = `


        
        .button-cerrar {
            width: 30px;
            height: 30px;
            padding: 20px;
            margin-left: 77%;
        }

        .form {
            display: flex;
            margin-left: 10px; 
            flex-direction: column;
        }

        .button {
            width: 280px;
            height: 40px;
            border: none;
            margin-top: 10px;
            margin-left: 5px;
            border-radius: 4px;
            background-color: #FF9DF5;
        }

        `

                this.shadow.appendChild(reportPage);
                this.shadow.appendChild(reportPageStyle);

                const botonCerrar = this.querySelector(".button-cerrar");
                botonCerrar.addEventListener("click", (e)=>{
                    e.preventDefault();
                    reportPageStyle.innerHTML = `
                    .div{}
                    ` 
                })
            })
            petSeen.dispatchEvent(CustomPetEvent);

        });
        
    })
    


    }
    render(){
        
        const image = this.getAttribute("url");
        const petname = this.getAttribute("title");
        const ubi = this.getAttribute("ubi");
        
        
        const style = document.createElement("style");
        this.shadow.innerHTML= `
            <div class="div">
            <div class= "container-img">
            <img src=${image} class="img"></img>
            </div>
            <h1 class="pet-title">${petname}</h1>
            <p class="pet-info">${ubi}</p>
            <p class="report-button">Reportar info</p>
            </div>
        `;

        
        style.innerHTML = `
            
        .div{
            width: 314px;
            height: 400px;
            margin-top: 20px;
            border: solid 2px black;
            border-radius: 2px;
            padding: 20px;
            background: #FFFFFF;
        }

            .img{
                width: 331px;
                height: 147px;
            }
        `
            
        
        
        


        
        this.shadow.appendChild(style);
        this.listeners();

          

       
        
    }
}
customElements.define("card-comp", Card);