import { Component, Vue } from 'vue-property-decorator';
import AppHeader from './components/AppHeader.vue';
import TodoList from './components/TodoList.vue';
import TodoResource from '@/Todo/api/api_core';

@Component({
    name: 'App',
    components: {
        AppHeader,
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

    get viewTodos (): any {
        return this.$store.state.todos;
    }

    addTodo (todoValue: string): void {
        this.$store.dispatch('TODO/ADD_TODOS', todoValue);
    }

}