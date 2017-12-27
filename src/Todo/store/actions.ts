import axios from 'axios';
import TODO from './todo.constants';
import TodoApi from '../api/api_core';
import { ActionTree } from 'vuex'
import { Todo } from '../Interfaces/Todo.Interface';


const todoActions: ActionTree<any, any> = {
    [TODO.ADD] ({ commit }: any, payload: string) {
        TodoApi._post('/', { todo: payload })
            .then( (res: any) => {
                commit(TODO.ADD, res.data);
            })
    },
    [TODO.EDIT] ({ commit }: any, EditedTodo: Todo) {
        const targetKey = EditedTodo.id;
        const editedTodo = EditedTodo.todo;

        TodoApi._put(`/${targetKey}`, { todo: editedTodo })
            .then((res: any)=>{
                commit(TODO.EDIT, res.data );
            })
    },
    [TODO.DELETE] ({ commit }: any, payload: any) {
        const targetKey: number = payload.targetKey;
        const deleteTargetKey: string =  payload.deleteTargetKey;

        TodoApi._delete(`/${targetKey}`)
            .then((res: any)=>{
                if(res.status===200){
                    commit(TODO.DELETE, deleteTargetKey);
                }
            })
    },
    [TODO.COMPLETE] ({ commit }: any, completedTodo: Todo) {
        const targetTodoId = completedTodo.id;
        const isDone = !completedTodo.isDone;

        TodoApi._put(`/${targetTodoId}`,{ isDone });
    },
    [TODO.ALL_COMPLETE] ({ commit, state }: any, isCompletedAll: boolean) {

        axios.all( state.todos.map( (v: any) => TodoApi._put(v.id, { isDone: isCompletedAll }) ))
            .then((res: any)=>{
                commit(TODO.ALL_COMPLETE, res );
            });
    }
}

export default todoActions;