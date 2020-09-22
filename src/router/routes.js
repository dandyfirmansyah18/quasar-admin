const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', 
        component: () => import('pages/Dashboard.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/Profile', 
        component: () => import('pages/UserProfile.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/Tables', 
        component: () => import('pages/Tables.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {path: '/Checkout', component: () => import('pages/Checkout.vue')},
      /** Persons **/
      {
        path: '/Persons', 
        component: () => import('pages/persons/Persons.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/Persons/create', 
        component: () => import('pages/persons/AddPersons.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/Login',
    component: () => import('pages/Login-1.vue'),
    meta: {
      requiresAuth: false
    }
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
