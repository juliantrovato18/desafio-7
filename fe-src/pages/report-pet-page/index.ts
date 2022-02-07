import { state } from "../../state";
import { Router } from "@vaadin/router";
import MapboxClient from "mapbox";
import * as mapboxgl from "mapbox-gl";
import Dropzone from "dropzone";
const imgChange = require("../../img/change.jpg");
const mapboxToken = process.env.TOKEN_MAPBOX;
const mapboxClient = new MapboxClient(mapboxToken);
console.log("Token de mapbox_token: ", mapboxToken);

class InitReportPetPage extends HTMLElement {

    shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        this.render();
    }
    render() {

        const div = document.createElement("div");
        div.innerHTML = `
        <script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.9.3/min/dropzone.min.js"></script>
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
                        <input-comp class="mapbox-input"></input-comp>
                        <p>Buscá un punto de referencia para reportar a tu mascota. Puede ser una dirección, un barrio o una ciudad.</p>
                        <div class= "container-button">
                        <button-comp class="button">Reportar como perdido</button-comp>
                    </div>
                <div class= "container-button">
                    <button-comp class="button">Cancelar</button-comp>
                </div>
            </section>
        </section>    
        `;

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
            .input {
                width: 100%;
            }
            .label {
            
            }
            .sec {
                display:flex;
                max-width: 100px;
                max-height: 50px;
                margin-top: 100px;
                flex-direction: row;    
            }
        `;

        div.appendChild(style);
        this.shadow.appendChild(div);
        
        const currentState = state.getState();
        const form = this.shadow.querySelector(".form");
        const button = this.shadow.querySelector(".button");
        let pictureImg;

        const dropzonImg: any = this.shadow.querySelector(".img-change");
        const buttonDrop:any = this.shadow.querySelector(".button-drop");
        const mapa = this.shadow.getElementById('map');
        const mapboxInput = this.shadow.querySelector(".mapbox-input");

        const initDropzone = new Dropzone(dropzonImg,{
            url: "/falsa",
            clickable:true,
            autoProcessQueue: false,
        });
        
        initDropzone.on("thumbnail",(file)=>{

            pictureImg = file.dataURL;
            dropzonImg.src = file.dataURL;
            pictureImg = file.dataURL;
        });
        
        function initMap() {
            mapboxgl.accessToken = mapboxToken;
            return new mapboxgl.Map({
                container: mapa,
                style: "mapbox://styles/mapbox/streets-v11",
            });
        }

        function initSearchForm(callback) {
            mapboxClient.geocodeForward(
                mapboxInput,
                {
                    country: "ar",
                    autocomplete: true,
                    language: "es",
                },
                function (err, data, res) {
                    console.log(data);
                    if (!err) callback(data.features);
                }
            );    
        }

        (function () {
            const map = initMap();
            initSearchForm(function (results) {
                const firstResult = results[0];
                const marker = new mapboxgl.Marker()
                    .setLngLat(firstResult.geometry.coordinates)
                    .addTo(map);
                map.setCenter(firstResult.geometry.coordinates);
                map.setZoom(14);
                
                button.addEventListener("click",(e:any)=> {
                    e.preventDefault();
                    
                    const petName = div.querySelector(".name");
                    const pet =  petName.shadowRoot.querySelector("input").value;
                    currentState.petname = pet;
                    currentState.petImage = pictureImg;
                    
                    console.log(currentState);
                    console.log({
                        pet,
                        pictureImg
                    });
                })
            });
        })();
    }
}
customElements.define("reports-page", InitReportPetPage)