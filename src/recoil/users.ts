import { atom } from "recoil";
import { User } from "../../@types/user";

export const usersState = atom<User[]>({
  key: "Users",
  default: [],
});

// const usersList = selector({
//     key: 'CurrentUserName',
//     get: async ({get}) => {
//       const response = await myDBQuery({
//         userID: get(currentUserIDState),
//       });
//       return response.name;
//     },
//   });
