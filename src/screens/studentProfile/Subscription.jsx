import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackNav from '../../components/backNavigation/BackNav'
import { subscriptionstyles } from './styles'
import { AuthContext } from '../../context/AuthContext'
import ProfileImage from '../../components/profiles/ProfileImage'
import { getStudentSubs } from '../../services/student'
import FooterBar from '../../components/footerbar/FooterBar'

const Subscription = () => {
    const { authUser } = useContext(AuthContext)
    const [subs, setSubs] = useState(null)
    const token = authUser?.token;
    const getSubscriptions = async () => {
        try {
            const res = await getStudentSubs(token);
            console.log(res?.data)
            setSubs(res?.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        getSubscriptions()
    }, [])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ paddingHorizontal: 20, marginBottom: 90 }}>
                <BackNav />
                <ProfileImage />
                <Text style={subscriptionstyles.mysubhead}>My Subscription</Text>
                <View style={subscriptionstyles.subboxes}>
                    {
                        subs?.map((s) => (
                            <View key={s.id} style={subscriptionstyles.subbox}>
                                <View style={subscriptionstyles.tag}>
                                    <Text style={subscriptionstyles.tagtext}>
                                        {s?.exam_name}
                                    </Text>
                                </View>
                                <Text style={subscriptionstyles.price}>
                                    ₹{s?.price}
                                </Text>
                                <TouchableOpacity style={subscriptionstyles.subscribed}>
                                    <Text
                                        style={{ fontFamily: "Poppins_700Bold", fontSize: 14 }}
                                    >Subscribed</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }


                </View>
            </ScrollView>
            <FooterBar />
        </SafeAreaView>
    )
}

export default Subscription