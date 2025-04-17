<template>
    <div class="forum-board">
      <div class="forum-header">
        <router-link to="/" class="back-button">
            <i class="fas fa-arrow-left"></i> Back
        </router-link>
        <h2>Latest Discussions</h2>
        <router-link to="/create-discussion" class="create-btn">+ New Discussion</router-link>
      </div>
  
      <!-- Topic Tags Above Discussions -->
      <div class="topic-tags">
        <button
          v-for="(color, topic) in topicColors"
          :key="topic"
          :style="{ backgroundColor: color }"
          @click="filterByTopic(topic)"
          :class="{ selected: selectedTopics.includes(topic) }"
        >
          {{ topic }}
        </button>
      </div>
  
      <div v-for="discussion in filteredDiscussions" :key="discussion.id" class="discussion-card" @click="goToThread(discussion.id)">
        <div class="discussion-content">
          <h3 class="discussion-title">{{ discussion.title }}</h3>
          <p class="discussion-preview">
            {{ discussion.preview }}
            <span v-if="discussion.content.length > 100" class="read-more">... Read More</span>
          </p>
        </div>
        <div class="discussion-meta">
          <span class="user">{{ discussion.userName }}</span>
            <!-- Change the text color based on the topic -->
          <span class="topic" :style="{ color: topicColors[discussion.topic] }">{{ discussion.topic }}</span>
          <span class="replies">{{ discussion.replyCount }} comments</span>
          <span class="timestamp timestamp-right">Created: {{ discussion.createdAt }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { collection, getDocs } from 'firebase/firestore';
  import db from '../firebase/init.js';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const discussions = ref([]);
  const selectedTopics = ref([]); // Now an array to allow multiple selections
  const filteredDiscussions = computed(() => {
    if (selectedTopics.value.length === 0) {
      return discussions.value; // If no topics selected, show all discussions
    }
    return discussions.value.filter(discussion =>
      selectedTopics.value.includes(discussion.topic)
    );
  });
  
  // Define the colors for each topic
  const topicColors = {
    Support: '#4caf50',   // Green for support
    General: '#ff5722',   // Orange for general
    Medication: '#ffeb3b', // Yellow for medication
    'Off-topic': '#03a9f4' // Light blue for off-topic
  };
  
  const goToThread = (id) => {
    router.push(`/discussion/${id}`);
  };
  
  // Toggle topic selection for filtering
  const filterByTopic = (topic) => {
    if (selectedTopics.value.includes(topic)) {
      selectedTopics.value = selectedTopics.value.filter(t => t !== topic); // Remove topic
    } else {
      selectedTopics.value.push(topic); // Add topic
    }
  };
  
  onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, 'discussions'));
    discussions.value = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        preview: data.content.slice(0, 100),
        content: data.content,
        userName: data.userName,
        topic: data.topic || 'General',
        replyCount: data.replyCount || 0,
        createdAt: new Date(data.createdAt?.seconds * 1000).toLocaleString()
      };
    });
  });
  </script>
  
  <style scoped>
  .forum-board {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
  }
  
  .forum-header {
    display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  background: linear-gradient(40deg, #fffaf0, #ffe4e1); /* Add a subtle gradient background, im on OLED so not sure if it will come through on other screens */
  padding: 1rem; /* Add padding to make the header look good with the gradient */
  border-radius: 8px; /* adds rounded corners to the header */
  }

  .back-button {
  display: flex;
  align-items: center;
  background-color: #ff5722; /* Set the background to orange */
  border: 1px solid #ff5722;
  color: white; /* Set the text to white */
  font-size: 1rem;
  font-weight: bold;
  padding: 0.4rem 0.6rem; /* Smaller padding */
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-decoration: none; /* Remove underline */
}

.back-button:hover {
  background-color: white; /* On hover, background becomes white */
  color: #ff5722; /* On hover, text color becomes orange */
}

.back-button i {
  font-size: 1.2rem; /* Adjusted size of the arrow */
  margin-right: 0.5rem; /* Space between the arrow and the text */
}
  
  .forum-header h2 {
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .create-btn {
    padding: 0.5rem 1rem;
    background-color: #ff6347;
    color: white;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  
  .create-btn:hover {
    background-color: #e5533d;
  }
  
  /* Topic Tag Buttons */
  .topic-tags {
    margin-bottom: 1rem;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .topic-tags button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: opacity 0.3s ease;
  }
  
  .topic-tags button.selected {
    opacity: 0.8;
  }
  
  .topic-tags button:hover {
    opacity: 0.8;
  }
  
  .discussion-card {
    padding: 1rem;
    border-radius: 8px;
    background: linear-gradient(135deg, #fffaf0, #ffe4e1);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    margin-bottom: 1rem;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .discussion-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .discussion-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #d84315;
  }
  
  .discussion-preview {
    margin: 0.5rem 0;
    color: #444;
  }
  
  .read-more {
    color: #007bff;
    font-weight: 500;
    margin-left: 4px;
  }
  
  .discussion-meta {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: 0.9rem;
    color: #555;
    margin-top: 0.5rem;
  }
  
  .user,
  .topic,
  .replies {
    margin-right: 1rem;
  }
  
  .timestamp-right {
    margin-left: auto;
  }
  
  .user {
    font-weight: bold;
    color: #333;
  }
  
  .topic {
    .topic {
  font-weight: 600;
  margin-right: 1.5rem;
  color: inherit; /* Ensures the text color is applied properly */
  padding: 0; /* Removes any unnecessary padding */
  display: inline; /* Ensures the text aligns correctly with the other elements */
}
  }
  
  .replies {
    color: #2196f3;
  }
  
  .timestamp {
    color: #757575;
  }
  </style>
  