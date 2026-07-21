import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Foundation from '@expo/vector-icons/Foundation';
import Entypo from '@expo/vector-icons/Entypo';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const FooterBar = () => {
    const { setOpenBar, authUser } = useContext(AuthContext)
    const navigation = useNavigation()
    return (
        <View
            style={{ position: "absolute", bottom: 10, width: "100%", height: 80, alignItems: "center", justifyContent: "center", zIndex: 0 }}>
            {
                authUser?.data?.role_name === "STUDENT" ? <View
                    style={{
                        width: "70%",
                        backgroundColor: "#fff",
                        borderRadius: 20,
                        paddingVertical: 5,
                        borderColor: "#e7e7e7",
                        borderWidth: 1,
                        paddingHorizontal: 15,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-around"
                    }}
                >
                    <TouchableOpacity style={{ alignItems: "center", gap: 1 }} onPress={() => setOpenBar(true)}>
                        <FontAwesome name="user" size={18} color="black" />
                        <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 12 }}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("myexams")} style={{ alignItems: "center", gap: 1 }}>
                        <Foundation name="results" size={18} color="black" />
                        <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 12 }}>Exam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("home")} style={{ alignItems: "center", gap: 1 }}>
                        <Entypo name="home" size={18} color="black" />
                        <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 12 }}>Home</Text>
                    </TouchableOpacity>
                </View> : <View
                    style={{
                        width: "70%",
                        backgroundColor: "#fff",
                        borderRadius: 20,
                        paddingVertical: 5,
                        borderColor: "#e7e7e7",
                        borderWidth: 1,
                        paddingHorizontal: 15,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-around"
                    }}
                >
                    <TouchableOpacity style={{ alignItems: "center", gap: 1 }} onPress={() => setOpenBar(true)}>
                        <FontAwesome name="user" size={18} color="black" />
                        <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 12 }}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("sessions")} style={{ alignItems: "center", gap: 1 }}>
                        <Foundation name="results" size={18} color="black" />
                        <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 12 }}>Sessions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("home")} style={{ alignItems: "center", gap: 1 }}>
                        <Entypo name="home" size={18} color="black" />
                        <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 12 }}>Home</Text>
                    </TouchableOpacity>
                </View>
            }

        </View>
    )
}

export default FooterBar