import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign';
const ConfirmPay = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 25, paddingHorizontal: 25 }}>
                <AntDesign name="checkcircle" size={44} color="green" />
                <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 20, textAlign: "center" }}>Your Payment done successfully </Text>
                <TouchableOpacity style={{
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    backgroundColor: "#6565E2",
                }}
                    onPress={() => navigation.navigate('home')}
                >
                    <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 16, textAlign: "center", color: "#fff", borderRadius: 10 }}>
                        Return Home
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ConfirmPay