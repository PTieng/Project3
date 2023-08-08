import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firestore } from "../../Firebase";

export interface UserType {
  id?: string | undefined;
  name: string;
  email: string;
  phone: string;
  password: string;
  userName: string;
  vaiTro: string;
  active: string;
  desc?: string;
}

interface UserState {
  users: UserType[];
}

const initialState: UserState = {
  users: [],
};

export const fetchDataUser = createAsyncThunk("firestore/user", async () => {
  const collection = await firestore.collection("users").get();
  const users = collection.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as UserType)
  );
  return users;
});

export const addUser = createAsyncThunk(
  "firestore/add",
  async (user: UserType) => {
    const collection = firestore.collection("users").add(user);
    user.id = (await collection).id;
    return user;
  }
);

export const updateUser = createAsyncThunk(
  "firestore/update",
  async (user: UserType) => {
    const { id, ...updateUser } = user;
    await firestore.collection("users").doc(id).update(updateUser);
    return user;
  }
);

export const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDataUser.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default UserSlice.reducer;
