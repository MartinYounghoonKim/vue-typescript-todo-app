<template>
  <div id="app">
    <div class="todoapp">
      <app-header
				@addTodo="addTodo"
			/>
			<todo-list
				:todos="todos"
				@deleteTodo="deleteTodo"
			/>
      <app-footer/>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue';
import AppFooter from './components/Footer.vue';
import TodoList from './components/TodoList.vue';
export default {
  name: 'app',
  data () {
    return {
			todos: [
					{
							key: 0,
							name: '투두앱1',
							isDone: true
					},{
							key: 1,
							name: '투두앱2',
							isDone: false
					},{
							key: 2,
							name: '투두앱3',
							isDone: false
					}
			]
    }
	},
	methods: {
		addTodo (text) {
			const name = text;
			const key = Date.now();
			const isDone = false;
			this.todos = [...this.todos, { key, name, isDone }];
		},
		deleteTodo (targetKey) {
			const deleteTargetKey=this.todos.findIndex( v => targetKey === v.key );
			this.todos.splice(deleteTargetKey, 1);
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
