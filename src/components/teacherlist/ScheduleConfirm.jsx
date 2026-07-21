import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { teacherListStyles } from '../../screens/studentProfile/styles'
import { useNavigation } from '@react-navigation/native'

const ScheduleConfirm = ({ tdetail, time, topic, amount, id, date }) => {
    console.log(tdetail, time, topic, id, date)
    const navigation = useNavigation()


    const day = new Date(tdetail?.date).toLocaleDateString("en-US", { weekday: "long" });
    return (
        <View style={styles.scheduleconfirmview}>
            <View style={teacherListStyles.upper}>
                <Image source={{ uri: tdetail?.data?.image_path }} style={teacherListStyles.timage} />
                <View style={teacherListStyles.tinfo}>
                    <Text style={{ fontSize: 15, fontFamily: "Poppins_600SemiBold" }}>{tdetail?.data?.name}</Text>
                    <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular" }}>({tdetail?.data?.education})</Text>
                    <Text style={{ fontSize: 13, fontFamily: "Poppins_400Regular", color: "#888888" }}>{tdetail?.data?.subject}</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 8, justifyContent: "space-between" }}>
                <View style={{ gap: 8 }}>
                    <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 15 }}>Time</Text>
                    <Text style={{ fontFamily: "Poppins_400Regular" }}>{time}</Text>
                </View>
                <View style={{ gap: 8 }}>
                    <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 15 }}>Date</Text>
                    <Text style={{ fontFamily: "Poppins_400Regular" }}>{tdetail?.date?.slice(0, 10)}</Text>
                </View>

            </View>
            <View style={{ flexDirection: "row", marginVertical: 8, justifyContent: "space-between" }}>
                <View style={{ gap: 8 }}>
                    <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 15 }}>Day</Text>
                    <Text style={{ fontFamily: "Poppins_400Regular" }}>{day}</Text>
                </View>
                <View style={{ gap: 8 }}>
                    <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 15 }}>Amount</Text>
                    <Text
                        style={{ fontFamily: "Poppins_400Regular", paddingVertical: 4, paddingHorizontal: 5, color: "#fff", backgroundColor: "#6565E2", textAlign: "center", borderRadius: 4 }}
                        onPress={() => navigation.navigate("purchaseschedule", {
                            id: id,
                            date: tdetail?.date,
                            topic: topic,
                            amount: amount

                        })}
                    >Pay</Text>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    scheduleconfirmview: {
        marginVertical: 30,
        gap: 20,
        backgroundColor: "#F6F6F6",
        padding: 12,
        borderRadius: 8
    }
})

export default ScheduleConfirm