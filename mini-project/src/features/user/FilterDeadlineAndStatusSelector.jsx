import { createSelector } from "@reduxjs/toolkit";
import { daysUntil } from "../../utils/date";
// Lấy đúng theo key slice trong store: state.user
export const selectUsers = (state) => state.user.users; // lấy ra tất cả các users
export const selectFilterStatusWork = (state) => state.user.filterStatusWork;
export const selectFilterDeadline = (state) => state.user.filterDeadline;

export const selectFilteredDeadLineStatus = createSelector(
  [selectUsers, selectFilterStatusWork, selectFilterDeadline],
  (users, selectStatusWork, filterDeadline) => {
    if (selectStatusWork !== "All Status") {
      users = users.filter((u) => u.statusWork === selectStatusWork);
    }
    if (filterDeadline === "deadline") {
      // các ngày còn từ 0 đến 2 ngày
      users = users.filter((u) => {
        const day = daysUntil(u.deadline);
        return day !== null && day >= 0 && day <= 2;
      });
    } else if (filterDeadline === "overdue") {
      // các ngày đã quá hạn
      users = users.filter((u) => {
        const day = daysUntil(u.deadline);
        return day !== null && day < 0;
      });
    }

    // if (selectStatusWork === "All Status")   return users;
    // if (selectStatusWork === "Haven't started yet")   return users.filter(u => u.statusWork === "Haven't started yet");
    // if (selectStatusWork === "Working")   return users.filter(u => u.statusWork === "Working");
    // if (selectStatusWork === "Complete") return users.filter(u => u.statusWork === "Complete");
    return users;
  }
);
