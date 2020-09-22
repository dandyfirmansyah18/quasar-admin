import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import axios from 'axios'

Vue.prototype.$apiAdress = 'http://127.0.0.1:3030'
Vue.config.performance = true
Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
  
      if (localStorage.getItem('apiToken') == null) {
        next({
         path: '/Login',
          params: { nextUrl: to.fullPath }
        })
      } else {
        next()
      }
    } else {
      if (localStorage.getItem('apiToken') != null) {
        next({
          path: '/',
          params: { nextUrl: '/' }
        })
      } else {
        next()
      }
    }
  })

  axios.interceptors.response.use(
    response => {
      if (response.status === 200 || response.status === 201) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
    },
  error => {
      if (error.response.status) {
        switch (error.response.status) {
          case 400:
            break;
        
          case 401:
            alert("session expired");
            Router.replace({
              path: "/Login",
              // query: { redirect: Router.currentRoute.fullPath }
              params: { nextUrl: '/Login' }
            });
            break;
          case 403:
            Router.replace({
              path: "/Login",
              query: { redirect: Router.currentRoute.fullPath }
            });
             break;
          case 404:
            alert('page not exist');
            break;
          case 502:
           setTimeout(() => {
              Router.replace({
                path: "/Login",
                query: {
                  redirect: Router.currentRoute.fullPath
                }
              });
            }, 1000);
        }
        return Promise.reject(error.response);
      }
    }
  );

  return Router
}
