import {Router} from "@vaadin/router"
import { state } from "../../state";
const x = require("../../img/Vector.jpg")
import  {sendEmail}  from "./../../../be-src/lib/sendgrid";

export class Card extends HTMLElement {
    shadow: ShadowRoot;
    image;
    petname;
    ubi;
    petId
    constructor() {    
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.petname = this.getAttribute("petname");
        this.image = this.getAttribute("image");
        this.ubi = this.getAttribute("ubi");
        this.petId = this.getAttribute("petId");
        
        
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
                petname: this.petname,
                image: this.image,
                ubi: this.ubi,
                petId: this.petId
                
            },
            bubbles: true
        });
        

        const lostPets = this.shadow.querySelectorAll(".div");
            lostPets.forEach((lostPet) => {

            const petSeen = lostPet.querySelector(".report-button");
            petSeen.addEventListener('report', (e:any) => {
                e.preventDefault();
                currentState["id"] = this.petId
                state.setState(currentState);
                console.log("detail", e.detail);
        reportPage.innerHTML = `
                <img src=${x} class="button-cerrar"/>
                <h2>Reportar info de bobby</h2>
                <form class="form">
                <label class="user-name">
                <p class="nombre">Tu Nombre</p>
                <input name="name" class="input-name" />
                </label>
                <label class="phone-number">
                <p class="phone">Tu Numero de telefono</p>
                <input name="phone" class="input-phone" />
                </label>
                <label class="info-pet">
                <p class="phone">¿Donde lo viste?</p>
                <textarea name="textarea" class="input-phone"> </textarea>
                </label>
                <button class="send-button">Enviar</button>
                </form>
                
                
        `

        reportPageStyle.innerHTML = `

        .pet-founded{
            position: absolute;
            top: 200px; left: 400px;
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

            const sendForm = this.shadow.querySelector(".form");
            sendForm.addEventListener("submit", (e:any)=>{
                e.preventDefault();
                currentState.name = e.target["name"].value
                currentState.phoneNumber = e.target["phone"].value;
                currentState.report = e.target["textarea"].value;
                console.log(currentState, "current report");
                sendEmail(currentState.email, currentState.petname, currentState.place, currentState.phoneNumber);
                state.reportFoundedPet(()=>{
                    Router.go("/around");
                })
            })



                const botonCerrar = this.shadow.querySelector(".button-cerrar");
                botonCerrar.addEventListener("click", (e)=>{
                    e.preventDefault();
                    reportPageStyle.innerHTML = `
                    .pet-founded{
                        display:none;
                    }
                    ` 
                })
            })
            petSeen.dispatchEvent(CustomPetEvent);

        });
        
    })
    


    }
    render(){
        
        const image = this.getAttribute("image");
        const petname = this.getAttribute("petname");
        const ubi = this.getAttribute("ubi");
        
        
        const style = document.createElement("style");
        this.shadow.innerHTML= `
            <div class="div">
            <div class= "container-img">
            <img src=${image} crossorigin="anonymous" class="img"></img>
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
        .report-button{
            cursor: pointer;
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