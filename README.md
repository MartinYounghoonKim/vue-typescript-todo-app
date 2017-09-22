# vue-todo

> Todo App with Vuejs and Vuex

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
dpd db/app.dpd -d
need to set deployd collection
  - todos :
    - id
    - todo(string, required)
    - isDone(boolean)
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
