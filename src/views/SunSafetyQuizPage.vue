<template>
    <div class="background">
        <h1>Test your knowledge on Sun Safety!</h1>
        <br/>
        <br/>
        <br/>
        <br/>
        <!-- We will use some proper padding LATER -->
        <SunSafetyQuiz />
        <br/>
    </div>
</template>

<script setup>
import SunSafetyQuiz from '@/components/SunSafetyQuiz.vue';
</script>

<style scoped>
.background {
    background-image: url('https://i.fbcd.co/products/original/2112-m01-i030-n004-s-c15-188723339-sunse-mainpreview-9df716af4727aaa5a5bdca14e3ddf9538b272bc91342062f77ba77a4a0f81cb0.jpg');
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    margin: 0;
    padding: 0;
}
</style>