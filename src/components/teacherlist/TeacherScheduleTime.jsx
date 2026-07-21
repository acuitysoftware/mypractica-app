import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { teacherListStyles } from '../../screens/studentProfile/styles'
import { TouchableOpacity } from 'react-native'
import { availableTeachersDetail } from '../../services/teachers'
import { AuthContext } from '../../context/AuthContext'
import ScheduleConfirm from './ScheduleConfirm'
import Toast from 'react-native-toast-message'

const TeacherScheduleTime = ({ id, date, setScheduleOpen }) => {
    console.log(id, date)
    const { authUser } = useContext(AuthContext)
    const [confirmopen, setConfirmOpen] = useState(false)
    const [time, setTime] = useState('')
    const [topic, setTopic] = useState('')
    const [amount, setAmount] = useState('')
    const [sid, setSid] = useState('')
    const [tdetail, setTDetail] = useState(null)
    const token = authUser?.token
    const detailsofTeacher = async () => {
        try {
            const res = await availableTeachersDetail(token, id, date);
            setTDetail(res)
        } catch (error) {

        }
    }
    console.log(tdetail, "Teachers Detailssssssss")
    useEffect(() => {
        detailsofTeacher()
    }, [])
    return (
        <>
            {
                tdetail?.status === false ?
                    <View style={{ gap: 20 }}>
                        <Text style={{ marginVertical: 30, fontFamily: "Poppins_600SemiBold", textAlign: "center" }}>No Available Sessions</Text>
                        {/* <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: "#6565E2" }}>
                            <Text>Go Back</Text>
                        </TouchableOpacity> */}
                    </View> :
                    !confirmopen ?
                        <View style={styles.scheduleView}>
                            <View style={teacherListStyles.upper}>
                                <Image source={{ uri: tdetail?.data?.image_path }} style={teacherListStyles.timage} />
                                <View style={teacherListStyles.tinfo}>
                                    <Text style={{ fontSize: 15, fontFamily: "Poppins_600SemiBold" }}>{tdetail?.data?.name}</Text>
                                    <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular" }}>{(tdetail?.data?.education)}</Text>
                                    <Text style={{ fontSize: 13, fontFamily: "Poppins_400Regular", color: "#888888" }}>{tdetail?.data?.subject}</Text>
                                </View>
                            </View>
                            <View style={styles.tags}>
                                {
                                    tdetail?.schedules?.map((t) => (
                                        <Text
                                            onPress={() => {
                                                if (t?.is_available === true) {
                                                    setTime(t?.time)
                                                    setAmount(t?.amount)
                                                    setSid(t?.id)
                                                } else {
                                                    Toast.show({
                                                        type: "error",
                                                        text1: "The Schedule availability expired"
                                                    })
                                                }
                                            }}
                                            key={t?.id}
                                            style={time === t?.time ? styles.tag2 : t?.is_available !== true ? styles.tag3 : styles.tag}
                                        >
                                            {t?.time}
                                        </Text>
                                    ))
                                }
                            </View>
                            <View style={styles.topic}>
                                <Text style={{ fontSize: 18, fontFamily: "Poppins_600SemiBold" }}>Enter Your Topic </Text>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={10}
                                    style={{
                                        height: 140,
                                        borderRadius: 10,
                                        textAlignVertical: 'top',
                                        backgroundColor: "#fff",
                                        color: "#000"
                                    }}
                                    onChangeText={(text) => setTopic(text)}
                                ></TextInput>
                                <TouchableOpacity style={styles.schedulebutt} onPress={() => {
                                    if (time) {
                                        setConfirmOpen(true)
                                    } else {
                                        Toast.show({
                                            type: "error",
                                            text1: "Please Select a time"
                                        })
                                    }
                                }}>
                                    <Text style={{ color: "#fff", fontFamily: "Poppins_600SemiBold" }}>Schedule</Text>
                                </TouchableOpacity>
                            </View>

                        </View> : <ScheduleConfirm tdetail={tdetail} date=
                            {date} id={sid} time={time} topic={topic} amount={amount} />

            }


        </>

    )
}
const styles = StyleSheet.create({
    scheduleView: {
        marginVertical: 30,
        gap: 20,
        backgroundColor: "#F6F6F6",
        padding: 12,
        borderRadius: 8
    },
    tags: {
        marginVertical: 12,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 15
    },
    tag: {
        paddingHorizontal: 4,
        paddingVertical: 5,
        backgroundColor: "#fff",
        borderRadius: 5,
        fontFamily: "Poppins_400Regular"
    },
    tag2: {
        paddingHorizontal: 4,
        paddingVertical: 5,
        backgroundColor: "green",
        color: "#fff",
        borderRadius: 5,
        fontFamily: "Poppins_400Regular"
    },
    tag3: {
        paddingHorizontal: 4,
        paddingVertical: 5,
        backgroundColor: "#ddd",
        borderRadius: 5,
        fontFamily: "Poppins_400Regular"
    },
    topic: {
        marginVertical: 10,
        gap: 15
    },
    schedulebutt: {
        width: 120,
        paddingVertical: 7,
        backgroundColor: "#6565E2",
        alignItems: "center",
        borderRadius: 5

    }
})
export default TeacherScheduleTime