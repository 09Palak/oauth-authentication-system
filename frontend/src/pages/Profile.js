import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://oauth-authentication-system.onrender.com"; // 👈 backend URL

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/user`, { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, []);

  const logout = () => {
    window.location.href = `${BASE_URL}/logout`;
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
