<template>
	<section class="main">
		<input
			type="checkbox"
			class="toggle-all"/>
		<ul class="todo-list">
			<todo
				v-for="todo in viewTodos"
				:todo="todo"
				:key="todo.index"
			></todo>
		</ul>
	</section>
</template>
<script lang="ts">
	import {Component, Vue, Prop} from 'vue-property-decorator';
	import Todo from './Todo.vue';

	@Component({
		name: "TodoList",
		components: {
			Todo
		}
	})
	export default class TodoList extends Vue {
		@Prop()
		viewTodos: Array<object>


		addTodo(e: object): void {
			const textElement = event.target;
			const userValue = (<HTMLInputElement>textElement).value;
			if (userValue.length) {
				(<HTMLInputElement>textElement).value = '';
				this.$emit('addTodo', userValue);
			}
		}
	}

</script>
<style lang="scss">

	.main {
		position: relative;
		z-index: 2;
		border-top: 1px solid #e6e6e6;
		label[for='toggle-all'] {
			display: none;
		}

		.toggle-all {
			position: absolute;
			top: -55px;
			left: -12px;
			width: 60px;
			height: 34px;
			text-align: center;
			border: none; /* Mobile Safari */
			&:before {
				content: '❯';
				font-size: 22px;
				color: #e6e6e6;
				padding: 10px 27px 10px 27px;
			}
			&:checked:before {
				color: #737373;
			}

		}
		.todo-list {
			margin: 0;
			padding: 0;
			list-style: none;
		}
	}

	@media screen and (-webkit-min-device-pixel-ratio: 0) {
		.toggle-all,
		.todo-list li .toggle {
			background: none;
		}
		.todo-list li .toggle {
			height: 40px;
		}
		.toggle-all {
			-webkit-transform: rotate(90deg);
			transform: rotate(90deg);
			-webkit-appearance: none;
			appearance: none;
		}
	}
</style>