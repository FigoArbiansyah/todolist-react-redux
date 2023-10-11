import { configureStore } from '@reduxjs/toolkit';
import todolistReducer from './reducers/todolist';

export default configureStore({
    reducer: {
        todolist: todolistReducer
    }
})