import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    imageSection: {
        marginTop: 20,
        alignItems: "center"
    },
    logo: {
        width: "70%",
        objectFit: "contain"
    },
    performance: {
        marginTop: 30,
        gap: 20,
        alignItems: "center",
        width: "100%"
    },
    boxes: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "94%",
        paddingHorizontal: 20,
        height: 100,
        gap: 20,
        backgroundColor: "#2B2B9B",
        borderRadius: 10,

    },
    boxes2: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "94%",
        paddingHorizontal: 20,
        height: 100,
        gap: 20,
        backgroundColor: "#36013F",
        borderRadius: 10,

    },
    numerics: {
        height: "70%",
        width: 70,
        backgroundColor: "#6565E2",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    boxtext: {
        fontFamily: "Poppins_600SemiBold",
        color: "#fff",
        fontSize: 18,
        flexShrink: 1
    },
    exmscrolls: {
        marginTop: 15,
        flexDirection: "row",
        gap: 15,
        alignItems: "center"
    },
    arrowLeft: {
        paddingVertical: 10,
        paddingHorizontal: 6,
        backgroundColor: "#6565E2",
        borderTopStartRadius: 5,
        borderBottomStartRadius: 5
    },
    arrowRight: {
        paddingVertical: 10,
        paddingHorizontal: 6,
        backgroundColor: "#6565E2",
        borderTopEndRadius: 5,
        borderBottomEndRadius: 5
    },
    arrowText: {
        color: "#fff"
    },
    list: {
        gap: 10,
        alignItems: "center"
    },
    card: {
        padding: 7,
        borderColor: "#888",
        borderWidth: 1,
        borderRadius: 10
    },
    card2: {
        padding: 7,
        borderColor: "#888",
        backgroundColor: "#6565E3",
        borderWidth: 1,
        borderRadius: 10
    },
    cardText2: {
        color: "#fff"
    },
    exmlist: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    exmcardgrid: {
        marginTop: 30,
        marginBottom: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap"
    },
    requestedsession: {
        marginVertical: 30,
    },
    reqhead: {
        marginVertical: 17,
        fontSize: 20,
        fontFamily: "Poppins_600SemiBold",
        textAlign: "center"
    },
    reqlist: {
        gap: 20,
        marginBottom: 40
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