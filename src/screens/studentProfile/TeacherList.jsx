import { View, Text, ScrollView, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackNav from '../../components/backNavigation/BackNav'
import ProfileImage from '../../components/profiles/ProfileImage'
import DateTimePicker from "@react-native-community/datetimepicker";
import AntDesign from '@expo/vector-icons/AntDesign';

import { teacherListStyles } from './styles'
import TeacherScheduleTime from '../../components/teacherlist/TeacherScheduleTime'
import ScheduleConfirm from '../../components/teacherlist/ScheduleConfirm'
import { availableTeachersList } from '../../services/teachers'
import { AuthContext } from '../../context/AuthContext'
import FooterBar from '../../components/footerbar/FooterBar'

const TeacherList = () => {
    // const [date, setDate] = useState(new Date());
    const [dates, setDates] = useState({}); // Object to store dates for each teacher
    const [dateshow, setDateShow] = useState(false);
    const [scheduleOpen, setSheduleOpen] = useState(false)
    const [sid, setSId] = useState('')
    const [showPicker, setShowPicker] = useState(null);
    const [tlsitshow, setTlistShow] = useState(true)
    const [tlist, setTlist] = useState(null)
    const { authUser } = useContext(AuthContext);
    const token = authUser?.token

    const handleDateChange = (id, event, selectedDate) => {
        const currentDate = selectedDate || dates[id];
        setShowPicker(null); // Close picker

        setDates((prevDates) => ({
            ...prevDates,
            [id]: currentDate, // Set date for specific teacher
        }));
    };

    const availableTeacher = async () => {
        try {
            const res = await availableTeachersList(token);
            // console.log(res)
            setTlist(res?.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        availableTeacher()
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView style={{ paddingHorizontal: 20, marginBottom: 90 }}>
                <BackNav />
                <ProfileImage />
                <Text style={teacherListStyles.heading}>Available Teachers</Text>
                {
                    tlsitshow ? <View style={teacherListStyles.lists}>
                        {
                            tlist?.map((t) => (
                                <View key={t.id} style={teacherListStyles.tbox}>
                                    <View style={teacherListStyles.upper}>
                                        <Image source={{ uri: t?.image_path }} style={teacherListStyles.timage} />
                                        <View style={teacherListStyles.tinfo}>
                                            <Text style={{ fontSize: 15, fontFamily: "Poppins_600SemiBold" }}>{t.name}</Text>
                                            <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular" }}>({t.education})</Text>
                                            <Text style={{ fontSize: 13, fontFamily: "Poppins_400Regular", color: "#888888" }}>{t.subject}</Text>
                                        </View>
                                    </View>

                                    {/* Date Picker */}
                                    <TouchableOpacity onPress={() => setShowPicker(t.id)} style={teacherListStyles.date}>
                                        {
                                            showPicker === t.id && (
                                                <DateTimePicker
                                                    value={dates[t.id] || new Date()}
                                                    mode="date"
                                                    display={Platform.OS === "ios" ? "inline" : "default"}
                                                    onChange={(event, selectedDate) => handleDateChange(t.id, event, selectedDate)}
                                                    minimumDate={new Date()} // Today's date
                                                    maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))} // 7 days from today
                                                />
                                            )
                                        }
                                        <Text style={{ fontFamily: "Poppins_400Regular", color: "#888888" }}>
                                            {dates[t.id] ? dates[t.id].toDateString() : "Select Date"}
                                        </Text>
                                        <AntDesign name="calendar" size={18} color="#888888" />
                                    </TouchableOpacity>

                                    {/* Schedule Button */}
                                    <TouchableOpacity style={teacherListStyles.butt}
                                        onPress={() => {
                                            if (dates[t.id]) {
                                                setSId(t?.id);
                                                setSheduleOpen(true);
                                                setTlistShow(false);
                                            } else {
                                                setSheduleOpen(false);
                                            }
                                        }}>
                                        <Text style={{ fontFamily: "Poppins_400Regular", color: "#fff" }}>Schedule Your Session</Text>
                                    </TouchableOpacity>
                                </View>
                            ))
                        }


                    </View> : null
                }

                {
                    scheduleOpen ? <TeacherScheduleTime date={dates[sid] || new Date()} id={sid} setScheduleOpen={setSheduleOpen} /> : null
                }

            </ScrollView>
            <FooterBar />
        </SafeAreaView>
    )
}

export default TeacherList