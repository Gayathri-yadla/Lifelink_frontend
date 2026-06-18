import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [role, setRole] = useState("donor");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    bloodGroup: "O+",
    age: "",
    weight: "",
    adminName: "",
    hospitalName: "",
    regNumber: "",
    contactPerson: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    alert("Registration Successful");

    navigate("/login");

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >

      <div
        style={{
          width: "450px",
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "30px",
          boxShadow:
            "0 0 20px rgba(0,0,0,0.1)"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            color: "#dc2626",
            marginBottom: "10px"
          }}
        >
          LifeLink
        </h1>

        <h2
          style={{
            textAlign: "center",
            color: "#374151",
            marginBottom: "25px"
          }}
        >
          Create your account
        </h2>

        <div
          style={{
            display: "flex",
            marginBottom: "25px",
            backgroundColor: "#f3f4f6",
            borderRadius: "10px"
          }}
        >

          <button
            onClick={() =>
              setRole("donor")
            }
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              backgroundColor:
                role === "donor"
                  ? "white"
                  : "#f3f4f6",
              color:
                role === "donor"
                  ? "#dc2626"
                  : "#6b7280",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Donor
          </button>

          <button
            onClick={() =>
              setRole("hospital")
            }
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              backgroundColor:
                role === "hospital"
                  ? "white"
                  : "#f3f4f6",
              color:
                role === "hospital"
                  ? "#dc2626"
                  : "#6b7280",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Hospital
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          {role === "donor" ? (

            <>
              <label>Full Name</label>

              <input
                name="fullName"
                onChange={handleChange}
                style={inputStyle}
              />

              <div style={rowStyle}>

                <div style={{ flex: 1 }}>
                  <label>Email</label>

                  <input
                    name="email"
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <label>Phone</label>

                  <input
                    name="phone"
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

              </div>

              <label>City</label>

              <input
                name="city"
                placeholder="e.g. Vijayawada"
                onChange={handleChange}
                style={inputStyle}
              />

              <div style={rowStyle}>

                <div>
                  <label>
                    Blood Group
                  </label>

                  <select
                    name="bloodGroup"
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option>O+</option>
                    <option>O-</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                </div>

                <div style={rowStyle}>

  <div>
    <label>Age</label>

    <input
      type="number"
      name="age"
      min="18"
      max="65"
      value={formData.age}
      onChange={handleChange}
      style={inputStyle}
    />
  </div>

  <div>
    <label>Weight (kg)</label>

    <input
      type="number"
      name="weight"
      min="45"
      max="200"
      value={formData.weight}
      onChange={handleChange}
      style={inputStyle}
    />
  </div>

</div>

              </div>

              <label>Password</label>

              <input
                type="password"
                name="password"
                onChange={handleChange}
                style={inputStyle}
              />

            </>

          ) : (

            <>
              <label>
                Admin Full Name
              </label>

              <input
                name="adminName"
                onChange={handleChange}
                style={inputStyle}
              />

              <div style={rowStyle}>

                <div style={{ flex: 1 }}>
                  <label>Email</label>

                  <input
                    name="email"
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <label>Phone</label>

                  <input
                    name="phone"
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

              </div>

              <label>City</label>

              <input
                name="city"
                placeholder="e.g. Vijayawada"
                onChange={handleChange}
                style={inputStyle}
              />

              <hr
                style={{
                  margin:
                    "20px 0"
                }}
              />

              <label>
                Hospital Name
              </label>

              <input
                name="hospitalName"
                onChange={handleChange}
                style={inputStyle}
              />

              <div style={rowStyle}>

                <div style={{ flex: 1 }}>
                  <label>
                    Reg. Number
                  </label>

                  <input
                    name="regNumber"
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <label>
                    Contact Person
                  </label>

                  <input
                    name="contactPerson"
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

              </div>

              <label>Password</label>

              <input
                type="password"
                name="password"
                onChange={handleChange}
                style={inputStyle}
              />

            </>

          )}

         <button
  type="submit"
  style={{
    width: "100%",
    padding: "14px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    marginTop: "20px",
    fontWeight: "bold",
    cursor: "pointer"
  }}
>
  Register
</button>

<p
  style={{
    textAlign: "center",
    marginTop: "15px",
    color: "#6b7280"
  }}
>
  Already have an account?{" "}
  <span
    onClick={() => navigate("/login")}
    style={{
      color: "#dc2626",
      fontWeight: "bold",
      cursor: "pointer"
    }}
  >
    Login
  </span>
</p>

<p
  onClick={() => navigate("/")}
  style={{
    textAlign: "center",
    marginTop: "10px",
    color: "#dc2626",
    cursor: "pointer",
    fontWeight: "bold"
  }}
>
  ← Back To Home
</p>

        </form>

      </div>

    </div>

  );

}

const rowStyle = {
  display: "flex",
  gap: "12px",
  marginBottom: "10px"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #9ca3af",
  marginTop: "5px",
  marginBottom: "12px",
  boxSizing: "border-box"
};

export default Register;