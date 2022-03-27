import { Router } from "@vaadin/router";
import { state } from "../../state";

class PetsAround extends HTMLElement {

   shadow: ShadowRoot;
   constructor() {
      super();
      this.shadow = this.attachShadow({mode: 'open'});
   }
   connectedCallback(){
      this.render();
   }
   listeners(){
      const currentState = state.getState();
      const isToken =  currentState.token == "";
      const isLat = currentState.lat == null;
      const isLng = currentState.lng == null;
      const storageToken = localStorage.getItem("token");
      const storageLat = localStorage.getItem("lat");
      const storageLng = localStorage.getItem("lng");
      if(isToken && isLat && isLng){
         console.log("entro al ist");
         state.me();
         state.traeData();
      }
      
      
   }
    render() {
      const currentState = state.getState();
     
      
      if(currentState.token == null){
         Router.go("/signin");
      }else if(currentState.token && currentState.lat == "" && currentState.lng == ""){
         Router.go("/");
      }


      
        state.getPetsAroundMe(()=>{
         const petsAround = currentState.lostPets;
         console.log(petsAround, "las around");
         
      const noPet = document.createElement("div");
      const div = document.createElement("div");

         if(petsAround.length ==0){

         
      noPet.innerHTML = `
      <section class="section1">
         <div>
         </div>
         <custom-header></custom-header>
      </section>
         <section class="section">
         <custom-text variant="title">No hay mascotas cerca de tu Ubicacion</custom-text>
         </section>
      `

      }else{
      
      div.innerHTML = `
         <section class="section1">
            <div>
            </div>
            <custom-header></custom-header>
         </section>
         <section class="section">
            <custom-text variant="title">Mascotas perdidas cerca tuyo</custom-text>
            ${petsAround.map((pet)=>{
               {console.log(pet, "my pet")}
              return `<card-comp petname=${pet.petname} petId=${pet.objectID} image=${pet.petImage} ubi=${pet.place}></card-comp>`
            }).join(" ")
            }
         </section>
      `;
      }
      const style = document.createElement("style");
      style.innerHTML=`
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
         .section{
            min-width: 650px;
            min-height:580px;
            padding: 20px;
            display:flex;
            flex-direction: column;
            align-items:center;
            justify-content:space-between;
         }
         @media (min-width: 375px){
            .section{
               max-width: 375px;
               max-height: 800px;
               display:flex;
               flex-direction: column;
               align-items:center;
               justify-content:space-between;
            }
         .patita{
            padding: 10px;
            margin-left: 20px;
         }
         .button{
            width:335px;
            height:50px;
            font-size:30px;
            font-weight:bold;
            text-align:center;
            text-justify:center;
            background-color: #FF9DF5;
            align-items:center;
            justify-content:center;
         }
      `;
      
      div.appendChild(style);
      noPet.appendChild(style);
      this.shadow.appendChild(div);
      this.shadow.appendChild(noPet);
     
        });
       
      
        this.listeners();
      

   }
   
}
 
customElements.define("aroundpets-page", PetsAround);