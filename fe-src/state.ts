

const API_BASE_URL = "https://desafio-7.herokuapp.com/";
//const API_BASE_URL = "http://localhost:3003"

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
        petId: 0,
        place:"",
        id:"",
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
        
        console.log("Soy el state, he cambiado:", newState);
        
    },

    me(){
        const cs = state.getState();
        const token = localStorage.getItem("storage");
        cs["token"] = token;
        fetch(API_BASE_URL+ "/me",{
            method: "Get",
            headers:{
                "content-type": "application/json",
                "Authorization": "bearer "+ cs["token"],
            }

        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            console.log("data me",data);
            cs.email = data.email,
            cs.name = data.name,
            cs.userId = data.id
            
            
        })
    },

    suscribe(callback: (any) => any) {
        this.listeners.push(callback);
    },

    //recupera la ubicacion y el token
    traeData(){
        const cs = state.getState();
        const lat = localStorage.getItem("lat");
        const lng = localStorage.getItem("lng");
        console.log(lng, lng);
        cs["lat"] = lat;
        cs["lng"]=lng;
        

    },


    //newAuth
    singup(callback){
        const cs = state.getState();
        

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
            localStorage.setItem("storage", data.token);
            this.setState(cs);
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
        cs.id = data.id;
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
    getMyPets(callback){
        const cs = state.getState();
        console.log(cs.userId);
        fetch(API_BASE_URL + "/mypets/"+ cs.userId ,{
            method: "GET",
            headers:{
                "Authorization": "bearer "+ state.data.token
            } 
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log(data);
            cs["reportedPets"] = data;
            callback();
        })
    },


    // init(){
    //     const localData = JSON.parse(localStorage.getItem("storage"));
    //     if (!localData) {
    //         return;
    //     }
    //     this.setState(localData);
    // },


    getPetsAroundMe(callback){
        const cs = state.getState();
        console.log("cs",cs);
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
            localStorage.setItem("lat", lat);
            localStorage.setItem("lng",lng);
            callback();
        })
    },


    //actualiza la informacion de la mascota

    editPets(callback){
        const cs = state.getState();
        fetch(API_BASE_URL + "/pets/"+ cs.id ,{
            method: "PATCH",
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
            console.log("LA DATAA ACTUALIZADA" ,{data});
            cs.petname = data.petname,
            cs.petImage = data.petImage,
            cs.place = data.place,
            cs.lat = data.lat,
            cs.lng = data.lng
            callback();
        })
    },

    //elimina de la base de datos una mascota que fue reportada
    deletePet(callback){
        const cs = state.getState();
        
        fetch(API_BASE_URL + "/delete-report/" + cs["petId"],{
            method: "DELETE",
            headers:{
                "content-type": "application/json",
                "Authorization": "bearer "+ state.data.token,
                
            },
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            console.log(data);
            callback();
        })
    },

    //reporta a la mascota que fue encontrada, eliminando el reporte 
    foundPetReport(callback){
        const cs = state.getState();
        fetch(API_BASE_URL + "/report-founded/" + cs["petId"],{
            method: "POST",
            headers:{
                "Content-Type": "Application/json",
                "Authorization": "bearer "+ state.data.token,
            },
            body: JSON.stringify({
                loc: cs.place,
                phoneNumber: cs.phoneNumber
            })
        }).then((res)=>{
            console.log(res, "mail enviado");
            callback();
        })
    },






    //reportar a la mascota encontrada
    reportFoundedPet(callback){
        const cs = state.getState();
        fetch(API_BASE_URL + "/report", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "bearer "+ state.data.token,
            },
            body: JSON.stringify({
                name: cs.name,
                phoneNumber: cs.phoneNumber,
                when: cs.report
            })
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log({data});
            callback();
        })
    },


}

export {state}
