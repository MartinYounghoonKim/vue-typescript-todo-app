import { Component, Vue } from 'vue-property-decorator';
import TodoResource from './api/api_core';
import TODO from './store/todo.constants';
import { Todo } from './interfaces/Todo.Interface';

import TodoList from './components/TodoList.vue';

@Component({
    name: 'App',
    components: {
        TodoList
    }
})


export default class Hello extends Vue {
    currentLocation: string = window.location.pathname;
    todoFilters: any = [ '/all', '/active', '/completed']

    beforeMount (): void {
        TodoResource.get('/')
            .then( (res: any) => {
                this.$store.state.todos = res.data;
            })
    }

    get viewTodos (): Todo {
        return this.$store.state.todos.filter( this.getCurrentLocation );
    }

    getCurrentLocation (todo: Todo): any {
        switch(true){
            case this.currentLocation === '/all' || this.currentLocation === '/' :
            return true;
            case this.currentLocation === '/active' && !todo.isDone :
            return true;
            case this.currentLocation === '/completed' && todo.isDone :
            return true;
        }
    }

    editTodo (id: string, todo: string): void {
        this.$store.dispatch(TODO.EDIT, { id, todo } );
    }

    deleteTodo (targetKey: string): void {
        const deleteTargetKey=this.$store.state.todos.findIndex( (v: any) => targetKey === v.id );

        this.$store.dispatch(TODO.DELETE, { deleteTargetKey, targetKey });
    }
    completedTodo (checked: boolean, id: string): void {
        const isDone = checked;

        this.$store.dispatch(TODO.COMPLETE, { isDone, id });
    }


}