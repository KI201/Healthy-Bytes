<template>
    <div class="fast-facts-container py-5">
      <div class="container">
        <h1 class="text-center mb-5 fw-bold text-orange-red">Melanoma Fast Facts</h1>
  
        <div v-for="(fact, index) in facts" :key="index" :class="['fact-card', index % 2 === 0 ? 'bg-orange-red text-white' : 'bg-white text-orange-red']">
          <p class="mb-0 fw-semibold">{{ fact }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const facts = [
    'Melanoma is the most serious type of skin cancer.',
    'In Australia, melanoma is the third most common cancer diagnosed.',
    'Using sunscreen daily can significantly reduce your risk of melanoma.',
    'Early detection of melanoma can increase survival rates to over 90%.',
    'One person dies from melanoma every 6 hours in Australia.',
  ];
  </script>
  
  <style scoped>
  .fast-facts-container {
    background-color: #fff5f0;
  }
  
  .fact-card {
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    transition: transform 0.2s ease;
  }
  
  .fact-card:hover {
    transform: scale(1.02);
  }
  
  .bg-orange-red {
    background-color: #ff4c29;
  }
  
  .text-orange-red {
    color: #ff4c29;
  }
  </style>
  