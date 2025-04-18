<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Registered Users</h1>
  
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :search-options="{ enabled: true }"
        :pagination-options="{ enabled: true, perPage: 5 }"
      >
      </vue-good-table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { collection, getDocs } from 'firebase/firestore';
  import db from '../firebase/init.js';
  import { VueGoodTable } from 'vue-good-table-next';
  import 'vue-good-table-next/dist/vue-good-table-next.css';
  
  // Define table columns
  const columns = [
    { label: 'Gender', field: 'gender', sortable: true },
    { label: 'Reason', field: 'reason', sortable: true },
    { label: 'State', field: 'state', sortable: true },
    { label: 'Age Range', field: 'ageRange', sortable: true },
    { label: 'Email', field: 'email', sortable: true },
    { label: 'Is Australian?', field: 'isAustralian', sortable: true },
  ];
  
  // Reactive rows
  const rows = ref([]);
  
  // Fetch data from Firestore
  const fetchUserData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      rows.value = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          gender: data.gender || 'N/A',
          reason: data.reason || 'N/A',
          state: data.state || 'N/A',
          ageRange: data.ageRange || 'N/A',
          email: data.email || 'N/A',
          isAustralian: data.isAustralian ? 'Yes' : 'No',
        };
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  onMounted(fetchUserData);
  </script>
  
  <style scoped>
  </style>
  