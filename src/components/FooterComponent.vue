<template>
  <footer class="footer">
    <div class="donate-section">
      <p class="legal">
        © 2025 Melanoma Society Australia. All rights reserved.
        Melanoma Society Australia is a not-for-profit organisation committed to raising awareness,
        supporting prevention, and advocating for those affected by melanoma.
        This website is for informational purposes only.
        By using this site, you agree to our Terms of Use and Privacy Policy.
      </p>
    </div>

    <hr class="divider" />

    <div class="footer-links">
      <div class="footer-column">
        <h3 class="footer-heading">Learn More</h3>
        <a href="/about">About us</a>
        <a href="/faq">FAQ</a>
        <a href="/contact">Contact us</a>
      </div>

      <div class="footer-column">
        <h3 class="footer-heading">Help Out</h3>
        <a href="/fundraising">Fundraising</a>
        <a href="/donate">Donate</a>
        <a v-if="!isLoggedIn" href="/signin">Join</a>
      </div>

      <div class="footer-column">
        <h3 class="footer-heading">Resources</h3>
        <a href="/risk-assessment">Risk assessment</a>
        <a href="/treatment">treatment</a>
        <a v-if="isAdmin" href="/admin">Admin</a>
      </div>
    </div>
  </footer>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
  import { doc, getDoc } from 'firebase/firestore'
  import db from '@/firebase/init'
  
  const isLoggedIn = ref(false)
  const isAdmin = ref(false)
  
  const auth = getAuth()
  
  onMounted(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        isLoggedIn.value = true
  
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists() && userDoc.data().role === 'admin') {
            isAdmin.value = true
          }
        } catch (e) {
          console.error('Failed to check admin role:', e)
        }
      } else {
        isLoggedIn.value = false
        isAdmin.value = false
      }
    })
  })
  </script>
  
  <style scoped>
  .footer {
    background-color: orangered;
    color: white;
    padding: 2rem 1rem;
    margin-top: 2rem;
  }
  
  .donate-section {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .legal {
    max-width: 870px;
    margin: 0 auto;
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  
  .divider {
    border: none;
    border-top: 2px solid white;
    margin: 2rem auto;
    width: 80%;
  }
  
  .footer-links {
  display: flex;
  justify-content: space-evenly; /* evenly space out the groups */
  flex-wrap: wrap;
  padding-top: 1.5rem;
  gap: 2rem; /* optional, adds extra breathing room on wrap */
}
  
  .footer-column {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .footer-heading {
    font-weight: bold;
    color: #fff;
    opacity: 1;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  
  a {
  color: #f5f5f5;
  text-decoration: none;
  transition: color 0.2s ease;
  outline: none;          /* Removes the browser's default focus outline */
}
  
  a:hover,
  a:focus {
    color: #ffffff;
  }

  a:active {
    outline: none;
  }
  </style>