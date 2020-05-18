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
      component: () => import("@/views/Home"),
    },
    // {
    //   name: "petitionDetails",
    //   path: "/petition/:petitionId",
    //   component: () => import("@/views/petition/PetitionDetails"),
    // },
    // {
    //   name: "settings",
    //   path: "/settings",
    //   component: () => import("@/views/Settings")
    // },
    // // Handle child routes with a default, by giving the name to the
    // // child.
    // // SO: https://github.com/vuejs/vue-router/issues/777
    {
      name: "profile",
      path: "/user/:username",
      component: () => import("@/views/profile/Profile"),
      // children: [
      //   {
      //     path: "",
      //     name: "profile",
      //     component: () => import("@/views/ProfileArticles"),
      //   },
      //   {
      //     name: "profile-favorites",
      //     path: "favorites",
      //     component: () => import("@/views/ProfileFavorited"),
      //   },
      // ],
    },
    // {
    //   name: "article",
    //   path: "/articles/:slug",
    //   component: () => import("@/views/Article"),
    //   props: true
    // },
    // {
    //   name: "article-edit",
    //   path: "/editor/:slug?",
    //   props: true,
    //   component: () => import("@/views/ArticleEdit")
    // }
  ],
});

router.beforeEach((to, from, next) => {
  console.log("start routing to " + to.path);
  const isAuthenticated = store.getters.isAuthenticated;
  console.log("isAuthenticated: " + isAuthenticated);

  const isGoToAuthPage = to.path == "/register" || to.path == "/login";
  const isGoToPageNotRequireLogin = to.path == "/";
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
