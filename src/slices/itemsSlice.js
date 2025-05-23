import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

// 🔄 Thunks
export const fetchItems = createAsyncThunk('items/fetchItems', async (userId) => {
    const snapshot = await getDocs(collection(db, 'users', userId, 'items'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addItem = createAsyncThunk('items/addItem', async ({ userId, name, cost }) => {
    const docRef = await addDoc(collection(db, 'users', userId, 'items'), { name, cost });
    return { id: docRef.id, name, cost };
});

export const updateItem = createAsyncThunk('items/updateItem', async ({ userId, id, name, cost }) => {
    const itemRef = doc(db, 'users', userId, 'items', id);
    await updateDoc(itemRef, { name, cost });
    return { id, name, cost };
});

export const deleteItem = createAsyncThunk('items/deleteItem', async ({ userId, id }) => {
    await deleteDoc(doc(db, 'users', userId, 'items', id));
    return id;
});

// 🧠 Slice
const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        list: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(addItem.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                const index = state.list.findIndex(i => i.id === action.payload.id);
                if (index !== -1) state.list[index] = action.payload;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.list = state.list.filter(i => i.id !== action.payload);
            });
    }
});

export default itemsSlice.reducer;
