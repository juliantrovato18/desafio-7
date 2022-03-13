import {Router} from "@vaadin/router"
import { state } from "../../state";
const image5 = require("../../img/image5.png");


export class CardEdit extends HTMLElement {
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


        const reportPetSeen = this.shadow.querySelector(".edit-button").addEventListener('click', () => {
            


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
            const petSeen = lostPet.querySelector(".edit-button");
            petSeen.addEventListener('report', (e:any) => {
                e.preventDefault();
                currentState["id"] = this.petId
                state.setState(currentState);
                console.log("detail", e.detail);
        


                
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
            <img src=${image5} class="edit-button"/>
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
        const botonCerrar = this.shadow.querySelector(".edit-button");
        botonCerrar.addEventListener("click", (e)=>{
            e.preventDefault();
            console.log("entra al console");
           Router.go("/edit");
        })
          

       
        
    }
}
customElements.define("card-edit", CardEdit);