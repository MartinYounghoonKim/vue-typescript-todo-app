export interface Todo {
    id: string,
    todo: string,
    isDone?: boolean
}

export interface Event {
	timestamp: number;
}

export interface MouseEvent extends Event {
    target: HTMLElement;
}
