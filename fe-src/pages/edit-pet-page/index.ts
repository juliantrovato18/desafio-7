import { state } from "../../state";
import { Router } from "@vaadin/router";
import MapboxClient from "mapbox";
import * as mapboxgl from "mapbox-gl";
import Dropzone from "dropzone";
const imgChange = require("../../img/change.jpg");

const mapboxClient = new MapboxClient("pk.eyJ1Ijoia2VhbmVkZXYiLCJhIjoiY2t3emQ3cGk4MHR1cDJ1cW9sbGVhZ2xndSJ9.NXLbCbcSGIJxdMY7TKj50Q");

class InitEditPetPage extends HTMLElement {

    shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        this.render();
    }
    render() {
        const currentState = state.getState();
        const isToken = currentState.token == "";
        if(isToken){
            state.me(()=>{
                state.traePetId(()=>{
                    const div = document.createElement("div");
                console.log(currentState);
        div.innerHTML = `
        <script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.9.3/min/dropzone.min.js"></script>
        <div class="page">
            <div class= "section1">
                <div>
                </div>
                <custom-header></custom-header>
            </div>
            <custom-text variant= "title" >Editar mascotas perdidas</custom-text>
            <form class="form">
                <div class= "input-container">
                    <label class ="label">Nombre de la mascota</label>
                    <input type="name" class="name" ></input>
                    <div id="dropzone" class="pet-photo-container">
                    <img src="${imgChange}" class="img-change"></img>
                </div>
                <div class= "container-button">
                <custom-text variant="title" class="drop-text">Agregar/Modificar foto</custom-text>
                </div>
                <div class="container-mapbox">
                    <div id="map" class="map" style="width: 300px; height: 200px"></div>
                    <label class="label">Ubicacion</label>
                    <input class="input-valido" name="q" type="search"/>
                    <button class="search-button"> Buscar </button>
                    <p>Buscá un punto de referencia para reportar a tu mascota. Puede ser una dirección, un barrio o una ciudad.</p>
                    <div class= "container-button">
                    <button class="button" type="submit">Guardar</button>
                    <button class="delete-button" type="click">Despublicar</button>
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
            .name {
                width: 312px;
                height: 50px;
                border-radius: 4px; 
                border: 1px solid #000;
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
                min-width: 650px;
                min-height: 500px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
            }

            @media (min-width: 375px){
                .form{
                   max-width: 375px;
                   max-height: 800px;
                   display:flex;
                   flex-direction: column;
                   align-items:center;
                   justify-content:space-between;
                }
            .input-container{
                min-height: 350px;
                width: 600px;
                display: flex; 
                justify-content:space-between;
                flex-direction:column;
            }
            @media (min-width: 375px){
                .input-container{
                   max-width: 375px;
                   max-height: 800px;
                   display:flex;
                   margin-left: 20px;
                   flex-direction: column;
                   align-items:center;
                   justify-content:space-between;
                }
            .img-change {
                width: 330px;
                height: 250px;
            }
            .container-button{
                display: flex;
                flex-direction: column;
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
            .found-button{
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
            .delete-button{
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
            }
            .input {
                width: 100%;
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
            .dz-size {
                display: none;
            }
            .dz-filename {
                display: none;
            }
            .dz-success-mark {
                display: none;
            }
            .dz-error-mark {
                display: none;
            }
            .mapboxgl-ctrl-attrib-button {
                display: none;
            }
            .mapboxgl-ctrl-attrib-inner {
                display: none;
            }
        `;

        div.appendChild(style);
        this.shadow.appendChild(div);
        
       
        const form = this.shadow.querySelector(".form");
        const searchButton = this.shadow.querySelector(".search-button");
        const petName = (this.shadow.querySelector(".name") as HTMLInputElement);
        const deleteButton = this.shadow.querySelector(".delete-button");
        petName.getAttribute("name");
        let pictureImg;

        const dropzonImg: any = this.shadow.querySelector(".img-change");
        dropzonImg.getAttribute("img");
        const mapa = this.shadow.getElementById('map');
        const mapboxInput = (this.shadow.querySelector(".input-valido") as HTMLInputElement);
        mapboxInput.getAttribute("q");
        

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
            mapboxgl.accessToken = "pk.eyJ1Ijoia2VhbmVkZXYiLCJhIjoiY2t6YWR4ZzhtMjN0MDJwdHZrZm54ZTFjcSJ9.tNj8iOs3xhDWm898q8Fg7w";
            return new mapboxgl.Map({
                container: mapa,
                style: "mapbox://styles/mapbox/streets-v11",
            });
        }

        function initSearchForm(callback) {
            searchButton.addEventListener('click', (e) => {
                e.preventDefault();

                mapboxClient.geocodeForward(
                    mapboxInput.value,
                    {
                        country: 'ar',
                        autocomplete: true,
                        language: "es",
                    },
                    function (err, data, res) {
                    
                    if (!err) callback(data.features);
                    }
                );
            });
        }

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
                
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    console.log("Este es el form: ", {
                        petName: petName.value,
                        pictureImg: pictureImg,
                        Ubi: {
                            name: e.target["q"].value,
                            lat: lat,
                            lng: lng,
                        },
                    });
                    currentState.petname = petName.value;
                    currentState.petImage = pictureImg;
                    currentState.placeName = e.target["q"].value,
                    currentState.lat = lat;
                    currentState.lng = lng;
                    
                    state.editPets(()=>{
                        
                        Router.go("/pets");
                    })
                });
                
            });

            deleteButton.addEventListener("click", (e)=>{
                e.preventDefault();
                state.deletePet(()=>{
                    Router.go("/pets");
                })
            })
            
        })();


                })
            })
                


            
        }else{
            const div = document.createElement("div");
        div.innerHTML = `
        <script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.9.3/min/dropzone.min.js"></script>
        <div class="page">
            <div class= "section1">
                <div>
                </div>
                <custom-header></custom-header>
            </div>
            <custom-text variant= "title" >Editar mascotas perdidas</custom-text>
            <form class="form">
                <div class= "input-container">
                    <label class ="label">Nombre de la mascota</label>
                    <input type="name" class="name" ></input>
                    <div id="dropzone" class="pet-photo-container">
                    <img src="${imgChange}" class="img-change"></img>
                </div>
                <div class= "container-button">
                <custom-text variant="title" class="drop-text">Agregar/Modificar foto</custom-text>
                </div>
                <div class="container-mapbox">
                    <div id="map" class="map" style="width: 300px; height: 200px"></div>
                    <label class="label">Ubicacion</label>
                    <input class="input-valido" name="q" type="search"/>
                    <button class="search-button"> Buscar </button>
                    <p>Buscá un punto de referencia para reportar a tu mascota. Puede ser una dirección, un barrio o una ciudad.</p>
                    <div class= "container-button">
                    <button class="button" type="submit">Guardar</button>
                    <button class="delete-button" type="click">Despublicar</button>
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
            .name {
                width: 312px;
                height: 50px;
                border-radius: 4px; 
                border: 1px solid #000;
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
                min-width: 650px;
                min-height: 500px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
            }

            @media (min-width: 375px){
                .form{
                   max-width: 375px;
                   max-height: 800px;
                   display:flex;
                   flex-direction: column;
                   align-items:center;
                   justify-content:space-between;
                }
            .input-container{
                min-height: 350px;
                width: 600px;
                display: flex; 
                justify-content:space-between;
                flex-direction:column;
            }
            @media (min-width: 375px){
                .input-container{
                   max-width: 375px;
                   max-height: 800px;
                   display:flex;
                   margin-left: 20px;
                   flex-direction: column;
                   align-items:center;
                   justify-content:space-between;
                }
            .img-change {
                width: 330px;
                height: 250px;
            }
            .container-button{
                display: flex;
                flex-direction: column;
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
            .found-button{
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
            .delete-button{
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
            }
            .input {
                width: 100%;
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
            .dz-size {
                display: none;
            }
            .dz-filename {
                display: none;
            }
            .dz-success-mark {
                display: none;
            }
            .dz-error-mark {
                display: none;
            }
            .mapboxgl-ctrl-attrib-button {
                display: none;
            }
            .mapboxgl-ctrl-attrib-inner {
                display: none;
            }
        `;

        div.appendChild(style);
        this.shadow.appendChild(div);
        
       
        const form = this.shadow.querySelector(".form");
        const searchButton = this.shadow.querySelector(".search-button");
        const petName = (this.shadow.querySelector(".name") as HTMLInputElement);
        const deleteButton = this.shadow.querySelector(".delete-button");
        petName.getAttribute("name");
        let pictureImg;

        const dropzonImg: any = this.shadow.querySelector(".img-change");
        dropzonImg.getAttribute("img");
        const mapa = this.shadow.getElementById('map');
        const mapboxInput = (this.shadow.querySelector(".input-valido") as HTMLInputElement);
        mapboxInput.getAttribute("q");
        

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
            mapboxgl.accessToken = "pk.eyJ1Ijoia2VhbmVkZXYiLCJhIjoiY2t6YWR4ZzhtMjN0MDJwdHZrZm54ZTFjcSJ9.tNj8iOs3xhDWm898q8Fg7w";
            return new mapboxgl.Map({
                container: mapa,
                style: "mapbox://styles/mapbox/streets-v11",
            });
        }

        function initSearchForm(callback) {
            searchButton.addEventListener('click', (e) => {
                e.preventDefault();

                mapboxClient.geocodeForward(
                    mapboxInput.value,
                    {
                        country: 'ar',
                        autocomplete: true,
                        language: "es",
                    },
                    function (err, data, res) {
                    
                    if (!err) callback(data.features);
                    }
                );
            });
        }

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
                
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    console.log("Este es el form: ", {
                        petName: petName.value,
                        pictureImg: pictureImg,
                        Ubi: {
                            name: e.target["q"].value,
                            lat: lat,
                            lng: lng,
                        },
                    });
                    currentState.petname = petName.value;
                    currentState.petImage = pictureImg;
                    currentState.placeName = e.target["q"].value,
                    currentState.lat = lat;
                    currentState.lng = lng;
                    
                    state.editPets(()=>{
                        
                        Router.go("/pets");
                    })
                });
                
            });

            deleteButton.addEventListener("click", (e)=>{
                e.preventDefault();
                state.deletePet(()=>{
                    Router.go("/pets");
                })
            })
            
        })();
        }
        

    }
}
customElements.define("edit-page", InitEditPetPage);