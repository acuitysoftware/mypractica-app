import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Image } from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ProfileImage = ({ pickImage, selectedImage }) => {
    const navigation = useNavigation()
    const { authUser, profile } = useContext(AuthContext)

    return (
        <View style={{
            marginVertical: 30,
            alignItems: "center",
            justifyContent: "center",
            gap: 15,

        }}>
            <TouchableOpacity onPress={() => navigation.navigate("updateinitial")} style={{ width: 120, height: 120, position: "relative" }}>
                <MaterialIcons onPress={() => {
                    if (pickImage) {
                        pickImage()
                    } else {
                        return console.log("Nothing")
                    }

                }}
                    name="edit"
                    size={15}
                    color="white"
                    style={{ padding: 7, backgroundColor: "#003362", borderRadius: 50, position: "absolute", top: 80, right: "20%", zIndex: 1 }}
                />
                <Image source={{ uri: selectedImage ? selectedImage.uri : profile?.image_path }} style={{ height: 100, width: 100, borderRadius: 50 }} />
            </TouchableOpacity>
            <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 17, color: "#414141" }}>{authUser?.data?.name}</Text>
        </View>
    )
}

export default ProfileImage