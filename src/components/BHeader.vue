<template>
 <!-- Using Bootstrap's Header template (starter code) -->
 <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->   
 <div class="container">
    <!-- removed flex wrap below so they were forced in a line -->
    <header class="d-flex align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg> 
      </a>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><router-link to="/" class="nav-link px-2 link-secondary">Home</router-link></li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle px-2 link-dark" href="#" id="melanomaDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Melanoma Information
          </a>
          <ul class="dropdown-menu" aria-labelledby="melanomaDropdown">
            <li><router-link to="/sun-safety-quiz" class="dropdown-item">Sun Safety Quiz for Kids</router-link></li>
            <li><router-link to="/news" class="dropdown-item">Melanoma News</router-link></li>
            <li><router-link to="/fast-facts" class="dropdown-item">Fast Facts</router-link></li>
            <li><router-link to="/statistics" class="dropdown-item">Interactive Statistics</router-link></li>
          </ul>
        </li>
        <li><router-link to="/risk-assessnent" class="nav-link px-2 link-dark">Risk Assessment</router-link></li>
        
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle px-2 link-dark" href="#" id="melanomaDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Resources
          </a>
          <ul class="dropdown-menu" aria-labelledby="melanomaDropdown">
            <li><router-link to="/forum" class="dropdown-item">Community Forums</router-link></li>
            <li><router-link to="/prevention" class="dropdown-item">Prevention</router-link></li>
            <li><router-link to="/treatment" class="dropdown-item">Treatment</router-link></li>
            <li><router-link to="/faq" class="dropdown-item">Frequently Asked Questions</router-link></li>
          </ul>
        </li>

    
        
        <li><a href="#" class="nav-link px-2 link-dark">FAQ</a></li>
        <li><router-link to="/about" class="nav-link px-2 link-dark">About</router-link></li>
      </ul>

      <div class="col-md-5 d-flex text-end">
  <router-link to="/login" class="btn btn-outline-primary me-2">Login(Registernow)</router-link>
  <button @click="handleSignout" class="btn btn-primary" v-if="isLoggedIn">Sign Out ({{ userName }})</button>
</div>
    </header>
  </div>   
</template>

<script setup>
import Form from '../components/Form.vue'; // May have to import to use createUserDB thing from form, move later I THINK YOU CAN IMPORT JUST METHODS AND I THINK SINCE ITS ALREADT CREATED IT DOESNT MATTER
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import db from '../firebase/init.js'; // Import your Firestore instance

import { useRouter } from 'vue-router';

import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';


const userName = ref('');
// const auth = getAuth(); auth already delared below

const isLoggedIn = ref(false);

const router = useRouter(); // reference to our vue router

// below if auth is from out firebase setup ad should be private to dylan, is this a good area to use .env to obscure?
const auth = getAuth(); // Get the Firebase Auth instance


//   if (user) { // Check if user is logged in

//     // Now we fetch some data from the backend to get the tester guys name WE NEED TO ORGANIZE THIS BETTER LATER
//   // Below gets the current users entire document from the users collection in firestore
//   // This is the document that was created when the user signed up or logged in with google
//   // Consider having this as a profile data module later?





onMounted(() => {  
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      isLoggedIn.value = true; // User is signed in

      // Now fetch user data (add inside try statement?)
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      userName.value = userSnap.data()?.name || 'Unnamed'; // fall back just in case
    } else {
      isLoggedIn.value = false; // No user is signed in
    }
  });
});

const handleSignout = () => {
  signOut(auth).then(() => {
    router.push('/login'); // Redirect to login page after sign out as an example, generally want the home page only if in restricted pages
  });
};

</script>



<style scoped>
  /* !important overides bootstrap styling */
.btn {
  color: white !important;
  background-color: orange !important;
}
</style>
