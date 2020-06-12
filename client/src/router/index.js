import Vue from "vue";
import Router from "vue-router";
import store from "@/store/index.js";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/VHome"),
    },
    {
      name: "profile",
      path: "/user/:username",
      component: () => import("@/views/VProfile"),
    },
    {
      name: "petition",
      path: "/petition/:slug",
      component: () => import("@/views/VPetition"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log("start routing to " + to.path);
  const isAuthenticated = store.getters.isAuthenticated;
  console.log("isAuthenticated: " + isAuthenticated);

  const isGoToAuthPage = to.path == "/register" || to.path == "/login";
  const isGoToPageNotRequireLogin =
    to.path == "/" || to.path.startsWith("/petition");
  if (isGoToAuthPage) {
    //check if the user is already logged in
    if (isAuthenticated) next("/");
    else next();
  } else if (isGoToPageNotRequireLogin) next();
  //prevent the user from accessing page that needs to be authenticated
  else if (!isAuthenticated) next("/");
  else next();
});

export default router;
