<template>
  <div class="header-container py-3 mb-4 w-100">
    <header class="container d-flex flex-wrap align-items-center justify-content-between">
      <!-- Logo and Site Title -->
      <router-link to="/" class="d-flex align-items-center text-white text-decoration-none me-4">
        <img src="@/assets/logo.png" alt="Logo" class="me-2 logo-img" />
        <span class="fs-4 fw-bold">Melanoma Society Australia</span>
      </router-link>

      <!-- Nav Menu -->
      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><router-link to="/" class="nav-link px-2 link-light">Home</router-link></li>
        <li><router-link to="/donate" class="nav-link px-2 link-light">Donate</router-link></li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle px-2 link-light" href="#" id="infoDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Melanoma Information
          </a>
          <ul class="dropdown-menu">
            <li><router-link to="/sun-safety-quiz" class="dropdown-item">Sun Safety Quiz for Kids</router-link></li>
            <li><router-link to="/fast-facts" class="dropdown-item">Fast Facts</router-link></li>
            <li><router-link to="/faq" class="dropdown-item">Frequently Asked Questions</router-link></li>
            <li><router-link to="/treatment" class="dropdown-item">Treatment</router-link></li>
          </ul>
        </li>
        <li><router-link to="/risk-assessnent" class="nav-link px-2 link-light">Risk Assessment</router-link></li>
        <li><router-link to="/forum" class="nav-link px-2 link-light">Forums</router-link></li>
        
        <li><router-link to="/about" class="nav-link px-2 link-light">About</router-link></li>
      </ul>

      <!-- Auth Buttons: Mobile (centered, below 1200px) -->
      <div class="w-100 d-lg-none text-center mt-3">
        <span v-if="isLoggedIn" class="fw-bold text-orange d-block">{{ userName }}</span>
        <button v-if="isLoggedIn" @click="handleSignout" class="btn btn-light text-orange-red fw-bold mt-2">
          Sign Out
        </button>
        <router-link
          v-if="!isLoggedIn"
          to="/signin"
          class="btn btn-outline-light fw-bold mt-2"
        >
          Sign In
        </router-link>
      </div>

      <!-- Auth Buttons: Desktop (right-aligned, above 1200px) -->
      <div class="d-none d-lg-flex align-items-center gap-3">
        <span v-if="isLoggedIn" class="fw-bold text-orange">{{ userName }}</span>
        <button v-if="isLoggedIn" @click="handleSignout" class="btn btn-light text-orange-red fw-bold">
          Sign Out
        </button>
        <router-link
          v-if="!isLoggedIn"
          to="/signin"
          class="btn btn-outline-light fw-bold"
        >
          Sign In
        </router-link>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import db from '../firebase/init';

const auth = getAuth();
const router = useRouter();
const isLoggedIn = ref(false);
const userName = ref('');

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      isLoggedIn.value = true;
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      userName.value = userSnap.data()?.userName || 'Unnamed';
    } else {
      isLoggedIn.value = false;
      userName.value = '';
    }
  });
});

const handleSignout = () => {
  signOut(auth).then(() => {
    isLoggedIn.value = false;
    userName.value = '';
    location.reload(); // Reload the page to reflect the sign-out
  });
};
</script>

<style scoped>
.header-container {
  background-color: #ff4c29;
  color: white;
}

.logo-img {
  width: 40px;
  height: auto;
}

.nav-link,
.navbar-brand {
  color: white !important;
}

.nav-link:hover {
  text-decoration: underline;
}

.text-orange {
  color: #ffd6b3 !important;
}

.text-orange-red {
  color: #ff4c29 !important;
}

.btn-outline-light {
  border-color: white !important;
  color: white !important;
}

.btn-outline-light:hover {
  background-color: white !important;
  color: #ff4c29 !important;
}

.btn-light {
  background-color: white !important;
  color: #ff4c29 !important;
  border: none;
}
</style>
