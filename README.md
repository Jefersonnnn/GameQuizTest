# gametest

> Jogo para materia de teste

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

```

{
  "title": "Quiz about Foo",
  "questions": [
    {
      "text": "Is true true?",
      "type": "tf",
      "answer": "t"
    },
    {
      "text": "Is false true?",
      "type": "tf",
      "answer": "f"
    },
    {
      "text": "What is the best beer?",
      "type": "mc",
      "answers": [
        "Coors",
        "Miller",
        "Bud",
        "Anchor Steam"
      ],
      "answer": "Anchor Steam"
    },
    {
      "text": "What is the best cookie?",
      "type": "mc",
      "answers": [
        "Chocolate Chip",
        "Sugar",
        "Beer"
      ],
      "answer": "Sugar"
    }
  ]
}
```
