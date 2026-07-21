import { View, Text, ScrollView, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { schedulestyles } from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackNav from '../../components/backNavigation/BackNav'
import ProfileImage from '../../components/profiles/ProfileImage'
import { AuthContext } from '../../context/AuthContext'
import { getStudentSchedule } from '../../services/student'
import FooterBar from '../../components/footerbar/FooterBar'

const MySchedule = () => {
    const { authUser } = useContext(AuthContext)
    const [schedule, setSchedule] = useState(null)
    const token = authUser?.token

    const getSchedule = async () => {
        try {
            const res = await getStudentSchedule(token)
            console.log(res?.data)
            setSchedule(res?.data)
        } catch (error) {

        }
    }
    const openURL = async (url) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            alert("Can't open this URL");
        }
    };
    useEffect(() => {
        getSchedule()
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView style={{ paddingHorizontal: 20, marginBottom: 90 }}>
                <BackNav />
                <ProfileImage />
                <Text style={schedulestyles.heading}>Recent Schedule</Text>
                <View style={schedulestyles.scheduleLists}>
                    {
                        !schedule || schedule?.length === 0 ? <Text style={{ marginVertical: 20, textAlign: "center", fontFamily: "Poppins_600SemiBold" }}>Sorry No Schedules to show</Text> :
                            schedule?.map((m) => (
                                <View key={m?.id} style={schedulestyles.schedule}>
                                    <View style={schedulestyles.info1}>
                                        <View style={schedulestyles.firstInfo}>
                                            <Image source={{ uri: m?.teacher?.image_path }} style={schedulestyles.teacherimage} />
                                            <View style={schedulestyles.teacherInfo}>
                                                <Text style={{ fontSize: 12, fontFamily: "Poppins_600SemiBold" }}>{m?.teacher?.name}</Text>
                                                <Text style={{ fontSize: 10, fontFamily: "Poppins_400Regular" }}>{m?.teacher?.education}</Text>
                                                <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular", color: "#888888" }}>{m?.teacher?.subject}</Text>
                                            </View>
                                        </View>
                                        <View style={schedulestyles.teachertime}>
                                            <Text style={{ fontSize: 12, fontFamily: "Poppins_600SemiBold" }}>Time</Text>
                                            <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular" }}>{m.time}</Text>
                                        </View>
                                    </View>
                                    <View style={schedulestyles.info2}>
                                        <View style={schedulestyles.infosec}>
                                            <Text style={{ fontSize: 12, fontFamily: "Poppins_600SemiBold" }}>Date</Text>
                                            <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular" }}>{m.date}</Text>
                                        </View>
                                        <View style={schedulestyles.infosec}>
                                            <Text style={{ fontSize: 12, fontFamily: "Poppins_600SemiBold" }}>Google Platform</Text>
                                            <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular" }}>{m.platform_name}</Text>
                                        </View>
                                        <View style={schedulestyles.infosec}>
                                            <Text style={{ fontSize: 12, fontFamily: "Poppins_600SemiBold" }}>Amount</Text>
                                            <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular" }}>₹ {m.amount}</Text>
                                        </View>
                                    </View>
                                    <View style={schedulestyles.buttsec}>
                                        {
                                            m?.current_status === "Pending" ?
                                                <TouchableOpacity style={schedulestyles.joinbuttonP}>
                                                    <Text style={{ fontSize: 13, fontFamily: "Poppins_400Regular", color: "#fff" }}>Pending</Text>
                                                </TouchableOpacity>
                                                : m?.current_status === "Acceppted" ?
                                                    <TouchableOpacity onPress={() => openURL(m?.link)} style={schedulestyles.joinbutton}>
                                                        <Text style={{ fontSize: 13, fontFamily: "Poppins_400Regular", color: "#fff" }}>Join</Text>
                                                    </TouchableOpacity>
                                                    : m?.current_status === "Rejected" ?
                                                        <TouchableOpacity style={schedulestyles.joinbuttonP}>
                                                            <Text style={{ fontSize: 13, fontFamily: "Poppins_400Regular", color: "#fff" }}>Rejected</Text>
                                                        </TouchableOpacity>
                                                        : <TouchableOpacity style={schedulestyles.joinbuttonC}>
                                                            <Text style={{ fontSize: 13, fontFamily: "Poppins_400Regular", color: "#fff" }}>Completed</Text>
                                                        </TouchableOpacity>
                                        }
                                    </View>
                                </View>
                            ))
                    }


                </View>
            </ScrollView>
            <FooterBar />
        </SafeAreaView>
    )
}

export default MySchedule