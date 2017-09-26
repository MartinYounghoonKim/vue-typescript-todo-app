import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import TodoApi from '../api/api_core';
import TODO from '../constant/mutation-type';


Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        todos: []
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
    actions: {
        [TODO.ADD] ({ commit }, payload) {
            TodoApi.post(`/`,{
				todo: payload
			})
			.then((result)=>{
                commit(TODO.ADD, result.data)
			});
        },
        [TODO.EDIT] ({ commit }, payload) {
            const targetKey = payload.id;
            const editedTodo = payload.editedTodo;

            TodoApi.put(`/${targetKey}`, {
				todo: editedTodo
			})
			.then((result)=>{
                commit(TODO.EDIT, result.data );
			})
        },
        [TODO.DELETE] ({ commit }, payload) {
            const targetKey = payload.targetKey;
            const deleteTargetKey =  payload.deleteTargetKey;

            TodoApi.delete(`/${targetKey}`)
			.then((result)=>{
				if(result.status===200){
                    commit(TODO.DELETE, deleteTargetKey);
				}
			})
        },
        [TODO.COMPLETE] (commit, payload) {
            const primayKey = payload.primayKey;
            const isDone = payload.isDone;
            
            TodoApi.put(`/${primayKey}`,{
				isDone: isDone
			})
        },
        [TODO.ALL_COMPLETE] ({ commit, state }, payload) {
            const isCompleteAll = payload;

            axios.all(
				state.todos.map( 
					v=> TodoApi.put(v.id, { isDone: isCompleteAll })
				)
			)
            .then((result)=>{
                commit(TODO.ALL_COMPLETE, result );
			})
        }
    }
});