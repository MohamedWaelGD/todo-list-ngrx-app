export interface TodoItem {
    id: string;
    title: string;
    createdAt: Date;
    isCompleted: boolean;
}

export interface AddTodoItem {
    title: string;
}

export interface UpdateTodoItem {
    title: string;
    isCompleted: boolean;
}