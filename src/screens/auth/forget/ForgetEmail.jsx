import { View, Text, StyleSheet, ScrollView, Image, TextInput, Button, Touchable, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import BackNav from '../../../components/backNavigation/BackNav'
import myprac from "../../../../assets/myparc.png"
import { useNavigation } from '@react-navigation/native'
import { forgetPassword } from '../../../services/auth'
import Toast from 'react-native-toast-message'
import { SafeAreaView } from 'react-native-safe-area-context'

const ForgetEmail = ({ route }) => {
    const navigation = useNavigation();
    const { role, email } = route.params
    const [newmail, setNewMail] = useState(email)
    const [loading, setLoading] = useState(false)
    console.log(role)

    const sendMailOtp = async () => {
        setLoading(true)
        try {
            const res = await forgetPassword(newmail);
            if (res?.status !== false) {
                setLoading(false)
                Toast.show({
                    type: "success",
                    text1: res.message,
                })
                navigation.navigate("forget", {
                    mail: newmail
                })

            } else {
                setLoading(false)
                Toast.show({
                    type: "error",
                    text1: res.message,
                })

            }
        } catch (error) {
            setLoading(false)
            Toast.show({
                type: "error",
                text1: "Something Went Wrong",
            })
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <BackNav />
            <View style={styles.logoContainer}>
                <Image source={myprac} style={styles.logo} />
            </View>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subHeading}>Select which contact details should we use to reset your password</Text>
            {
                loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#6565E2" />
                </View> :

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Enter Your Email :-</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Enter Your Email :-'
                            value={newmail}
                            onChangeText={(text) => setNewMail(text)}
                        />
                        <TouchableOpacity style={styles.button} title='Continue' color={"#6565E2"} onPress={() => sendMailOtp()}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
            }
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 20,
        marginBottom: 40,
    },
    logo: {
        height: 60,
        objectFit: "contain"
    },
    title: {
        textAlign: "center",
        marginBottom: 10,
        fontSize: 20,
        fontFamily: "Poppins_600SemiBold"
    },
    subHeading: {
        fontFamily: "Poppins_400Regular",
        fontSize: 13,
        textAlign: "center",
        color: "#A0A0A0",
        paddingHorizontal: 15,
        marginBottom: 30
    },
    inputContainer: {
        gap: 20,
        paddingHorizontal: 10
    },
    label: {
        fontSize: 12,
        fontFamily: "Poppins_600SemiBold"
    },
    input: {
        borderColor: "#8888",
        borderWidth: 1,
        paddingHorizontal: 7,
        paddingVertical: 10,
        borderRadius: 10
    },
    button: {
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6565E2",
        paddingVertical: 10,
    },
    buttonText: {
        color: "#fff",
        fontFamily: "Poppins_400Regular",
    }


})

export default ForgetEmail