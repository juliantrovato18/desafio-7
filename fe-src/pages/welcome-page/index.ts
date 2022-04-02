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
      this.shadow.querySelector(".button").addEventListener("click",(e)=>{
         e.preventDefault();

         const currentState = state.getState();
      

       const  successCallback = (position)=>{
         const lng = position.coords.latitude;
         const lat = position.coords.longitude;
         
         currentState.myLat = lat;
         currentState.myLng = lng;
         state.setLoc(currentState.myLat, currentState.myLng, ()=>{
            state.getPetsAroundMe(()=>{
               Router.go("/around");
            })
         });
         
         console.log(currentState, "currente ahora");
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




         if(navigator.geolocation == null){
            console.log("Dar ubicacion")
         }
         // else{
         //    Router.go("/around");
         // }
         
      
   });
   }
   render() {
     
      // if(cs.token == ""){
      //    Router.go("/ingresar");
      // }else if(cs.token && cs.lat == null && cs.lng ==null){
      //    Router.go("/");
      // }
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
     
      this.listeners();
      
   }
   
}
customElements.define("welcome-page", initWelcomePage);