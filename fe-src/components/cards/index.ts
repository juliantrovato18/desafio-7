
export class Card extends HTMLElement {
    shadow: ShadowRoot;
    src;
    petName;
    ubi;
    constructor() {    
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        
        
        
    }
     connectedCallback(){
         this.render();
     }   
    render(){
        
        const card = document.createElement("div");
        const style = document.createElement("style");
        card.innerHTML= `
            <div class="div">
            <div class= "container-img">
            <img src=${this.src} class="img"></img>
            </div>
            <h1 class="pet-title">${this.petName}</h1>
            <p class="pet-info">${this.ubi}</p>
            <button>reportar info</button>
            </div>
        `;

        card.className = "root";
        style.innerHTML = `
            .div{
                min-width: 331px;
                min-height: 234px;
                border: solid 2px black;
                border-radius: 2px;
                padding: 20px;
            }
            .img{
                min-width: 331px;
                min-height: 147px;
            }
        `
            
        
        this.shadow.appendChild(style);
        this.shadow.appendChild(card);

        console.log(this.src);
        const image = this.querySelector(".img").setAttribute("src", this.src);
        
        this.petName = this.getAttribute("h1");
        this.ubi = this.getAttribute("p");
    }
}
customElements.define("card-comp", Card);