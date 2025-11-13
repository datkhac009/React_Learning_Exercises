import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  fullname: "",
  email: "",
  title: "",
  description:"",
  status: false,
  deadline :"",
  id: null,
  isEditing: false,
  filterBy: "alluser",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // setFullname(state, action) {
    //   state.fullname = action.payload;
    // },
    // setEmail(state, action) {
    //   state.email = action.payload;
    // },
    setTitle(state, action) {
      state.title = action.payload;
    },
    setDescription(state,action){
      state.description = action.payload;
    },
    setDeadline(state,action){
      state.deadline = action.payload;
    },

    addListWork: {
      prepare(title, description, deadline) {
        return { payload: { title, description, deadline} };
      },
      reducer(state, action) {
        const { title, description, deadline } = action.payload;
        state.title = title;
        state.description = description;
        state.deadline = deadline;
        state.status = false;
        state.users = [
          ...state.users,
          { title, description, deadline, status: false, id: crypto.randomUUID() },
        ];
        state.title = "";
        state.description = "";
        state.deadline = "";
      },
    },
    editListWork(state, action) {
      const id = action.payload;
      const checkId = state.users.find((x) => x.id === id);
      if (checkId) {
        state.id = id;
        state.title = checkId.title;
        state.description = checkId.description;
        state.deadline = checkId.deadline;
        state.isEditing = true;
      }
    },
    saveEdit: {
      prepare(newTitle, newDescription, newDeadline) {
        return { payload: { newTitle, newDescription, newDeadline } };
      },
      reducer(state, action) {
        const { newTitle, newDescription, newDeadline } = action.payload;
        // console.log(newName, newEmail);
        const u = state.users.find((x) => x.id === state.id);
        if (!u) return;
        u.title = newTitle;
        u.description = newDescription;
        u.deadline = newDeadline;
        state.title = "";
        state.description = "";
        state.deadline = "";
        state.isEditing = false;
      },
    },
    removeWork(state, action) {
      const id = action.payload;
      const uRemove = state.users.filter((u) => u.id !== id);
      console.log("Done Remove");
      state.users = uRemove;
      state.title = "";
      state.description = "";
      state.deadline = "";
      state.isEditing = false;
    },
    checkStatus(state, action) {
      const id = action.payload;
      const checkDeadline = state.users.find((u) => u.id === id);
      if (checkDeadline) checkDeadline.status = !checkDeadline.status;
    },

    setFilterWork(state, action) {
      state.filterBy = action.payload;
        
    },
  },
});

export const {
  addListWork,
  editListWork,
  setTitle,
  setDescription,
  setDeadline,
  saveEdit,
  removeWork,
  checkStatus,
  setFilterWork,
} = userSlice.actions;
export default userSlice.reducer;
