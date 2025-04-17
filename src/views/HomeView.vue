<script setup>

import NewsPreview from '@/components/NewsPreview.vue';
import Donations from '@/components/Donations.vue';
import RiskAssessmentQuiz from '@/components/RiskAssessmentQuiz.vue';
</script>

<template>
  <main>
    <h1>This is the home page</h1>
    <NewsPreview />
    <h1>Welcome to the home page</h1>
    <p>Here you can find the latest news and updates.</p>
    <p>We are committed to providing you with the best information and resources.</p>
    <br/>
    <Donations/>
    <br/>
    <br/>
    <h1>Are you at risk?</h1>
    <p>You can use our risk assessment calulat</p>
    <RiskAssessmentQuiz />
  </main>
</template>
