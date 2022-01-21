import { state } from "../../state";

export function initiSigninPage(params){
    const div = document.createElement("div");
    div.innerHTML = `
            <section class= "section1">
            <div>
            <custom-patita class="patita" variant="small"></custom-patita>
            </div>
            <custom-header></custom-header>
            </section>
            <section class= "section">
            <custom-text variant= "title">Mis datos</custom-text>
            <div class= "input-container">
            <label class ="label">Nombre</label>
            <input-comp type="name" class="input"></input-comp>
            <label class ="label">Email</label>
            <input-comp type="email" class="input"></input-comp>
            <label class ="label">Contraseña</label>
            <input-comp type="password" class="input"></input-comp>
            <label class ="label">Repetir contraseña</label>
            <input-comp type="password" class="input"></input-comp>
            </div>
            <div class= "container-button">
            <button-comp class="button">Guardar</button-comp>
            </div>
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
         
         .patita{
            padding: 10px;
            margin-left: 20px;
         }

         .section{
             min-width: 375px;
             min-height: 750px;
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
         }

         .button{
            width:320px;
            height:50px;
            font-size:30px;
            font-weight:bold;
            text-align:center;
            text-justify:center;
            background-color: #FF9DF5;
            align-items:center;
            justify-content:center;
         }
         .input{
             width: 100%;
             
             
         }
         .label{
        
         }
        
  
    
    `
        div.appendChild(style);
        const currentState = state.getState();
        const input = div.querySelector(".input");
        input.addEventListener("awesome", (res:any)=>{
            console.log(res.detail.text);
           currentState.name = res.detail.name
           currentState.email = res.detail.text
           currentState.password = res.detail.text
        });

    div.querySelector(".button").addEventListener("click",()=>{
        state.singup(()=>{
            params.goTo("/welcome");
        })
        
    })
    return div;
}