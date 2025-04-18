<template>
    <div class="faq-page">
      <!-- Banner Section -->
      <div class="banner">
        <div class="banner-text">
          <h1>Frequently Asked Questions</h1>
          <p>Learn more about melanoma and how to protect yourself</p>
        </div>
      </div>
  
      <!-- Back Button -->
      <router-link to="/" class="back-button">
        <i class="fas fa-arrow-left"></i> Back
      </router-link>
  
      <!-- FAQ Section -->
      <div class="faq-container">
        <div class="faq-item">
          <h3>What is melanoma?</h3>
          <p>
            Melanoma is a type of skin cancer that begins in melanocytes, the cells responsible for producing pigment in the skin. It is one of the most dangerous forms of skin cancer due to its ability to spread to other parts of the body.
          </p>
        </div>
  
        <div class="faq-item">
          <h3>How can I reduce my risk of melanoma?</h3>
          <p>
            You can reduce your risk by wearing sunscreen with a high SPF, avoiding tanning beds, and seeking shade when the sun is at its peak. Regularly checking your skin for new or changing moles is also important for early detection.
          </p>
        </div>
  
        <div class="faq-item">
          <h3>What are the signs of melanoma?</h3>
          <p>
            Look for changes in the size, shape, or color of existing moles, or the appearance of new, unusual growths. The ABCDE rule can help you identify potential warning signs: Asymmetry, Border irregularity, Color variation, Diameter larger than 6mm, and Evolving over time.
          </p>
        </div>
  
        <div class="faq-item">
          <h3>What treatments are available for melanoma?</h3>
          <p>
            Treatment options for melanoma depend on the stage of the cancer and include surgery, immunotherapy, targeted therapy, chemotherapy, and radiation therapy. Early-stage melanoma is usually treated with surgery to remove the tumor, while advanced melanoma may require systemic therapies.
          </p>
        </div>
  
        <div class="faq-item">
          <h3>Is melanoma hereditary?</h3>
          <p>
            While most cases of melanoma are caused by UV exposure, family history plays a role in increasing the risk. If you have close relatives who have had melanoma, it is important to have regular skin checks.
          </p>
        </div>
  
        <div class="faq-item">
          <h3>How often should I get checked for melanoma?</h3>
          <p>
            It is recommended to have a professional skin check at least once a year, especially if you have risk factors such as fair skin, a history of sunburns, or a family history of melanoma. It's also important to perform self-exams regularly and report any suspicious changes to your doctor.
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .faq-page {
    font-family: Arial, sans-serif;
  }
  
  /* Banner */
  .banner {
    background-image: url('/img/faq-banner.jpg');
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
  
  /* FAQ Section */
  .faq-container {
    padding: 2rem;
  }
  
  .faq-item {
    background-color: white;
    margin-bottom: 1.5rem;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .faq-item h3 {
    color: #ff5722;
    margin-bottom: 1rem;
  }
  
  .faq-item p {
    color: #333;
    font-size: 1rem;
  }
  </style>
  