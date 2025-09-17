import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  fullname: "",
  email: "",
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
    addUser: {
      prepare(fullname, email) {
        return { payload: { fullname, email } };
      },
      reducer(state, action) {
        const { fullname, email } = action.payload;
        state.fullname = fullname;
        state.email = email;
        state.status = false;
        state.users = [
          ...state.users,
          { fullname, email, status: false, id: crypto.randomUUID() },
        ];
        state.fullname = "";
        state.email = "";
      },
    },
    editUser(state, action) {
      const id = action.payload;
      const newUser = state.users.find((x) => x.id === id);
      if (newUser){
        newUser.id= state.id
        newUser.fullname = state.fullname
        newUser.email = state.email
        newUser.status = state.status
        state.isEditing = true;
      
      }
    },
    newUser(state, action) {
      const{fullname,email} = action.payload
     // const { fullname, email } = action.payload;
         state.users = [
            ...state.users,
            { fullname: fullname,email:email, id:state.id },
          ]
      state.fullname = "";
      state.email = "";
      state.status = false;
      state.id = crypto.randomUUID();
      state.isEditing = false;
    },
  },
});

export const { addUser, editUser, setFullname, setEmail, newUser } =
  userSlice.actions;
export default userSlice.reducer;
