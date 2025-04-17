<script setup>
import Form from '@/components/Form.vue';
</script>

<template>
  <div class="login">
    <Form></Form> 
  </div>

</template>

<style>
@media (min-width: 1024px) {
  .login {
    color: red;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
