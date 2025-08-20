// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1=email, 2=code, 3=new password
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  // Schemas
  const schemas = {
    1: Yup.object().shape({
      email: Yup.string()
        .email(t("validation.invalidEmail"))
        .required(t("validation.requiredEmail")),
    }),
    2: Yup.object().shape({
      code: Yup.string()
        .length(6, t("reset.validation.pinLength"))
        .required(t("reset.validation.pinRequired")),
    }),
    3: Yup.object().shape({
      password: Yup.string()
        .min(6, t("reset.validation.shortPassword"))
        .matches(/\d/, t("reset.validation.numberRequired"))
        .required(t("reset.validation.requiredPassword")),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], t("reset.validation.passwordsMatch"))
        .required(t("reset.validation.confirmPassword")),
    }),
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (step === 1) {
        // Step 1: send reset code
        await axios.post("http://localhost:5000/api/client/forgot-password", {
          email: values.email,
        });
        setEmail(values.email);
        alert(t("forgot.success"));
        setStep(2);
      } else if (step === 2) {
        // Step 2: verify code (just save it to state)
        setCode(values.code);
        alert(t("reset.codeAccepted"));
        setStep(3);
      } else if (step === 3) {
        // Step 3: reset password
        await axios.post("http://localhost:5000/api/client/reset-password", {
          email,
          code,
          newPassword: values.password,
        });
        alert(t("reset.success"));
        resetForm();
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      alert(step === 1 ? t("forgot.failed") : t("reset.failed"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-container">
        <Formik
          initialValues={{ email: "", code: "", password: "", confirmPassword: "" }}
          validationSchema={schemas[step]}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="forgot-form">
              {/* Step Title */}
              {step === 1 && <h2>{t("forgot.title")}</h2>}
              {step === 2 && <h2>{t("reset.pin")}</h2>}
              {step === 3 && <h2>{t("reset.title")}</h2>}

              {/* Step 1: Email */}
              {step === 1 && (
                <>
                  <label>{t("forgot.email")}</label>
                  <Field type="email" name="email" />
                  <ErrorMessage name="email" component="div" className="error" />
                  <button type="submit" className="btn" disabled={isSubmitting}>
                    {isSubmitting ? t("forgot.loading") : t("forgot.button")}
                  </button>
                </>
              )}

              {/* Step 2: Code */}
              {step === 2 && (
                <>
                  <label>{t("reset.pin")}</label>
                  <Field type="text" name="code" />
                  <ErrorMessage name="code" component="div" className="error" />
                  <button type="submit" className="btn" disabled={isSubmitting}>
                    {isSubmitting ? t("reset.loading") : t("reset.verifyCode")}
                  </button>
                </>
              )}

              {/* Step 3: New Password */}
              {step === 3 && (
                <>
                  <label>{t("reset.password")}</label>
                  <Field type="password" name="password" />
                  <ErrorMessage name="password" component="div" className="error" />

                  <label>{t("reset.confirmPassword")}</label>
                  <Field type="password" name="confirmPassword" />
                  <ErrorMessage name="confirmPassword" component="div" className="error" />

                  <button type="submit" className="btn reset-submit" disabled={isSubmitting}>
                    {isSubmitting ? t("reset.loading") : t("reset.button")}
                  </button>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
