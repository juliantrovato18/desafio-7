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
      state.suscribe(()=>{
         this.render();
      })
   }
   async render() {

      
      
      const div = document.createElement("div");
      const mascotas = document.createElement("div");
      const currentState = state.getState();
      
      await state.getMyPets();
      const myReportedPets = currentState.reportedPets;


      if(myReportedPets.length ==0){


      div.innerHTML = `
         <section class="section1">
            <div>
            </div>
            <custom-header></custom-header>
         </section>
         <section class="section">
            <custom-text variant="title">Mis mascotas reportadas</custom-text>
            <custom-text variant="body">Aun no reportaste ninguna mascota</custom-text>
            
         </section>
      `;
      
      
   }else{

   
     
         mascotas.innerHTML =`
         <section class="section1">
            <div>
            </div>
            <custom-header></custom-header>
            </section>
            <section class="section">
            <custom-text variant="title">Mis mascotas reportadas</custom-text>
            ${myReportedPets.map((pet)=>{
               {console.log(pet, "my pet")}
              return `<card-comp title=${pet.petname} class="button" img=${pet.petImage} ubi=${pet.place}></card-comp>`
            }).join(" ")
            }
         </section>
         `
      
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
      this.shadow.appendChild(mascotas);
      // const button = this.querySelector(".button");
      // button.addEventListener("card", (e:any)=>{
      //    e.preventDefault();
      //    e.detail.name,
      //    e.detail.image,
      //    e.detail.place,
      //    Router.go("/edit-page");
      // })

      
      

      
   }
}
customElements.define("pets-page", PetsPage);