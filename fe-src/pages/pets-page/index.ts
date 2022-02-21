import { Router } from "@vaadin/router";
import { state } from "../../state";

class PetsPage extends HTMLElement {

   shadow: ShadowRoot;
   constructor() {
      super();
      this.shadow = this.attachShadow({mode: 'open'});
   }
   connectedCallback(){
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
         <section class="section">
            <custom-text variant="title">Mis mascotas reportadas</custom-text>
            <custom-text variant="body">Aun no reportaste ninguna mascota</custom-text>
            <card-comp></card-comp>
         </section>
      `;
      
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
            width: 375px;
            min-height:800px;
            padding: 20px;
            display:flex;
            flex-direction: column;
            align-items:center;
            justify-content:flex-start;
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
      this.shadow.appendChild(div);
      const currentState = state.getState();
      console.log(currentState);

      const successCallback = (position)=>{
         const lat = position.coords.latitude;
         const lng = position.coords.longitude;
         console.log(lat, lng);
      }
      const errorCallback = (err)=>{
         console.error("ha ocurrido un error", err);
      }

      const options = {
         enableHighAccuracy: true,
         maximumAge: 30000,
         timeout:27000
      }

      if("geolocation" in navigator){
         navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options)
         
         
      }else{
         console.error("la geolocalizacion no esta disponible");
      }
      
      const petImg = (this.shadow.querySelector(".img") as HTMLElement);
      const petName = (this.shadow.querySelector(".pet-title") as HTMLElement);
      petName.title = currentState.petname;

      
   }
}
customElements.define("pets-page", PetsPage);