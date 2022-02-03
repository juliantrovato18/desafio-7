import { state } from "../../state";
import { initMap } from "../../../be-src/lib/mapbox";
import {mapbox} from "mapbox";
import {mapboxgl} from "mapbox-gl";
const MapboxClient = require("mapbox");
import Dropzone from "dropzone";
 const imgChange = require("../../img/change.jpg");

export function initReportPetPage(params){
    const div = document.createElement("div");
    div.innerHTML = `
            <script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.9.3/min/dropzone.min.js"></script>
            <script src="//api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.js"></script>
            <script src="//unpkg.com/mapbox@1.0.0-beta9/dist/mapbox-sdk.min.js"></script>
            <section class="page">
            <section class= "section1">
            <div>
            <custom-patita class="patita" variant="small"></custom-patita>
            </div>
            <custom-header></custom-header>
            </section>
            <custom-text variant= "title">Reportar mascotas perdidas</custom-text>
            <form class= "form">
            <div class= "input-container">
            <label class ="label">Nombre de la mascota</label>
            <input-comp type="name" class="name"></input-comp>
            <div id="dropzone" class="pet-photo-container">
            <img src="${imgChange}" class="img-change"></img>
            </div>
            <div class= "container-button">
            <button-comp class="button">Guardar</button-comp>
            </div>
            </form>
            <section class="sec">
            <div class="container-mapbox">
            <form class="search-form">
            <input name="q" type="search" />
            <button>Buscar</button>
            </form>
            <div id="map" class="map" style="width: 300px; height: 200px"></div>
            <label class ="label">Ubicacion</label>
            <input-comp></input-comp>
            <p>Buscá un punto de referencia para reportar a tu mascota. Puede ser una dirección, un barrio o una ciudad.</p>
            <div class= "container-button">
            <button-comp class="button">Reportar como perdido</button-comp>
            </div>
            <div class= "container-button">
            <button-comp class="button">Cancelar</button-comp>
            </div>
            </section>
            </section>
            
    `
    const style = document.createElement("style");
    style.innerHTML = `
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
         .page{
             min-width: 414px;
             min-height: 1000px;
         }
         
         .patita{
            padding: 10px;
            margin-left: 20px;
         }

         .form{
             min-width: 300px;
             min-height: 500px;
             display: flex;
             flex-direction: column;
             justify-content: space-evenly;
             align-items: center;
         }
         .input-container{
             min-height: 350px;
             display: flex;
             
             justify-content:space-between;
             flex-direction:column;
         }
         .container-button{
             display: flex;
             padding: 0px;
             margin-top: 20px;
         }

         .button{
            width:320px;
            height:50px;
            font-size:30px;
            font-weight:bold;
            text-align:center;
            text-justify:center;
            margin-top: 10px;
            background-color: #FF9DF5;
            align-items:center;
            justify-content:center;
         }
         .input{
             width: 100%;
             
             
         }
         .label{
        
         }
         .sec{
            display:flex;
            max-width: 100px;
            max-height: 50px;
            margin-top: 100px;
            flex-direction: row;
            
         }

         
        
  
    
    `
        
        div.appendChild(style);
        const currentState = state.getState();
        const form = div.querySelector(".form");
        const button = div.querySelector(".button");
        let pictureImg;

        const dropzonImg: any = div.querySelector(".img-change");
        const buttonDrop:any = div.querySelector(".button-drop");
        const mapa = div.querySelector(".map");
        

        const initDropzone = new Dropzone(dropzonImg,{
            url: "/falsa",
            clickable:true,
            autoProcessQueue: false,
        })
        
          
        initDropzone.on("thumbnail",(file)=>{

            pictureImg = file.dataURL;
            
            dropzonImg.src = file.dataURL;
        })
         
        const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN
        const mapboxClient = new MapboxClient(MAPBOX_TOKEN);

        function initMap() {
        mapboxgl.accessToken = MAPBOX_TOKEN;
        return new mapboxgl.Map({
            container: mapa,
            style: "mapbox://styles/mapbox/streets-v11",
        });
        }
        initMap();
        
        button.addEventListener("click",(e:any)=>{
            const petName = div.querySelector(".name");
            const pet =  petName.shadowRoot.querySelector("input").value;
            const currentState = state.getState();
            currentState.petname = pet;
            currentState.petImage = pictureImg;
            console.log(state.getState());
            console.log({
                pet,
                pictureImg
            });
        })

    
    return div;
}