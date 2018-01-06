# vue-todo

> Todo App with Vuejs and Vuex.

## Features
 - Vue 2.5.2
 - Vuex 3.0.1
 - Typescript 2.6.2
 - Karma + Mocha

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# install deployd
npm install deployd
dpd create db
dpd db -d
need to set deployd `Collection`
  - todos :
    - id
    - todo(string, required)
    - isDone(boolean)
```
