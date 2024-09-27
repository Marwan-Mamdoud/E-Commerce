"use server";

import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { ApiClint } from "./api-client";
import { GETALLUSERS } from "./constant";
import Link from "next/link";

const GetUsers = async () => {
  const data = await ApiClint.get(GETALLUSERS);
  const allUsers = data.data.allUsers;
  console.log(allUsers);
  return (
    <table className="w-full md:w-4/5 mx-auto">
      <thead>
        <tr>
          <th className="mx-4 my-2 text-left">ID</th>
          <th className="pr-16 my-2 text-left">NAME</th>
          <th className="mx-4 my-2 text-left">EMAIL</th>
          <th className="mx-4 my-2 text-center">ADMIN</th>
          <th className="mx-4 my-2 text-center">DELETE</th>
          <th className="mx-4 my-2 text-center">EDIT</th>
        </tr>
      </thead>
      {/* {!isLoading ? ( */}
      <tbody>
        {allUsers.map((user) => (
          <tr key={user._id}>
            <td className=" ">{user._id}</td>
            <td className="ml-10 mr-8 my-2  text-left ">
              <p>{user.username}</p>
            </td>
            <td className="">
              <p className="">{user.email}</p>
            </td>
            <td className="px-4 py-4 text-center">
              {user.isAdmin ? (
                <button>
                  <FaCheck style={{ color: "green " }} />
                </button>
              ) : (
                <button>
                  <FaTimes style={{ color: "red" }} />
                </button>
              )}
            </td>
            <td className="px-4 py-4 text-center">
              {user.isAdmin ? (
                ""
              ) : (
                <button onClick={() => deleteUser(user._id)}>
                  <FaTrash />
                </button>
              )}
            </td>
            <td className="px-4 py-4 text-center">
              <button>
                <Link href={`/admin/users/${user._id}`}>
                  <FaEdit className="cursor-pointer" />
                </Link>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      {/* ) : (
    <div></div>
  )} */}
    </table>
  );
};

export default GetUsers;
