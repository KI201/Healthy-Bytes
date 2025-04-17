<script setup>
import Donations from '@/components/Donations.vue';
</script>

<template>
  <div class="about">
    <header>
      <h1>About Us</h1>
    </header>

    <section class="content">
      <h2>Our Mission</h2>
      <h3>Melanoma Awareness and Support</h3>
      <section class="missionStatement">
        <p>
        Melanoma is one of the most common and dangerous forms of skin cancer. 
        Early detection and treatment are key to saving lives, and that's where we come in.
        </p>
        <p>
        Our organization works tirelessly to raise awareness about melanoma, fund research, and provide support for those affected.
        </p>
      </section>
      

      <section class="stats">
        <h3>Why Your Donation Matters</h3>
        <ul>
          <li>Funding research for early detection techniques</li>
          <li>Supporting melanoma patients and their families</li>
          <li>Educating the public about prevention and self-checking</li>
        </ul>
      </section>

      <Donations/>
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
  padding: 2rem;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

header {
  margin-bottom: 2rem;
}

h1 {
  color: orangered;
  font-size: 2.5rem;
}

.content {
  max-width: 800px;
  width: 100%;
  margin-top: 2rem;
}

h2 {
  color: orangered;
  font-size: 2rem;
}

h3 {
  color: orangered;
  font-size: 1.5rem;
  margin-top: 1rem;
}

p {
  line-height: 1.6;
  font-size: 1rem;
  margin-top: 1rem;
}

.stats ul {
  list-style-type: none;
  padding: 0;
  margin-top: 1rem;
}

.stats li {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
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
