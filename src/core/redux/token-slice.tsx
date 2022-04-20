import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
	value: string | null;
}

const initialState: CounterState = {
	value: null,
};

export const tokenSlice = createSlice({
	name: "token",
	initialState,
	reducers: {
		login: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { login } = tokenSlice.actions;

export default tokenSlice.reducer;
