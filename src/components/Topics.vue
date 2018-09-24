<template>
  <div class="container mx-auto">
    <div class="flex flex-wrap justify-center xl:justify-between py-4 relative">
      <div v-for="topic in listTopics" class="max-w-160 tracking-wide mb-8">
        <a href="#" @click="selectTopic(topic)"
           class="hover:no-underline">
          <div class="card bg-white shadow-lg rounded-lg cursor-pointer text-purple">
            <div>
              <div class="px-4 md:px-8 py-4 bg-white">
                <h3 title="Dynamic Forms with Vue.js has 13 vue.js lessons"
                    class="text-2xl leading-normal tracking-normal font-normal mb-2">
                  {{topic.title}}
                </h3>
                <p class="text-sm leading-normal">
                  {{topic.desc}}
                </p></div>
            </div>
            <div class="w-full text-sm flex justify-between px-4 md:px-8 py-3 bg-grey-light rounded-b-lg">
              <div>{{topic.difficulty == 1 ? 'Beginner' : 'Intermediate'}}</div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>

</template>

<script>
  const fb = require('../config/firebaseConfig.js');

  export default {
    name: "Topics",
    data() {
      return {
        listTopics: []
      }
    },
    created() {
      let vm = this;
      fb.quizCollection.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          vm.listTopics.push(doc.data());
        });
      });
    },
    methods: {
      selectTopic(topic) {
        this.$emit('stopic', topic);
      }
    }
  }
</script>

