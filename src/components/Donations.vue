<script setup>

function donatePlease(){
    alert('thank you for donating')
}

</script>


<template>
    <div class="donate">
        <h1>Donations</h1>
        <p>Thank you for considering to donate money to me for no reason</p>
        <p>Click below to donate</p>
        <button class ="btn" @click="donatePlease">Donate</button>
    </div>
</template>


<style scoped> 
.btn {
    background-color: var(---color-primary);
    color: green;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    margin-top: 1rem;
}

.donate {
    background-color: var(---color-primary);
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    margin-top: 1rem;
}
</style>
