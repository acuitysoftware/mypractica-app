import { View, Text, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import Toast from 'react-native-toast-message'
import { TeacherScheduleAccept } from '../../services/teachers'
import { AuthContext } from '../../context/AuthContext'


const fullheight = Dimensions.get('window').height
const fullWidth = Dimensions.get('window').width
const JoinModal = ({ acceptStudent, setOpenSc }) => {
    const { authUser } = useContext(AuthContext)
    const token = authUser?.token
    const [pname, setPname] = useState('')
    const [plink, setPlink] = useState('')
    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };
    const acceptStudentRequest = async () => {
        try {
            if (!plink && !pname) {
                Toast.show({
                    text1: "PLease Provide Platform name and PLatform link",
                    type: "error"
                })
            }
            else if (!isValidUrl(plink)) {
                Toast.show({
                    text1: "Please Provide valid link",
                    type: "error"
                })

            }
            else {
                const res = await TeacherScheduleAccept(token, acceptStudent?.id, pname, plink);
                if (res?.status === false) {

                    Toast.show({
                        text1: res?.message,
                        type: "error"
                    })
                } else {
                    Toast.show({
                        text1: res?.message,
                        type: "success"
                    })
                    setOpenSc(false)
                }
            }


        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.modal}>
                <Image source={{ uri: acceptStudent?.img }} style={{ height: 60, width: 60, borderRadius: 30 }}></Image>
                <Text style={{ fontSize: 17, fontFamily: "Poppins_600SemiBold" }}>{acceptStudent?.name}</Text>
                {/* <Text style={{ fontSize: 17, fontFamily: "Poppins_600SemiBold" }}>{acceptStudent?.email}</Text> */}
                <Text style={{ fontSize: 17, fontFamily: "Poppins_600SemiBold" }}>Time: {acceptStudent?.time}</Text>
                <Text style={{ fontSize: 17, fontFamily: "Poppins_600SemiBold" }}>Date: {acceptStudent?.date}</Text>
                <TextInput
                    style={{ borderColor: "#ddd", borderWidth: 0.6, width: "100%", fontFamily: "Poppins_400Regular", color: "#000" }}
                    placeholder='Enter Meeting Platform Name'
                    onChangeText={(text) => setPname(text)}
                />
                <TextInput
                    style={{ borderColor: "#ddd", borderWidth: 0.6, width: "100%", fontFamily: "Poppins_400Regular", color: "#000" }}
                    placeholder='Enter Google Meet'
                    onChangeText={(text) => setPlink(text)}
                />

                <TouchableOpacity
                    onPress={() => acceptStudentRequest()}
                    style={{
                        backgroundColor: "#6565e2",
                        paddingHorizontal: 25,
                        paddingVertical: 7,
                        borderRadius: 7
                    }}>

                    <Text style={{ fontFamily: "Poppins_400Regular", color: "#fff" }}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: "red",
                    paddingHorizontal: 25,
                    paddingVertical: 7,
                    borderRadius: 7
                }}>
                    <Text style={{ fontFamily: "Poppins_400Regular", color: "#fff" }} onPress={() => setOpenSc(false)}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: fullheight + 100,
        width: fullWidth,
        zIndex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.64)",
        alignItems: "center",
        justifyContent: "center"
    },
    modal: {
        height: "50%",
        width: "80%",
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        borderRadius: 14,
        gap: 15,
        alignItems: "center",
        justifyContent: "center"
    },

})
export default JoinModal