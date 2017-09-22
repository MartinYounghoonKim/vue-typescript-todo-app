import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import TodoApi from '../api/api_core';
import TODO from '../constant/mutation-type';


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
        [TODO.ADD] (state, payload){
            TodoApi.post(`/`,{
				todo: payload
			})
			.then((result)=>{
				state.todos = [...state.todos, result.data];
			})
        },
        [TODO.EDIT] (state, payload) {
            const targetKey = payload.id;
            const editedTodo = payload.editedTodo;

            TodoApi.put(`/${targetKey}`, {
				todo: editedTodo
			})
			.then((result)=>{
				state.todos.splice( state.todos.findIndex(v => v.id === result.data.id), 1, result.data);
			})
        },
        [TODO.DELETE] (state, payload) {
            const targetKey = payload.targetKey;
            const deleteTargetKey =  payload.deleteTargetKey;

            TodoApi.delete(`/${targetKey}`)
			.then((result)=>{
				if(result.status===200){
					state.todos.splice(deleteTargetKey, 1);
				}
			})
        },
        [TODO.COMPLETE] (state, payload) {
            const primayKey = payload.primayKey;
            const isDone = payload.isDone;
            
            TodoApi.put(`/${primayKey}`,{
				isDone: isDone
			})
        },
        [TODO.ALL_COMPLETE] (state, payload) {
            const isCompleteAll = payload;

            axios.all(
				state.todos.map( 
					v=> TodoApi.put(v.id, { isDone: isCompleteAll })
				)
			)
			.then((result)=>{
                state.todos = result.map( v=>v.data );
			})
        }
    }
});