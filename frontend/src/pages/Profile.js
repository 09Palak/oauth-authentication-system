import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/user", { withCredentials: true })
      .then(res => setUser(res.data));
  }, []);

  const logout = () => {
    window.location.href = "http://localhost:5000/logout";
  };

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-card">
          <img src={user.photo} alt="profile" />
          <h2>{user.name}</h2>

          {user.email && <p className="email">{user.email}</p>}

          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
