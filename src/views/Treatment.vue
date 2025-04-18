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
            src="https://www.youtube.com/embed/yQuxYCttl6g"
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
      image: 'https://thumbs.dreamstime.com/b/skin-cancer-melanoma-dermatology-problem-concept-tiny-doctor-oncologist-character-examine-woman-mole-huge-magnifier-surgeon-354791937.jpg',
      description: 'A common treatment where the cancerous area is cut out. Often used for localized skin cancers.'
    },
    {
      title: 'Reconstruction',
      image: 'https://buzzrx.s3.amazonaws.com/8d372495-ab74-4d1e-8299-e550bb6d5294/WhatisAmelanoticMelanoma_.png',
      description: 'Post-surgery reconstruction helps restore appearance, especially in sensitive areas.'
    },
    {
      title: 'Radiation Therapy',
      image: 'https://media.istockphoto.com/id/635911932/vector/radiation-therapy-vector-concept-cancer-treatment-with-radiothe.jpg?s=612x612&w=0&k=20&c=VPw7SbXCWeVewoH6B-v8DHU6XUhSeeredgo-bS4lw9o=',
      description: 'Uses high-energy rays to target and destroy cancer cells. Often used when surgery isn’t an option.'
    },
    {
      title: 'Chemotherapy',
      image: 'https://media.istockphoto.com/id/1467847715/vector/woman-with-cancer-patient-undergoing-chemotherapy-medical-intravenous-infusion-female.jpg?s=612x612&w=0&k=20&c=YV-mJworCBbFF7w7BihwqXu4eNXSd05xWHOyCsyJ-KA=',
      description: 'Topical or systemic treatments that kill cancer cells or stop their growth.'
    },
    {
      title: 'Immunotherapy',
      image: 'https://www.shutterstock.com/image-vector/woman-patient-having-chemotherapy-oncology-600nw-2227111631.jpg',
      description: 'Boosts your immune system to fight cancer. Can be applied as a cream or used systemically.'
    },
    {
      title: 'Photodynamic Therapy',
      image: 'https://www.cancer.gov/sites/g/files/xnrzdm211/files/styles/cgov_article/public/cgov_infographic/2021-08/Photodynamic-Therapy_Process_0.jpg?itok=dEF4w562',
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
  