import TODO from './todo.constants';
import { MutationTree } from 'vuex'
import { Todo } from '../Interfaces/Todo.Interface';

const todoMutations: MutationTree <any> = {
    [TODO.EDIT] (state: any, editedTodo: Todo) {
        const targetKey = editedTodo.id;

        state.todos.splice( state.todos.findIndex(( v: any) => v.id === targetKey), 1, editedTodo);
    },
    [TODO.DELETE] (state: any, deleteTargetKey: number) {
        state.todos.splice(deleteTargetKey, 1);
    }
}

export default todoMutations;