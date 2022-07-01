import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';

const routes = {
  dataPath: () => 'https://jsonplaceholder.typicode.com/users',
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const { data } = await axios.get(routes.dataPath());
    return data;
  },
);

const usersAdapter = createEntityAdapter();

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({ isLoading: true }),
  reducers: {
    updateUser: usersAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      usersAdapter.addMany(state, payload);
    });
  },
});

export const { actions } = usersSlice;
export const selectors = usersAdapter.getSelectors(({ users }) => users);
export default usersSlice.reducer;