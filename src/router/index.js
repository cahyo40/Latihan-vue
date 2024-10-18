import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/dashboard-view/DashboardView.vue';
import NewsView from '../views/dashboard-view/NewsView.vue';
import CategoryView from '../views/dashboard-view/CategoryView.vue';
import ProfileView from '../views/dashboard-view/ProfileView.vue';
import DetailCategory from '../views/dashboard-view/DetailCategory.vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import PublicLayout from '../layouts/PublicLayout.vue';
import LandingPage from '../views/public-view/LandingPage.vue';
import RegisterView from '../views/public-view/RegisterView.vue';
import LoginView from '../views/public-view/LoginView.vue';
import CategoryPublicView from '../views/public-view/CategoryView.vue';

import NotFoundView from '../views/error-view/NotFoundView.vue';
const login = true;

const requireAuth = (to, from, next) => {
  if (login == true) {
    next();
  } else {
    alert('anda belum login');
    next({ name: 'Login' });
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    // Dashboard / login user
    {
      path: '/dashboard',
      component: DashboardLayout, //
      beforeEnter: requireAuth, // Memanggil fungsi requireAuth sebelum masuk ke route ini
      children: [
        {
          path: './',
          name: 'Dashboard',
          component: DashboardView,
        },
        {
          path: 'news',
          name: 'News',
          component: NewsView,
        },
        {
          path: 'category',
          name: 'Category',
          component: CategoryView,
        },
        {
          path: 'user',
          name: 'User',
          component: ProfileView,
        },
        {
          path: 'category/:name',
          name: 'Categoryname',
          component: DetailCategory,
        }
      ]

    },
    // Public Section
    {
      path: '/',
      component: PublicLayout,
      children: [
        {
          path: '/',
          name: 'LandingPage',
          component: LandingPage,
        }, {
          path: 'register',
          name: 'Register',
          component: RegisterView,
        }, {
          path: 'login',
          name: 'Login',
          component: LoginView,
        }, {
          path: 'category',
          name: 'Categorypublic',
          component: CategoryPublicView,
        }
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
    }
  ],
})

export default router
