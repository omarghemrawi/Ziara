import React from "react";
import axios from "axios";
import { setUser } from "../../redux/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next"; // 👈 Added
import "./Login.css";

export default function Login() {
  const { t } = useTranslation(); // 👈 Added
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/client/login", values);
      const user = response.data.user;

      localStorage.setItem("token", response.data.token);
      dispatch(setUser(user));
      navigate("/profile", { replace: true });
    } catch (err) {
      console.error(err);
      alert(t("login.failed")); // 👈 translated error
    } finally {
      setSubmitting(false);
    }
  };
  
// Validation schema using Y

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email(t("validation.invalidEmail"))
    .required(t("validation.requiredEmail")),
  password: Yup.string()
    .min(6, t("validation.shortPassword"))
    .required(t("validation.requiredPassword")),
});



  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left: Formik Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="login-form">
              <h2>{t("login.title")}</h2>

              <label>{t("login.email")}</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />

              <label>{t("login.password")}</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />

              <button
                type="submit"
                className="btn login-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("login.loading") : t("login.button")}
              </button>
            </Form>
          )}
        </Formik>

        {/* Right: Illustration */}
        <div className="login-image">
          <img src="/image/intro.png" alt={t("login.alt")} />
        </div>
      </div>
    </div>
  );
}
