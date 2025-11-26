import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  title: "",
  description: "",
  statusWork: "Haven't started yet",
  filterStatusWork: "All Status",
  deadline: "",
  id: null,
  isEditing: false,
  filterBy: "alluser",
  filterDeadline: "all",
  showWorkLimit: 4,
};

const WorkSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
    setDescription(state, action) {
      state.description = action.payload;
    },
    setDeadline(state, action) {
      state.deadline = action.payload;
    },
    setStatus(state, action) {
      state.statusWork = action.payload;
      console.log(state.status);
    },
    setFilterStatusWork(state, action) {
      state.filterStatusWork = action.payload;
    },
    setInitialUsers(state, action) {
      state.users = action.payload || [];
    },
    setFilterDeadline(state, action) {
      state.filterDeadline = action.payload;
    },
    setShowWorkLimit: (state, action) => {
      state.showWorkLimit = action.payload;
    },
    addListWork: {
      prepare(title, description, deadline, statusWork) {
        return { payload: { title, description, deadline, statusWork } };
      },
      reducer(state, action) {
        const { title, description, deadline, statusWork } = action.payload;
        const defaultStatusWork = "Haven't started yet";
        state.title = title;
        state.description = description;
        state.deadline = deadline;
        state.statusWork = statusWork;
        state.status = false;
        const newWork = {
          title,
          description,
          deadline,
          statusWork: defaultStatusWork,
          id: crypto.randomUUID(),
        };
        state.users.unshift(newWork); // unshift thêm 1 phần tử vào đầu mảng
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
        state.statusWork = checkId.statusWork;
        state.isEditing = true;
      }
    },
    saveEdit: {
      prepare(newTitle, newDescription, newDeadline, newsSatusWork) {
        return {
          payload: { newTitle, newDescription, newDeadline, newsSatusWork },
        };
      },
      reducer(state, action) {
        const { newTitle, newDescription, newDeadline, newsSatusWork } =
          action.payload;
        const u = state.users.find((x) => x.id === state.id);
        if (!u) return;
        u.title = newTitle;
        u.description = newDescription;
        u.deadline = newDeadline;
        u.statusWork = newsSatusWork;
        // state.users.unshift(u)
        state.title = "";
        state.description = "";
        state.deadline = "";
        state.statusWork = "";
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
  setStatus,
  setDeadline,
  setInitialUsers,
  setFilterDeadline,
  setShowWorkLimit,
  saveEdit,
  removeWork,
  setFilterWork,
  setFilterStatusWork,
} = WorkSlice.actions;
export default WorkSlice.reducer;
