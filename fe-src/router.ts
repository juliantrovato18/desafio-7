import { initWelcomePage } from "./pages/welcome-page";
import { initinstructionsPage } from "./pages/ingresar-page";
import { initiSigninPage } from "./pages/signin-page";
import { initReportPetPage } from "./pages/report-pet-page";
import { initEditPetPage } from "./pages/edit-pet-page";

const routes = [
    {
        path: /\/welcome/,
        component: initWelcomePage,
    },
    {
        path: /\/ingresar/,
        component: initinstructionsPage,
    },
    {
        path: /\/signin/,
        component: initiSigninPage,
    },
    {
        path: /\/reports/,
        component: initReportPetPage,
    },
    {
        path: /\/edit/,
        component: initEditPetPage,
    },


 ];


export function initRouter(container: Element) {
    function goTo(path){
        history.pushState({}, "", path);
        handleRoute(path);
    }
     function handleRoute(route) {
        console.log("el handle recibio una nueva ruta", route);

        for (const r of routes) {
            if (r.path.test(route)) {
                const el = r.component({goTo:goTo});
                
                if (container.firstChild) {
                    container.firstChild.remove();
                }
                container.appendChild(el);
            }
        }
    
    }
    handleRoute(location.pathname.replace("/dwf-m5-parcel-server/", "/welcome"));
    console.log(location.pathname);
    if(location.pathname == "/dwf-m5-parcel-server/"){
    goTo("/welcome");
    }
    window.onpopstate = function(){
        handleRoute(location.pathname);
    }
}
