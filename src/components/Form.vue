<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">User Information Form</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="email" class="form-label">Email</label>
              <input
                type="text"
                class="form-control"
                id="email"
                @blur="() => validateEmail(true)"
                @input="() => validateEmail(false)"
                v-model="formData.email"
              />
              <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
            </div>
            <div class="col-md-6">
              <label for="userName" class="form-label">User Name</label>
              <input
                type="text"
                class="form-control"
                id="userName"
                v-model="formData.userName"
              />
            </div>
            <div class="col-md-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
              />
            </div>
            <div>
              <label for="confirm-password" class="form-label">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                @blur="() => validateConfirmPassword(true)"
                v-model="formData.confirmPassword"
              />
              <div v-if="errors.confirmPassword" class="text-danger">
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isAustralian"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label" for="isAustralian">
                  Australian Resident?
                </label>
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
            <label for="state" class="form-label">State</label>
            <select class="form-select" id="state" v-model="formData.state">
              <option value="NSW">New South Wales</option>
              <option value="VIC">Victoria</option>
              <option value="QLD">Queensland</option>
              <option value="WA">Western Australia</option>
              <option value="SA">South Australia</option>
              <option value="TAS">Tasmania</option>
              <option value="ACT">Australian Capital Territory</option>
              <option value="NT">Northern Territory</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <select class="form-select" id="reason" v-model="formData.reason">
              <option value="awareness">Raising Awareness</option>
              <option value="support">Supporting the Cause</option>
              <option value="prevention">Prevention and Education</option>
              <option value="research">Funding Research</option>
              <option value="personal">Personal Experience</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="ageRange" class="form-label">Age Range</label>
            <select class="form-select" id="ageRange" v-model="formData.ageRange">
              <option value="under18">Under 18</option>
              <option value="18-25">18-25</option>
              <option value="26-35">26-35</option>
              <option value="36-45">36-45</option>
              <option value="46-60">46-60</option>
              <option value="60plus">60+</option>
            </select>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">
              Submit(Register)
            </button>
            <button
              type="button"
              class="btn btn-primary me-2"
              @click="signInWithGoogle"
            >
              Sign in with Google which makes account too
            </button>
            <button type="button" class="btn btn-primary me-2" @click="signIn">
              TrueSignin/Login
            </button>
            <button type="button" class="btn btn-secondary" @click="clearForm">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import db from '../firebase/init.js';

const router = useRouter(); 

const formData = ref({
  email: '',
  password: '',
  confirmPassword: '',
  userName: '',
  isAustralian: false,
  reason: '',
  gender: '',
  ageRange: '',
  state: ''
});

const errors = ref({
  email: null,
  password: null,
  confirmPassword: null,
  userName: null,
  gender: null,
  reason: null,
  state: null,
  ageRange: null
});

const register = () => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, formData.value.email, formData.value.password)
    .then(async (data) => {
      console.log('User registered successfully:', data.user);
      await createUserProfile();
      router.push('/garden');
    })
    .catch((error) => {
      console.log('error.code');
      alert(error.message);
      throw error; // pass error back to submitForm
    });
};

const signIn = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, formData.value.email, formData.value.password)
    .then((data) => {
      console.log('User signed in successfully:', data.user);
      createUserProfile();
      fetchUserRole();
    })
    .catch((error) => {
      console.log('error.code');
      alert(error.message);
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      createUserProfile();
      fetchUserRole();
      router.push('/');
    })
    .catch((error) => {
      const errorCode = error.code;
    });
};

const createUserProfile = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const username = formData.value.userName?.trim();
      if (!username) {
        console.warn('No username provided, skipping Firestore write');
        return;
      }

      await setDoc(userRef, {
        userName: formData.value.userName.trim(),
        email: formData.value.email,
        role: "user",
        gender: formData.value.gender,
        isAustralian: formData.value.isAustralian,
        reason: formData.value.reason,
        state: formData.value.state,
        ageRange: formData.value.ageRange,
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

const submitForm = async () => {
  validateEmail(true);
  validateUserName(true);
  validatePassword(true);
  validateConfirmPassword(true);
  validateDropdowns(true);

  const hasErrors = Object.values(errors.value).some(error => error);

  if (!hasErrors) {
    register().then(() => {
      clearForm();
    }).catch((error) => {
      console.error('Registration failed.');
    });
  } else {
    console.warn("Form submission blocked due to validation errors.");
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
    gender: '',
    ageRange: '',
    state: ''
  };

  errors.value = {
    email: null,
    password: null,
    confirmPassword: null,
    userName: null,
    gender: null,
    reason: null,
    state: null,
    ageRange: null
  };
};

const validateEmail = (blur) => {
  const email = formData.value.email.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    if (blur) errors.value.email = 'Enter a valid email address.';
  } else {
    errors.value.email = null;
  }
};

const validatePassword = (blur) => {
  if (formData.value.password.length < 6) {
    if (blur) errors.value.password = 'Password must be at least 6 characters.';
  } else {
    errors.value.password = null;
  }
};

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.';
  } else {
    errors.value.confirmPassword = null;
  }
};

const validateUserName = (blur) => {
  if (!formData.value.userName.trim()) {
    if (blur) errors.value.userName = 'Username is required.';
  } else {
    errors.value.userName = null;
  }
};

const validateDropdowns = (blur) => {
  if (!formData.value.gender && blur) errors.value.gender = 'Please select a gender.';
  else errors.value.gender = null;

  if (!formData.value.reason && blur) errors.value.reason = 'Please select a reason.';
  else errors.value.reason = null;

  if (!formData.value.ageRange && blur) errors.value.ageRange = 'Please select an age range.';
  else errors.value.ageRange = null;

  if (!formData.value.state && blur) errors.value.state = 'Please select a state.';
  else errors.value.state = null;
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

