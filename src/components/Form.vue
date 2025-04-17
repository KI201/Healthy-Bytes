<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1 class="text-center">User Information Form</h1>
          <form @submit.prevent="submitForm">
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="email" class="form-label">Email</label>
                <input type="text" class="form-control" id="email"
                @blur="() => validateEmail(true)" 
                @input="() => validateEmail(false)"
                v-model="formData.email">
                <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
              </div>
              <div class="col-md-6">
                <label for="userName" class="form-label">User Name</label>
                <input type="text" class="form-control" id="userName" v-model="formData.userName"/>
              </div>
              <div class="col-md-6">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="formData.password"/>
              </div>
              <div>
                <label for ="confirm-password" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="confirm-password" 
                @blur="() => validateConfirmPassword(true)"
                v-model="formData.confirmPassword">
                <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
              </div>
            </div>  
            <div class="row mb-3">
              <div class="col-md-6">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="isAustralian" v-model="formData.isAustralian">
                  <label class="form-check-label" for="isAustralian">Australian Resident?</label>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <label for="gender" class="form-label">Gender</label>
              <select class="form-select" id="gender" v-model="formData.gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="reason" class="form-label">Reason for joining</label>
              <textarea class="form-control" id="reason" 
                @input="() => greatFriend(true)" 
                rows="3" v-model="formData.reason"></textarea>
              <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
            </div>
            <div class="mb-3">
            <label for="reason" class="form-label">Suburb</label>
            <input type="text" class="form-control" id="suburb" v-bind:value="formData.suburb" />
          </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary me-2">Submit(Register)</button>
              <button type="button" class="btn btn-primary me-2" @click="signInWithGoogle">Sign in with Google which makes accout too</button>
              <button type="button" class="btn btn-primary me-2" @click="signIn">TrueSignin/Login</button>
              <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- <div class="row mt-5" v-if="submittedCards.length">
        <div class="d-flex flex-wrap justify-content-start">
            <div v-for="(card, index) in submittedCards" :key="index" class="card m-2" style="width: 18rem;">
                <div class="card-header">
                    User Information
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Username: {{ card.username }}</li>
                    <li class="list-group-item">Password: {{ card.password }}</li>
                    <li class="list-group-item">Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}</li>
                    <li class="list-group-item">Gender: {{ card.gender }}</li>
                    <li class="list-group-item">Reason: {{ card.reason }}</li>
                </ul>
            </div>
        </div>
    </div> -->

  </template>

<script setup>
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';

import { ref } from 'vue';
// import DataTable from 'primevue/datatable';
// import Column from 'primevue/column';

import { getDoc,doc, setDoc } from 'firebase/firestore';
import db from '../firebase/init.js';
// Dylan, the above .. is important, it goes back futher in the tree, otherwise it trys to find the file in the same folder as this one, which is not where it is

// reference to vue router
const router = useRouter(); 
  
// email below used to be username, changed to email for firebase auth
// WE ARE NOW GOING TO TRY AND MOVE SOME OF formData which will be userData now, to a store instead.
const formData = ref({
    email: '',
    password: '',
    confirmPassword: '',
    userName: '',
    isAustralian: false,
    reason: '',
    gender: '',
    suburb: ''
});

const register = () => {

  const auth = getAuth(); // get the firebase auth instance

  // auth is saved in local storage, so we can use it to check if the user is logged in maybe?
  
  createUserWithEmailAndPassword(auth, formData.value.email, formData.value.password)
    .then((data) => {
      console.log('User registered successfully:', data.user);
      createUserProfile(); // CAREFUL, CHECK THAT REGISTRATION, GOOGLE SIGN IN AND EMAIL SIGN DONT KEEP CREATING ADDITIONAL USER PROFILES IN FIRESTORE
      console.log(auth.currentUser); // log the current user to the console

      router.push('/garden'); // redirect to the garden view after successful registration
    })
    .catch((error) => {
      console.log('error.code');
      alert(error.message);
    });
}

const signIn = () => {
  const auth = getAuth(); // get the firebase auth instance, this is firebases official method to get the auth instance
  // auth is saved in local storage, so we can use it to check if the user is logged in maybe?

  // auth is saved in local storage THROUGH SOME OTHER METHOD RN NOT LOCALSTORAGE THING, so we can use it to check if the user is logged in maybe?
  
  signInWithEmailAndPassword(auth, formData.value.email, formData.value.password)
      .then((data) => {
        console.log('User signed in successfully:', data.user);
        createUserProfile(); // CAREFUL, CHECK THAT REGISTRATION, GOOGLE SIGN IN AND EMAIL SIGN DONT KEEP CREATING ADDITIONAL USER PROFILES IN FIRESTORE
        console.log(auth.currentUser); // log the current user to the console
        fetchUserRole(); // If its admin maybe we can redirect to the admin page or something, or just show a different view
        // router.push('/admin'); // redirect to the admin view after successful registration
      })
      .catch((error) => {
        console.log('error.code');
        alert(error.message);
      });
  }


