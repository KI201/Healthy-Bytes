<script setup>
import Donations from '@/components/Donations.vue';
</script>

<template>
  <div class="about">
    <header>
      <h1>About Us</h1>
    </header>

    <!-- Mission Block -->
    <section class="content mission-block">
      <h2>Our Mission</h2>
      <div class="missionStatement">
        <p>
          Melanoma is one of the most common and dangerous forms of skin cancer. Early detection and treatment are key to 
          saving lives, and that's where we come in. With skin cancer rates rising globally, it is essential to educate the 
          public about the risks and warning signs of melanoma, as well as the importance of regular skin checks..
        </p>
        <br />
        <p>
          Beyond awareness, we provide vital resources, counseling, and emotional support to patients and their 
          families, helping them through the challenges of diagnosis, treatment, and recovery.
        </p>
        <br />
        <p>
          With your support, we can continue to provide these essential services and resources. 
          Every donation helps us ensure that individuals and families impacted by melanoma receive the care, guidance, and hope they need during their journey. 
          Together, we can make a real difference in the lives of those affected by this deadly disease.
        </p>
      </div>
    </section>

    <!-- Stats Block -->
    <section class="content stats-block">
      <h3>Why Your Donation Matters</h3>
      <div class="stats">
        <ul>
          <li>Funding research for early detection techniques</li>
          <li>Supporting melanoma patients and their families</li>
          <li>Educating the public about prevention and self-checking</li>
        </ul>
      </div>
    </section>

    <!-- Donation Block -->
    <section class="content donation-block">
      <h3>Your Contribution Makes a Difference</h3>
      <Donations />
    </section>
    
  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #fff;
}

.about {
  padding: 3rem 2rem;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center; /* Center-align everything */
}

header {
  margin-bottom: 3rem;
}

h1 {
  color: orangered;
  font-size: 3rem;
  text-align: center; /* Center the title */
}

h2 {
  color: orangered;
  font-size: 2rem;
  margin-top: 0;
  text-align: center; /* Center h2 */
}

h3 {
  color: white;
  font-size: 1.5rem;
  margin-top: 1rem;
  text-align: center; /* Center h3 */
}

p {
  line-height: 1.6;
  font-size: 1rem;
  margin-top: 1rem;
  color: #333; /* Dark text for better readability */
}

.mission-block {
  background-color: #ffd6b3; /* Lighter orange background */
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.missionStatement {
  margin-top: 1rem;
  text-align: center;
}

.stats-block {
  background-color: #ff4c29;
  color: white;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 0rem;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stats ul {
  list-style-type: none;
  padding: 0;
}

.stats li {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.donation-block {
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.donation-block h3 {
  margin-bottom: 1rem;
  text-align: center;
}

@media (min-width: 1024px) {
  .about {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .content {
    margin-top: 3rem;
  }

  .footer {
    padding: 1.5rem;
  }
}
</style>
