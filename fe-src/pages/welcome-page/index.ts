import { headerComp } from "../../components/header";
import { patitaComp } from "../../components/patita";

export function initWelcomePage(params){
    const div = document.createElement("div");
    div.innerHTML = `
      <section class= "section1">
      <div>
      <custom-patita class="patita" variant="small"></custom-patita>
      </div>
      <custom-header></custom-header>
      </section>
      <section class="section">
      <custom-text variant="title">Mascotas perdidas cerca tuyo</custom-text>
      <custom-text variant="body">para conocer, las mascotas perdidas cerca tuyo, necesitamos permiso para conocer tu ubicacion </custom-text>
      <custom-button class="button">Dar mi ubicacion</custom-button>
      </section>

      
    `
    
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
         
  
        
  
    `
    div.appendChild(style);
   
   //  div.querySelector(".button").addEventListener("click",()=>{
   //      params.goTo("/instructions");
   //  })
    return div;

}