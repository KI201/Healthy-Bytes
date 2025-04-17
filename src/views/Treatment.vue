<template>
    <div class="treatment-page">
      <!-- Banner Section -->
      <div class="banner">
        <div class="banner-text">
          <h1>Understanding Skin Cancer Treatments</h1>
          <p>Explore your options and learn what to expect</p>
        </div>
      </div>
  
      <!-- Back Button -->
      <router-link to="/" class="back-button">
        <i class="fas fa-arrow-left"></i> Back
      </router-link>
  
      <!-- Treatment Cards -->
      <div class="cards-container">
        <div v-for="option in treatments" :key="option.title" class="card">
          <img :src="option.image" :alt="option.title" class="card-image" />
          <h3 class="card-title">{{ option.title }}</h3>
          <p class="card-content">{{ option.description }}</p>
        </div>
      </div>
  
      <!-- Video Section -->
      <div class="video-section">
        <h2>Watch: Skin Cancer Treatment Overview</h2>
        <!-- Replace the src below with your actual YouTube video -->
        <div class="video-container">
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/VIDEO_ID"
            title="Skin Cancer Treatment"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const treatments = [
    {
      title: 'Surgery',
      image: '/img/treatment-surgery.jpg',
      description: 'A common treatment where the cancerous area is cut out. Often used for localized skin cancers.'
    },
    {
      title: 'Reconstruction',
      image: '/img/treatment-reconstruction.jpg',
      description: 'Post-surgery reconstruction helps restore appearance, especially in sensitive areas.'
    },
    {
      title: 'Radiation Therapy',
      image: '/img/treatment-radiation.jpg',
      description: 'Uses high-energy rays to target and destroy cancer cells. Often used when surgery isn’t an option.'
    },
    {
      title: 'Chemotherapy',
      image: '/img/treatment-chemo.jpg',
      description: 'Topical or systemic treatments that kill cancer cells or stop their growth.'
    },
    {
      title: 'Immunotherapy',
      image: '/img/treatment-immunotherapy.jpg',
      description: 'Boosts your immune system to fight cancer. Can be applied as a cream or used systemically.'
    },
    {
      title: 'Photodynamic Therapy',
      image: '/img/treatment-photodynamic.jpg',
      description: 'A light-based therapy that activates a drug to destroy abnormal cells.'
    }
  ]
  </script>
  
  <style scoped>
  .treatment-page {
    font-family: Arial, sans-serif;
  }
  
  /* Banner */
  .banner {
    background-image: url('/img/treatment-banner.jpg');
    background-size: cover;
    background-position: center;
    height: 250px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .banner-text {
    color: white;
    text-align: center;
    background-color: rgba(255, 87, 34, 0.8); /* orange-red tint */
    padding: 1rem 2rem;
    border-radius: 8px;
  }
  
  .banner-text h1 {
    margin: 0;
    font-size: 2rem;
  }
  
  .banner-text p {
    margin: 0.5rem 0 0;
  }
  
  /* Back Button */
  .back-button {
    display: inline-flex;
    align-items: center;
    margin: 1.5rem 2rem 0;
    background-color: #ff5722;
    color: white;
    padding: 0.5rem 1rem;
    font-weight: bold;
    border-radius: 4px;
    text-decoration: none;
  }
  
  .back-button:hover {
    background-color: #e5533d;
  }
  
  .back-button i {
    margin-right: 0.5rem;
  }
  
  /* Cards */
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 2rem;
    gap: 2rem;
  }
  
  .card {
    background-color: white;
    color: #333;
    width: 300px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    overflow: hidden;
    transition: transform 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-5px);
  }
  
  .card-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
  
  .card-title {
    font-size: 1.3rem;
    color: #ff5722;
    margin: 1rem;
  }
  
  .card-content {
    padding: 0 1rem 1rem;
  }
  
  /* Video Section */
  .video-section {
    background-color: #ff5722;
    color: white;
    padding: 2rem;
    text-align: center;
    margin-top: 2rem;
  }
  
  .video-section h2 {
    margin-bottom: 1rem;
  }
  
  .video-container {
    max-width: 800px;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  </style>
  