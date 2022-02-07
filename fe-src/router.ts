import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
    {path: "/", component: "welcome-page"},
    {path: "/ingresar", component: "ingresar-page"},
    {path: "/signin", component: "signin-page"},
    {path: "/welcome", component: ""},
    {path: "/reports", component: "reports-page"},
    {path: "/", component: ""},
    {path: "/", component: ""},
]);
