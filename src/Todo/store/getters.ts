import { GetterTree } from 'vuex'


const todoGetters: GetterTree<any, any> = {
    isAllChecked (state: any) {
        return state.todos.every( (todo: any) => todo.isDone === true);
    },
    getTodosCounter (state: any) {
        return state.todos.filter( (v: any) => v.isDone === true ).length;
    }
};

export default todoGetters;