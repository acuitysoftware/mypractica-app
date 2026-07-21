import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackNav from '../../components/backNavigation/BackNav'
import ProfileImage from '../../components/profiles/ProfileImage'
import { changePasswordstyles } from './styles'
import Entypo from '@expo/vector-icons/Entypo';
import { AuthContext } from '../../context/AuthContext'
import { changePasswordAuth } from '../../services/auth'
import Toast from 'react-native-toast-message'
import FooterBar from '../../components/footerbar/FooterBar'

const ChangePassword = () => {
    // "old_password": "123456",
    // "password": "12345678",
    // "password_confirmation": "12345678"
    const { authUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [old_password, setOld_password] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const token = authUser?.token
    const data = {
        old_password: old_password,
        password: password,
        password_confirmation: password_confirmation
    }

    const changepassword = async () => {
        setLoading(true)
        try {
            const res = await changePasswordAuth(token, data);
            if (res?.status === false) {
                Toast.show({
                    type: 'error',
                    text1: res.message
                })
                setLoading(false)
            } else {
                Toast.show({
                    type: 'success',
                    text1: res.message
                })
                setLoading(false)
                setOld_password('')
                setPassword('')
                setPasswordConfirmation('')

            }
            console.log(res)
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: "Something Went Wrong"
            })
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ paddingHorizontal: 20, marginBottom: 90 }}
            >
                <BackNav />
                <ProfileImage />
                <Text style={changePasswordstyles.heading}>Change Password</Text>
                <View style={changePasswordstyles.input}>
                    <TextInput
                        style={{ fontFamily: "Poppins_400Regular", fontSize: 12, color: "#000" }}
                        placeholderTextColor={"#888888"}
                        placeholder='Enter Your Old Password'
                        secureTextEntry={!showOldPassword}
                        onChangeText={(text) => setOld_password(text)}
                    />
                    <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)}>
                        <Entypo name={showOldPassword ? "eye" : "eye-with-line"} size={16} color="#888888" />
                    </TouchableOpacity>
                </View>
                <View style={changePasswordstyles.input}>
                    <TextInput
                        style={{ fontFamily: "Poppins_400Regular", fontSize: 12, color: "#000" }}
                        placeholderTextColor={"#888888"}
                        placeholder='Enter Your New Password'
                        secureTextEntry={!showPassword}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Entypo
                            name={showPassword ? "eye" : "eye-with-line"}
                            size={16}
                            color="#888888"
                        />
                    </TouchableOpacity>
                </View>
                <View style={changePasswordstyles.input}>
                    <TextInput
                        style={{ fontFamily: "Poppins_400Regular", fontSize: 12, color: "#000" }}
                        placeholderTextColor={"#888888"}
                        placeholder='Confirm Password'
                        secureTextEntry={!showPasswordConfirmation}
                        onChangeText={(text) => setPasswordConfirmation(text)}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                    >
                        <Entypo
                            name={showPasswordConfirmation ? "eye" : "eye-with-line"}
                            size={16}
                            color="#888888"
                        />
                    </TouchableOpacity>
                </View>
                <Text style={{
                    marginTop: 10,
                    fontFamily: "Poppins_400Regular",
                    fontSize: 12,
                    color: "#888888"
                }}>Atleast 1 number or a special character</Text>
                {
                    loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#6C63FF" />
                    </View> : <TouchableOpacity onPress={() => changepassword()} style={changePasswordstyles.button}>
                        <Text
                            style={{
                                fontSize: 13,
                                fontFamily: "Poppins_400Regular",
                                color: "#fff"
                            }}
                        >
                            Submit
                        </Text>
                    </TouchableOpacity>
                }

            </ScrollView>
            <FooterBar />
        </SafeAreaView>
    )
}

export default ChangePassword