// import axios from 'axios';
import TODO from './todo.constants';
import TodoApi from '../api/api_core';
import { ActionTree } from 'vuex'


const todoActions: ActionTree<any, any> = {
    [TODO.ADD] ({ commit }: any, payload: any) {
        TodoApi._post('/', {
           todo: payload
        })
            .then( (res: any) => {
                commit(TODO.ADD, res.data);
            })
    },
    // [TODO.EDIT] ({ commit }: any, payload: any) {
    //     const targetKey = payload.id;
    //     const editedTodo = payload.editedTodo;
    //
    //     TodoApi._put(`/${targetKey}`, {
    //         todo: editedTodo
    //     })
    //         .then((res: any)=>{
    //             commit(TODO.EDIT, res.data );
    //         })
    // },
    // [TODO.DELETE] ({ commit }: any, payload: any) {
    //     const targetKey = payload.targetKey;
    //     const deleteTargetKey =  payload.deleteTargetKey;
    //
    //     TodoApi.delete(`/${targetKey}`)
    //         .then((res: any)=>{
    //             if(res.status===200){
    //                 commit(TODO.DELETE, deleteTargetKey);
    //             }
    //         })
    // },
    // [TODO.COMPLETE] ({ commit }: any, payload: any) {
    //     const primayKey = payload.primayKey;
    //     const isDone = payload.isDone;
    //
    //     TodoApi.put(`/${primayKey}`,{
    //         isDone: isDone
    //     })
    // },
    // [TODO.ALL_COMPLETE] ({ commit, state }: any, payload: any) {
    //     const isCompleteAll = payload;
    //
    //     axios.all(
    //         state.todos.map(
    //             (v: any)=> TodoApi.put(v.id, { isDone: isCompleteAll })
    //         )
    //     )
    //         .then((res: any)=>{
    //             commit(TODO.ALL_COMPLETE, res );
    //         })
    // }
}

export default todoActions;