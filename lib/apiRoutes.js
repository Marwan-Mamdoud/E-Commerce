import { ApiClint } from "./api-client";
import { GETALLUSERS, GETUSER } from "./constant";

export const getAllUsers = async () => {
  const data = await ApiClint(GETALLUSERS);
  const users = data.data.allUsers;
  console.log(users);
  return users;
};

export const getUser = async (id) => {
  let data = await ApiClint(`${GETUSER}/${id}`);
  data = data.data.user;
  return data;
};
