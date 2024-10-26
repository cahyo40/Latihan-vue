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
          meta: {
            title: "Dashboard"
          }
        },
        {
          path: 'news',
          name: 'News',
          component: NewsView,
          meta: {
            title: "Berita"
          }
        },
        {
          path: 'news/create',
          name: 'CreateNews',
          component: CreateNewsView,
          meta: {
            title: "Buat Berita"
          }
        },
        {
          path: 'news/:id',
          name: 'DetailNews',
          component: DetailNewsView,
          meta: {
            title: "Detail Berita"
          }
        },
        {
          path: 'news/:id/update',
          name: 'UpdateNews',
          component: UpdateNewsView,
          meta: {
            title: "Update Berita"
          }
        },
        {
          path: 'category',
          name: 'Category',
          component: CategoryView,
          meta: {
            title: "Kategori"
          }
        },
        {
          path: 'user',
          name: 'User',
          component: ProfileView,
          meta: {
            title: "User"
          }
        },
        {
          path: 'category/:name',
          name: 'Categoryname',
          component: DetailCategory,
          meta: {
            title: "Detail Kategori"
          }
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
          meta: {
            title: "Beranda"
          }
        },
        {
          path: '/news/:id',
          name: 'DetailNewsPublic',
          component: DetailNewsPublicView,
          meta: {
            title: "Detail Berita"
          }
        },
        {
          path: 'register',
          name: 'Register',
          component: RegisterView,
          meta: {
            title: "Register"
          }
        }, {
          path: 'login',
          name: 'Login',
          component: LoginView,
          meta: {
            title: "Login"
          }
        }, {
          path: 'category',
          name: 'Categorypublic',
          component: CategoryPublicView,
          meta: {
            title: "Kategori"
          }
        },
        {
          path: '/category/:id',
          name: 'NewsByCategory',
          component: NewsByCategoryView,
          meta: {
            title: "Berita Berdasarkan Kategori"
          }
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

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Portal Berita"
  next()
})

export default router;
