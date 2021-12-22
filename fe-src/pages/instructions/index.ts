
export function initinstructionsPage(params){
    const div = document.createElement("div");
    div.innerHTML = `
            <h1>Otra page</h1>
            <input-comp type="text"></input-comp>
    `
    const style = document.createElement("style");
    style.innerHTML = `
        * {
            box-sizing: border-box;
        }
        body {
            margin: 0;
         }
  
        
  
    
    `
        div.appendChild(style);
    // div.querySelector(".button").addEventListener("click",()=>{
    //     params.goTo("/play");
    // })
    return div;
}