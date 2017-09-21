import Vue from 'vue';
import App from './Todo/App.vue';

import { store } from './Todo/store/store.js';

new Vue({
    el: '#app',
    store,
    render: h => h(App)
});
