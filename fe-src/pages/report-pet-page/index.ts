import { state } from "../../state";
import { Router } from "@vaadin/router";
import MapboxClient from "mapbox";
import * as mapboxgl from "mapbox-gl";
import Dropzone from "dropzone";
const imgChange = require("../../img/change.jpg");
const mapboxToken = "pk.eyJ1Ijoia2VhbmVkZXYiLCJhIjoiY2t6YWR4ZzhtMjN0MDJwdHZrZm54ZTFjcSJ9.tNj8iOs3xhDWm898q8Fg7w";
const mapboxClient = new MapboxClient(mapboxToken);


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
        <div class="page">
            <div class= "section1">
                <div>
                    <custom-patita class="patita" variant="small"></custom-patita>
                </div>
                <custom-header></custom-header>
            </div>
            <custom-text variant= "title" >Reportar mascotas perdidas</custom-text>
        <form class="form">
            <div class= "input-container">
                <label class ="label">Nombre de la mascota</label>
                <input-comp type="name" class="name"></input-comp>
                <div id="dropzone" class="pet-photo-container">
                <img src="${imgChange}" class="img-change"></img>
            </div>
            <div class= "container-button">
            <custom-text variant="title" class="drop-text">Agregar/Modificar foto</custom-text>
            </div>
            <div class="container-mapbox">
                <div id="map" class="map" style="width: 300px; height: 200px"></div>
                <label class ="label">Ubicacion</label>
                <input class="input-valido" name="q" type="search"/>
                <button>Buscar</button>
                <p>Buscá un punto de referencia para reportar a tu mascota. Puede ser una dirección, un barrio o una ciudad.</p>
                <div class= "container-button">
                <button class="button" type="submit">Guardar</button>
                </div>
            </div>
        </form>
        </div>    
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
                max-height: 1000px;
                
                
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
            .img-change{
                width: 250px;
                height: 200px;
            }
            .container-button{
                display: flex;
                padding: 0px;
                margin-top: 10px;
            }
            .container-button-cancelar{
                display: flex;
                padding: 0px;
                margin-top: 10px;
            }

            .drop-text{
                border:solid 1px;
                border-radius:1px;
                background-color: #97EA9F;
                width:330px;
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
            .dz-size{
                display:none;
            }
            .mapboxgl-ctrl-attrib-inner{
                display:none;
            }
            
            .label {
            
            }
            .sec {
                display:flex;
                max-width: 100px;
                min-height: 300px;
                margin-top: 100px;
                flex-direction: row;    
            }
        `;

        div.appendChild(style);
        this.shadow.appendChild(div);
        
        const currentState = state.getState();
        const form = this.shadow.querySelector(".form");
        const button = document.querySelector(".button");
        let pictureImg;

        const dropzonImg: any = this.shadow.querySelector(".img-change");
        const buttonDrop:any = this.shadow.querySelector(".button-drop");
        var input = (this.shadow.querySelector(".input") as HTMLInputElement);
        const mapa = this.shadow.getElementById('map');
        var mapboxInput = (this.shadow.querySelector(".input-valido") as HTMLInputElement);
        
        

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
            //COMO DEBERIA SER EL FORM        
        // form.addEventListener("submit", (e)=>{
        //     e.preventDefault();
        //     const imagen = div.querySelector(".img-change");
        //     const data = imagen.querySelector("img").src;
        //     const petName = div.querySelector(".name");
        //      const pet =  petName.shadowRoot.querySelector("input").value;
        //     console.log(pet, data);
        // })

        function initMap() {
            mapboxgl.accessToken = "pk.eyJ1Ijoia2VhbmVkZXYiLCJhIjoiY2t6YWR4ZzhtMjN0MDJwdHZrZm54ZTFjcSJ9.tNj8iOs3xhDWm898q8Fg7w";
            return new mapboxgl.Map({
                container: mapa,
                style: "mapbox://styles/mapbox/streets-v11",
            });
        }

        function initSearchForm(callback) {
            form.addEventListener("click", (e)=>{
                e.preventDefault();
                mapboxClient.geocodeForward(
                    mapboxInput.value,
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
            )}
            
            

        

        (function () {
            const map = initMap();
            initSearchForm(function (results) {
                const firstResult = results[0];
                const [lng, lat] = firstResult.geometry.coordinates;
                const marker = new mapboxgl.Marker()
                    .setLngLat(firstResult.geometry.coordinates)
                    .addTo(map);
                map.setCenter(firstResult.geometry.coordinates);
                map.setZoom(14);
                
                button.addEventListener("submit",(e:any)=> {
                    e.preventDefault();
                    
                    const petName = this.shadowRoot.querySelector(".name");
                    const pet =  petName.shadowRoot.querySelector("input").value;
                    const imagen = div.querySelector(".img-change");
                    const data = imagen.querySelector("img").src;
                    const location = div.querySelector(".q");
                    const loc = this.shadowRoot.querySelector(".input-valido").value;
                    console.log(loc);
                    currentState.petname = pet;
                    currentState.petImage = pictureImg;
                    currentState.lng = lng;
                    currentState.lat = lat;
                    
                    console.log(currentState);
                    console.log({
                        pet,
                        data,
                        lng,
                        lat
                    });
                })
            });
        })();
    }
}
customElements.define("reports-page", InitReportPetPage)