// ABOVE:   // watch topic one authentication for this implementation
  // The `data` variable in `.then((data)` 
  // comes from the **resolved value** of the `Promise` returned by 
  // the `createUserWithEmailAndPassword` function. 

// below is the google sign in function
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      createUserProfile(); // Call the function to create a user profile in Firestore HERE SINCE IT DIDNT GET A USERNAME, IT DID NOT PROCEED, need to change rules on this a few ways
      // gets role, part of that code redirects based on role to correct view
      fetchUserRole(); // Admins wont be able to sign in with google, so we need to check if the user is an admin or not, and redirect them to the admin page if they are
      router.push('/'); // redirect to the home view after successful registration
    })

    // Google sign in fetchrole cant redirect as it needs role, so we force it

    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
    });
  };



// Note: Apparently vuefire could have made this alot easier
// This function creates a user profile in Firestore when the user is registered or logged in.
const createUserProfile = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    // Only create user profile if it doesn't exist
    if (!userSnap.exists()) {
      const username = formData.value.userName?.trim();
      if (!username) {
        console.warn('No username provided, skipping Firestore write');
        return;
      }

      await setDoc(userRef, {
        userName: username,
        email: user.email,
        role: "user", // default role
        gender: formData.value.gender,
        isAustralian: formData.value.isAustralian,
        reason: formData.value.reason,
        suburb: formData.value.suburb
      });

      console.log('User profile created with role: user');
    } else {
      console.log('User profile already exists.');
    }
  }
};

const fetchUserRole = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const role = userSnap.data().role;
      console.log('User role:', role);
      // Saving roles to local storage would be a security risk, so we should avoid that.

      // Conditional redirect based on role
      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/garden');
      }
    } else {
      console.warn('No role found for this user.');
    }
  }
};

// WHEN YOU WAKE UP THE ABOVE WORKED WE JUST NEED TO TIE IT TO THE USERNAME PROVIDED NOW!!! ALSO MOVING THESE FUNCTIONS TO THEIR OWN COMPONENTS LATER










const submittedCards = ref([]);


const submitForm = () => {
    validateEmail(true);
    // validateConfirmPassword(true); add later to confirm password validation
    // use && in if below for that too
    if (!errors.value.email) {
        submittedCards.value.push({ ...formData.value }); // you maybe dont want to bring the cards will, that was for something else
      register().then(() => clearForm()); // Call the register function to create a user NOT THROUGH GOOGLE WAY SO NO DETAILS FOR GOOGLE SIGN IN YET, WE ALSO NEED TO CLEAR FORM AFTER
      // and prevent clearform from wiping data too early WE STILL NEED FOR TO SEND DATA TO DB FOR NOW, SO WE USE AWAIT TO WAIT FOR THE FUNCTION TO COMPLETE
    }
};

const clearForm = () => {
    formData.value = {
        email: '',
        password: '',
        confirmPassword: '', 
        userName: '',
        isAustralian: false,
        reason: '',
        gender: ''
    };
}

const errors = ref({
    email: null,
    
    password: null,
    confirmPassword: null,
    userName: null,
    resident: null,
    gender: null,
    reason: null,
})


// SINCE WE NOW ARE USING EMAILS, WE NEED TO CHANGE THE VALIDATION FUNCTION FOR USERNAME TO EMAIL VALIDATION
const validateEmail = (blur) => {
    if (formData.value.email.length < 3) {
        if(blur) errors.value.email = 'Username must be at least 3 characters long.';
    } else {
        errors.value.email = null;
    }
};

/**
 * Confirm password validation function that checks if the password and confirm password fields match.
 * @param blur: boolean - If true, the function will display an error message if the passwords do not match.
 */
 const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
};

const greatFriend = (blur) => {
  if (formData.value.reason.toLowerCase().includes("friend")) {
    if (blur) errors.value.reason = "It's great to have a friend.";
  } else {
    errors.value.reason = null;
  }
};






</script>

<!-- <style scoped>
/* below was some prime something css, we havent explored it yet, trying to move all styling to app.vue now wish me luck */
/* .form {
    color: green;
    margin-top: 30px;
    margin-bottom: 30px;
}

.card {
   border: 1px solid #ccc;
   border-radius: 10px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   }
.card-header {
   background-color: #275FDA;
   color: blue;
   padding: 10px;
   border-radius: 10px 10px 0 0;
   }
.list-group-item {
   padding: 10px;
   } */
</style> -->

