<template>
  <div v-if="user !== null" class="create-discussion">
    <div class="form-header">
      <router-link to="/forum" class="back-button">
        <i class="fas fa-arrow-left"></i> Back
      </router-link>
      <h2>Create New Discussion   </h2>
    </div>

    
    <form @submit.prevent="submitDiscussion" class="discussion-form">
      <div class="form-group">
        <label for="title">Title</label>
        <input v-model="title" id="title" required maxlength="200" placeholder="Enter a title (max 200 characters)" />
      </div>

      <div class="form-group">
        <label for="topic">Topic</label>
        <select v-model="selectedTopic" id="topic">
          <option disabled value="">Select a topic</option>
          <option v-for="(color, topic) in topicColors" :key="topic" :value="topic">{{ topic }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="content">Content</label>
        <textarea v-model="content" id="content" placeholder="What do you want to share?" rows="6"></textarea>
      </div>

      <button type="submit" class="submit-btn">Post</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import db from '../firebase/init.js'

const auth = getAuth()
const router = useRouter()

const title = ref('')
const content = ref('')
const selectedTopic = ref('')
const error = ref('')
const user = ref(null)
const userName = ref('Anonymous') // Default name if not found

// Reused topicColors
const topicColors = {
  Support: '#4caf50',
  General: '#ff5722',
  Medication: '#ffeb3b',
  'Off-topic': '#03a9f4'
}

// Re-check the authentication state
onAuthStateChanged(auth, async (firebaseUser) => {
  if (firebaseUser) {
    user.value = firebaseUser // Set the logged-in user
    try {
      const userDocRef = doc(db, 'users', firebaseUser.uid)
      const userSnap = await getDoc(userDocRef)

      if (userSnap.exists()) {
        userName.value = userSnap.data().userName || 'Anonymous'
      } else {
        userName.value = 'Anonymous'
      }
    } catch (e) {
      console.error('Error fetching user data:', e)
      userName.value = 'Anonymous'
    }
  } else {
    user.value = null
    userName.value = 'Anonymous'
    router.push('/') // Redirect if not signed in
  }
})

const submitDiscussion = async () => {
  if (!user.value) {
    error.value = 'You must be logged in to post a discussion.'
    return
  }

  try {
    // Use userName from Firestore or default to 'Anonymous'
    const name = userName.value || 'Anonymous'

    await addDoc(collection(db, 'discussions'), {
      title: title.value,
      topic: selectedTopic.value || 'General', // Default to General if no topic selected
      content: content.value,
      userId: user.value.uid,
      userName: `by ${name}`,
      replyCount: 0,
      createdAt: serverTimestamp()
    })
    router.push('/forum') // Navigate to the forum page after submission
  } catch (e) {
    error.value = 'Failed to post discussion.'
    console.error(e)
  }
}
</script>


<style scoped>
.create-discussion {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.form-header {
  position: relative;
  display: flex;
  justify-content: center; /* Perfectly center the h2 */
  align-items: center;
  background: linear-gradient(135deg, #fffaf0, #ffe4e1);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.form-header h2 {
  font-size: 1.8rem;
  color: #d84315;
  margin: 0;
}

.back-button {
  position: absolute;
  left: 1rem; /* Position to the far left inside the form header */
  display: inline-flex;
  align-items: center;
  background-color: #ff5722;
  border: 1px solid #ff5722;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease;
}
.discussion-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}


.back-button:hover {
  background-color: #e5533d;
}

.back-button i {
  margin-right: 0.5rem;
}


.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  color: #555;
}

input, textarea {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  color: #333;
  background: #f9f9f9;
  transition: border-color 0.3s ease;
}

input:focus, textarea:focus {
  border-color: #ff5722;
  outline: none;
}

textarea {
  resize: vertical;
}

button.submit-btn {
  padding: 0.8rem 1.5rem;
  background-color: #ff6347;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.submit-btn:hover {
  background-color: #e5533d;
}

.error-message {
  color: red;
  font-size: 0.9rem;
}

select {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  color: #333;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease;
}

select:focus {
  border-color: #ff5722;
  outline: none;
}

</style>