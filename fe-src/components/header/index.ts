

export function headerComp() {
    class Header extends HTMLElement {
        constructor() {
            super();
            this.render();

        }
        render() {
            const variant = this.getAttribute("variant") || "small"
            const shadow = this.attachShadow({ mode: 'open' });
            const div = document.createElement("header");
            const style = document.createElement("style");
            div.innerHTML = `
                <header class="header"></header>
            `
            style.innerHTML = `
                .header{
                    width:375px;
                    height: 60px;
                    background-color: #FF6868;
                    display:flex;
                    flex-direction: column;
                }
            `

            

            div.className = variant;
            shadow.appendChild(div);
            shadow.appendChild(style);
        }
    }

    customElements.define("custom-header", Header);
}