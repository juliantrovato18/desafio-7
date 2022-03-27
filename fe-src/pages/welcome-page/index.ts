import { Router } from "@vaadin/router";
import { state } from "../../state";

class initWelcomePage extends HTMLElement {

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
      const cs = state.getState();
      if(cs.token == ""){
         Router.go("/ingresar");
      }else if(cs.token && cs.lat == null && cs.lng ==null){
         Router.go("/");
      }
      const div = document.createElement("div");
      div.innerHTML = `
         <section class="section1">
            <div>
            </div>
            <custom-header></custom-header>
         </section>
         <section class="section">
            <custom-text variant="title">Mascotas perdidas cerca tuyo</custom-text>
            <custom-text variant="body">para conocer, las mascotas perdidas cerca tuyo, necesitamos permiso para conocer tu ubicacion </custom-text>
            <button-comp class="button">Dar mi ubicacion</button-comp>
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
      

      const successCallback = (position)=>{
         const lat = position.coords.latitude;
         const lng = position.coords.longitude;
         
         currentState.myLat = lat;
         currentState.myLng = lng
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
      


      this.shadow.querySelector(".button").addEventListener("click",()=>{
            if(navigator.geolocation == null){
               console.log("Dar ubicacion")
            }else{
               Router.go("/around");
            }
            
         
      });
      this.listeners();
   }
}
customElements.define("welcome-page", initWelcomePage);