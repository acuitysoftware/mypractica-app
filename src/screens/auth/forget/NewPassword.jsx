import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import BackNav from '../../../components/backNavigation/BackNav'
import { resetPassword } from '../../../services/auth';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NewPassword = ({ route }) => {
    const { email } = route.params;
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')

    const changePassword = async () => {
        try {
            const data = {
                email: email,
                password: password,
                password_confirmation: password_confirmation
            }
            const res = await resetPassword(data)
            if (res?.status !== false) {
                setLoading(false)
                Toast.show({
                    type: "success",
                    text1: res.message,
                })
                navigation.navigate("login")

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
            <Text style={styles.head}>Set New Password</Text>
            <Text style={styles.subhead}>Set your New Password</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter Your New Passowrd'
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Confirm Passowrd'
                secureTextEntry={true}
                value={password_confirmation}
                onChangeText={(text) => setPasswordConfirmation(text)}
            />
            <Text style={styles.info}>Atleast 1 Number Or A Special Character</Text>
            {
                loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#6565E2" />
                </View> : <TouchableOpacity onPress={changePassword} style={styles.button}>
                    <Text style={styles.buttontext}>Save</Text>
                </TouchableOpacity>
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
    head: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 6,
        fontSize: 20,
        fontFamily: "Poppins_600SemiBold"
    },
    subhead: {
        textAlign: "center",
        marginBottom: 10,
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: "#A0A0A0"
    },
    input: {
        marginBottom: 14,
        paddingVertical: 10,
        paddingHorizontal: 6,
        borderColor: "#A0A0A0",
        borderWidth: 0.7,
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        outline: "none",
        borderRadius: 5
    },
    info: {
        marginBottom: 10,
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: "#A0A0A0"
    },
    button: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        backgroundColor: "#6565E2",
        borderRadius: 4
    },
    buttontext: {
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: "#fff"
    }

})

export default NewPassword