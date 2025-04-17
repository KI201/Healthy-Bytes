<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="form-header-box text-white text-center py-3 mb-4">
            <h2 class="mb-0">Sign In</h2>
          </div>
  
          <div v-if="error" class="alert alert-danger">{{ error }}</div>
  
          <form @submit.prevent="signIn">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input v-model="email" type="email" class="form-control" id="email" required />
            </div>
  
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input v-model="password" type="password" class="form-control" id="password" required />
            </div>
  
            <div class="text-center">
              <button type="submit" class="btn btn-orange-red me-2">Sign In</button>
              <button type="button" class="btn btn-outline-orange-red" @click="signInWithGoogle">
                Sign in with Google
              </button>
            </div>
          </form>
  
          <p class="text-center mt-3">
            Don't have an account? <router-link to="/register">Sign Up</router-link>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
  import { getDoc, doc } from 'firebase/firestore';
  import db from '../firebase/init';
  
  const email = ref('');
  const password = ref('');
  const error = ref('');
  const router = useRouter();
  
  const signIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(async (result) => {
        await fetchUserRole();
      })
      .catch((err) => {
        error.value = err.message;
      });
  };
  
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
      .then(async (result) => {
        await fetchUserRole();
      })
      .catch((err) => {
        error.value = err.message;
      });
  };
  
  const fetchUserRole = async () => {
    const user = getAuth().currentUser;
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const role = userSnap.data().role;
        router.push(role === 'admin' ? '/admin' : '/garden');
      } else {
        router.push('/garden'); // fallback
      }
    }
  };
  </script>
  
  <style scoped>
  .form-header-box {
    background-color: #ff4c29; /* orange-red */
    border-radius: 8px;
  }
  
  .form-header-box h2 {
    color: white;
    text-shadow: none; /* No blur or glow */
    font-weight: bold;
  }
  
  .btn-orange-red {
    background-color: #ff4c29;
    border-color: #ff4c29;
    color: white;
  }
  
  .btn-orange-red:hover {
    background-color: #e04323;
    border-color: #e04323;
  }
  
  .btn-outline-orange-red {
    border-color: #ff4c29;
    color: #ff4c29;
  }
  
  .btn-outline-orange-red:hover {
    background-color: #ff4c29;
    color: white;
    border-color: #ff4c29;
  }
  
  .form-control {
    border: 1px solid #ff4c29;
  }
  
  .form-control:focus {
    border-color: #e04323;
    box-shadow: 0 0 0 0.2rem rgba(255, 76, 41, 0.25);
  }
  </style>
  