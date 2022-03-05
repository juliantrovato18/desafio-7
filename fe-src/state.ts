import { callbackify } from "util";

const API_BASE_URL = "http://localhost:3003";

const state = {
    data : {
        name: "",
        phoneNumber:"",
        report:"",
        email:"",
        password:"",
        token: "",
        petname: "",
        petImage:"",
        placeName:"",
        petId:"",
        lat: "",
        lng: "",
        myLat:"",
        myLng:"",
        userId:"",
        lostPets :[],
        reportedPets:[],

        
    },
        listeners:[],
    getState(){
        return this.data
    },
    setState(newState){
        this.data = newState;
        for (const cb of this.listeners) {
            cb();
            console.log("soy el state he cambiado", state.getState());
        }
        localStorage.setItem("storage", JSON.stringify(newState));
        console.log("Soy el state, he cambiado:", newState);
        
    },

    me(){
        const cs = state.getState(); 
        fetch(API_BASE_URL+ "/me",{
            method: "Get",
            headers:{
                "content-type": "application/json",
                "Authorization": "bearer "+ state.data.token,
            }

        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            cs.email = data.email,
            cs.name = data.name
        })
    },


    suscribe(callback: (any) => any) {
        this.listeners.push(callback);
    },

    //newAuth
    singup(callback){
        const cs = state.getState();
        console.log(cs.name);

        fetch(API_BASE_URL + "/auth",{
            method: "post",
            headers:{
                "content-type": "application/json",
            },
            body:JSON.stringify({
                name:cs.name,
                email: cs.email,
                password: cs.password
            })
        }).then(res=>{
            return res.json()
        }).then(data=>{
            console.log({data});
            cs.name = data.name
            cs.email = data.email
            cs.password = data.password
            cs.userId = data.userId
            
            
            callback();
        })
    },

    //signin
    signin(callback){
        const cs = state.getState();

        fetch(API_BASE_URL + "/auth/token",{
            method: "post",
            headers:{
                "content-type": "application/json"
                
            },
            body:JSON.stringify({
                email: cs.email,
                password: cs.password
            })
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            console.log({data})
            cs.token = data.token
            this.setState(cs.token);
            callback();
        })
       
    },

    //crea una mascota en la base de datos
    createPet(callback){
        const cs = state.getState();
        

        fetch(API_BASE_URL + "/pet",{
            method: "post",
            headers:{
                "content-type": "application/json",
                "Authorization": "bearer "+ state.data.token,
            },
            body:JSON.stringify({
                petname: cs.petname,
                petImage: cs.petImage,
                place: cs.placeName,
                lat: cs.lat,
                lng: cs.lng, 
            })
    }).then((res)=>{
        return res.json()
    }).then((data)=>{
        console.log({data})
        cs.petId = data.id;
        // cs.petname = data.petname,
        // cs.petImage = data.petImage,
        // cs.lat = data.lat,
        // cs.lng = data.lng
        callback();
    })
    },

    getPets(){
        const cs = state.getState();

        fetch(API_BASE_URL + "/pets",{
            method: "GET",
            headers:{
                "Authorization": "bearer "+ state.data.token
            } 
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log(data);
            cs.lostPets = data;
            
        })
    },


    //mascotas reportadas por un usuario en particular
    getMyPets(){
        const cs = state.getState();

        fetch(API_BASE_URL + "/mypets/"+ cs.user_id ,{
            method: "GET",
            headers:{
                "Authorization": "bearer "+ state.data.token
            } 
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log(data);
            cs.reportedPets = data;
            
        })
    },


    init(){
        const localData = JSON.parse(localStorage.getItem("storage"));
        if (!localData) {
            return;
        }
        this.setState(localData);
    },


    getPetsAroundMe(){
        const cs = state.getState();
        const lat = cs.myLat;
        const lng = cs.myLng;

        fetch(API_BASE_URL + "/mascotas-cerca?lat=" +lat +"&lng="+lng ,{
            method: "GET",
            headers:{
                "Authorization": "bearer "+ state.data.token
            } 
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log(data);
            cs.lostPets = data;
            
        })
    },


    //actualiza la informacion de la mascota

    editPets(callback){
        const cs = state.getState();
        console.log(cs.petId);
        fetch(API_BASE_URL + "/pets/"+ cs.petId ,{
            method: "PUT",
            headers:{
                "Authorization": "bearer "+ state.data.token
            },
            body:JSON.stringify({
                petname: cs.petname,
                petImage: cs.petImage,
                place: cs.placeName,
                lat: cs.lat,
                lng: cs.lng,
            })
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log("LA DATAA ACTUALIZADA" ,{data});
            cs.petname = data.petname,
            cs.petImage = data.petImage,
            cs.place = data.place,
            cs.lat = data.lat,
            cs.lng = data.lng
            callback();
        })
    },


    reportFoundedPet(callback){
        const cs = state.getState();
        fetch(API_BASE_URL + "/report", {
            method: "POST",
            headers:{
                "Authorization": "bearer "+ state.data.token
            },
            body: JSON.stringify({
                name: cs.name,
                phoneNumber: cs.phoneNumber,
                report: cs.report
            })
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log({data});
            cs.name = data.name,
            cs.phoneNumber = data.phoneNumber,
            cs.report = data.report
            callback();
        })
    },


}

export {state}
