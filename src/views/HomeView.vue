<script setup>

import NewsPreview from '@/components/NewsPreview.vue';
import Donations from '@/components/Donations.vue';
import RiskAssessmentQuiz from '@/components/RiskAssessmentQuiz.vue';
</script>

<template>
  <main>
    <h1>This is the home page</h1>
    <NewsPreview />

    <p>Your donations go directly to research initiatives focused on early detection, innovative treatments, 
      and ultimately finding a cure for melanoma. Every contribution supports clinical trials, funds promising 
      scientific breakthroughs, and helps provide vital resources to patients and families affected 
      by skin cancer. Together, we’re advancing hope and healing—one donation at a time.</p>
    <br/>
    <Donations/>
    <br/>
    <br/>
    <h1 class="Riskhook">Whats your risk?</h1>
    <p>You can use our risk assessment calulater to </p>
    <RiskAssessmentQuiz />
  </main>
</template>
