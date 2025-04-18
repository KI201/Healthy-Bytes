<template>
    <div class="risk-page">
      <!-- Header Section -->
      <header class="intro-text">
        <h1>Melanoma Risk Assessment</h1>
        <p>
          Use this quick self-assessment to help determine your potential risk level for melanoma.
          This is not a diagnosis but can help you understand if you should speak to a healthcare professional.
            <br><br>
            <strong>Note:</strong> This tool is not a substitute for professional medical advice, diagnosis, or treatment.
        </p>
      </header>
  
      <!-- Quiz with Background Image -->
      <div class="quiz-frame">
        <div class="image-background"></div>
        <div class="quiz-wrapper">
          <RiskAssessmentQuiz />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import RiskAssessmentQuiz from '@/components/RiskAssessmentQuiz.vue';
  </script>
  
  <style scoped>
  .risk-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
    background-color: #fff;
  }
  
  .intro-text {
    max-width: 700px;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .intro-text h1 {
    font-size: 2.5rem;
    color: orangered;
    margin-bottom: 1rem;
  }
  
  .intro-text p {
    font-size: 1rem;
    color: #444;
    line-height: 1.6;
  }
  
  /* Framing section */
  .quiz-frame {
    position: relative;
    width: 100%;
    max-width: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* Background image */
  .image-background {
    position: absolute;
    width: 170%;
    height: 120%;
    background-image: url('https://www.revivalabs.com/wp-content/uploads/2024/07/the-girl-on-the-beach-applies-sunscreen-to-the-ski-2023-11-27-04-55-39-utc-1024x683.jpg'); /* Replace with your path */
    background-size: cover;
    background-position: center;
    border-radius: 12px;
    z-index: 0;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
  
  /* Quiz card */
  .quiz-wrapper {
    position: relative;
    z-index: 1;
    width: 80%;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  </style>
  