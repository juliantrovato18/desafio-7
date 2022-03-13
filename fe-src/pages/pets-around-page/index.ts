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
    render() {
      const currentState = state.getState();
      if(currentState.token == null){
         Router.go("/signin");
      }


      state.me();
        state.getPetsAroundMe(()=>{
         const petsAround = currentState.lostPets;
         console.log(petsAround, "las around");

      
      const div = document.createElement("div");
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
              return `<card-comp petname=${pet.petname} image=${pet.petImage} ubi=${pet.place}></card-comp>`
            }).join(" ")
            }
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
            min-height:580px;
            padding: 20px;
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
      this.shadow.appendChild(div);
        });
       
      
      
      

   }
}
customElements.define("aroundpets-page", PetsAround);