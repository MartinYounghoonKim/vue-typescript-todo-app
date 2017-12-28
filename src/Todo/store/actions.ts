import TODO from './todo.constants';
import TodoApi from '../api/api_core';
import { ActionTree } from 'vuex'
import { Todo } from '../Interfaces/Todo.Interface';


const todoActions: ActionTree<any, any> = {
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
    }
}

export default todoActions;