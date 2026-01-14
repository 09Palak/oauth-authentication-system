export default function Home() {
  const google = () => window.location.href = "http://localhost:5000/auth/google";
  const facebook = () => window.location.href = "http://localhost:5000/auth/facebook";

  return (
    <div className="home-container">
      <div className="login-box">
        <h1>Welcome</h1>
        <p>Login to continue</p>

        <button className="google-btn" onClick={google}>Continue with Google</button>
        <button className="facebook-btn" onClick={facebook}>Continue with Facebook</button>
      </div>
    </div>
  );
}
