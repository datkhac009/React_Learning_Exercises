import { createSelector } from "@reduxjs/toolkit";
// Lấy đúng theo key slice trong store: state.user
export const selectUsers = (state) => state.user.users; // lấy ra tất cả các users
export const selectFilterBy = (state) => state.user.filterBy ; // lấy ra filterBy của users

export const selectFilteredUsers = createSelector(
  [selectUsers, selectFilterBy],
  (users, filterBy) => {
    if (filterBy === "finished")   return users.filter(u => u.status === true);
    if (filterBy === "nofinished") return users.filter(u => u.status === false);
    return users;
  }
);
