import { StyleSheet } from "react-native";

export const subscriptionstyles = StyleSheet.create({

    mysubhead: {
        textAlign: "center",
        fontSize: 22,
        fontFamily: "Poppins_700Bold",
        marginBottom: 30
    },
    subboxes: {
        gap: 20,
        marginBottom: 30
    },
    subbox: {
        backgroundColor: "#000B6B",
        padding: 10,
        borderRadius: 6
    },
    tag: {
        backgroundColor: "#fff",
        alignSelf: "flex-start",
        padding: 10,
        marginVertical: 25,
        borderRadius: 5
    },
    tagtext: {
        fontFamily: "Poppins_600SemiBold"
    },
    price: {
        paddingVertical: 20,
        fontSize: 80,
        fontFamily: "Poppins_700Bold",
        color: "#fff",
        borderTopColor: "#ddd",
        borderBottomColor: "#ddd",
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    subscribed: {
        marginTop: 30,
        marginBottom: 25,
        paddingVertical: 14,
        backgroundColor: "#fff",
        borderRadius: 5,
        alignItems: "center"
    }

})


export const schedulestyles = StyleSheet.create({
    heading: {
        textAlign: "center",
        marginVertical: 20,
        fontFamily: "Poppins_600SemiBold",
        fontSize: 20
    },
    scheduleLists: {
        gap: 17,
        marginVertical: 10
    },
    schedule: {
        gap: 15,
        backgroundColor: "#F9F9F9",
        padding: 12,

    },
    info1: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between"
    },
    info2: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between"
    },
    firstInfo: {
        flexDirection: "row",
        gap: 12,
        width: "50%",
    },
    teacherimage: {
        width: 30,
        height: 30,
        borderRadius: 15
    },
    teacherInfo: {
        gap: 5,
    },
    teachertime: {
        gap: 5,
    },
    infosec: {
        gap: 5
    },
    buttsec: {
        marginTop: 20,
        alignItems: "center",
    },
    joinbutton: {
        backgroundColor: "#6565E2",
        width: 110,
        paddingVertical: 7,
        borderRadius: 5,
        alignItems: "center"
    },
    joinbuttonP: {
        backgroundColor: "#FF3B30",
        width: 110,
        paddingVertical: 7,
        borderRadius: 5,
        alignItems: "center"
    },
    joinbuttonC: {
        backgroundColor: "#34C759",
        width: 110,
        paddingVertical: 7,
        borderRadius: 5,
        alignItems: "center"
    }
})
export const examResultstyles = StyleSheet.create({
    heading: {
        textAlign: "center",
        marginVertical: 20,
        fontFamily: "Poppins_600SemiBold",
        fontSize: 20
    },
    inputsFilters: {
        gap: 8
    },
    inputpos: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // paddingVertical: 2,
        position: "relative",
        zIndex: 100,
        paddingHorizontal: 7,
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 5,
    },
    inputpos2: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 7,
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 5,
    },
    searchbuttons: {
        paddingVertical: 8,
        backgroundColor: "#6565E2",
        borderRadius: 5,
        alignItems: "center"
    },
    examboxes: {
        marginVertical: 17,
        gap: 15
    },
    exambox: {
        borderWidth: 1,
        borderColor: "#DEDEDE",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
        gap: 12,
    },
    boxheading: {
        flexDirection: "row",
        alignItems: "center",
        gap: 18,
        marginVertical: 10,
    },
    headimage: {
        width: 40,
        height: 40,
        objectFit: "cover"
    },
    headtext: {
        width: "75%",
        fontSize: 13,
        fontFamily: "Poppins_400Regular"
    },
    viewresult: {
        backgroundColor: "#6565e2",
        alignSelf: "baseline",
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 12,
        borderRadius: 5
    },
    pagination: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        marginVertical: 20
    },
    pgnbtn: {
        backgroundColor: "#6565e2",
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 8,
        borderRadius: 5
    }


})
export const changePasswordstyles = StyleSheet.create({
    heading: {
        textAlign: "center",
        marginVertical: 20,
        fontFamily: "Poppins_600SemiBold",
        fontSize: 20
    },
    input: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 0.6,
        borderColor: "#888888",
        marginVertical: 6,
        outline: "none",
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    button: {
        backgroundColor: "#6565e2",
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginVertical: 12,
        borderRadius: 5,
        alignItems: "center"
    }

})


export const teacherListStyles = StyleSheet.create({
    heading: {
        textAlign: "center",
        marginVertical: 20,
        fontFamily: "Poppins_600SemiBold",
        fontSize: 20
    },
    lists: {
        gap: 10,
        marginVertical: 25
    },
    tbox: {
        borderWidth: 0.6,
        borderColor: "#EBEBEB",
        padding: 15,
        gap: 16
    },
    upper: {
        flexDirection: "row",
        gap: 16
    },
    timage: {
        width: 130,
        height: 100,
        objectFit: "cover"
    },
    tinfo: {
        gap: 7
    },
    date: {
        paddingVertical: 10,
        borderWidth: 0.6,
        paddingHorizontal: 4,
        borderRadius: 7,
        borderColor: "#888888",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    butt: {
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 6,
        backgroundColor: "#6565e2"
    }

})