<style scoped>
  .max-w-160 {
    max-width: 30rem;
    margin-left: 10px;
  }

  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }

  .container {
    width: 100%;
  }

  .tracking-wide {
    letter-spacing: 0.05em;
  }

  .mb-8 {
    margin-bottom: 2rem;
  }

  a {
    color: #ee6d93;
    text-decoration: none;
  }

  .text-purple {
    color: #766b93;
  }

  .shadow-lg {
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08)
  }

  .rounded-lg {
    -webkit-border-radius: .5rem;
    -moz-border-radius: .5rem;
    border-radius: .5rem;
  }

  .bg-white {
    background-color: #fff;
  }

  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .py-4 {
    padding-bottom: 1rem;
    padding-top: 1rem;
  }

  .tracking-normal {
    letter-spacing: 0;
  }

  .leading-normal {
    line-height: 1.5;
  }

  .text-sm {
    font-size: .875rem;
  }

  .w-full {
    width: 100%;
  }

  .justify-between {
    justify-content: space-between;
  }

  .flex {
    display: flex;
  }

  .rounded-b-lg {
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
  }

  .bg-grey-light {
    background-color: #f8f8fb;
  }

  .relative {
    position: relative;
  }

  .justify-center {
    justify-content: center;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .form input[type=checkbox].form-control + label:before {
    content: "\F0C8";
    margin-right: .5rem;
    margin-top: -2px
  }

  .form input[type=checkbox].form-control + label:before, .form input[type=checkbox].form-control:checked + label:before {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    line-height: 1;
    vertical-align: -.125em
  }

  .form input[type=checkbox].form-control:checked + label:before {
    content: "\F14A"
  }

  .teacher-card > * {
    width: 100%
  }

  .teacher-card > img {
    border: 9px solid #fff;
    border-radius: 9999px;
    height: 8rem;
    margin: -4rem auto .5rem;
    width: 8rem
  }

  .teacher-card > .title {
    color: #5e527f;
    font-size: 1.625rem;
    font-weight: 400;
    margin-bottom: .75rem
  }

  .teacher-card > p {
    line-height: 1.5;
    margin-bottom: 1rem
  }

  .teacher-card ul.socials {
    align-self: flex-end;
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0
  }

  @media (min-width: 992px) {
    .teacher-card ul.socials {
      margin-top: 1rem
    }
  }

  .teacher-card ul.socials > li {
    align-items: center;
    background: linear-gradient(270deg, #4f48ad 1.01%, #1d185e 73.64%);
    background: linear-gradient(182.66deg, #4f48ad 2.16%, #1d185e 97.84%);
    border-radius: 9999px;
    display: flex;
    height: 2.5rem;
    justify-content: center;
    margin-left: .5rem;
    margin-right: .5rem;
    width: 2.5rem
  }

  .teacher-card ul.socials > li i {
    color: #fff;
    font-size: 1.25rem;
    line-height: 1.25;
    margin-top: .25rem
  }

  .chapter {
    background-color: #fff;
    border-radius: .5rem;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);
    margin-bottom: 1.5rem;
    padding: 1rem
  }

  .chapter .lesson {
    align-items: center;
    border-radius: .25rem;
    color: #766b93;
    display: flex;
    font-size: .875rem;
    justify-content: space-between;
    margin-bottom: .5rem;
    margin-top: .5rem;
    padding-bottom: .5rem;
    padding-right: 1rem;
    padding-top: .5rem
  }

  @media (min-width: 768px) {
    .chapter .lesson {
      font-size: 1rem
    }
  }

  .chapter .lesson:nth-child(odd) {
    background: rgba(141, 126, 179, .08)
  }

  .chapter .lesson a {
    color: #766b93
  }

  .chapter .lesson a.title {
    font-weight: 500
  }

  .chapter .lesson-watched a.title, .chapter .lesson-watched span.time {
    opacity: .6
  }

  .chapter .lesson-watched a.title:hover {
    opacity: .8
  }

  .video-controls ul {
    align-items: center;
    color: #edf3ff;
    display: flex;
    list-style: none;
    padding: 0
  }

  .video-controls ul li {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    font-size: .75rem;
    justify-content: center;
    padding: 10px 0;
    text-align: center
  }

  .video-controls ul li > .label {
    display: none
  }

  .video-controls ul li:hover {
    cursor: pointer
  }

  .plan-switcher li button {
    border-radius: 9999px;
    color: #fff;
    display: inline-flex;
    font-weight: 500;
    height: 100%;
    padding: .75rem 2rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, .25);
    text-transform: uppercase;
    width: 100%
  }

  .plans .plan {
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
    margin-top: 3rem;
    max-width: 20rem;
    width: 100%
  }

  .plans .plan img {
    transition: all .3s ease
  }

  .plans .plan:hover img {
    -webkit-transform: translateY(-2px) scale(1.1);
    transform: translateY(-2px) scale(1.1)
  }

  .testimonials .testimonial {
    background-color: #fff;
    border-radius: .5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: .75rem;
    margin-top: .75rem;
    max-width: 30rem;
    width: 100%
  }

  .bg-grey-light {
    background-color: #f8f8fb
  }

  .bg-white {
    background-color: #fff
  }

  .rounded-lg {
    border-radius: .5rem
  }

  .rounded-b-lg {
    border-bottom-right-radius: .5rem
  }

  .rounded-b-lg {
    border-bottom-left-radius: .5rem
  }

  .cursor-pointer {
    cursor: pointer
  }

  .flex {
    display: flex
  }

  .flex-wrap {
    flex-wrap: wrap
  }

  .justify-center {
    justify-content: center
  }

  .justify-between {
    justify-content: space-between
  }

  .font-normal {
    font-weight: 400
  }

  .leading-normal {
    line-height: 1.5
  }

  .mb-2 {
    margin-bottom: .5rem
  }

  .mb-8 {
    margin-bottom: 2rem
  }

  .py-3 {
    padding-bottom: .75rem;
    padding-top: .75rem
  }

  .py-4 {
    padding-bottom: 1rem;
    padding-top: 1rem
  }

  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem
  }

  .relative {
    position: relative
  }

  .shadow-lg {
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08)
  }

  .text-purple {
    color: #766b93
  }

  .text-sm {
    font-size: .875rem
  }

  .text-2xl {
    font-size: 1.625rem
  }

  .hover\:no-underline:hover {
    text-decoration: none
  }

  .tracking-normal {
    letter-spacing: 0
  }

  .tracking-wide {
    letter-spacing: .05em
  }

  .w-full {
    width: 100%
  }

  * {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Rubik, sans-serif;
    outline: 0 !important
  }

  body {
    background-color: #edf3ff
  }

  h1, h2, h3, h4, h5 {
    font-weight: 400
  }

  a {
    color: #ee6d93;
    text-decoration: none
  }

  a:hover {
    color: #f63f75
  }

  @media (min-width: 768px) {
    section > .title {
      font-size: 2.25rem;
      margin-bottom: 4rem;
      margin-top: 4rem
    }
  }

  .text {
    letter-spacing: .05em;
    line-height: 1.5
  }

  .text > p:not(:last-of-type), .text > ul {
    margin-bottom: 1rem
  }

  @media (min-width: 992px) {
    .quote-wrapper {
      background: 0 0 !important;
      box-shadow: none;
      margin: 0;
      padding: 0
    }
  }

  hr {
    border-top: 2px solid #dee7ff;
    margin-bottom: 1rem;
    margin-top: 1rem
  }

  .card {
    transition: all .3s ease;
  }

  .card:hover {
    -webkit-transform: translateY(-10px);
    box-shadow: 0 8px 36px rgba(25, 8, 58, .36);
    transform: translateY(-10px)
  }
</style>
