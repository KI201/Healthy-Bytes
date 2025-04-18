<template>
    <div class="donation-page">
      <!-- Banner Section -->
      <div class="banner">
        <div class="banner-text">
          <h1>Support Melanoma Research</h1>
          <p>Your donation helps save lives and support those affected by melanoma.</p>
        </div>
      </div>
  
      <!-- Donation Information Section -->
      <div class="donation-info">
        <h2 class="CallHeader">Why Donate?</h2>
        <p class="donation-info-text">
          Melanoma is one of the fastest-growing types of cancer worldwide. By donating, you help fund vital research and provide support to individuals and families affected by melanoma. Your contribution goes directly towards:
        </p>
        <ul class="donation-info-list">
          <li>Advancing melanoma research</li>
          <li>Providing education and awareness programs</li>
          <li>Supporting melanoma patients and their families</li>
        </ul>
      </div>
  
      <!-- Donation Form Section -->
      <div class="donation-form">
        <div class="form-container">
          <h2>Make a Donation</h2>
          <form @submit.prevent="handleDonate">
            <div class="form-group">
              <label for="name">Full Name</label>
              <input type="text" id="name" v-model="donor.name" required placeholder="Enter your full name" />
            </div>
  
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" v-model="donor.email" required placeholder="Enter your email address" />
            </div>
  
            <div class="form-group">
              <label for="amount">Donation Amount (AUD)</label>
              <input type="number" id="amount" v-model="donor.amount" required min="1" placeholder="Enter donation amount" />
            </div>
  
            <div class="form-group">
              <label for="payment">Payment Method</label>
              <select v-model="donor.paymentMethod" id="payment" required>
                <option value="credit-card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank-transfer">Bank Transfer</option>
              </select>
            </div>
  
            <button type="submit" class="btn btn-orange-red">Donate Now</button>
          </form>
        </div>
      </div>
  
      <!-- Orange Text Section Below Form -->
      <div class="additional-info">
        <p>By contributing today, you're helping make a real difference in the fight against melanoma. Every dollar counts!</p>
      </div>
  
      <!-- Donation Success Message (Temporary) -->
      <div v-if="donationSuccess" class="donation-success">
        <h3>Thank you for your generous donation!</h3>
        <p>Your contribution helps fund important melanoma research and support for those affected.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Track the donation success message
  const donationSuccess = ref(false);
  
  // Donation form model
  const donor = ref({
    name: '',
    email: '',
    amount: '',
    paymentMethod: 'credit-card',
  });
  
  const handleDonate = () => {
    if (donor.value.name && donor.value.email && donor.value.amount && donor.value.paymentMethod) {
      // Simulate donation success
      donationSuccess.value = true;
      
      // Reset the form after donation
      donor.value = {
        name: '',
        email: '',
        amount: '',
        paymentMethod: 'credit-card',
      };
  
      // Hide the success message after 5 seconds
      setTimeout(() => {
        donationSuccess.value = false;
      }, 5000);  // Message disappears after 5 seconds
    }
  };
  </script>
  
  <style scoped>
  .donation-page {
    font-family: Arial, sans-serif;
  }
  
  .banner {
    background-color: #ff4c29;
    color: white;
    text-align: center;
    padding: 2rem;
  }
  
  .banner-text h1 {
    margin: 0;
    font-size: 2.5rem;
  }
  
  .banner-text p {
    margin-top: 1rem;
    font-size: 1.2rem;
  }
  
  .donation-info {
    padding: 2rem;
    text-align: center;
    max-width: 800px;
    margin: 0 auto; /* Center the text */
  }
  
  .donation-info h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .donation-info ul {
    list-style-type: none;
    padding: 0;
    font-size: 1.1rem;
    margin-top: 1rem;
  }
  
  .donation-info ul li {
    margin: 0.5rem 0;
  }
  
  .donation-form {
    background-color: #ff4c29;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    margin: 2rem auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .form-container {
    background-color: #ffd6b3; /* lighter orange background */
    padding: 2rem;
    border-radius: 8px;
  }
  
  .donation-form h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .donation-form .form-group {
    margin-bottom: 1.5rem;
  }
  
  .donation-form label {
    display: block;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  
  .donation-form input,
  .donation-form select {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .donation-form button {
    background-color: #ff4c29;
    color: white;
    border: none;
    padding: 1rem;
    font-size: 1.2rem;
    width: 100%;
    border-radius: 6px;
    cursor: pointer;
  }
  
  .donation-form button:hover {
    background-color: #e5533d;
  }
  
  .additional-info {
    background-color: white;
    padding: 1rem;
    color: #ff4c29;
    text-align: center;
    font-size: 1.2rem;
    margin-top: 2rem;
    border-top: 2px solid #ff4c29;
  }
  
  .donation-success {
    text-align: center;
    padding: 2rem;
    background-color: #28a745;
    color: white;
    border-radius: 8px;
    margin-top: 2rem;
  }
  
  .donation-success h3 {
    font-size: 1.8rem;
  }
  
  .donation-success p {
    font-size: 1.2rem;
  }

  .donation-info-text {
    color: ;
  }

  .donation-info-list {
    color: orangered;
  }
  .CallHeader {
    color: orangered;
  }
  </style>
  