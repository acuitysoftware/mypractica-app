import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Image } from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'


const fullheight = Dimensions.get('window').height
const fullWidth = Dimensions.get('window').width

const Sidebar = ({ setSideBar }) => {

    const navItems_students = [
        {
            icon: <Feather name="user" size={20} color="black" />, label: "My Profile",
            onPress: () => { navigation.navigate("updateinitial"), setSideBar(false) }
        },
        {
            icon: <MaterialIcons name="schedule" size={20} color="black" />,
            label: "My Schedule",
            onPress: () => { navigation.navigate("studentschedule"), setSideBar(false) }
        },
        {
            icon: <MaterialIcons name="task" size={20} color="black" />,
            label: "Exam Result",
            onPress: () => { navigation.navigate("myexams"), setSideBar(false) }
        },
        {
            icon: <MaterialIcons name="list-alt" size={20} color="black" />,
            label: "Teacher List",
            onPress: () => { navigation.navigate("teacherlist"), setSideBar(false) }
        },
        {
            icon: <MaterialCommunityIcons name="brightness-percent" size={20} color="black" />,
            label: "Subscription",
            onPress: () => { navigation.navigate("subscription"), setSideBar(false) }
        },
        {
            icon: <Ionicons name="settings" size={20} color="black" />,
            label: "Change Password",
            onPress: () => { navigation.navigate("changepassword"), setSideBar(false) }
        },
        {
            icon: <AntDesign name="logout" size={20} color="black" />, label: "Logout",
            onPress: () => { triggerLogout() }
        },
    ];
    const navItems_teachers = [
        {
            icon: <Feather name="user" size={20} color="black" />,
            label: "My Profile",
            onPress: () => { navigation.navigate("updateinitial"), setSideBar(false) }
        },
        {
            icon: <MaterialIcons name="schedule" size={20} color="black" />,
            label: "Time Schedule",
            onPress: () => { navigation.navigate("timeschedule"), setSideBar(false) }
        },
        {
            icon: <Ionicons name="document-text-outline" size={20} color="black" />,
            label: "My Session",
            onPress: () => { navigation.navigate("sessions"), setSideBar(false) }
        },
        {
            icon: <Ionicons name="settings" size={20} color="black" />,
            label: "Change Password",
            onPress: () => { navigation.navigate("changepassword"), setSideBar(false) }
        },
        {
            icon: <AntDesign name="logout" size={20} color="black" />, label: "Logout",
            onPress: () => { triggerLogout(), setSideBar(false) }
        },
    ];
    const { authUser, logout, openbar, setOpenBar, profile } = useContext(AuthContext)
    const navigation = useNavigation()
    const triggerLogout = async () => {
        Toast.show({
            type: "success",
            text1: "Success",
            text2: "You are successfully logout"
        })
        logout();
        navigation.navigate("login")
    }
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ position: "absolute", left: 10, zIndex: 10, alignItems: "center", flexDirection: "row", gap: 3 }}>
                <AntDesign onPress={() => setSideBar ? setSideBar(false) : setOpenBar(false)} name="left" size={14} color="black" />
                <Text onPress={() => setSideBar(false)} style={{ fontFamily: "Poppins_400Regular", paddingLeft: 5, }}>Back</Text>
            </SafeAreaView>
            <SafeAreaView style={styles.sidebox}>
                <View style={styles.userprof}>
                    <Image source={{ uri: profile?.image_path }} style={{ height: 90, width: 90, borderRadius: 45 }} />
                    <Text style={{ textAlign: "center", fontFamily: "Poppins_400Regular" }}>{authUser?.data?.name}</Text>
                </View>
                {/* STUDENTS */}
                <View style={styles.profileNavs}>
                    {

                        authUser?.data?.role_name === "STUDENT" ?
                            navItems_students.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.navLinks}
                                    onPress={item.onPress ? item.onPress : () => { }}
                                >
                                    {item.icon}
                                    <Text style={{ fontFamily: "Poppins_600SemiBold" }}>{item.label}</Text>
                                </TouchableOpacity>
                            ))
                            : navItems_teachers.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.navLinks}
                                    onPress={item.onPress ? item.onPress : () => { }}
                                >
                                    {item.icon}
                                    <Text style={{ fontFamily: "Poppins_600SemiBold" }}>{item.label}</Text>
                                </TouchableOpacity>
                            ))
                    }
                </View>
            </ SafeAreaView>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: fullheight + 100,
        width: fullWidth,
        zIndex: 999,
        backgroundColor: "rgba(0, 0, 0, 0.64)",
    },
    userprof: {
        width: 120,
        gap: 18,
        alignItems: "center",
        // borderWidth: 1,
    },
    sidebox: {
        height: "100%",
        width: "70%",
        backgroundColor: "#fff",
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
        paddingLeft: 20,
        justifyContent: "center",
    },
    profileNavs: {
        marginTop: 90,
        gap: 18,
    },
    navLinks: {
        paddingBottom: 10,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    }
})
export default Sidebar