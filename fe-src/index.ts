import { initRouter } from "./router";
import { headerComp } from "./components/header";
import { patitaComp } from "./components/patita";
import { customText } from "./components/text";
import { button } from "./components/button";
import { input } from "./components/input";
import { cardComp } from "./components/cards";
import {state} from "./state"


(function () {
    
    const root = document.querySelector(".root");
    initRouter(root);
    headerComp();
    patitaComp();
    customText();
    button();
    input();
    cardComp();
    
    
})();