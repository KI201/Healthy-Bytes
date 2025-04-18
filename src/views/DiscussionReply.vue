<template>
  <div :style="{ marginLeft: (level || 0) * 28 + 'px' }" class="comment-container">
    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem;">
      <img :src="avatarUrl" alt="Avatar" width="30" height="30" style="border-radius: 50%;" />
      <strong>{{ userName || 'Anonymous' }}</strong>
    </div>
    <p>{{ comment.content }}</p>

    <!-- Like/Unlike button -->
    <div v-if="isLoggedIn" style="margin-top: 0.5rem;">
      <button class="small-reply-btn" @click="toggleCommentLike">
        {{ hasLikedComment ? 'Unlike' : 'Like' }} ({{ commentLikes }})
      </button>
    </div>

    <!-- Reply toggle button -->
    <div v-if="isLoggedIn" style="margin-top: 0.5rem">
      <button v-if="!showReply" @click="toggleReply" class="small-reply-btn">Reply</button>
    </div>

    <!-- Reply textarea and cancel button -->
    <div v-if="showReply && isLoggedIn" class="reply-container" style="margin-top: 1rem">
      <textarea v-model="replyText" placeholder="Write a reply..." class="reply-textarea"></textarea>
      <br />
      <button @click="submitReply" class="small-reply-btn">Reply</button>
      <button @click="toggleReply" class="cancel-btn">Cancel</button>
    </div>

    <!-- Render nested replies recursively -->
    <div v-for="child in comment.children" :key="child.id">
      <DiscussionReply
        :comment="child"
        :level="level + 1"
        :isLoggedIn="isLoggedIn"
        :onReply="onReply"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue'
import { doc, getDoc, collection, query, where, getDocs, addDoc, deleteDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import db from '../firebase/init.js'

const props = defineProps({
  comment: Object,
  level: { type: Number, default: 0 },
  isLoggedIn: { type: Boolean, default: false },
  onReply: { type: Function, required: true }
})

const emit = defineEmits(['reply'])
const replyText = ref('')
const showReply = ref(false)
const userName = ref('')
const avatarUrl = ref('')
const commentLikes = ref(0)
const hasLikedComment = ref(false)
const auth = getAuth()
const user = ref(auth.currentUser)

onMounted(async () => {
  // Get user info
  if (props.comment.userId) {
    const userDocRef = doc(db, 'users', props.comment.userId)
    const userSnap = await getDoc(userDocRef)
    if (userSnap.exists()) {
      userName.value = userSnap.data().userName || 'Anonymous'
      props.comment.userName = userName.value
    } else {
      userName.value = 'Anonymous'
      props.comment.userName = 'Anonymous'
    }
  } else {
    userName.value = 'Anonymous'
    props.comment.userName = 'Anonymous'
  }

  avatarUrl.value = `https://api.dicebear.com/7.x/thumbs/svg?seed=${props.comment.userId || 'guest'}`

  fetchCommentLikes()
})

const fetchCommentLikes = async () => {
  const q = query(
    collection(db, 'likes'),
    where('targetId', '==', props.comment.id),
    where('type', '==', 'comment')
  )
  const snapshot = await getDocs(q)
  commentLikes.value = snapshot.size
  hasLikedComment.value = snapshot.docs.some(doc => doc.data().userId === user.value?.uid)
}

const toggleCommentLike = async () => {
  if (!user.value) return

  const q = query(
    collection(db, 'likes'),
    where('targetId', '==', props.comment.id),
    where('userId', '==', user.value.uid),
    where('type', '==', 'comment')
  )
  const snapshot = await getDocs(q)

  if (!snapshot.empty) {
    await deleteDoc(snapshot.docs[0].ref)
    commentLikes.value--
    hasLikedComment.value = false
  } else {
    await addDoc(collection(db, 'likes'), {
      userId: user.value.uid,
      targetId: props.comment.id,
      type: 'comment',
      createdAt: new Date()
    })
    commentLikes.value++
    hasLikedComment.value = true
  }
}

const toggleReply = () => {
  showReply.value = !showReply.value
}

const submitReply = () => {
  if (replyText.value.trim()) {
    props.onReply(props.comment.id, replyText.value)
    replyText.value = ''
    showReply.value = false
  }
}
</script>

<style scoped>
.comment-container {
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #ddd;
  padding: 8px 0;
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 0.9rem;
}

.comment-container:last-child {
  border-bottom: none;
}

.reply-container {
  padding-left: 20px;
  margin-top: 10px;
  background-color: #f9f9f9;
  border-left: 3px solid #007bff;
}

button {
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  background-color: #ff6347;
  color: white;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #e5533d;
}

button.cancel-btn {
  background-color: #bbb;
}

button.cancel-btn:hover {
  background-color: #888;
}

button.small-reply-btn {
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  background-color: #ff7043;
}

button.small-reply-btn:hover {
  background-color: #e65c35;
}

.reply-textarea {
  width: 100%;
  min-height: 50px;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #333;
  background: #f9f9f9;
  resize: vertical;
  margin-bottom: 1rem;
}
</style>
