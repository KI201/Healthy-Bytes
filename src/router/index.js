import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import GardenView from '@/views/GardenView.vue' // WHY DID I USE @? // I think this is a shortcut to the src folder, so I can use @/views instead of ../../views
import AccessDenial from '@/views/AccessDenial.vue'
import CreateDiscussion from '@/views/CreateDiscussion.vue'
import ForumList from '@/views/ForumList.vue'
import DiscussionDetails from '@/views/DiscussionDetails.vue' // import the discussion details view
import SunSafetyQuizPage from '@/views/SunSafetyQuizPage.vue' // import the sun safety quiz page
import store from '../store/store'; // import store, again not super sure we use this for auth anymore, but maybe for local storage?
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // import firebase auth


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
      component: () => import('../views/SunSafetyQuizPage.vue'), // lazy load the component ( think this is what this line does double check)
    },
    {
      path: '/about',
      name: 'about',
      // lazy-loaded when the route is visited. So it doesnt load the component until the route is visited
      // this is done for performance reasons
      // this is called code splitting
      component: () => import('../views/AboutView.vue'), // lazy load the component ( think this is what this line does double check)
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    // {
    //   path: '/garden',
    //   name: 'garden',
    //   component: GardenView,
    //   meta: {
    //     requiresAuth: true, // This route requires authentication
    //   }
    // },
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
      component: () => import('../views/RiskAssessment.vue'), // lazy load
    },
    { 
      path: '/create-discussion', // Page when user wants to create a discussion
      name: 'create-discussion',
      component: CreateDiscussion,
    },
    {
      path: '/discussion/:id', // note id is a dynamic segment, it will be replaced with the actual id of the discussion
      name: 'DiscussionDetails',
      component: DiscussionDetails,
    },
    {
      path: '/treatment',
      name: 'treatment',
      component: () => import('../views/Treatment.vue'), // lazy load
    }
  ],
})

// remember you need to add this router to main.js by app.use(router)

// could use from below to say only if you are trying to use member only features we want to login first

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListerner = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListerner(); // remove the listener after we get the user
        resolve(user); // resolve the promise with the user
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    if (await getCurrentUser()) {
      // above gets current user using firebase getAuth method, enacts if user exists (logged in)
      next();
    } else {
      alert('You must be logged in to access this page');
      // redirect to login page
      next({ name: 'login' });
    }
  } else {
    // route does not require auth, proceed
    next();
  }
});





export default router
