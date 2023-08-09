import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firestore } from "../../Firebase";

export interface VaiTroType {
  id?: string;
  name: string;
  desc: string;
}

interface VaiTroState {
  vaiTro: VaiTroType[];
}

const initialState: VaiTroState = {
  vaiTro: [],
};

export const fetchDataVaiTro = createAsyncThunk(
  "firestore/vaitro",
  async () => {
    const collection = await firestore.collection("vaiTro").get();
    const vaiTro = collection.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as VaiTroType)
    );
    return vaiTro;
  }
);

export const addVaiTro = createAsyncThunk(
  "firestore/add",
  async (vaiTro: VaiTroType) => {
    const collection = await firestore.collection("vaiTro").add(vaiTro);
    vaiTro.id = collection.id;
    return vaiTro;
  }
);

export const updateVaiTro = createAsyncThunk(
  "firestorre/udpate",
  async (vaiTro: VaiTroType) => {
    const { id, ...updateVaiTro } = vaiTro;
    await firestore.collection("vaiTro").doc(id).update(updateVaiTro);
    return vaiTro;
  }
);

export const vaiTroSlice = createSlice({
  name: "vaiTro",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateVaiTro.fulfilled, (state, action) => {
        const index = state.vaiTro.findIndex(
          (vaiTro) => vaiTro.id === action.payload.id
        );
        if (index !== -1) {
          state.vaiTro[index] = action.payload;
        }
      })
      .addCase(fetchDataVaiTro.fulfilled, (state, action) => {
        state.vaiTro = action.payload;
      })
      .addCase(
        addVaiTro.fulfilled,
        (state, action: PayloadAction<VaiTroType>) => {
          state.vaiTro.push(action.payload);
        }
      );
  },
});
export default vaiTroSlice.reducer;
