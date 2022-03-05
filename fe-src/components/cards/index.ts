import {Router} from "@vaadin/router"
import { state } from "../../state";
const x = require("../../img/Vector.jpg")

export class Card extends HTMLElement {
    shadow: ShadowRoot;
    src;
    petName;
    ubi;
    button;
    constructor() {    
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        
        
        
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
                petPhoto: this.src,
                petLocationName: this.ubi,
                
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
                <textarea class="input-phone" </textarea>
                </label>
                <button class="send-button"></button>
                </form>
                
                
        `

        reportPageStyle.innerHTML = `


        .div{
                top: 20%;
                left: 30%;
                width: 314px;
                height: 603px;
                position: fixed;
                border-radius: 4px;
                background: #FFFFFF;
        }
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
            })
            reportPage.dispatchEvent(CustomPetEvent);

        });
        
    })
    


    }
    render(){
        
        const image = this.getAttribute("src");
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
            <button class="report-button">reportar info</button>
            </div>
        `;

        
        style.innerHTML = `
            .div{
                min-width: 331px;
                min-height: 234px;
                border: solid 2px black;
                border-radius: 2px;
                padding: 20px;
            }
            .img{
                min-width: 331px;
                min-height: 147px;
            }
        `
            
        
        
        


        
        this.shadow.appendChild(style);
        this.listeners();

          

        console.log(this.src);
        
    }
}
customElements.define("card-comp", Card);