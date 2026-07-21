import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { quizzeStyles } from './styles'
import { useNavigation } from '@react-navigation/native'

const Quizzes = ({ details, exams, setActiveNav }) => {
    const navigation = useNavigation()
    console.log(details?.exam?.quizzes)
    return (
        <View style={quizzeStyles.container}>
            <Text style={{ marginVertical: 20, fontSize: 16, fontFamily: "Poppins_600SemiBold" }}>Free Quizes</Text>
            {
                details?.exam?.free_quize?.map((q) => (
                    <View key={q.id} style={quizzeStyles.quizbox}>
                        <Text style={quizzeStyles.title}>
                            {q?.name}
                        </Text>
                        <Text style={quizzeStyles.examtag}>SSC-CHSL</Text>
                        <View style={quizzeStyles.expire}>
                            <Text style={{ fontFamily: "Poppins_400Regular" }}>Expires in:</Text>
                            <Text style={{ fontFamily: "Poppins_400Regular", paddingLeft: 5, color: "#6565E2" }}>{q?.expiry_date ? q?.expiry_date : "Not Provided"}</Text>
                        </View>
                        <View style={quizzeStyles.totaltimeq}>
                            <Text style={{ fontFamily: "Poppins_400Regular" }}>Questions</Text>
                            <Text style={{ fontFamily: "Poppins_400Regular" }}>{q?.no_of_questions} </Text>
                        </View>
                        <View style={quizzeStyles.totaltime}>
                            <Text style={{ fontFamily: "Poppins_400Regular" }}>Total Time</Text>
                            <Text style={{ fontFamily: "Poppins_400Regular" }}>{q?.total_time} mins</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate("quiz", {
                            id: q.id
                        })} style={quizzeStyles.startquiz}>
                            <Text style={{ fontFamily: "Poppins_400Regular", color: "#fff" }}>Start Quiz</Text>
                        </TouchableOpacity>
                    </View>
                ))
            }
            <Text style={{ marginVertical: 20, fontSize: 16, fontFamily: "Poppins_600SemiBold" }}>Paid Quizes</Text>
            {
                details?.exam?.paid_quize?.map((q) => (
                    <View key={q.id} style={quizzeStyles.quizbox}>
                        <Text style={quizzeStyles.title}>
                            {q?.name}
                        </Text>
                        <Text style={quizzeStyles.examtag}>SSC-CHSL</Text>
                        <View style={quizzeStyles.expire}>
                            <Text style={{ fontFamily: "Poppins_400Regular" }}>Expires in:</Text>
                            <Text style={{ fontFamily: "Poppins_400Regular", paddingLeft: 5, color: "#6565E2" }}>{q?.expiry_date ? q?.expiry_date : "Not Provided"}</Text>
                        </View>
                        <View style={quizzeStyles.totaltimeq}>
                            <Text style={{ fontFamily: "Poppins_400Regular" }}>Questions</Text>
                            <Text style={{ fontFamily: "Poppins_400Regular" }}>{q?.no_of_questions} </Text>
                        </View>
                        <View style={quizzeStyles.totaltime}>
                            <Text style={{ fontFamily: "Poppins_400Regular" }}>Total Time</Text>
                            <Text style={{ fontFamily: "Poppins_400Regular" }}>{q?.total_time} mins</Text>
                        </View>
                        {
                            exams?.find(e => e.exam_name === details?.exam?.name) ? <TouchableOpacity onPress={() => setActiveNav("supercoaching")} style={quizzeStyles.startquiz}>
                                <Text style={{ fontFamily: "Poppins_400Regular", color: "#fff" }}>Buy Exam for Paid Quiz</Text>
                            </TouchableOpacity> : <TouchableOpacity onPress={() => navigation.navigate("quiz", {
                                id: q.id
                            })} style={quizzeStyles.startquiz}>
                                <Text style={{ fontFamily: "Poppins_400Regular", color: "#fff" }}>Start Quiz</Text>
                            </TouchableOpacity>
                        }

                    </View>
                ))
            }
        </View>
    )
}

export default Quizzes