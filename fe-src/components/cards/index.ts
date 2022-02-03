export function cardComp(){
    class Card extends HTMLElement {
        constructor() {    
          super();
          this.render();
        }
        
        render(){
            const shadow = this.attachShadow({mode: 'open'});
            const card = document.createElement("div");
            const style = document.createElement("style");
            card.innerHTML= `
                <div class="div">
                <div class= "container-img">
                <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepng.es%2Fpng-n0982v%2F&psig=AOvVaw2kD_Wh0IpF22HkKRHAlJvU&ust=1643329408005000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJD-0YjU0PUCFQAAAAAdAAAAABAD" class="img"></img>
                </div>
                <h1>Totodile</h1>
                <p>ubi</p>
                <button>reportar info</button>
                </div>
            `

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
            
            shadow.appendChild(card);
            shadow.appendChild(style);

        }
    }
    customElements.define("card-comp", Card);

}