import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { examinfoStyles } from './styles'
import striptags from 'striptags'
import { downloadFile } from '../../constants/Download'

const ExamInfo = ({ details }) => {
    return (
        <View style={examinfoStyles.container}>
            <Text style={examinfoStyles.heading}>{details?.exam?.name} Info</Text>
            <Text style={examinfoStyles.texts}>
                {striptags(details?.exam?.exam_info)}
            </Text>
            <TouchableOpacity onPress={() => downloadFile(details?.exam?.exam_document_path)} style={examinfoStyles.button}>
                <Text style={examinfoStyles.buttontexts}>Download Pdf</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ExamInfo