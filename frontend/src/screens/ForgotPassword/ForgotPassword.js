import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import styles from "./styles";

export default function ForgotPassword({ navigation }) {
  const [step, setStep] = useState(1); // 1 = request code, 2 = reset password
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const requestResetCode = async () => {
    try {
      const res = await axios.post("http://192.168.0.101:5000/api/user/forgot-password", { email });
      Alert.alert("Success", res.data.message);
      setStep(2);
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong");
    }
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPass) {
      return Alert.alert("Error", "Passwords do not match");
    }
    try {
      const res = await axios.post("http://192.168.0.101:5000/api/user/reset-password", {
        email,
        code,
        newPassword,
      });
      Alert.alert("Success", res.data.message);
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      {step === 1 ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.button} onPress={requestResetCode}>
            <Text style={styles.buttonText}>Send Reset Code</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter reset code"
            value={code}
            onChangeText={setCode}
          />
          <TextInput
            style={styles.input}
            placeholder="New password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry
            value={confirmPass}
            onChangeText={setConfirmPass}
          />
          <TouchableOpacity style={styles.button} onPress={resetPassword}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
