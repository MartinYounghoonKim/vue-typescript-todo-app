<template>
<section class="main">
    <input 
        type="checkbox" 
        class="toggle-all"
        @click="toggleAllTodo"
        :checked = "todos.every(v=> v.isDone === true)"
    />
    <ul class="todo-list">
        <todo
            v-for="todo in todos"
            :todo="todo"
            :key="todos.key"
            @deleteTodo="deleteTodo"
            @checkTodo="checkTodo"
            @editingTodo="editingTodo"
            :isEditing="isEditing"
            @startEdit="startEdit"
            @finishEdit="finishEdit"
        />
    </ul>
</section>
</template>
<script>
import Todo from './Todo.vue';

export default{
    name: 'TodoList',
    data () {
        return {
            isEditing: ''
        }
    },
    props: {
        todos: Array,
        currentLocation: String
    },
    components: {
        Todo
    },
    methods: {
        deleteTodo (deleteTargetKey) {
            this.$emit('deleteTodo', deleteTargetKey);
        },
        checkTodo (isDone, id) {
            this.$emit('completedTodo', isDone, id);
        },
        editingTodo (editedTodo, id) {
            //this.$emit('editTodo', editedTodo, id)
        },
        startEdit (editingTarget) {
            this.isEditing = editingTarget;
        },
        finishEdit (id, todo) {
            const targetId = id;
            const editedTodo = todo;

            if(this.isEditing.length<=0){
                return false;
            }
            this.$emit('editTodo', targetId, editedTodo);
            this.isEditing = '';
        },
        toggleAllTodo (e) {
            const isChecked = !e.target.checked;

            this.$emit('toggleAllTodo', isChecked)
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
        &:before{
            content: '❯';
            font-size: 22px;
            color: #e6e6e6;
            padding: 10px 27px 10px 27px;
        }
        &:checked:before{
            color: #737373;
        }
        
    }
    .todo-list {
        margin: 0;
        padding: 0;
        list-style: none;
    }
}

@media screen and (-webkit-min-device-pixel-ratio:0) {
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
