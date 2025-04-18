<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Donations from './components/Donations.vue';
import router from './router';
import BHeader from './components/BHeader.vue';
import FooterComponent from './components/FooterComponent.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

//DB related things
// Import Vue's lifecycle hook to run code when the component is mounted
import { onMounted } from 'vue';

// Import the Firebase Firestore instance from your config file
import db from './firebase/init.js';

// Import Firestore functions to work with collections and documents
import { collection, addDoc } from 'firebase/firestore';


// THIS CODE BELOW IS GOOD BUT CREATES A USER COLLECTION WITHOUT TYING TO A USER AUTHENTICATION
// // Define an async function to create a new user document
// const createUser = async () => {
//   // Reference the 'users' collection in Firestore
//   const colRef = collection(db, 'users');

//   // Define the data object to store in the new document
//   const dataObj = {
//     firstName: 'John',
//     lastName: 'Doe',
//     dob: '1990'
//   };

//   // Add the document to Firestore and get the document reference
//   const docRef = await addDoc(colRef, dataObj);

//   // Log the auto-generated document ID to the console
//   console.log('Document written with ID: ', docRef.id);
// }

// // Call createUser when the component is mounted to the DOM
// onMounted(() => {
//   createUser();
// });
</script>

<template>
  <div class="main-container">
    <header>
      <BHeader />
    </header>
    <main class="main-box">
      <router-view></router-view>
    </main>
    <footer>
      <FooterComponent />
    </footer>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }

}

</style>
