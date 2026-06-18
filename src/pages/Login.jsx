import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      alert("Login Successful");

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      if (
        res.data.user.role ===
        "hospital"
      ) {

        navigate("/hospital");

      }
      else if (
        res.data.user.role ===
        "admin"
      ) {

        navigate("/admin");

      }
      else {

        navigate("/dashboard");

      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

      console.log(error);

    }

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

      <form
        onSubmit={handleSubmit}
        style={{
          width: "420px",
          backgroundColor: "white",
          padding: "35px",
          borderRadius: "15px",
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

        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginBottom: "25px"
          }}
        >
          Welcome Back
        </p>

        <label>
          Phone Number
        </label>

        <input
          type="text"
          name="phone"
          placeholder="Enter Phone Number"
          value={formData.phone}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label>
          Password
        </label>

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "8px",
            marginTop: "15px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px"
          }}
        >
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#6b7280"
          }}
        >
          Don't have an account?
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/register")
          }
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "white",
            color: "#dc2626",
            border:
              "2px solid #dc2626",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Create Account
        </button>

        <p
          onClick={() =>
            navigate("/")
          }
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#dc2626",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Back To Home
        </p>

      </form>

    </div>

  );

}

const inputStyle = {

  width: "100%",

  padding: "12px",

  border: "1px solid #d1d5db",

  borderRadius: "8px",

  marginTop: "5px",

  marginBottom: "15px",

  boxSizing: "border-box"

};

export default Login;