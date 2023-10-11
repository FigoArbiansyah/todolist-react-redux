import { createSlice } from '@reduxjs/toolkit';

export const todolistSlice = createSlice({
    name: 'todolist',
    initialState: {
        value: [{ id: 1, title: 'Title Default', body: 'Body Default', completed: false }]
    },
    reducers: {
        addTodo: (state, action) => {
            try {
                if (action.payload) {
                    // Tambahkan data
                    state?.value?.unshift(action.payload);
                    // Jika data yang ditambahkan sudah ada, maka dia akan diedit saja
                    const checkExistingData = state?.value?.find((item) => {
                        if (item?.id?.toString() === action?.payload?.id?.toString()) {
                            // Kalau ada
                            return true;
                        }
                        // Kalau gaada
                        return false;
                    })
                    if (checkExistingData) {
                        const filteredData = state?.value?.filter((item) => item?.id?.toString() !== action?.payload?.id?.toString())
                        state.value = filteredData;
                        if (action?.payload?.completed) {
                            // Jika dia sudah terselesaikan todo nya
                            state?.value?.push(action.payload);
                        } else {
                            // Jika dia belum terselesaikan todo nya
                            state?.value?.unshift(action.payload);
                        }
                    }
                } else {
                    throw Error;
                }
            } catch (error) {
                console.log(error)
            }
        },
        deleteTodo: (state, action) => {
            try {
                // Cari data yang tidak termasuk pada id yang dikirim
                const filteredState = state?.value?.filter((item) => item?.id?.toString() !== action?.payload?.toString());
                if (filteredState) {
                    // Set state dengan data yang sudah ter-filter
                    state.value = filteredState;
                } else {
                    throw Error;
                }
            } catch (error) {
                console.log(error)
            }
        },
        checkTodo: (state, action) => {
            try {
                // Cari data yang sama dengan id yang dikirim
                const filteredState = state?.value?.find((item) => item?.id?.toString() === action?.payload?.toString());
                // Ubah key completed nya menjadi !completed
                filteredState.completed = !filteredState.completed;
                // Cari index nya
                const getIndex = state?.value?.indexOf(filteredState);
                if (getIndex >= 0) {
                    // Hapus terlebih dahulu data nya
                    state?.value?.splice(getIndex, 1);
                    // Kemudian ditambahkan lagi dengan data yang sudah diubah completednya
                    state?.value?.push(filteredState);
                } else {
                    throw Error;
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
})

export const { addTodo, deleteTodo, checkTodo } = todolistSlice.actions;

export default todolistSlice.reducer