import { StyleSheet } from "react-native";

export const edStyles = StyleSheet.create({
    navs: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 2,
    },
    navbutts: {
        width: "32%",
        backgroundColor: "#EBEDF0",
        paddingVertical: 7,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    navbuttssel: {
        width: "32%",
        backgroundColor: "#6565E2",
        paddingVertical: 7,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    navbuttsText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 12
    },
    navbuttsText2: {
        fontFamily: "Poppins_400Regular",
        fontSize: 12,
        color: "#fff"
    },
    compBody: {
        marginTop: 30,
        flex: 1
    }
})