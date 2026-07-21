import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import BackNav from '../../components/backNavigation/BackNav'
import ProfileImage from '../../components/profiles/ProfileImage'
import SessionFilters from '../../components/profiles/SessionFilters'
import { sessionStyles } from './styles'
import { TeacherBookedSchedule, TeacherScheduleReject } from '../../services/teachers'
import Toast from 'react-native-toast-message'
import { AuthContext } from '../../context/AuthContext'
import FooterBar from '../../components/footerbar/FooterBar'

const MySessions = () => {
    const { logout, authUser } = useContext(AuthContext)
    const token = authUser?.token
    // setStatusId, setFrom_date, setTo_date
    const [statusId, setStatusId] = useState('')
    const [from_date, setFrom_date] = useState('')
    const [to_date, setTo_Date] = useState('')
    const [schedule, setSchedule] = useState(null)


    const teacherSchedule = async () => {
        try {
            const res = await TeacherBookedSchedule(token, from_date, to_date, statusId, 0);
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

    const rejectStudent = async (e) => {
        try {
            const res = await TeacherScheduleReject(token, e);
            if (res?.status === false) {
                Toast.show({
                    type: "error",
                    text1: res?.message
                })
            } else {
                Toast.show({
                    type: "success",
                    text1: res?.message
                })
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        teacherSchedule()
    }, [statusId, from_date, to_date])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView style={{ paddingHorizontal: 20, marginBottom: 90 }}>
                <BackNav />
                <ProfileImage />
                <Text style={{
                    textAlign: "center", marginVertical: 30, fontSize: 20,
                    fontFamily: "Poppins_600SemiBold"
                }}>My Available Session Time</Text>
                <SessionFilters setFrom_date={setFrom_date} setTo_date={setTo_Date} setStatusId={setStatusId} />
                <View style={sessionStyles.reqlist}>
                    {
                        !schedule || schedule?.length === 0 ? <Text style={{ textAlign: "center", marginVertical: 40, fontFamily: "Poppins_400Regular", fontSize: 20 }}>Sorry No Sessions to Show</Text> :
                            schedule?.map((s) => (
                                <View key={s?.id} style={sessionStyles.reqbox}>
                                    <View style={sessionStyles.reqsec1}>
                                        <View style={sessionStyles.reqsec1Left}>
                                            <Image style={sessionStyles.reqsec1image} source={{ uri: s?.student?.image_path }}></Image>
                                            <Text style={sessionStyles.reqPSB}>{s?.student?.name}</Text>
                                        </View>

                                    </View>
                                    <View style={sessionStyles.reqsec2}>
                                        <View style={sessionStyles.recsec2sec}>
                                            <Text style={sessionStyles.reqPSB}>Date</Text>
                                            <Text style={sessionStyles.reqPR}>{s?.date}</Text>
                                        </View>
                                        <View style={sessionStyles.recsec2sec}>
                                            <Text style={sessionStyles.reqPSB}>Time</Text>
                                            <Text style={sessionStyles.reqPR}>{s?.time}</Text>
                                        </View>
                                    </View>
                                    <View style={sessionStyles.reqsec2}>
                                        <View style={sessionStyles.recsec2sec}>
                                            <Text style={sessionStyles.reqPSB}>Joining Platform</Text>
                                            <Text style={sessionStyles.reqPR}>{s?.platform_name}</Text>
                                        </View>
                                        <View style={sessionStyles.recsec2sec}>
                                            <Text style={sessionStyles.reqPSB}>Action</Text>
                                            {

                                                s.current_status === "Pending" ?
                                                    <View style={sessionStyles?.reqsecaction}>
                                                        <TouchableOpacity
                                                            style={sessionStyles.reqsecbutt}
                                                            onPress={() => {
                                                                setAcceptStudent({
                                                                    id: s.id,
                                                                    img: s?.student?.image_path,
                                                                    name: s?.student?.name,
                                                                    time: s?.time,
                                                                    date: s?.date
                                                                })
                                                                setOpenSc(true)
                                                            }}
                                                        >
                                                            <Text style={{ fontFamily: "Poppins_400Regular", color: "#fff", fontSize: 12 }}>Accept</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            onPress={() => rejectStudent(s?.id)}
                                                            style={sessionStyles.reqsecbuttr}
                                                        >
                                                            <Text style={{ fontFamily: "Poppins_400Regular", color: "#fff", fontSize: 12 }}>Reject</Text>
                                                        </TouchableOpacity>
                                                    </View> : null

                                            }
                                            {
                                                s?.current_status === "Acceppted" ? <View style={sessionStyles?.reqsecaction}>
                                                    <TouchableOpacity style={sessionStyles.reqsecbutt}>
                                                        <Text onPress={() => openURL(s.link)} style={{ fontFamily: "Poppins_400Regular", color: "#fff", fontSize: 12 }}>Join</Text>
                                                    </TouchableOpacity>
                                                </View> : null
                                            }
                                            {
                                                s?.current_status === "Rejected" ? <View style={sessionStyles?.reqsecaction}>
                                                    <TouchableOpacity style={sessionStyles.reqsecbuttr}>
                                                        <Text style={{ fontFamily: "Poppins_400Regular", color: "#fff", fontSize: 12 }}>Rejected</Text>
                                                    </TouchableOpacity>
                                                </View> : null
                                            }
                                            {
                                                s?.current_status === "Completed" ? <View style={sessionStyles?.reqsecaction}>
                                                    <TouchableOpacity style={sessionStyles.reqsecbutta}>
                                                        <Text style={{ fontFamily: "Poppins_400Regular", color: "#fff", fontSize: 12 }}>Completed</Text>
                                                    </TouchableOpacity>
                                                </View> : null
                                            }
                                        </View>
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

export default MySessions