import { Component, Vue } from 'vue-property-decorator';
import TodoResource from './api/api_core';
import TODO from './store/todo.constants';
import { Todo } from './interfaces/Todo.Interface';

import AppHeader from './components/AppHeader.vue';
import TodoList from './components/TodoList.vue';
import AppFooter from './components/AppFooter.vue';

@Component({
    name: 'App',
    components: {
        AppHeader,
        TodoList,
        AppFooter
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
        return this.$store.state.todos.filter( this.test12 );
    }

    test12 (todo: Todo): any {
        switch(true){
            case this.currentLocation === '/all' || this.currentLocation === '/' :
            return true;
            case this.currentLocation === '/active' && !todo.isDone :
            return true;
            case this.currentLocation === '/completed' && todo.isDone :
            return true;
        }
    }

    addTodo (todoValue: string): void {
        this.$store.dispatch('TODO/ADD_TODOS', todoValue);
    }

    editTodo (id: string, editedTodo: string) {
        this.$store.dispatch(TODO.EDIT, { id, editedTodo } );
    }

    deleteTodo (targetKey: any) {
        const deleteTargetKey=this.$store.state.todos.findIndex( (v: any) => targetKey === v.id );

        this.$store.dispatch(TODO.DELETE, { deleteTargetKey, targetKey });
    }
    completedTodo (checked: any, id: string) {
        const isDone: any = checked;
        const primayKey: string = id;

        this.$store.dispatch(TODO.COMPLETE, { isDone, primayKey});
    }
    toggleAllTodo (toggleTodos: any) {
        const isDoneAll = !this.$store.state.todos.every((v: any) => v.isDone === true );
        this.$store.dispatch(TODO.ALL_COMPLETE, isDoneAll);
    }
    changeLocation (currentLocation: any): any {
        if(currentLocation.length<0) return false;
        this.currentLocation = currentLocation;
        window.history.pushState(
            null,
            '',
            this.currentLocation
        )
    }


}