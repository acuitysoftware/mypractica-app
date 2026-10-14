import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const imageSize = width * 0.9; // smaller size than before
export const SignupStyles = StyleSheet.create({
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
  signupContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    display: "flex",
    gap: 15,
  },
  head: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
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
  dropInputs: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: "30%",
    right: "6%",
  },
  button: {
    backgroundColor: "#6565E2",
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "Poppins_400Regular",
    color: "#fff",
  },
  stateList: {
    position: "absolute",
    bottom: "100%", // or adjust as needed
    width: "100%",
    backgroundColor: "#fff",
    maxHeight: 130, // allow scroll
    zIndex: 1000,
    overflow: "scroll",
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    // backgroundColor: "#fff",
  },

  dropdownContainer: {
    borderRadius: 8,
  },

  placeholderStyle: {
    color: "#888",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },

  selectedTextStyle: {
    color: "#000",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },

  itemTextStyle: {
    color: "#000",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  state: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  flat: {
    padding: 4,
    marginHorizontal: 10,
    backgroundColor: "#ddd",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 2,
  },
});
