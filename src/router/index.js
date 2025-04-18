import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDenial from '@/views/AccessDenial.vue'
import CreateDiscussion from '@/views/CreateDiscussion.vue'
import ForumList from '@/views/ForumList.vue'
import DiscussionDetails from '@/views/DiscussionDetails.vue'
import Administrator from '@/views/Administrator.vue'
import FastFacts from '@/views/FastFacts.vue'
import SunSafetyQuizPage from '@/views/SunSafetyQuizPage.vue'
import Register from '@/views/Register.vue'
import SignIn from '@/views/SignIn.vue'
import store from '../store/store'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import db from '../firebase/init.js'
import { doc, getDoc } from 'firebase/firestore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sun-safety-quiz',
      name: 'sun-safety-quiz',
      component: () => import('../views/SunSafetyQuizPage.vue'), // lazy load
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'), // lazy load
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Administrator,
      meta: {
        requiresAuth: true, // authenticated users only
        requiresAdmin: true, // admin role required
      }
    },
    {
      path: '/denied',
      name: 'denied',
      component: AccessDenial,
    },
    {
      path: '/forum',
      name: 'forum',
      component: ForumList,
    },
    {
      path: '/risk-assessnent',
      name: 'risk-assessment',
      component: () => import('../views/RiskAssessment.vue'),
    },
    {
      path: '/create-discussion',
      name: 'create-discussion',
      component: CreateDiscussion,
    },
    {
      path: '/discussion/:id',
      name: 'DiscussionDetails',
      component: DiscussionDetails,
    },
    {
      path: '/treatment',
      name: 'treatment',
      component: () => import('../views/Treatment.vue'),
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: () => import('../views/SignIn.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/fast-facts',
      name: 'FastFacts',
      component: () => import('../views/FastFacts.vue'),
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: () => import('../views/FAQ.vue'),
    },
    {
      path: '/donate',
      name: 'Donate',
      component: () => import('../views/DonationPage.vue'),
    }
  ],
})

// returns a Promise that resolves with the currently signed-in user
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin)

  const user = await getCurrentUser()

  if (requiresAuth && !user) {
    // not logged in but trying to access protected page
    alert('You must be logged in to access this page')
    next({ name: 'login' })
    return
  }

  if (requiresAdmin && user) {
    // if admin role is required, check Firestore
    const userRef = doc(db, 'users', user.uid)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists() && userSnap.data().role === 'admin') {
      next() // user is admin
    } else {
      next({ name: 'denied' }) // user is logged in but not admin
    }
    return
  }

  // everything else is okay
  next()
})

export default router