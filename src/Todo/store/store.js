import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import getters from './getters.js';
import actions from './actions.js';

import TodoApi from '../api/api_core';
import TODO from '../constant/mutation-type';


Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        todos: []
    },
    getters,
    mutations: {
        [TODO.ADD] (state, payload){
            state.todos = [...state.todos, payload];
        },
        [TODO.EDIT] (state, payload) {
            const targetKey = payload.id;
            const editedTodo = payload.editedTodo;
            
            state.todos.splice( state.todos.findIndex(v => v.id === targetKey), 1, payload);
        },
        [TODO.DELETE] (state, deleteTargetKey) {
            state.todos.splice(deleteTargetKey, 1);
        },
        [TODO.ALL_COMPLETE] (state, payload) {
            state.todos = payload.map( v=>v.data );
        }
    },
    actions
});