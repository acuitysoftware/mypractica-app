import { View, Text, TouchableOpacity, Platform, StatusBar, StyleSheet, Image } from 'react-native'
import React, { useContext } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../Sidebar/Sidebar';

const BackNav = () => {
    const navigation = useNavigation()
    const { authUser, openbar, setOpenBar, profile } = useContext(AuthContext)
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 15 }}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={17} color="#888" />
                <Text style={styles.backText}>Back</Text>
            </ TouchableOpacity>
            <TouchableOpacity onPress={() => setOpenBar(true)}>
                <Image source={{ uri: profile?.image_path }} style={{ height: 30, width: 30, borderRadius: 15 }}>
                </Image>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },

    backText: {
        fontSize: 16,
        color: '#333',
        fontFamily: "Poppins_400Regular"

    },
})

export default BackNav