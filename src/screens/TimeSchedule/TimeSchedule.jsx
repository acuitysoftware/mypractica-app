import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackNav from '../../components/backNavigation/BackNav'
import ProfileImage from '../../components/profiles/ProfileImage'
import DateTimePicker from "@react-native-community/datetimepicker";
import { timeschedulestyles } from './styles'
import { AuthContext } from '../../context/AuthContext'
import { createSchedule, getTeacherScheduleList, getTeacherSubjectList } from '../../services/teachers'
import Toast from 'react-native-toast-message'
import FooterBar from '../../components/footerbar/FooterBar'


const TimeSchedule = () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [slots, setSlots] = useState([]);
    const { authUser } = useContext(AuthContext)
    const token = authUser?.token
    const [opendays, setOpenDays] = useState(false)
    const [opensubs, setOpenSubs] = useState(false)
    const [subjects, setSubjects] = useState(null)
    const [loading, setLoading] = useState(false)
    const [from_time, setFromTime] = useState(new Date());
    const [to_time, setToTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [showPicker2, setShowPicker2] = useState(false);
    const [allschedule, setAllSchedule] = useState(null)
    const [formdata, setFormData] = useState({
        id: "",
        day: "",
        subject_id: "",
        from_time: "",
        to_time: "",
    })

    const timeSchedules = async () => {
        try {
            const res = await getTeacherScheduleList(token, "")

            setAllSchedule(res.data)
        } catch (error) {

        }
    }
    const subjectLists = async () => {
        try {
            const res = await getTeacherSubjectList(token)
            setSubjects(res?.data)

        } catch (error) {
            console.log(error)
        }
    }

    const onTimeChange = (event, selectedTime) => {
        setShowPicker(false);
        if (selectedTime) {
            // const formattedTime = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            // const stringifiedTime = JSON.stringify(selectedTime);
            setFromTime(selectedTime);
            setFormData((prev) => ({
                ...prev,
                from_time: selectedTime // Use the selected time directly
            }));
        }
    };
    const onTimeChange2 = (event, selectedTime) => {
        setShowPicker2(false);
        if (selectedTime) {
            // const formattedTime = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            // const stringifiedTime = JSON.stringify(selectedTime);
            setToTime(selectedTime);
            setFormData((prev) =>
            ({
                ...prev,
                to_time: selectedTime
            })
            )
        }
    };

    const addslots = async () => {
        try {
            // Convert the from_time and to_time to Date objects for accurate comparison
            const fromTime = new Date(formdata.from_time);
            const toTime = new Date(formdata.to_time);

            const formattedFromTime = fromTime.toTimeString().split(" ")[0]; // "12:15:00"
            const formattedToTime = toTime.toTimeString().split(" ")[0]; // "14:00:00"

            // Validate that to_time is after from_time
            if (toTime <= fromTime) {
                alert("The end time must be later than the start time.");
                return;
            }

            // Check for duplicate slot in local slots
            const isDuplicateSlot = slots.some(
                (s) =>
                    s.day === formdata.day &&
                    s.from_time === formattedFromTime &&
                    s.to_time === formattedToTime &&
                    s.subject_id === formdata.subject_id
            );

            // Check for duplicate slot in server schedule (allschedule)
            const isDuplicateInSchedule = allschedule?.some(
                (s) =>
                    s.day === formdata.day &&
                    s.from_time === formattedFromTime &&
                    s.to_time === formattedToTime &&
                    s.subject_id === formdata.subject_id
            );

            if (isDuplicateSlot || isDuplicateInSchedule) {
                Toast.show({
                    type: "error",
                    text1: "This time slot already exists."
                });
                return;
            }

            // If validation passes, add the new slot
            setSlots((prev) => [
                ...prev,
                {
                    ...formdata,
                    from_time: formattedFromTime,
                    to_time: formattedToTime
                }
            ]);

            setFormData({
                id: "",
                day: "",
                subject_id: "",
                from_time: "",
                to_time: "",
            });

            console.log("Slot added:", {
                ...formdata,
                from_time: formattedFromTime,
                to_time: formattedToTime
            });
        } catch (error) {
            console.error("Error adding slot:", error);
            alert("Failed to add slot. Please try again.");
        }
    };

    const createScheduleT = async () => {
        setLoading(true)
        try {
            if (slots) {
                const res = await createSchedule(token, slots);
                if (res.status === false) {
                    Toast.show({
                        type: "error",
                        text1: res.message
                    })
                    setLoading(false)
                } else {
                    Toast.show({
                        type: "success",
                        text1: res.message
                    })
                    setSlots([])
                    setLoading(false)
                }
            } else {
                Toast.show({
                    type: "error",
                    text1: "Please add slots first"
                })
                setLoading(false)
            }

        } catch (error) {

        }
    }


    useEffect(() => {
        timeSchedules();
    }, [])
    useEffect(() => {
        subjectLists();
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView style={{ paddingHorizontal: 20, marginBottom: 90 }}>
                <BackNav />
                <ProfileImage />
                <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 25 }}>Create Your Available Session Time</Text>
                <View style={timeschedulestyles.boxs}>
                    <View style={timeschedulestyles.boxrow}>
                        <Text style={timeschedulestyles.boxrtext}>Select Date:</Text>
                        <TouchableOpacity onPress={() => setOpenDays(!opendays)} style={timeschedulestyles.input}>
                            <Text style={{ fontSize: 13, fontFamily: "Poppins_400Regular", color: "#888888" }}>{formdata.day ? formdata.day : "Day"}</Text>
                            {
                                opendays ? <View style={{ gap: 6, padding: 10, backgroundColor: "#fff", width: "100%", position: "absolute", bottom: "100%", zIndex: 999 }}>
                                    {
                                        daysOfWeek.map((d, i) => (
                                            <Text onPress={() => {
                                                setFormData((prev) =>
                                                ({
                                                    ...prev,
                                                    day: d
                                                })
                                                )
                                                setOpenDays(false)
                                            }
                                            } key={i}>{d}</Text>
                                        ))
                                    }
                                </View> : null
                            }

                        </TouchableOpacity>
                    </View>
                    <View style={timeschedulestyles.boxrow}>
                        <Text style={timeschedulestyles.boxrtext}>From</Text>
                        <TouchableOpacity onPress={() => setShowPicker(true)} style={timeschedulestyles.input}>
                            <Text style={{ fontSize: 13, fontFamily: "Poppins_400Regular", color: "#888888" }}>
                                {
                                    formdata?.from_time ? from_time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Select"
                                }
                            </Text>
                        </TouchableOpacity>
                        {showPicker && (
                            <DateTimePicker
                                value={from_time}
                                mode="time"
                                display="default"
                                onChange={onTimeChange}
                            />
                        )}
                    </View>
                    <View style={timeschedulestyles.boxrow}>
                        <Text style={timeschedulestyles.boxrtext} >To</Text>
                        <TouchableOpacity onPress={() => setShowPicker2(true)} style={timeschedulestyles.input}>
                            <Text style={{ fontSize: 13, fontFamily: "Poppins_400Regular", color: "#888888" }}>
                                {
                                    formdata?.to_time ? to_time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Select"
                                }
                            </Text>
                        </TouchableOpacity>
                        {showPicker2 && (
                            <DateTimePicker
                                value={to_time}
                                mode="time"
                                display="default"
                                onChange={onTimeChange2}
                            />
                        )}
                    </View>
                    <View style={timeschedulestyles.boxrow}>
                        <TouchableOpacity onPress={() => setOpenSubs(!opensubs)} style={timeschedulestyles.input}>
                            <Text style={{ fontSize: 13, fontFamily: "Poppins_400Regular", color: "#888888" }}>
                                {formdata.subject_id ? subjects?.find((a) => a.id === formdata.subject_id)?.name : "Select Subject"}
                            </Text>
                            {
                                opensubs ? <View style={{ gap: 6, padding: 10, backgroundColor: "#fff", width: "100%", position: "absolute", bottom: "100%", zIndex: 999 }}>
                                    {
                                        subjects?.map((d) => (
                                            <Text onPress={() => {
                                                setFormData((prev) =>
                                                ({
                                                    ...prev,
                                                    subject_id: d.id
                                                })
                                                )
                                                setOpenSubs(false)
                                            }
                                            } key={d.id}>{d.name}</Text>
                                        ))
                                    }
                                </View> : null
                            }

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => addslots()}
                            style={timeschedulestyles.addslot}>
                            <Text style={{ color: "#fff", textAlign: "center" }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#6C63FF" />
                    </View> : <TouchableOpacity onPress={createScheduleT} style={timeschedulestyles.submit}>
                        <Text style={{ fontSize: 15, fontFamily: "Poppins_600SemiBold", color: "#fff" }}>Save</Text>
                    </TouchableOpacity>
                }

                <Text style={{ fontSize: 24, fontFamily: "Poppins_600SemiBold", marginVertical: 12 }}>Your Slots</Text>
                {
                    slots?.length === 0 ? <Text style={{ fontSize: 14, fontFamily: "Poppins_400Regular" }}>Slots are not selected</Text> :

                        slots?.map((s, i) => (
                            <View key={i} style={{
                                marginVertical: 20,
                                padding: 12,
                                backgroundColor: "#e7e7e7",
                                borderRadius: 10,
                                gap: 12
                            }}>

                                <Text style={{ fontSize: 14, fontFamily: "Poppins_400Regular" }}>From Date :{s.from_time}</Text>
                                <Text style={{ fontSize: 14, fontFamily: "Poppins_400Regular" }}>To Date :  {s.to_time}</Text>
                                <Text style={{ fontSize: 14, fontFamily: "Poppins_400Regular" }}>Day : {s.day}</Text>
                                <Text style={{ fontSize: 14, fontFamily: "Poppins_400Regular" }}>Subject : {subjects?.find((a) => a.id === s.subject_id)?.name}</Text>
                            </View>
                        ))


                }

            </ScrollView>
            <FooterBar />
        </SafeAreaView>
    )
}

export default TimeSchedule