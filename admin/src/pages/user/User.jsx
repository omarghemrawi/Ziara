import React, { useState, useEffect } from "react";
import axios from "axios";
import "./User.css"; // import CSS file

const User = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("adminToken")


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/user", {
      headers: { Authorization: `Bearer ${token}` },
      });
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleRemoveButton = async (userId) => {
    try {
      const response =  await axios.delete(`http://localhost:5000/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
  setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
}
    } catch (error) {
      console.error("Error Remove user", error);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="user-container">
      <h1 className="user-title">User Management</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by username or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="user-search"
      />

      {/* Table */}
      <div className="user-table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Verified</th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td data-label="Username">{user.username}</td>
        <td data-label="Email">{user.email}</td>
        <td data-label="Verified">{user.isVerified ? "✅ Yes" : "❌ No"}</td>
        <td data-label="Actions" className="actions-cell">
          <button
            onClick={() => handleRemoveButton(user._id)}
            className="remove-btn"
          >
            Remove
          </button>
        </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-users">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
