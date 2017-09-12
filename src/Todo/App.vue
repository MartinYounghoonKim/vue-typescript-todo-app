<template>
  <div id="app">
    <div class="todoapp">
    	<app-header
			@addTodo="addTodo"
		/>
		<todo-list
			:todos="todos"
			@deleteTodo="deleteTodo"
			@completedTodo="completedTodo"
			@editTodo= "editTodo"
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
import TodoApi from './api/api_core.js';

export default {
  name: 'app',
  data () {
		return {
			todos: [],
			currentLocation: window.location.pathname,
			todoFilters: [
				'/all',
                '/active',
                '/completed'
			]
		}
	},
	beforeMount (){
		TodoApi.get(`/`)
		.then((result) => {
			this.todos = result.data;
		});
	},
	methods: {
		addTodo (text) {
			TodoApi.post(`/`,{
				todo: text
			})
			.then((result)=>{
				this.todos = [...this.todos, result.data];
				this.currentLocation = '/test'
			})
		},
		editTodo (editedTodo, id) {
			console.log(editedTodo+ '/'+ id);
		},
		deleteTodo (targetKey) {
			const deleteTargetKey=this.todos.findIndex( v => targetKey === v.id );

			TodoApi.delete(`/${targetKey}`)
			.then((result)=>{
				if(result.status===200){
					this.todos.splice(deleteTargetKey, 1);
				}
			})
			.catch((err)=>{
				console.log(err)
			})
		},
		completedTodo (checked, id) {
			const isDone = checked;
			const primayKey = id;
			
			TodoApi.put(`/${primayKey}`,{
				isDone: isDone
			})
			.then((res)=>{
				if(res.status===200) {
					console.log("Check Success");
				}
			})
			.catch((err)=>{
				console.log(err)
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
