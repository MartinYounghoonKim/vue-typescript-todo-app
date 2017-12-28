import { GetterTree } from 'vuex'


const todoGetters: GetterTree<any, any> = {
    isAllChecked (state: any) {
        return state.todos.every( (todo: any) => todo.isDone === true);
    }
};

export default todoGetters;