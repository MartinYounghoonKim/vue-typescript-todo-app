<template>
	<section class="main">
		<input
			type="checkbox"
			@click="toggleAllTodo"
			class="toggle-all"
			:checked = "isAllChecked"
		/>
		<ul class="todo-list">
			<todo-item
				v-for="todo in viewTodos"
				:todo="todo"
				:key="todo.index"
				:isEditing="isEditing"
				@deleteTodo="deleteTodo"
				@checkTodo="checkTodo"
				@startEdit="startEdit"
				@finishEdit="finishEdit"
			></todo-item>
		</ul>
	</section>
</template>
<script lang="ts">
	import {Component, Vue, Prop} from 'vue-property-decorator';
	import { Getter } from 'vuex-class';
	import TodoItem from './TodoItem.vue';

	@Component({
		name: "TodoList",
		components: {
			TodoItem
		}
	})
	export default class TodoList extends Vue {
        isEditing: string = '';
        @Getter isAllChecked: boolean

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

        deleteTodo(deleteTargetKey: any): void {
            this.$emit('deleteTodo', deleteTargetKey);
		}

        checkTodo(isDone: boolean, id: string): void {
            this.$emit('completedTodo', isDone, id);
		}

        startEdit(editingTarget: string): void {
            this.isEditing = editingTarget;
		}

        finishEdit(id: string, todo: string): any {
            const targetId: string = id;
            const editedTodo: string = todo;
            if(this.isEditing.length<=0){
                return false;
            }
            this.$emit('editTodo', targetId, editedTodo);
            this.isEditing = '';
		}

        toggleAllTodo (event: any) {
            const isChecked = !event.target.checked;
            this.$emit('toggleAllTodo', isChecked)
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