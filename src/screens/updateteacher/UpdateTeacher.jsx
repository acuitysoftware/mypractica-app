import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Platform, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BackNav from '../../components/backNavigation/BackNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileImage from '../../components/profiles/ProfileImage';
import { updateProfile } from '../fullinfo/styles';


const UpdateTeacher = () => {



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ paddingHorizontal: 20 }} >
                <BackNav />
                <ProfileImage />
                <Text style={{ fontSize: 23, marginVertical: 12, fontFamily: "Poppins_600SemiBold", textAlign: "center" }}>Update Profile</Text>
                <TextInput
                    style={updateProfile.inputs}
                    placeholder='Name'
                ></TextInput>
                <TextInput
                    style={updateProfile.inputs}
                    placeholder='Mobile No.'
                ></TextInput>
                <TextInput
                    style={updateProfile.inputs}
                    placeholder='Email'
                ></TextInput>
                <TextInput
                    style={updateProfile.inputs}
                    placeholder='Address'
                ></TextInput>
                <TextInput
                    style={updateProfile.inputs}
                    placeholder='Qualification'
                ></TextInput>
                <View
                    style={updateProfile.inputs}>
                    <Text style={{
                        color: "#888888",
                        fontFamily: "Poppins_400Regular",
                    }}>City</Text>
                    {/* <View style={updateProfile.drop}>
                        <Text style={{ zIndex: 1 }}>Name</Text>
                        <Text style={{ zIndex: 1 }}>Name</Text>
                        <Text style={{ zIndex: 1 }}>Name</Text>
                        <Text style={{ zIndex: 1 }}>Name</Text>

                    </View> */}
                </View>
                <View
                    style={updateProfile.inputs}>
                    <Text style={{
                        color: "#888888",
                        fontFamily: "Poppins_400Regular",
                    }}>State</Text>
                    {/* <View style={updateProfile.drop}>
                        <Text style={{ zIndex: 1 }}>Name</Text>
                        <Text style={{ zIndex: 1 }}>Name</Text>
                        <Text style={{ zIndex: 1 }}>Name</Text>
                        <Text style={{ zIndex: 1 }}>Name</Text>

                    </View> */}
                </View>
                <View
                    style={updateProfile.inputs}>
                    <Text style={{
                        color: "#888888",
                        fontFamily: "Poppins_400Regular",
                    }}>Interested Course</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 15, }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#ddd", paddingHorizontal: 4, paddingVertical: 6, borderRadius: 10 }}>
                        <Text>Tag</Text>
                        <Text>X</Text>
                    </View>
                </View>
            </ScrollView >
        </SafeAreaView>

    );
};




export default UpdateTeacher;