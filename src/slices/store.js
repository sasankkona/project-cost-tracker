import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import itemsReducer from './itemsSlice';
import otherCostsReducer from './otherCostsSlice';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('projectCostTrackerState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.warn('Failed to load state from localStorage:', err);
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('projectCostTrackerState', serializedState);
    } catch (err) {
        console.warn('Failed to save state to localStorage:', err);
    }
};

const persistedState = loadState();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        items: itemsReducer,
        otherCosts: otherCostsReducer,
    },
    preloadedState: persistedState,
});

store.subscribe(() => {
    saveState({
        auth: store.getState().auth,
        items: store.getState().items,
        otherCosts: store.getState().otherCosts,
    });
});
