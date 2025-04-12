
<script setup>
import { ref } from 'vue'
let areTipsVisable = ref(true)
const healthTips = ref (
    [
        {id: 1, tip: "eat alot of food"},
        {id: 2, tip: "eat it quickly"},
        {id: 3, tip: "steal more food"},
        {id: 4, tip: "eat even faster"},
        {id: 5, tip: "run they want your food"},
        {id: 6, tip: "eat it all"},
        {id: 7, tip: "eat it all again"},
        {id: 8, tip: "eat it all again and again"},
        {id: 9, tip: "eat it all again and again and again"},
        {id: 10, tip: "eat it all again and again and again and again"},
    ])



// Lets use v-if to only show header if it is completely new user
//  Use v-for to show tips from JSON
// put it together to only show every tip if its a new user, so header + all tips for newbie, no header and some tips for experienced 
// Firebase is a server-less instance btw
// we are focusing on reactivity



</script>


<template>

    <button class="btn" @click="areTipsVisable = !areTipsVisable">Toggle Tips</button>
    <div class="tips" v-if="areTipsVisable">
        <h1>Health Tips</h1>
        <ul>
            <li v-for="myTip in healthTips" v-bind:key="myTip.id">{{ myTip.tip }}</li>
        </ul>
        
    </div>
</template>


<style scoped> 
.tips {
    margin-top: 30px;
    margin-bottom: 30px;
}

.btn {
    background-color: green;
    color: white;
}

</style>
