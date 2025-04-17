<template>
    <footer class="footer">
      <div class="donate-section">
        <p class="donate-message">Your donations go directly to research initiatives
             focused on early detection, innovative treatments, and ultimately finding
              a cure for melanoma. Every contribution supports clinical trials, funds
               promising scientific breakthroughs, and helps provide vital resources
                to patients and families affected by skin cancer.
                 Together, we’re advancing hope and healing—one donation at a time.</p>

      </div>
  
      <hr class="divider" />
  
      <div class="footer-links">
        <div class="footer-column">
          <h3 class="footer-heading">Learn More</h3>
          <a href="/">About us</a>
          <a href="/">About Melanoma</a>
          <a href="/">FAQ</a>
          <a href="/">Contact us</a>
        </div>
  
        <div class="footer-column">
          <h3 class="footer-heading">Help Out</h3>
          <a href="/">Fundraising</a>
          <a href="/">Donate</a>
          <a v-if="!isLoggedIn" href="/">Join</a>
        </div>
  
        <div class="footer-column">
          <h3 class="footer-heading">Resources</h3>
          <a href="/">Risk assessment</a>
          <a href="/">Clinic finder</a>
          <a href="/">Patient resources</a>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import Donations from '@/components/Donations.vue'
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
  import { ref, onMounted } from 'vue'
  
  const isLoggedIn = ref(false)
  const auth = getAuth()
  onMounted(() => {
    onAuthStateChanged(auth, user => {
      isLoggedIn.value = !!user
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
  
  .donate-message {
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