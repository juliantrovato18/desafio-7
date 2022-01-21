
const API_BASE_URL = "http://localhost:3003";

 const state = {
    data : {
        
        name: "",
        phoneNumber:"",
        email:"",
        password:"",
        token: "",
        petname: "",
        lat: "",
        lng: "",


        
        
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
            const newState = state.setState(cs);
            console.log(data);
            console.log(cs);
            callback();
        })

    }

 }
 
export {state}
