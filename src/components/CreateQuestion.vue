<template>
  <div class="container mx-auto">
    <h1>Criar nova pergunta</h1>
    <form v-on:submit.prevent="submitQuestion">
      <fieldset class="grupo">
        <div class="campo">
          <label>Selecione o tópico para criar uma pergunta:</label>
          <select name="estado" id="estado" v-model="selectedTopic">
            <option disabled value="">Selecione um tópico</option>
            <option v-for="topic in listTopics" :value="topic">{{topic.replace('_',' ')}}</option>
          </select>
        </div>
      </fieldset>

      <fieldset class="grupo">
        <div class="campo">
          <label for="mensagem">Pergunta</label>
          <textarea v-model="questionTopic" placeholder="Pergunta" rows="4" style="width: 20em" id="mensagem"
                    name="mensagem"></textarea>
        </div>
      </fieldset>

      <fieldset class="grupo">
        <div class="campo">
          <label>Tipo de resposta</label>
          <select name="estado" id="estado" v-model="typeQuestion">
            <option disabled value="">Escolha o tipo de respota</option>
            <option value="tf">Verdadeiro/Falso</option>
            <option value="mc">Multipla escolha</option>
          </select>
        </div>
      </fieldset>

      <fieldset class="grupo">
        <div class="campo">
          <label for="mensagem">Resposta Correta</label>
          <input v-model="trueAnswerTopic" placeholder="Resposta Correta" id="mensagem" name="mensagem"></input>
        </div>
      </fieldset>


      <fieldset v-if="typeQuestion === 'mc'" class="grupo">
        <div class="campo">
          <label for="mensagem">Resposta 1</label>
          <input v-model="answer1Topic" placeholder="Resposta 1" id="mensagem" name="mensagem"></input>
        </div>

        <div class="campo">
          <label for="mensagem">Resposta 2</label>
          <input v-model="answer2Topic" placeholder="Resposta 2" id="mensagem" name="mensagem"></input>
        </div>

        <div class="campo">
          <label for="mensagem">Resposta 3</label>
          <input v-model="answer3Topic" placeholder="Resposta 3" id="mensagem" name="mensagem"></input>
        </div>

        <div class="campo">
          <label for="mensagem">Resposta 4</label>
          <input v-model="answer4Topic" placeholder="Resposta 4" id="mensagem" name="mensagem"></input>
        </div>

      </fieldset>

      <fieldset class="grupo">
        <div class="campo">
          <button class="botao">Create</button>
        </div>
      </fieldset>

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
        typeQuestion: '',
        answer1Topic: '',
        answer2Topic: '',
        answer3Topic: '',
        answer4Topic: '',
        trueAnswerTopic: '',
        errors: [],
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
    methods: {
      submitQuestion: function () {
        if (this.checkInputs()) {
          let vm = this;
          let obj = {};

          fb.quizCollection.doc(vm.selectedTopic).get().then(function (doc) {
            if (doc.exists) {
              obj = doc.data();
            } else {
              console.log("No such document!");
            }
            if (!obj.questions) {
              obj.questions = []
            }

            if (vm.typeQuestion === 'tf') {
              obj.questions.push({
                  text: vm.questionTopic,
                  type: vm.typeQuestion,
                  answer: vm.trueAnswerTopic
                }
              );
            }

            if (vm.typeQuestion === 'mc') {
              obj.questions.push({
                  text: vm.questionTopic,
                  type: vm.typeQuestion,
                  answers: [vm.answer1Topic, vm.answer2Topic, vm.answer3Topic, vm.answer4Topic],
                  answer: vm.trueAnswerTopic
                });
            }

            fb.quizCollection.doc(vm.selectedTopic).set(
              {
                questions: obj.questions
              }, {merge: true});

          }).catch(function (error) {
            console.log("Error getting document:", error);
          });
        } else {
          console.log('Verificar campos em branco')
        }
      },
      checkInputs() {
        if (this.selectedTopic === '') {
          return false;
        }
        if (this.questionTopic === '') {
          return false;
        }
        if (this.typeQuestion === '') {
          return false;
        }

        if (this.typeQuestion === 'mc') {
          if (this.answer1Topic === '' || this.answer2Topic === '' || this.answer3Topic === '' || this.answer4Topic === '') {
            return false;
          }
        }

        return true;
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  fieldset {
    border: 0;
  }

  body, input, select, textarea, button {
    font-family: sans-serif;
    font-size: 1em;
  }

  .grupo:before, .grupo:after {
    content: " ";
    display: table;
  }

  .grupo:after {
    clear: both;
  }

  .campo {
    margin-bottom: 1em;
  }

  .campo label {
    margin-bottom: 0.2em;
    color: #666;
    display: block;
  }

  fieldset.grupo .campo {
    float: left;
    margin-right: 1em;
  }

  .campo input[type="text"],
  .campo input[type="email"],
  .campo input[type="url"],
  .campo input[type="tel"],
  .campo select,
  .campo textarea {
    padding: 0.2em;
    border: 1px solid #CCC;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    display: block;
  }

  .campo select option {
    padding-right: 1em;
  }

  .campo input:focus, .campo select:focus, .campo textarea:focus {
    background: #FFC;
  }

  .campo label.checkbox {
    color: #000;
    display: inline-block;
    margin-right: 1em;
  }

  .botao {
    font-size: 1.5em;
    background: #F90;
    border: 0;
    margin-bottom: 1em;
    color: #FFF;
    padding: 0.2em 0.6em;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  }

  .botao:hover {
    background: #FB0;
    box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.2);
    text-shadow: none;
  }

  .botao, select, label.checkbox {
    cursor: pointer;
  }

  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }

  .container {
    width: 100%;
  }

</style>
