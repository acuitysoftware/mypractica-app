import { View, Text, useWindowDimensions, Alert } from 'react-native'
import React from 'react'
import { overviewStyles } from './styles'
import striptags from 'striptags'
import { downloadFile } from '../../constants/Download'





const OverView = ({ details }) => {
    const { width } = useWindowDimensions();
    return (
        <View style={overviewStyles.container}>
            <View style={overviewStyles.overviewtextbox}>

                <Text style={overviewStyles.overviewtext}>
                    {striptags(details?.exam?.description)}

                </Text>
            </View>
            <Text style={overviewStyles.headtext}>
                {details?.exam?.name} Overview
            </Text>

            <View style={overviewStyles.detailbox}>
                <Text style={overviewStyles.detailheadbox}>
                    Exam Date
                </Text>
                <View style={overviewStyles.detailtexts}>
                    <Text style={overviewStyles.insidedetailtext}> {striptags(details?.exam?.exam_date)}</Text>
                </View>
            </View>
            <View style={overviewStyles.detailbox}>
                <Text style={overviewStyles.detailheadbox}>
                    Eligibility
                </Text>
                <View style={overviewStyles.detailtexts}>
                    <Text style={overviewStyles.insidedetailtext}>{details?.exam?.eligibility ? details?.exam?.eligibility : "Not Provided"}</Text>

                </View>
            </View>
            <View style={overviewStyles.detailbox}>
                <Text style={overviewStyles.detailheadbox}>
                    Official Notification
                </Text>
                <View style={overviewStyles.detailtexts}>
                    <Text style={overviewStyles.insidedetailtext} onPress={() => downloadFile(details?.exam?.notification_file_path)}>Download Pdf</Text>
                </View>
            </View>
        </View>
    )
}

export default OverView