<script setup>
</script>


<template>
    <div  class="donate">
        <h1>Donate Today</h1>
        <p>Click below to donate</p>
        <router-link to="/donate" class="btn">Donate</router-link>
    </div>
</template>


<style scoped>
body, html {
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.donate {
    max-width: 600px;
    margin: 0 auto;
    background-color: white;
    color: orangered;
    padding: 1rem;
    border: none;
    border-radius: 0.5rem;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.btn {
    background-color: orangered;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 1.25rem;
    margin-top: 1rem;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: darkorange;
}
</style>
