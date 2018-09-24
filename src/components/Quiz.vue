<template>
  <transition-group name="fade">
    <div class="home" :key="introStage" v-if="introStage">
      <div class="inner">
        <h1>Você é bom em Teste de Software?</h1>
        <p>Teste seus conhecimentos sobre a Matéria de Testes de Software: processo que faz parte do #desenvolvimento de
          software, e tem como principal objetivo revelar falhas/bugs.</p>
        <a class="btn-10" href="#" @click="startQuiz"><span>Iniciar Quiz</span></a>
      </div>
    </div>
    <div class="topics" :key="topicsStage" v-if="topicsStage">
      <topics v-on:stopic="handleTopic($event)"></topics>
    </div>
    <div class="play" :key="questionStage" v-if="questionStage">
      <div>
        <div class="container hamilton--header--text">

          <div class="hamilton--lyrics--text">
            <p>{{currentTopic.replace('_',' ').toUpperCase()}}
            </p>
            <div class="hamilton--answers">
              <question
                :question="questions[currentQuestion]"
                v-on:answer="handleAnswer"
                :question-number="currentQuestion+1"
              ></question>
              <a
                v-bind:class="{ 'wronganswer': hasAnswered && !item.correct, 'correctanswer': hasAnswered && item.correct}"
                @click="checkAnswer(item)" v-for="(item, index) in questions">{{item.name}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :key="resultsStage" v-if="resultsStage">
      <slot name="results" :length="questions.length" :perc="perc" :correct="correct">
        You got {{correct}} right out of {{questions.length}} questions. Your percentage is {{perc}}%.
      </slot>
    </div>
  </transition-group>
</template>

<script>
  import Question from './Question';
  import Topics from "./Topics";

  const fb = require('../config/firebaseConfig.js');

  export default {
    components: {Topics, Question},
    name: "Quiz",
    data() {
      return {
        introStage: false,
        questionStage: false,
        resultsStage: false,
        topicsStage: false,

        title: 'Game Quiz Test',

        questions: {},
        currentQuestion: 0,
        currentTopic: '',
        hasAnswered: false,
        answers: [],
        correct: 0,
        perc: null
      }
    },
    created() {
      this.introStage = true;

      this.topicsStage = false;
      this.resultsStage = false;
      this.questionStage = false;
    },
    methods: {
      getNewQuestion() {
      },
      startQuiz() {
        this.introStage = false;
        this.questionStage = false;
        this.topicsStage = true;
      },
      handleTopic(e) {
        this.currentTopic = e.title;

        this.questions = null;
        this.questions = e.questions;

        this.introStage = false;
        this.topicsStage = false;
        this.resultsStage = false;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    text-decoration: none;
    line-height: 80px;
    color: black;
  }

  [class^="btn-"] {
    position: relative;
    display: block;
    overflow: hidden;
    width: 100%;
    height: 80px;
    max-width: 250px;
    margin: 1rem auto;
    text-transform: uppercase;
    border: 1px solid currentColor;
  }

  .btn-10 {
    color: #376867;
    border: #52a3a2 solid 1px;
  }

  .btn-10:before, .btn-10:after,
  .btn-10 span:before,
  .btn-10 span:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 80px;
    background-color: rgba(36, 107, 106, 0.25);
    transition: 0.4s;
  }

  .btn-10:after,
  .btn-10 span:before {
    left: auto;
    right: 0;
  }

  .btn-10 span:before,
  .btn-10 span:after {
    transition-delay: 0.4s;
  }

  .btn-10:hover {
    color: #ffffff;
  }

  .btn-10:hover:before, .btn-10:hover:after,
  .btn-10:hover span:before,
  .btn-10:hover span:after {
    width: 250px;
  }

  .btn-10:active {
    background-color: #5f6a8e;
  }

  @-webkit-keyframes criss-cross-left {
    0% {
      left: -20px;
    }
    50% {
      left: 50%;
      width: 20px;
      height: 20px;
    }
    100% {
      left: 50%;
      width: 375px;
      height: 375px;
    }
  }

  @keyframes criss-cross-left {
    0% {
      left: -20px;
    }
    50% {
      left: 50%;
      width: 20px;
      height: 20px;
    }
    100% {
      left: 50%;
      width: 375px;
      height: 375px;
    }
  }

  @-webkit-keyframes criss-cross-right {
    0% {
      right: -20px;
    }
    50% {
      right: 50%;
      width: 20px;
      height: 20px;
    }
    100% {
      right: 50%;
      width: 375px;
      height: 375px;
    }
  }

  @keyframes criss-cross-right {
    0% {
      right: -20px;
    }
    50% {
      right: 50%;
      width: 20px;
      height: 20px;
    }
    100% {
      right: 50%;
      width: 375px;
      height: 375px;
    }
  }

  .home {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  h1 {
    font-size: 3rem;
    font-weight: bold;
  }

  p {
    font-size: 1.5rem;
    margin: 0 0 20px 0;
  }

  .play--button {
    background-color: white;
    color: #7fd4d3;
    font-weight: bold;
    border-radius: 20px;
    letter-spacing: 1px;
    padding: 20px;
    transition: all .3s ease;
    text-shadow: 0 1px 3px rgba(36, 180, 126, .4);
    text-transform: uppercase;
    box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
  }

  .play--button:hover {
    background-color: white;
    color: #7fd4d3;
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, .1), 0 3px 6px rgba(0, 0, 0, .08);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  p {
    color: #fff;
  }

  h1 {
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0
  }

  .play--button {
    background-color: white;
    color: #7fd4d3;
    font-weight: bold;
    border-radius: 20px;
    letter-spacing: 1px;
    padding: 20px;
    transition: all .3s ease;
    text-shadow: 0 1px 3px rgba(36, 180, 126, .4);
    text-transform: uppercase;
    box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 5;
  }

  .play--button:hover {
    background-color: white;
    color: #7fd4d3;
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, .1), 0 3px 6px rgba(0, 0, 0, .08);
  }

  .hamilton--header--text {
    margin-top: 50px;
  }

  .hamilton--inner {
    margin-top: 20px;
  }

  .hamilton--inner .left {
    text-align: left;
  }

  .hamilton--inner .right {
    text-align: right;
  }

  .title {
    font-weight: bold;
  }

  .hamilton--lyrics--text {
    width: 600px;
    margin: 0 auto;
  }

  .hamilton--lyrics--text p {
    font-weight: bold;
  }

  .hamilton--answers a {
    display: block;
    border: 3px solid white;
    border-radius: 50px;
    margin: 20px auto;
    width: 500px;
    padding: 10px;
  }

  .wronganswer {
    background-color: #ec6969;
    border: none !important;
    opacity: 0.4;
    transition: background-color 0.5s ease;
  }

  .correctanswer {
    background-color: #00c4a7;
    border: none !important;
    transition: background-color 0.5s ease;
  }
</style>
