import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firestore } from "../../Firebase";
export interface UserLogType {
  id?: string;
  name: string;
  time: string;
  ip: string;
  action: string;
}

interface UserLogState {
  userLog: UserLogType[];
}

const initialState: UserLogState = {
  userLog: [],
};

export const fetchDataUserLog = createAsyncThunk(
  "firestore/userLog",
  async () => {
    const collection = await firestore.collection("userLog").get();
    const userLog = collection.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as UserLogType)
    );
    return userLog;
  }
);

export const addUserLog = createAsyncThunk(
  "firestore/userlog/add",
  async (userLog: UserLogType) => {
    const collection = await firestore.collection("userLog").add(userLog);
    userLog.id = collection.id;
    return userLog;
  }
);

export const userLogSlice = createSlice({
  name: "userLog",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDataUserLog.fulfilled, (state, action) => {
        state.userLog = action.payload;
      })
      .addCase(
        addUserLog.fulfilled,
        (state, action: PayloadAction<UserLogType>) => {
          state.userLog.push(action.payload);
        }
      );
  },
});

export default userLogSlice.reducer;
