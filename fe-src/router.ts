import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
    {path: "/", component: "welcome-page"},
    {path: "/ingresar", component: "ingresar-page"},
    {path: "/signin", component: "signin-page"},
    {path: "/copy", component: "copy-page"},
    {path: "/reports", component: "reports-page"},
    {path: "/pass", component: "ingresar-pass"},
    {path: "/pets", component: "pets-page"},
    {path: "/around", component: "aroundpets-page"},
    {path: "/edit", component: "edit-page"},
]);
