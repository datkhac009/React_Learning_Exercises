import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  fullname: "",
  email: "",
  work:"",
  status: false,
  id: null,
  isEditing: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFullname(state, action) {
      state.fullname = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setWork(state, action) {
      state.work = action.payload;
    },
   
    addUser: {
      prepare(fullname, email ,work) {
        return { payload: { fullname, email ,work} };
      },
      reducer(state, action) {
        const { fullname, email ,work} = action.payload;
        state.fullname = fullname;
        state.email = email;
        state.work = work;
        state.status = false;
        state.users = [
          ...state.users,
          { fullname, email, work, status: false, id: crypto.randomUUID() },
        ];
        state.fullname = "";
        state.email = "";
        state.work = "";
      },
    },
    editUser(state, action ) {
      const id = action.payload;
      const checkId = state.users.find((x) => x.id === id);
      if (checkId) {
        state.id = id;
        state.fullname = checkId.fullname;
        state.email = checkId.email;
        state.work = checkId.work;
        state.isEditing = true;
      }
    },
    saveEdit: {
      prepare(newName, newEmail ,newWork) {
        return { payload: { newName, newEmail ,newWork} };
      },
      reducer(state, action) {
        const { newName, newEmail , newWork} = action.payload;
        console.log(newName, newEmail);
        const u = state.users.find((x) => x.id === state.id);
        if (!u) return;
        u.fullname = newName;
        u.email = newEmail;
        u.work = newWork;
        u.status = state.status;
        state.fullname = "";
        state.email = "";
        state.work = "";
        state.isEditing = false;
      },
    },
    removeUser(state,action){
      const id = action.payload;
      const uRemove = state.users.filter((u)=> u.id !== id);
      console.log("Done Remove");
      state.users = uRemove;
    },
    checkStatus(state,action){
        const id = action.payload
        const checkUser = state.users.find((u)=> u.id === id)
        checkUser.status = !checkUser.status;
    }
  },
});

export const { addUser, editUser, setFullname, setEmail,setWork, saveEdit ,removeUser ,checkStatus} =
  userSlice.actions;
export default userSlice.reducer;
