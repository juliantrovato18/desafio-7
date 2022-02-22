const API_BASE_URL = "http://localhost:3003";

const state = {
    data : {
        name: "",
        phoneNumber:"",
        email:"",
        password:"",
        token: "",
        petname: "",
        petImage:"",
        lat: "",
        lng: "",
        myLat:"",
        myLng:"",
        lostPets :[],

        listeners:[],
    },

    getState(){
        return this.data
    },
    setState(newState){
        this.data = newState;
        for (const cb of this.listeners) {
            cb();
            console.log("soy el state he cambiado", state.getState());
        }
        
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
                lat: cs.lat,
                lng: cs.lng, 
            })
    }).then((res)=>{
        return res.json()
    }).then((data)=>{
        console.log({data})
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
    }

}

export {state}
