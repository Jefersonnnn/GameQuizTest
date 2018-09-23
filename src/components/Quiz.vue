<template>
  <div>
    <div v-if="introStage">
      <h1>Welcome to the Quiz: {{title}}</h1>
      <p>
        Some kind of text here. Blah blah.
      </p>

      <button @click="startQuiz">START!</button>
    </div>

    <div v-if="questionStage">
      <question
      :question="questions[currentQuestion]"
      v-on:answer="handleAnswer"
      :question-number="currentQuestion+1"
      ></question>
    </div>

    <div v-if="resultsStage">
      You got {{correct}} right out of {{questions.length}} questions. Your percentage is {{perc}}%.
    </div>
  </div>
</template>

<script>
  import Question from './Question'

  const fb = require('../config/firebaseConfig.js')

  export default {
    components: {Question},
    //props: ['url'],
    name: "Quiz",
    data() {
      return {
        introStage: false,
        questionStage: false,
        resultsStage: false,
        title: 'QuizTest',
        questions: {},
        currentQuestion: 0,
        answers: [],
        correct: 0,
        perc: null
      }
    },
    created() {
      let vm = this;
      fb.quizCollection.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
              vm.questions = doc.data().questions;
              vm.introStage = true;
        });
      });
    },
    methods: {
      startQuiz() {
        this.introStage = false;
        this.questionStage = true;
      },
      handleAnswer(e) {
        console.log('answer event ftw', e);
        this.answers[this.currentQuestion] = e.answer;
        if ((this.currentQuestion + 1) === this.questions.length) {
          this.handleResults();
          this.questionStage = false;
          this.resultsStage = true;
        } else {
          this.currentQuestion++;
        }
      },
      handleResults() {
        console.log('handle results');
        this.questions.forEach((a, index) => {
          if (this.answers[index] === a.answer) this.correct++;
        });
        this.perc = ((this.correct / this.questions.length) * 100).toFixed(2);
        console.log(this.correct + ' ' + this.perc);
      }
    }
  };

</script>
