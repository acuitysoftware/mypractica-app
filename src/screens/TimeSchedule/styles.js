import { StyleSheet } from "react-native";

export const timeschedulestyles = StyleSheet.create({
    boxs: {
        marginVertical: 30,
        gap: 10,
        padding: 8,
        borderColor: "#e7e7e7",
        borderWidth: 1,
        borderRadius: 10
    },
    boxrow: {
        flexDirection: "row",
        gap: 13,
        alignItems: "center",
        justifyContent: "space-between"
    },
    boxrtext: {
        width: "26%",
        color: "#888888",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 15
    },
    input: {
        borderWidth: 1,
        borderColor: "#e7e7e7",
        width: "70%",
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderRadius: 6,
        position: "relative",
        zIndex: 1
    },
    addslot: {
        width: "25%",
        paddingVertical: 12,
        backgroundColor: "green",
        borderRadius: 6
    },
    submit: {
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 6,
        backgroundColor: "#6565E2"
    }
}) 