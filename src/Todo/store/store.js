import Vue from 'vue';
import Vuex from 'vuex';

import TodoApi from '../api/api_core';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        todos: [],
        counter: 1
    },
    getters: {
        isAllChecked (state) {
            return state.todos.every( todo => todo.isDone === true);
        },
        getTodosCounter (state){
            return state.todos.filter( v=> v.isDone === true ).length;
        }
    },
    mutations: {
        addTodos (state, payload){
            TodoApi.post(`/`,{
				todo: payload
			})
			.then((result)=>{
				state.todos = [...state.todos, result.data];
			})
        }
    }
});