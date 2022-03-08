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
    render() {

      
      
      const div = document.createElement("div");
      const mascotas = document.createElement("div");
      const currentState = state.getState();
      const page = document.createElement("div");
       state.getMyPets(()=>{
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

      
     
         page.innerHTML =`
         <section class="section1">
            <div>
            </div>
            <custom-header></custom-header>
            </section>
            <section class="section">
            <custom-text variant="title">Mis mascotas reportadas</custom-text>
            ${myReportedPets.map((pet)=>{
               {console.log(pet, "my pet")}
              return `<card-edit title=${pet.petname} class="card" img=${pet.petImage} ubi=${pet.place}></card-edit>`
            }).join(" ")
            }
         </section>
         `
      
      }
      
      const style = document.createElement("style");
       style.innerHTML= `
       
         .card{
            width: 330px;
            height: 147 px;
         }
       ` 




      div.appendChild(style);
      this.shadow.appendChild(div);
      this.shadow.appendChild(page);
      this.shadow.appendChild(mascotas);
       });
      
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