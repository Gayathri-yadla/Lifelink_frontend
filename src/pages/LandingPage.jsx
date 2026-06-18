import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Ensure this path is correct

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", fontFamily: "Arial, sans-serif", overflowX: "hidden" }}>
      {/* Navbar */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 60px", backgroundColor: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={logo} alt="LifeLink" width="55" />
          <h2 style={{ color: "#dc2626", margin: 0 }}>LifeLink</h2>
        </div>
        
        {/* Navigation Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button 
            onClick={() => navigate("/login")}
            style={{ backgroundColor: "transparent", color: "#dc2626", border: "1px solid #dc2626", padding: "10px 25px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
          >
            Login
          </button>
          <button 
            onClick={() => navigate("/register")}
            style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "10px 25px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ textAlign: "center", padding: "120px 20px 100px" }}>
        <img src={logo} alt="LifeLink" width="120" />
        <h1 style={{ fontSize: "4rem", marginTop: "20px", color: "#111827" }}>
          Built for Speed, <span style={{ color: "#dc2626" }}>Designed for Life</span>
        </h1>
        <p style={{ maxWidth: "800px", margin: "20px auto", color: "#6b7280", fontSize: "1.2rem", lineHeight: "1.8" }}>
          LifeLink is a real-time emergency blood donor response network that connects hospitals and nearby donors instantly during critical situations.
        </p>
        <button 
          onClick={() => navigate("/register")}
          style={{ marginTop: "20px", backgroundColor: "#dc2626", color: "white", border: "none", padding: "15px 40px", borderRadius: "10px", fontSize: "18px", fontWeight: "bold", cursor: "pointer" }}
        >
          Get Started
        </button>
      </section>

      {/* Statistics Section */}
      <section style={{ display: "flex", justifyContent: "center", gap: "35px", flexWrap: "wrap", marginBottom: "100px" }}>
        { [["1000+", "Lives Saved"], ["5000+", "Active Donors"], ["200+", "Hospitals"], ["3 Min", "Avg Response"]].map((item, index) => (
          <div key={index} style={{ backgroundColor: "#ffffff", border: "2px solid #fee2e2", boxShadow: "0 4px 15px rgba(220,38,38,0.08)", width: "220px", borderRadius: "15px", padding: "25px", textAlign: "center" }}>
            <h2 style={{ color: "#dc2626", margin: "0 0 10px 0" }}>{item[0]}</h2>
            <p style={{ margin: 0 }}>{item[1]}</p>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section style={{ backgroundColor: "#fff5f5", padding: "80px 80px", textAlign: "center" }}>
        <h2 style={{ color: "#dc2626", marginBottom: "25px" }}>About LifeLink</h2>
        <p style={{ maxWidth: "900px", margin: "auto", lineHeight: "1.9", color: "#4b5563" }}>
          LifeLink helps bridge the gap between emergency blood requirements and willing donors. By using intelligent donor matching, live GPS tracking, ETA estimation, reliability scoring, and instant notifications, LifeLink ensures faster blood delivery and better emergency response.
        </p>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#111827", color: "white", textAlign: "center", padding: "25px", marginTop: "50px" }}>
        © 2026 LifeLink | Real-Time Emergency Blood Donor Network
      </footer>
    </div>
  );
}

export default Landing;