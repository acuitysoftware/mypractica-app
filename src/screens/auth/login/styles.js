import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const imageSize = width * 0.9; // smaller size than before

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperBox: {
    height: height * 0.4,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    backgroundColor: "#6A5AE0",
  },
  upperBoxImage: {
    width: imageSize,
    height: imageSize,
    resizeMode: "contain",
    position: "absolute",
    top: -imageSize * 0.2,
    right: -imageSize * 0.1,
  },
  head: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
  },
  loginContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "start",
    gap: 6,
  },
  radioContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#6A5AE0",
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#6A5AE0",
  },
  radioLabel: {
    fontFamily: "Poppins_400Regular",
    marginLeft: 6,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#000",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginLeft: 6,
  },
  forgotText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#6A5AE0",
  },
  signInButton: {
    backgroundColor: "#6A5AE0",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  signInText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#000",
  },
  signupLink: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#FFB800",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  checkboxtick: {
    width: 20,
    height: 20,
    borderColor: "#aeaeae",
    borderWidth: 1,
  },
  checkboxticked: {
    backgroundColor: "#6565E3",
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
