// src/redux/otherCostsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchOtherCosts = createAsyncThunk('otherCosts/fetch', async (userId) => {
    const snapshot = await getDocs(collection(db, 'users', userId, 'otherCosts'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addOtherCost = createAsyncThunk('otherCosts/add', async ({ userId, description, amount }) => {
    const docRef = await addDoc(collection(db, 'users', userId, 'otherCosts'), { description, amount });
    return { id: docRef.id, description, amount };
});

export const updateOtherCost = createAsyncThunk('otherCosts/update', async ({ userId, id, description, amount }) => {
    await updateDoc(doc(db, 'users', userId, 'otherCosts', id), { description, amount });
    return { id, description, amount };
});

export const deleteOtherCost = createAsyncThunk('otherCosts/delete', async ({ userId, id }) => {
    await deleteDoc(doc(db, 'users', userId, 'otherCosts', id));
    return id;
});

const otherCostsSlice = createSlice({
    name: 'otherCosts',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOtherCosts.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(addOtherCost.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateOtherCost.fulfilled, (state, action) => {
                const i = state.list.findIndex(x => x.id === action.payload.id);
                if (i !== -1) state.list[i] = action.payload;
            })
            .addCase(deleteOtherCost.fulfilled, (state, action) => {
                state.list = state.list.filter(x => x.id !== action.payload);
            });
    },
});

export default otherCostsSlice.reducer;