// components/UserTable.js
import React, { useState, useEffect } from "react";
import { getAuth, listUsers } from "firebase/auth";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const auth = getAuth();
    listUsers(auth)
      .then((userRecords) => {
        const usersData = userRecords.map((user) => user.toJSON());
        setUsers(usersData);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <input
        type="text"
        placeholder="Search by email address"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border border-gray-400 px-4 py-2 mb-4"
      />
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Identifier</th>
            <th className="border px-4 py-2">Providers</th>
            <th className="border px-4 py-2">Created</th>
            <th className="border px-4 py-2">Signed In</th>
            <th className="border px-4 py-2">User UID</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.uid}>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">Providers</td>
              <td className="border px-4 py-2">Jun 9, 2024</td>
              <td className="border px-4 py-2">Jun 9, 2024</td>
              <td className="border px-4 py-2">{user.uid}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        Rows per page:
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
          className="border border-gray-400 px-2 py-1 ml-2"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default UserTable;
