import { StyleSheet } from "react-native";

export const paymentstyles = StyleSheet.create({
    head: {
        fontSize: 20,
        fontFamily: "Poppins_600SemiBold",
        marginVertical: 6,
    },
    subHead: {
        color: "#333333",
        fontSize: 20,
        fontFamily: "Poppins_700Bold",
        marginBottom: 25
    },
    paymentinfobox: {
        gap: 10,
        marginBottom: 20
    },
    paymentinfos: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    icos: {
        padding: 6,
        borderRadius: 5,
        backgroundColor: "#6565E2",
        color: "#fff"
    },
    payinfotext: {
        fontSize: 15,
        fontFamily: "Poppins_400Regular"
    },
    choose: {
        fontSize: 20,
        fontFamily: "Poppins_600SemiBold",
        marginBottom: 17
    },
    examchecks: {
        gap: 15
    },
    examsets: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 16,
        backgroundColor: "#007AFF",
        gap: 10,
        borderRadius: 10
    },
    examsets2: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 16,
        backgroundColor: "#007AFF",
        gap: 10,
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 2
    },
    checkboxset: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    checkbox: {
        height: 20,
        width: 20,
        borderRadius: "50%",
        backgroundColor: "#fff"
    },
    checkboxchecked: {
        height: 20,
        width: 20,
        borderRadius: "50%",
        backgroundColor: "#000000",
        borderColor: "#fff",
        borderWidth: 5,
    },
    exmname: {
        color: "#fff",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
        width: "75%"
    },
    exmprice: {
        color: "#fff",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16
    },
    buybutt: {
        marginTop: 10,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: "#36013F",
        alignItems: "center"
    },
    buybuttext: {
        color: "#fff",
        fontFamily: "Poppins_600SemiBold",
    }
})



