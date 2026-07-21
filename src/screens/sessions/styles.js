import { StyleSheet } from "react-native";

export const sessionStyles = StyleSheet.create({
    reqlist: {
        gap: 20,
        marginVertical: 40
    },
    reqbox: {
        gap: 23,
        borderRadius: 16,
        backgroundColor: "#F6F5F5",
        borderColor: "#C5C9D0E5",
        borderWidth: 1,
        padding: 12
    },
    reqsec1: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20
    },
    reqsec1Left: {
        width: "50%",
        flexDirection: "row",
        alignItems: "center",
        gap: 15
    },
    reqsec1Right: {
        gap: 7,
        width: "50%"
    },
    reqsec1image: {
        height: 30,
        width: 30,
        borderRadius: 15
    },
    reqsec2: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8
    },
    recsec2sec: {
        gap: 5
    },
    reqsecaction: {
        flexDirection: "row",
        gap: 7,
        alignItems: "center"
    },
    reqsecbutt: {
        padding: 3,
        backgroundColor: "#6565e2",
        borderRadius: 4
    },
    reqsecbuttr: {
        padding: 3,
        backgroundColor: "#FF3B30",
        borderRadius: 4
    },
    reqsecbutta: {
        padding: 3,
        backgroundColor: "#0AB334",
        borderRadius: 4
    },
    reqPR: {
        fontSize: 12,
        fontFamily: "Poppins_400Regular"
    },
    reqPSB: {
        fontSize: 13,
        fontFamily: "Poppins_600SemiBold"
    },
})