<script setup>
import NewsPreview from '@/components/NewsPreview.vue';
import Donations from '@/components/Donations.vue';
import RiskAssessmentQuiz from '@/components/RiskAssessmentQuiz.vue';
</script>

<template>
  <main class="container py-5">
    <!-- Section: News Preview -->
     <h1 class="webTitle">Melanona Society Australia</h1>
    <section class="mb-4 text-center">
      <div class="border border-warning rounded p-4 bg-light mx-auto">
        <NewsPreview />
      </div>
    </section>

    <!-- Section: Donation Info -->
    <section class="mb-4 text-center">
      <div class="border border-warning rounded p-4 bg-light mx-auto">
        <h2 class="text-warning mb-3">Your Impact Through Donations</h2>
        <p class="text-dark">
          Your donations go directly to research initiatives focused on early detection, innovative treatments,
          and ultimately finding a cure for melanoma. Every contribution supports clinical trials, funds promising
          scientific breakthroughs, and helps provide vital resources to patients and families affected by skin cancer.
          Together, we’re advancing hope and healing—one donation at a time.
        </p>
      </div>
    </section>

    <!-- Section: Donations Component -->
    <section class="mb-4 text-center">
      <div class="border border-warning rounded p-4 bg-light mx-auto">
        <Donations />
      </div>
    </section>

    <!-- Section: Banner Image -->
    <section class="mb-4">
      <div class="banner-container">
        <img src="https://wallpaperswide.com/download/memorable_sunset_beach-wallpaper-5120x1600.jpg" alt="Melanoma Awareness Banner" class="banner-image">
      </div>
    </section>

    <!-- Section: Risk Assessment -->
    <section class="mb-4 text-center">
      <div class="border border-warning rounded p-4 bg-light mx-auto">
        <h2 class="text-warning">What's Your Risk?</h2>
        <p class="text-dark">Use our risk assessment calculator to better understand your melanoma risk.</p>
        <RiskAssessmentQuiz />
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Ensure full width for containers, centering content */
.container {
  max-width: 1200px;
}

.text-warning {
  color: #ff5733 !important;
}

.text-dark {
  color: #000000 !important;
}

.bg-light {
  background-color: #ffffff !important;
}

.border-warning {
  border-color: #ff5733 !important;
}

.rounded {
  border-radius: 8px;
}

.p-4 {
  padding: 20px;
}

.text-center {
  text-align: center;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}


.banner-container {
  width: 100%;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-top: 30px;
  margin-bottom: 30px;
}

.webTitle {
  font-size: 2.5rem;
  color: orangered;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold; 
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); 
}
</style>
