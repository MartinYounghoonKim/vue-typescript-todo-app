export interface State {
    todos: Todo[]
};
export interface Todo {
    id: number,
    todo: string,
    isDone?: boolean,
}

export const state: State = {
    todos: []
};
