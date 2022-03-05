import "./router";
import "./components/button/index";
import "./components/cards/index";
import "./components/header/index";
import "./components/input/index";
import "./components/patita/index";
import "./components/text/index";
import "./pages/welcome-page/index";
import "./pages/pets-page/index";
import "./pages/signin-page/index";
import "./pages/ingresar-pass-page/index"
import "./pages/ingresar-page/index";
import "./pages/report-pet-page/index";
import "./pages/pets-around-page"
import "./pages/edit-pet-page/index"
import "./pages/edit-pet-page/index";
import {state} from "./state"


(function () {
    const cs = state.getState();

    if(cs.token){
        state.init();
        state.me();
    }


})();