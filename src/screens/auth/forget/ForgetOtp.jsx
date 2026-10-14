import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import BackNav from "../../../components/backNavigation/BackNav";
import myprac from "../../../../assets/myparc.png";
import { useNavigation } from "@react-navigation/native";
import { forgetPassword, forgetPasswordOtp } from "../../../services/auth";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

const OtpScreen = ({ route }) => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { mail } = route?.params;
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!value) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    // Handle paste
    if (value.length > 1) {
      const pasted = value.slice(0, otp.length).split("");
      const newOtp = [...otp];

      pasted.forEach((char, i) => {
        newOtp[i] = char;
      });

      setOtp(newOtp);
      inputRefs.current[Math.min(pasted.length, otp.length) - 1]?.f;
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);
    try {
      const data = {
        email: mail,
        otp: enteredOtp,
      };
      const res = await forgetPasswordOtp(data);
      if (res.status !== false) {
        setLoading(false);
        Toast.show({
          type: "success",
          text1: res.message,
        });
        navigation.navigate("newpassword", {
          email: mail,
        });
      } else {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: res.message,
        });
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Something Went Wrong",
      });
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    try {
      const res = await forgetPassword(mail);
      if (res?.status !== false) {
        setLoading(false);
        Toast.show({
          type: "success",
          text1: res.message,
        });
      } else {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: res.message,
        });
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Something Went Wrong",
      });
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackNav />

      <View style={styles.logoContainer}>
        <Image source={myprac} style={styles.logo} />
      </View>

      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Code has been sent to {mail}</Text>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#6565E2" />
        </View>
      ) : (
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              returnKeyType="next"
            />
          ))}
        </View>
      )}
      <Text style={styles.resendText}>
        Didn't receive code?{" "}
        <Text onPress={() => resendOtp()} style={styles.resendLink}>
          Resend again
        </Text>
      </Text>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  backText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 10,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
    marginBottom: 40,
  },
  logo: {
    height: 60,
    objectFit: "contain",
  },
  appName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },
  tagline: {
    fontSize: 10,
    color: "#555",
  },
  title: {
    fontSize: 20,
    // fontWeight: 'bold',
    marginVertical: 10,
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
    fontFamily: "Poppins_400Regular",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    borderRadius: 8,
    fontSize: 18,
  },
  resendText: {
    textAlign: "center",
    color: "#777",
    marginBottom: 20,
    fontFamily: "Poppins_400Regular",
  },
  resendLink: {
    color: "#6C63FF",
    fontWeight: "bold",
    fontFamily: "Poppins_600Semibold",
  },
  verifyButton: {
    backgroundColor: "#6C63FF",
    padding: 15,
    borderRadius: 10,
  },
  verifyText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
