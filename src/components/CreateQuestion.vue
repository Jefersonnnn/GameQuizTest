<template>
  <div>
    <strong>Create Questions</strong><br/>

    <form>
    <label>Selecione o tópico para criar uma pergunta: </label>

    <select v-model="selectedTopic">
      <option disabled value="">Escolha um item</option>
      <option v-for="topic in listTopics">{{topic}}</option>
    </select>

    <input v-model="questionTopic" placeholder="Pergunta"/>
      <select v-model="typeQuestion">
        <option disabled value="">Escolha o tipo de respota</option>
        <option value="tf">Verdadeiro/Falso</option>
        <option value="mc">Multipla escolha</option>
      </select>
      <input v-model="answerTopic" placeholder="Resposta"/>

    <button @click="submitQuestions">Create</button>
    </form>
  </div>
</template>

<script>

  const fb = require('../config/firebaseConfig.js');

  export default {
    name: "CreateQuestion",
    data() {
      return {
        selectedTopic: '',
        listTopics: [],
        questionTopic: '',
        answerTopic: '',
        typeQuestion: '',
      }
    },
    created() {
      let vm = this;
      fb.quizCollection.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          vm.listTopics.push(doc.id.replace());
        });
      });
    },
    methods:
      {
        submitQuestions: function () {
          this.$emit('answer', {answer: this.answer});
          this.answer = null;
        }
      }
  }
</script>

<style scoped>

</style>
