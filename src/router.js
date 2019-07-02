import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("./views/Dashboard.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/Register.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/create",
      name: "create",
      component: () => import("./views/Create.vue")
    },
    {
      path: "/password",
      name: "password",
      component: () => import("./views/Password.vue")
    },
    {
      path: "/poll/:id",
      name: "poll",
      component: () => import("./views/Poll.vue")
    },
    {
      path: "/*",
      name: "404",
      component: () => import("./views/404.vue")
    }
  ]
});
