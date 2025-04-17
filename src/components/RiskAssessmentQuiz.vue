<template>
    <div class="quiz-container">
      <div class="question-container">
        <h2>{{ questions[currentQuestion].statement }}</h2>
  
        <!-- Choices -->
        <div v-for="(choice, index) in questions[currentQuestion].choices" :key="index" class="choice" @click="selectAnswer(index)">
          <div class="choice-bar" :class="{'selected': answers[currentQuestion] === index}">
            {{ choice }}
          </div>
        </div>
      </div>
  
      <!-- Horizontal Progress Bar with clickable navigation -->
      <div class="progress-quizbar">
        <!-- Back Arrow -->
        <div class="arrow-button" @click="goBack" v-if="currentQuestion > 0">
          &#x2B05;
        </div>
  
        <div 
          v-for="(dot, n) in totalQuestions" 
          :key="n" 
          :class="{'active': answers[n] !== null, 'current': n === currentQuestion}"
          class="progress-dot"
          @click="navigateToQuestion(n)"
        >
        </div>
  
        <!-- Forward Arrow -->
        <div class="arrow-button" @click="goForward" v-if="currentQuestion < totalQuestions - 1">
          &#x27A1;
        </div>
      </div>
  
      <!-- Progress bar below the question choices -->
      <div class="footer">
        <button 
          v-if="currentQuestion === totalQuestions - 1 && !quizSubmitted && allAnswered" 
          @click="submitQuiz"
        >
          Submit
        </button>
      </div>
  
      <!-- Display score after submission -->
      <div v-if="quizSubmitted">
        <p>Your Risk Score: {{ score }} / 16</p>
        <p>{{ resultMessage }}</p>
        <button @click="resetQuiz">Try Again</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const totalQuestions = 8; // Updated to 8 questions based on your new criteria
  const currentQuestion = ref(0);
  
  const questions = ref([
    {
      statement: 'What is your age?',
      choices: ['Under 30', '30-50', '50+'],
      correctAnswer: 0, // will be used to calculate risk points
    },
    {
      statement: 'What is your Fitzpatrick skin type?',
      choices: ['IV-VI (Olive/Dark Skin)', 'III (Medium Brown Skin)', 'I-II (Fair Skin)'],
      correctAnswer: 2, // Risk factor: 2 points for fair skin
    },
    {
      statement: 'How many severe sunburns did you experience during childhood?',
      choices: ['None', '1-2', '3+'],
      correctAnswer: 2, // Risk factor: 2 points for 3 or more
    },
    {
      statement: 'Do you have a family history of skin cancer (melanoma)?',
      choices: ['No', '1 Parent', 'Multiple Family Members'],
      correctAnswer: 2, // Risk factor: 2 points for multiple family members
    },
    {
      statement: 'Have you ever used a tanning bed?',
      choices: ['Never', 'Occasionally', 'Frequently'],
      correctAnswer: 0, // Risk factor: 0 points for never
    },
    {
      statement: 'How many moles do you have?',
      choices: ['Less than 25', '25-50', 'More than 50'],
      correctAnswer: 2, // Risk factor: 2 points for more than 50 moles
    },
    {
      statement: 'Do you have freckles or lentigines (sunspots)?',
      choices: ['None', 'Moderate Number', 'Numerous'],
      correctAnswer: 2, // Risk factor: 2 points for numerous
    },
    {
      statement: 'What is your typical sun exposure behavior?',
      choices: ['Rarely exposed', 'Moderately exposed (protected)', 'Frequently exposed (unprotected)'],
      correctAnswer: 2, // Risk factor: 2 points for frequent unprotected exposure
    }
  ]);
  
  const answers = ref(Array(totalQuestions).fill(null));
  const score = ref(0);
  const quizSubmitted = ref(false);
  const resultMessage = ref('');
  
  const selectAnswer = (index) => {
    answers.value[currentQuestion.value] = index;
  };
  
  const navigateToQuestion = (index) => {
    currentQuestion.value = index;
  };
  
  const goBack = () => {
    if (currentQuestion.value > 0) {
      currentQuestion.value--;
    }
  };
  
  const goForward = () => {
    if (currentQuestion.value < totalQuestions - 1) {
      currentQuestion.value++;
    }
  };
  
  const submitQuiz = () => {
    quizSubmitted.value = true;
    score.value = 0;
    answers.value.forEach((answer, index) => {
      // Calculate risk score based on the selected answers
      if (answer === 0) score.value += 0;
      else if (answer === 1) score.value += 1;
      else if (answer === 2) score.value += 2;
    });
  
    // Display message based on the score
    if (score.value <= 3) {
      resultMessage.value = "Low risk (Follow good sun protection practices).";
    } else if (score.value <= 7) {
      resultMessage.value = "Moderate risk (Recommend regular skin checks and sun protection).";
    } else if (score.value <= 13) {
      resultMessage.value = "High risk (Consider frequent dermatological evaluations).";
    } else {
      resultMessage.value = "Very high risk (Immediate professional skin check is recommended).";
    }
  };
  
  const resetQuiz = () => {
    currentQuestion.value = 0;
    score.value = 0;
    quizSubmitted.value = false;
    resultMessage.value = '';
    answers.value = Array(totalQuestions).fill(null);
  };
  
  const allAnswered = computed(() => answers.value.every((ans) => ans !== null));
  </script>
  
  <style scoped>
  .quiz-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .question-container {
    margin-bottom: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .choice {
    margin: 1rem 0;
  }
  
  .choice-bar {
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .choice-bar.selected {
    background-color: #ff8c00;
    color: white;
  }
  
  .choice-bar:hover {
    background-color: #ff8c00;
    color: white;
  }
  
  .progress-quizbar {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    gap: 10px;
  }
  
  .progress-dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #ccc;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }
  
  .progress-dot.active {
    background-color: #ff8c00;
  }
  
  .progress-dot.current {
    border: 2px solid #ff8c00;
  }
  
  .arrow-button {
    font-size: 1.5rem;
    cursor: pointer;
    user-select: none;
  }
  
  .footer {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
  
  button {
    padding: 10px 20px;
    background-color: #ff8c00;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #e57e00;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  p {
    text-align: center;
    font-size: 1.1rem;
    margin: 1rem 0;
  }
  </style>