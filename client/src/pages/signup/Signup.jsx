// src/pages/Signup.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Signup.css";

// Yup validation schema
const SignupSchema = Yup.object().shape({
  businessName: Yup.string().required("Business name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/\d/, "Password must contain a number")
    .required("Password is required"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
  business: Yup.string().required("Please choose your business"),
});

export default function Signup() {
  const navigate = useNavigate();

  const businessList = [
    { id: "shop", label: "Shop" },
    { id: "restaurant", label: "Restaurant" },
    { id: "hotel", label: "Hotel" },
    { id: "activity", label: "Activity" },
  ];

  const handleSignup = async (values, { setSubmitting }) => {
    try {
      const { confirm, ...payload } = values;
      const response = await axios.post("http://localhost:5000/api/client/signup", {
        name: payload.businessName,
        type: payload.business,
        email: payload.email,
        password: payload.password,
      });

      console.log("Signup successful:", response.data);

      // Navigate on success
      navigate("/additional-info", { replace: true });
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left: illustration */}
        <div className="signup-image">
          <img src="/image/intro.png" alt="Sign up illustration" />
        </div>

        {/* Right: Formik form */}
        <Formik
          initialValues={{
            businessName: "",
            email: "",
            password: "",
            confirm: "",
            business: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSignup}
        >
          {({ isSubmitting }) => (
            <Form className="signup-form">
              <h2>Sign Up</h2>

              <label>Business Name</label>
              <Field name="businessName" />
              <ErrorMessage name="businessName" component="p" className="error" />

              <label>Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="p" className="error" />

              <label>Password</label>
              <Field name="password" type="password" placeholder="At least 6 characters & a number" />
              <ErrorMessage name="password" component="p" className="error" />

              <label>Confirm Password</label>
              <Field name="confirm" type="password" placeholder="Repeat your password" />
              <ErrorMessage name="confirm" component="p" className="error" />

              <label className="business-label">Business</label>
              <Field as="select" name="business">
                <option value="">Select your business</option>
                {businessList.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="business" component="p" className="error" />

              <button
                type="submit"
                className="btn signup-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
