<template>
  <div v-if="discussion">
    <div class="discussion-header">
      <div class="header-row">
        <button @click="goBack" class="back-button">
          <i class="fas fa-arrow-left"></i> Back
        </button>
        <h2>{{ discussion.title }}</h2>
      </div>

      <p><strong>{{ discussion.userName }}</strong></p>
      <p class="discussion-content">{{ discussion.content }}</p>

      <div class="like-comment-row">
        <button class="like-button" @click="toggleDiscussionLike">
          {{ hasLikedDiscussion ? 'Unlike' : 'Like' }} ({{ discussionLikes }})
        </button>
        <h3>Comments ({{ comments.length }})</h3>
      </div>

      <div v-for="comment in comments" :key="comment.id">
        <DiscussionReply
          :comment="comment"
          :level="0"
          :isLoggedIn="isLoggedIn"
          :onReply="submitComment"
        />
      </div>

      <div v-if="isLoggedIn">
        <h4>Leave a Comment</h4>
        <textarea v-model="newComment" placeholder="Write your comment..." />
        <button @click="submitComment()">Reply</button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </div>

      <div v-else>
        <p><em>You must be signed in to reply.</em></p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading discussion...</p>
  </div>
</template>

  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { doc, getDoc, collection, addDoc, deleteDoc, serverTimestamp, query, where, getDocs, increment, updateDoc } from 'firebase/firestore'
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
  import db from '../firebase/init.js'
  import DiscussionReply from './DiscussionReply.vue'
  
  const discussionLikes = ref(0)
  const hasLikedDiscussion = ref(false)

  const route = useRoute()
  const router = useRouter()
  const auth = getAuth()
  
  const discussion = ref(null)
  const comments = ref([])
  const newComment = ref('')
  const error = ref('')
  const user = ref(null)
  const isLoggedIn = ref(false)
  
  const flatCommentCount = computed(() => {
    // Count all comments recursively
    const countNodes = (nodes) => nodes.reduce((acc, node) => acc + 1 + (node.children ? countNodes(node.children) : 0), 0)
    return countNodes(comments.value)
  })

  const goBack = () => {
  router.back()
}
  
  onMounted(async () => {
    const id = route.params.id
    const docRef = doc(db, 'discussions', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      discussion.value = { id: docSnap.id, ...docSnap.data() }
      fetchComments()
    }
  
    onAuthStateChanged(auth, (u) => {
      if (u) {
        user.value = u
        isLoggedIn.value = true
        fetchDiscussionLikes()
      } else {
        fetchDiscussionLikes() // Fetch likes even if not logged in
      }
    })
  })
  
  const fetchComments = async () => {
    const q = query(collection(db, 'comments'), where('discussionId', '==', route.params.id))
    const querySnapshot = await getDocs(q)
    const flatComments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
  
    comments.value = buildCommentTree(flatComments)
  }
  
  function buildCommentTree(flatComments) {
    const lookup = {}
    flatComments.forEach((comment) => {
      comment.children = []
      lookup[comment.id] = comment
    })
    const tree = []
    flatComments.forEach((comment) => {
      if (comment.parentId) {
        if (lookup[comment.parentId]) {
          lookup[comment.parentId].children.push(comment)
        }
      } else {
        tree.push(comment)
      }
    })
    return tree
  }
  
  const submitComment = async (parentId = null, contentOverride = null) => {
    const content = contentOverride || newComment.value
    if (!user.value || !content.trim()) return
    try {
      const newCommentRef = await addDoc(collection(db, 'comments'), {
        discussionId: route.params.id,
        parentId,
        content: content,
        userId: user.value.uid,
        userName: user.value.displayName || 'Anonymous',
        createdAt: serverTimestamp()
      })
  
      await updateDoc(doc(db, 'discussions', route.params.id), {
        replyCount: increment(1)
      })
  
      if (!parentId) {
        newComment.value = ''
      }
  
      fetchComments()
    } catch (e) {
      error.value = 'Failed to post comment.'
      console.error('Error posting comment:', e)
    }
  }

  const fetchDiscussionLikes = async () => {
  const q = query(
    collection(db, 'likes'),
    where('targetId', '==', discussion.value.id),
    where('type', '==', 'discussion')
  )
  const snapshot = await getDocs(q)
  discussionLikes.value = snapshot.size
  hasLikedDiscussion.value = snapshot.docs.some(doc => doc.data().userId === user.value?.uid)
}

const toggleDiscussionLike = async () => {
  if (!user.value) return

  const q = query(
    collection(db, 'likes'),
    where('targetId', '==', discussion.value.id),
    where('userId', '==', user.value.uid),
    where('type', '==', 'discussion')
  )
  const snapshot = await getDocs(q)

  if (!snapshot.empty) {
    // Unlike
    await deleteDoc(snapshot.docs[0].ref)
    discussionLikes.value--
    hasLikedDiscussion.value = false
  } else {
    // Like
    await addDoc(collection(db, 'likes'), {
      userId: user.value.uid,
      targetId: discussion.value.id,
      type: 'discussion',
      createdAt: new Date()
    })
    discussionLikes.value++
    hasLikedDiscussion.value = true
  }
}
  



  </script>
  
  <style scoped>
  .discussion-header {
    max-width: 900px;
    margin: 2rem auto;
    padding: 1.5rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    font-size: 2rem;
    color: #d84315;
  }
  
  h3 {
    font-size: 1.5rem;
    color: #ff5722;
  }
  
  h4 {
    font-size: 1.2rem;
    color: #ff5722;
  }
  
  .discussion-content {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #555;
  }
  .like-comment-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.like-comment-row h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #ff5722;
}

  
  textarea {
    width: 100%;
    min-height: 80px;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    color: #333;
    background: #f9f9f9;
    resize: vertical;
    margin-bottom: 1rem;
  }
  
  button {
    padding: 0.8rem 1.5rem;
    background-color: #ff6347;
    color: white;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #e5533d;
  }
  
  button:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }
  
  .error-message {
    color: red;
    font-size: 0.9rem;
  }
  
  p em {
    color: #777;
  }
  .header-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.back-button {
  display: flex;
  align-items: center;
  background-color: #ff5722; /* Set the background to orange */
  border: 1px solid #ff5722;
  color: white; /* Set the text to white */
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem; /* Smaller padding */
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.back-button:hover {
  background-color: white; /* On hover, background becomes white */
  color: #ff5722; /* On hover, text color becomes orange */
}

.back-button i {
  font-size: 1.2rem; /* Adjusted size of the arrow */
  margin-right: 0.5rem; /* Space between the arrow and the text */
}

.like-button {
  padding: 0.4rem 0.8rem;
  font-size: 1rem;
  border-radius: 4px;
  background-color: #ff6347;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s ease;
  border: none;
  cursor: pointer;
}

.like-button:hover {
  background-color: #e5533d;
}
  </style>
  