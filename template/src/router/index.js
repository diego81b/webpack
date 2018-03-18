import Vue from "vue";
import Router from 'vue-router';
import Login from '@/components/Login';
import Home from '@/components/Home';
import Admin from '@/components/Admin';
import User from '@/components/User';
import authorization from '@/auth';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      meta: {
        auth: true,
        roles: ["ADMIN"]
      }
    },
    {
      path: "/user",
      name: "User",
      component: User,
      meta: {
        auth: true,
        roles: ["USER"]
      }
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.name === "Login") {
    next();
  } else {
    const authRequired = to.matched.some(route => route.meta.auth);
    const authed = authorization.isAuthorized();
    if (authRequired && !authed) {
      next("/login");
    }
    const allowedRoles = to.matched.reduce(
      (acc, route) => route.meta.roles,
      []
    );
    if (!allowedRoles || authorization.hasRoles(allowedRoles)) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
