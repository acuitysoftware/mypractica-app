import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image, ActivityIndicator } from 'react-native';
import myprac from "../../../../assets/myparc.png"
import { SafeAreaView } from 'react-native-safe-area-context';
import BackNav from '../../../components/backNavigation/BackNav';
import Toast from 'react-native-toast-message';
import { emailOtpVerifyStudent, emailOtpVerifyTeacher, resendOtpStudent } from '../../../services/auth';
import { useNavigation } from '@react-navigation/native';
const Verification = ({ route }) => {
    const [code, setCode] = useState(['', '', '', '', '']);
    const inputs = useRef([]);
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const { email, type } = route.params
    const handleChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text && index < 4) {
            inputs.current[index + 1]?.focus();
        }
    };



    const data = {
        email: email,
        otp: code.join("")
    }
    const onOtpCheck = async () => {
        setLoading(true)
        try {
            if (type === "Student") {
                if (code.includes("")) {
                    setLoading(false)
                    Toast.show({
                        text1: "Please Enter 5 digit Otp",
                        type: "error"
                    })
                } else {
                    const res = await emailOtpVerifyStudent(data);
                    if (res.status === false) {
                        setLoading(false)
                        Toast.show({
                            text1: res.message,
                            type: "error"
                        })
                    } else {
                        setLoading(false)
                        Toast.show({
                            text1: res.message,
                            type: "success"
                        })
                        // navigateTo("/sign-in")
                        navigation.navigate("login")
                    }
                }


            } else if (type === "TEACHER") {
                if (otp.includes("")) {
                    setLoading(false)
                    Toast.show({
                        text1: "Please Enter 5 digit Otp",
                        type: "error"
                    })
                } else {
                    const res = await emailOtpVerifyTeacher(data);
                    if (res.status === false) {
                        setLoading(false)
                        Toast.show({
                            text1: res.message,
                            type: "error"
                        })
                    } else {
                        setLoading(false)
                        Toast.show({
                            text1: res.message,
                            type: "success"
                        })
                        // navigateTo("/sign-in")
                        navigation.navigate("login")
                    }
                }


            }
        } catch (error) {
            setLoading(false)
        }
    }
    const resendCode = async () => {
        try {
            if (type === "STUDENT") {
                const data = {
                    email: email
                };
                const res = await resendOtpStudent(data);
                if (res.status === false) {
                    Toast.show({
                        text1: res.message,
                        type: "error"
                    })
                } else {
                    Toast.show({
                        text1: res.message,
                        type: "success"
                    })
                }
            } else if (type === "TEACHER") {
                const data = {
                    email: email
                };
                const res = await resendOtpTeacher(data);
                if (res.status === false) {
                    Toast.show({
                        text1: res.message,
                        type: "error"
                    })
                } else {
                    Toast.show({
                        text1: res.message,
                        type: "success"
                    })
                }
            }
        } catch (error) {

        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <BackNav />
                <View style={styles.logoContainer}>
                    <Image source={myprac} style={styles.logo} />
                </View>
                <Text style={styles.title}>Email verification</Text>
                <Text style={styles.subtitle}>Enter the 5 digit code sent to you at {email}</Text>
                {
                    loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#6C63FF" />
                    </View> : <View style={styles.codeContainer}>
                        {code.map((digit, index) => (
                            <TextInput
                                key={index}
                                style={styles.input}
                                keyboardType="numeric"
                                maxLength={1}
                                ref={(ref) => (inputs.current[index] = ref)}
                                onChangeText={(text) => handleChange(text, index)}
                                value={digit}
                            />
                        ))}
                    </View>
                }


                <Text style={styles.resendText}>Didn’t receive code? <Text style={styles.resendLink} onPress={resendCode}>Resend again</Text></Text>

                <TouchableOpacity style={styles.button} onPress={onOtpCheck}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Verification;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 20,
        marginBottom: 40,
    },
    logo: {
        height: 60,
        objectFit: "contain"
    },
    title: { fontSize: 20, textAlign: 'center', fontFamily: "Poppins_600SemiBold" },
    subtitle: { fontSize: 14, textAlign: 'center', marginVertical: 10, fontFamily: "Poppins_400Regular", color: "#888" },
    codeContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: 20 },
    input: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        textAlign: 'center',
        marginHorizontal: 5,
        fontSize: 18,
        borderRadius: 10
    },
    resendText: { textAlign: 'center', marginVertical: 10, fontSize: 14, fontFamily: "Poppins_400Regular" },
    resendLink: { color: '#6565E2', fontFamily: "Poppins_600SemiBold" },
    button: { backgroundColor: '#6565E2', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
    buttonText: { color: '#fff', fontSize: 16, fontFamily: "Poppins_600SemiBold" }
});