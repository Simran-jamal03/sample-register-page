"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
// import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";


export default function Home() {

    Amplify.configure(outputs);


const client = generateClient<Schema>();

  const [firstname, setFirstname] = useState("" as string);
  const [lastname, setLastname] = useState("" as string);
  const [phoneNumber, setPhoneNumber] = useState("" as string);
  const [email, setEmail] = useState("" as string);
  const [roleId, setRoleId] = useState("" as string);

  const [role, setRole] = useState<Array<Schema["Role"]["type"]>>([]);
  const [users, setUsers] = useState<Schema["User"]["type"][]>([]);
  const [showUsers, setShowUsers] = useState(false); // ⬅️ NEW: Toggle table

  const [showForm, setShowForm] = useState(true); // true = show form, false = show user table


  // Fetch Roles
  // async function listRoles() {
  //   const { data: roles, errors } = await client.models.Role.list();
  //   if (roles) setRole(roles);
  //   if (errors) console.error(errors);
  // }

   // Fetch Users
  const listRoles = async () => {
    try {
      const result = await client.models.Role.list();
      setRole(result.data);
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const result = await client.models.User.list();
      setUsers(result.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Create User
  async function createUser(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      await client.models.User.create({
        firstname,
        lastname,
        phonenumber: phoneNumber,
        email,
        roleId, // Uncomment if roleId is properly linked in your schema
      });
      // Optional: reset form
    setFirstname("");
    setLastname("");
    setPhoneNumber("");
    setEmail("");
    setRoleId("");
      // Optional: refresh the user list after creating
      fetchUsers();
      alert("User registered successfully!");
    } catch (err) {
      console.error("Error creating user:", err);
      alert("Failed to register user. Please try again.");
    }
  }

  useEffect(() => {
    listRoles();
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {showForm ? (
      <form className="flex flex-col gap-2 w-full max-w-xs">
    <h1 className="text-center text-2xl font-bold">Register</h1>


         <div>
            <label form="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input type="text" id="first_name" value={firstname} onChange={(e)=>{setFirstname(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter firstname" required />
        </div>
         <div>
            <label form="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
            <input type="text" id="last_name" value={lastname} onChange={(e)=>{setLastname(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter lastname" required />
        </div>  
        <div>
            <label form="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
            <input type="tel" id="phone" value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
        </div>

    <div>
        <label form="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input type="email" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
    </div>
   <div className="mb-2">
  <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
  <select
    id="role"
    value={roleId}
    onChange={(e) => setRoleId(e.target.value)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option value="" disabled>Select a role</option>
    {role.map((r) => (
      <option key={r.id} value={r.id}>
        {r.role_name}
      </option>
    ))}
  </select>
</div>



      <button type="submit"
     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      onClick={createUser}>Submit</button>

     <button
  type="button"
  onClick={() => setShowForm(!showForm)}
  className="mt-4 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5"
>
  {showForm ? "Show Registered Users" : "Back to Registration"}
</button>

      </form>
  ) : (
      <div className="w-full mt-8 overflow-x-auto max-w-3xl">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Registered Users
        </h2>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="table-th">First Name</th>
              <th className="table-th">Last Name</th>
              <th className="table-th">Email</th>
              <th className="table-th">Phone No.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="bg-white dark:bg-gray-900">
                <td className="table-td">{user.firstname}</td>
                <td className="table-td">{user.lastname}</td>
                <td className="table-td">{user.email}</td>
                <td className="table-td">{user.phonenumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
}