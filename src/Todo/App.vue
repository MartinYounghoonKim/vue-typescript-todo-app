<template>
  <div id="app">
    <div class="todoapp">
    	<app-header
			@addTodo="addTodo"
		/>
		<todo-list
			:todos="viewTodos"
			@deleteTodo="deleteTodo"
			@completedTodo="completedTodo"
			@editTodo= "editTodo"
			:currentLocation="currentLocation"
			@toggleAllTodo="toggleAllTodo"
		/>
		<app-footer
			:todoFilters="todoFilters"
			:currentLocation="currentLocation"
			@changeLocation="changeLocation"
		/>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue';
import AppFooter from './components/Footer.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';
import TodoApi from './api/api_core.js';

export default {
  name: 'app',
  data () {
		return {
			currentLocation: window.location.pathname,
			todoFilters: [
				'/all',
                '/active',
                '/completed'
			]
		}
	},
	computed: {
		viewTodos () {
			return this.$store.state.todos.filter(todo => {
				switch(true){
					case this.currentLocation === '/all' || this.currentLocation === '/' : 
						return true;
					break;
					case this.currentLocation === '/active' && !todo.isDone : 
						return true;
					break;
					case this.currentLocation === '/completed' && todo.isDone : 
						return true;
					break;
				}
				
			})
		}
	},
	beforeMount (){
		TodoApi.get(`/`)
		.then((result) => {
			this.$store.state.todos = result.data;
			//this.todos = result.data;
		});
	},
	methods: {
		addTodo (userValue) {
			this.$store.commit('addTodos', userValue);
		},
		editTodo (id, editedTodo ) {
			TodoApi.put(`/${id}`, {
				todo: editedTodo
			})
			.then((result)=>{
				//this.todos.splice(this.todos.findIndex(v => v.id === result.data.id), 1, result.data);
				this.$store.state.todos.splice(this.$store.state.todos.findIndex(v => v.id === result.data.id), 1, result.data)
			})
		},
		deleteTodo (targetKey) {
			const deleteTargetKey=this.$store.state.todos.findIndex( v => targetKey === v.id );

			TodoApi.delete(`/${targetKey}`)
			.then((result)=>{
				if(result.status===200){
					this.$store.state.todos.splice(deleteTargetKey, 1);
				}
			})
		},
		completedTodo (checked, id) {
			const isDone = checked;
			const primayKey = id;
			
			TodoApi.put(`/${primayKey}`,{
				isDone: isDone
			})
		},
		changeLocation (currentLocation) {
			if(currentLocation.length<0) return false;
			this.currentLocation = currentLocation;
			window.history.pushState(
				null,
				'',
				this.currentLocation
			)
		},
		toggleAllTodo (toggleTodos) {
			const isDoneAll = !this.$store.state.todos.every(v=>v.isDone === true );
			axios.all(
				this.$store.state.todos.map( 
					v=> TodoApi.put(v.id,{ isDone: isDoneAll} )
				)
			)
			.then((result)=>{
				this.$store.state.todos = result.map(v=>v.data);
			})
		}
	},
  components: {
    AppHeader,
	AppFooter,
	TodoList
  }
}
</script>

<style lang="scss">

body {
	margin: 0;
	padding: 0;
}

button {
	margin: 0;
	padding: 0;
	border: 0;
	background: none;
	font-size: 100%;
	vertical-align: baseline;
	font-family: inherit;
	font-weight: inherit;
	color: inherit;
	-webkit-appearance: none;
	appearance: none;
	-webkit-font-smoothing: antialiased;
	-moz-font-smoothing: antialiased;
	font-smoothing: antialiased;
}

body {
	font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
	line-height: 1.4em;
	background: #f5f5f5;
	color: #4d4d4d;
	min-width: 230px;
	max-width: 550px;
	margin: 0 auto;
	-webkit-font-smoothing: antialiased;
	-moz-font-smoothing: antialiased;
	font-smoothing: antialiased;
	font-weight: 300;
}

button,
input[type="checkbox"] {
	outline: none;
}

.hidden {
	display: none;
}

.todoapp {
	background: #fff;
	margin: 130px 0 40px 0;
	position: relative;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
	            0 25px 50px 0 rgba(0, 0, 0, 0.1);
}
label{
	margin:0;
	padding:0;
}
</style>
