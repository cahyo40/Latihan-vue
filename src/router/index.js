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
import CreateNewsView from '../views/dashboard-view/news/CreateNewsView.vue';
import DetailNewsView from '../views/dashboard-view/news/DetailNewsView.vue';
import UpdateNewsView from '../views/dashboard-view/news/UpdateNewsView.vue';
import DetailNewsPublicView from '../views/public-view/news/DetailNewsPublicView.vue';
import NewsByCategoryView from '../views/public-view/category/NewsByCategoryView.vue';

import NotFoundView from '../views/error-view/NotFoundView.vue';

import { auth } from '@/config/firebase'




const requireAuth = (to, from, next) => {
  const userAuth = auth.currentUser;
  if (!userAuth) {
    next({ name: 'Login' });
  } else {
    next();
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
          path: '',
          redirect: { name: 'Dashboard' }

        },
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
          path: 'news/create',
          name: 'CreateNews',
          component: CreateNewsView,
        },
        {
          path: 'news/:id',
          name: 'DetailNews',
          component: DetailNewsView,
        },
        {
          path: 'news/:id/update',
          name: 'UpdateNews',
          component: UpdateNewsView,
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
        },
        {
          path: '/news/:id',
          name: 'DetailNewsPublic',
          component: DetailNewsPublicView,
        },
        {
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
        },
        {
          path: '/category/:id',
          name: 'NewsByCategory',
          component: NewsByCategoryView,
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
