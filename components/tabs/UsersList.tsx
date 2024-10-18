"use client";
import React, { useEffect, useState } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { getUsers } from "../../api/get";
import {
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser,
} from "../../api/put";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
  birth_date: string;
  role: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [updatedUserData, setUpdatedUserData] = useState<Partial<User>>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        const filteredUsers = fetchedUsers.filter(
          (user) => user.role === "User"
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  const startEdit = (user: User) => {
    setEditUser(user);
    setUpdatedUserData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      birth_date: user.birth_date,
    });
  };

  const updateUser = async () => {
    if (editUser) {
      try {
        const updatedUser = await apiUpdateUser(
          editUser.id.toString(),
          updatedUserData
        );
        const updatedUsers = users.map((user) =>
          user.id === editUser.id ? { ...user, ...updatedUser } : user
        );
        setUsers(updatedUsers);
        setEditUser(null);
        setUpdatedUserData({});
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await apiDeleteUser(id.toString());
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedUserData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-800 p-4 rounded">
      {editUser && (
        <div className="mb-4">
          <input
            type="text"
            name="first_name"
            value={updatedUserData.first_name || ""}
            onChange={handleInputChange}
            placeholder="First Name"
            className="border border-gray-300 rounded-md p-2 mr-2"
          />
          <input
            type="text"
            name="last_name"
            value={updatedUserData.last_name || ""}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="border border-gray-300 rounded-md p-2 mr-2"
          />
          <input
            type="email"
            name="email"
            value={updatedUserData.email || ""}
            onChange={handleInputChange}
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2 mr-2"
          />
          <input
            type="text"
            name="phone"
            value={updatedUserData.phone || ""}
            onChange={handleInputChange}
            placeholder="Phone"
            className="border border-gray-300 rounded-md p-2 mr-2"
          />
          <select
            name="gender"
            value={updatedUserData.gender || ""}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 mr-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="date"
            name="birth_date"
            value={updatedUserData.birth_date || ""}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 mr-2"
          />
          <button
            onClick={updateUser}
            className="bg-orange-500 text-white px-4 py-2 rounded-md"
          >
            Update User
          </button>
        </div>
      )}
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between mb-2 p-2 border-b border-gray-700"
          >
            <div>
              <p className="font-medium text-white">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-sm text-gray-400">{user.email}</p>
              <p className="text-sm text-gray-400">{user.phone}</p>
              <p className="text-sm text-gray-400">{user.gender}</p>
              <p className="text-sm text-gray-400">
                {formatDate(user.birth_date)}
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-400" onClick={() => startEdit(user)}>
                <PencilIcon className="w-5 h-5" />
                Edit
              </button>
              <button
                className="text-red-400"
                onClick={() => deleteUser(user.id)}
              >
                <TrashIcon className="w-5 h-5" />
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
