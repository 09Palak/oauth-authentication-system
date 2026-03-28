export default function Home() {
  const google = () =>
   window.open("https://oauth-authentication-system.onrender.com/auth/google", "_self");
  return (
    <div className="home-container">
      <div className="login-box">
        <h1>Welcome</h1>
        <p>Login to continue</p>

        <button className="google-btn" onClick={google}>
          Continue with Google
        </button>
      </div>
    </div>
  );
}
