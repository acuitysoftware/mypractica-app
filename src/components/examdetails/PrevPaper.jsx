import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { prevpaperStyles } from './styles'
import striptags from 'striptags'
import { downloadFile } from '../../constants/Download'

const PrevPaper = ({ details }) => {
    return (
        <View style={prevpaperStyles.container}>
            <Text style={prevpaperStyles.heading}>{details?.exam?.name} Previous Paper Info</Text>
            <Text style={prevpaperStyles.texts}>{
                striptags(details?.exam?.previous_paper_description)
            }</Text>
            {
                details?.exam?.previous_paper?.map((prev) => (
                    <View key={prev?.id} style={prevpaperStyles.downloadBox}>
                        <Text style={{ fontFamily: "Poppins_600SemiBold", }}>{prev?.name}</Text>
                        <TouchableOpacity onPress={() => downloadFile(prev?.file_path)} style={prevpaperStyles.button}>
                            <Text style={prevpaperStyles.buttontexts}>Download Pdf</Text>
                        </TouchableOpacity>
                    </View>
                ))
            }

        </View>
    )
}

export default PrevPaper