"use client";
import React, { useState } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
  birthDate: string;
}

const initialUsers: User[] = [
  {
    id: 1,
    firstName: "User",
    lastName: "One",
    email: "one@vu.com",
    password: "password123",
    gender: "Male",
    phone: "123-456-7890",
    birthDate: "1990-01-01",
  },
  {
    id: 2,
    firstName: "User",
    lastName: "Two",
    email: "two@vu.com",
    password: "password456",
    gender: "Female",
    phone: "098-765-4321",
    birthDate: "1995-05-05",
  },
];

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [updatedUserData, setUpdatedUserData] = useState<Partial<User>>({});

  const startEdit = (user: User) => {
    setEditUser(user);
    setUpdatedUserData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      birthDate: user.birthDate,
    });
  };

  const updateUser = () => {
    if (editUser) {
      const updatedUsers = users.map((user) =>
        user.id === editUser.id ? { ...user, ...updatedUserData } : user
      );
      setUsers(updatedUsers);
      setEditUser(null);
      setUpdatedUserData({});
    }
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div >
      {editUser && (
        <div className="mb-4">
          <input
            type="text"
            name="firstName"
            value={updatedUserData.firstName || ""}
            onChange={handleInputChange}
            placeholder="First Name"
            className="border border-gray-300 rounded-md p-2 mr-2"
          />
          <input
            type="text"
            name="lastName"
            value={updatedUserData.lastName || ""}
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
            name="birthDate"
            value={updatedUserData.birthDate || ""}
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
            className="flex items-center justify-between mb-2 p-2 border-b"
          >
            <div>
              <p className="font-medium text-white">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">{user.phone}</p>
              <p className="text-sm text-gray-600">{user.gender}</p>
              <p className="text-sm text-gray-600">{user.birthDate}</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-500" onClick={() => startEdit(user)}>
                <PencilIcon className="w-5 h-5" />
                Edit
              </button>
              <button
                className="text-red-500"
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
