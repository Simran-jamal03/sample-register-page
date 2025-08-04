"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
// import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
// import "@aws-amplify/ui-react/styles.css";

export default function Home() {

    Amplify.configure(outputs);
// Page.tsx

const client = generateClient<Schema>();

  const [firstname, setFirstname] = useState("" as string);
  const [lastname, setLastname] = useState("" as string);
  const [phoneNumber, setPhoneNumber] = useState("" as string);
  const [email, setEmail] = useState("" as string);
  const [roleId, setRoleId] = useState("" as string);
  const [role, setRole] = useState<Array<Schema["Role"]["type"]>>([]);

//   const { data: roles, errors } = [];

  async function listRoles() {
    // client.models.Role.().subscribe({
    //   next: (data) => setRole([...data.items]),
    
    // });
    const { data: roles, errors } = await client.models.Role.list();
    setRole(roles);
  }

  useEffect(() => {
    listRoles();
  }, []);

  
function createUser() {
    console.log("=", firstname, lastname, phoneNumber, email);
    client.models.User.create({
      firstname: firstname,
      lastname: lastname,
      phonenumber: phoneNumber,
      email: email,
      roleId: roleId,
    });
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
    <form className="flex flex-col gap-2 w-full max-w-xs">
    {/* <div className="grid gap-6 mb-6 md:grid-cols-2"> */}
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
    {/* </div> */}
    <div className="mb-6">
        <label form="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input type="email" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
    </div>
    <div className="mb-2">
        <label form="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
    {/* <select className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {role.map((r) => (
          <option  label="Role" value={r.role_name} onSelect={()=>{setRoleId(r.id)}} key={r.id}>{r.role_name}</option>
        ))}
      </select> */}
      <select
  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  onChange={(e) => setRoleId(e.target.value)} // Use onChange to update roleId
>
  {role.map((r) => (
    <option value={r.id} key={r.id}>
      {r.role_name}
    </option>
  ))}
</select>
      {/* <ul>
        {role.map((todo) => (
          <li key={todo.id}>{todo.role_name}</li>
        ))}
      </ul> */}
      </div>
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={createUser}>Submit</button>
</form>
</div>
  );
}
