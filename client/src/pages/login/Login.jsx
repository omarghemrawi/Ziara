import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { setUser } from "../../redux/userActions";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom"; // 👈 Link added
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next"; 
import "./Login.css";
const API_URL = process.env.REACT_APP_API_URL;


export default function Login() {
  const { t } = useTranslation(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData); 

  // ✅ Validation schema with translation
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.requiredEmail")),
    password: Yup.string()
      .min(6, t("validation.shortPassword"))
      .required(t("validation.requiredPassword")),
  });

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && user) {  
      navigate("/profile", { replace: true });
    }
  }, [navigate, user]);

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${API_URL}
/api/client/login`, values);
      const user = response.data.user;

      localStorage.setItem("token", response.data.token);
      dispatch(setUser(user));
      navigate("/profile", { replace: true });
    } catch (err) {
      console.error(err);
      alert(t("login.failed")); 
    } finally {
      setSubmitting(false);
    }
  };

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

              {/* 👇 Added forgot password link */}
              <div className="login-forgot-link">
                <Link to="/forgot-password">{t("login.forgotPassword")}</Link>
              </div>
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
