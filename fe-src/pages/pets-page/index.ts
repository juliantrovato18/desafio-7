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
      const page = document.createElement("div");
      const currentState = state.getState();
      const isToken = currentState.token == "";
      const isLocal = localStorage.getItem("storage") == "";
      const tokenStorage = localStorage.getItem("storage");
      if(isToken && isLocal){
         Router.go("/ingresar");
      }else if(isToken && tokenStorage){
         state.me(()=>{
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
                     
                     
                    return `<card-edit petname="${pet.petname}" petId=${pet.id} class="card" image=${pet.petImage} ubi="${pet.place}"></card-edit>`
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
               .small{
                  min-width: 730px;
               }
               .section{
                  min-width: 730px;
                  display:flex;
                  flex-direction:column;
                  justify-content:center;
                  align-items:center;
               }
               @media (min-width: 375px){
                  .section{
                     min-width: 375px;
                     max-height: 800px;
                     display:flex;
                     flex-direction: column;
                     align-items:center;
                     justify-content:space-between;
                  }
      
      
             ` 
      
      
               
      
            div.appendChild(style);
            this.shadow.appendChild(div);
            this.shadow.appendChild(page);
            this.shadow.appendChild(mascotas);
             });
         })
         

      }else{
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
                  
                  
                 return `<card-edit petname="${pet.petname}" petId=${pet.id} class="card" image=${pet.petImage} ubi="${pet.place}" ></card-edit>`
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
            .small{
               min-width: 730px;
               background-color: #FF6868;
            }
            .section{
               min-width: 730px;
               display:flex;
               flex-direction:column;
               justify-content:center;
               align-items:center;
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
   
   
          ` 
   
   
            
   
         div.appendChild(style);
         this.shadow.appendChild(div);
         this.shadow.appendChild(page);
         this.shadow.appendChild(mascotas);
          });
         
         
      }
      
       
      

      
      

      
   }
}
customElements.define("pets-page", PetsPage);