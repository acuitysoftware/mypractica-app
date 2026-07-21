import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { quizStyles } from './styles'

const QuizSummary = ({ setOpenSummary, setResume, createsummary }) => {
    return (
        <View style={quizStyles.summary}>
            <View style={quizStyles.summaryBox}>
                <Text style={quizStyles.text1}>Quiz Summary</Text>
                <Text style={quizStyles.text2}>Your Answe has been saved successfully</Text>
                <View style={quizStyles.sections}>
                    <View
                        style={quizStyles.leftSection}
                    >
                        <Text
                            style={quizStyles.insidesectext}>
                            Section
                        </Text>
                    </View>
                    <View
                        style={quizStyles.leftSection}
                    >
                        <Text
                            style={quizStyles.insidesectext}
                        >
                            {createsummary.exam_name}
                        </Text>
                    </View>
                </View>
                <View style={quizStyles.sections}>
                    <View
                        style={quizStyles.leftSection}
                    >
                        <Text
                            style={quizStyles.insidesectext}>
                            No. Of Questions
                        </Text>
                    </View>
                    <View
                        style={quizStyles.leftSection}
                    >
                        <Text
                            style={quizStyles.insidesectext}
                        >
                            {createsummary?.no_of_questions}
                        </Text>
                    </View>
                </View>
                <View style={quizStyles.sections}>
                    <View
                        style={quizStyles.leftSection}
                    >
                        <Text
                            style={quizStyles.insidesectext}>
                            Answered
                        </Text>
                    </View>
                    <View
                        style={quizStyles.leftSection}
                    >
                        <Text
                            style={quizStyles.insidesectext}
                        >
                            {createsummary?.answered_questions}
                        </Text>
                    </View>
                </View>
                <View style={quizStyles.sections}>
                    <View
                        style={quizStyles.leftSection}
                    >
                        <Text
                            style={quizStyles.insidesectext}>
                            Not Answered
                        </Text>
                    </View>
                    <View
                        style={quizStyles.leftSection}
                    >
                        <Text
                            style={quizStyles.insidesectext}
                        >
                            {createsummary?.not_answered_question}
                        </Text>
                    </View>
                </View>
                <View style={quizStyles.sections}>
                    <View
                        style={quizStyles.leftSection}
                    >
                        <Text
                            style={quizStyles.insidesectext}>
                            Not Visited
                        </Text>
                    </View>
                    <View
                        style={quizStyles.leftSection}
                    >
                        <Text
                            style={quizStyles.insidesectext}
                        >
                            {createsummary?.not_visited}
                        </Text>
                    </View>
                </View>


                <View style={quizStyles.summarybuttons}>
                    <TouchableOpacity
                        style={quizStyles.summarybutt}
                        onPress={() => setOpenSummary(false)}
                    >
                        <Text
                            style={{ color: "#fff", fontFamily: "Poppins_400Regular", textAlign: "center", fontSize: 12 }}
                        >
                            Back To Quizzes
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={quizStyles.summarybutt}
                        onPress={() => {
                            setOpenSummary(false);
                            setResume(false)
                        }}
                    >
                        <Text style={{ color: "#fff", fontFamily: "Poppins_400Regular", textAlign: "center", fontSize: 12 }}>Resume Quiz</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default QuizSummary