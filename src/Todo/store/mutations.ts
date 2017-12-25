import TODO from './todo.constants';
import { MutationTree } from 'vuex'

const todoMutations: MutationTree <any> = {
    [TODO.ADD] (state: any, payload: any){
        state.todos = [...state.todos, payload];
    },
    [TODO.EDIT] (state: any, payload: any) {
        const targetKey = payload.id;
        const editedTodo = payload.editedTodo;

        state.todos.splice( state.todos.findIndex(( v: any) => v.id === targetKey), 1, payload);
    },
    [TODO.DELETE] (state: any, deleteTargetKey: any) {
        state.todos.splice(deleteTargetKey, 1);
    },
    [TODO.ALL_COMPLETE] (state: any, payload: any) {
        state.todos = payload.map( (v :any) => v.data );
    }
}

export default todoMutations;