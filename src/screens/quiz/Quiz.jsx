import { View, Text, ScrollView, TouchableOpacity, Button, Alert, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { quizStyles } from './styles'
import BackNav from '../../components/backNavigation/BackNav'
import { Image } from 'react-native'
import quizimg from "../../../assets/quizimg.png"
import pracico from "../../../assets/pracico.png"
import QuizSummary from './QuizSummary'
import Timer from '../../components/Timer/Timer'
import { useNavigation } from '@react-navigation/native'
import { fetchQuizDetails, fetchQuizQuestions, QuizQuestionsSubmit } from '../../services/exam'
import { AuthContext } from '../../context/AuthContext'
import Toast from 'react-native-toast-message'

const Quiz = ({ route }) => {
    const { id } = route.params
    const [qdata, setQdata] = useState(null)
    const [qquestions, setQquestions] = useState(null)
    const [answers, setAnswers] = useState({})
    const [answerdata, setAnswerData] = useState([])
    const [resumeOutside, setResumeOutside] = useState(false)
    const { authUser } = useContext(AuthContext)
    const token = authUser?.token
    const [loading, setLoading] = useState(false)
    const [openSummary, setOpenSummary] = useState(false)
    const navigation = useNavigation();
    const [offset, setOffset] = useState(0)
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [createsummary, setCreateSummary] = useState({
        exam_name: "",
        no_of_questions: "",
        answered_questions: "",
        not_answered_question: "",
        not_visited: ""
    })


    const quizdetailsfetch = async () => {
        try {
            const res = await fetchQuizDetails(token, id);
            setQdata(res?.data)
            setCreateSummary({
                exam_name: res?.data?.name,
                no_of_questions: res?.data?.questions_count,
                answered_questions: answerdata?.length,
                not_answered_question: (res?.data?.questions_count - answerdata?.length),
                not_visited: res?.data?.questions_count - (offset + 1
                )
            })
        } catch (error) {

        }
    }
    const quizQuestionsfetch = async () => {
        try {

            const res = await fetchQuizQuestions(token, id, offset);
            setQquestions(res?.data)
        } catch (error) {

        }
    }
    const onOptionClick = async (opt, ans) => {
        setAnswers((prev) => ({
            ...prev,
            [qquestions.id]: opt
        }
        ))

        await setAnswerData(prev => {
            let found = false;
            const updated = prev.map(item => {
                if (item.question_id === qquestions.id) {
                    found = true;
                    return { ...item, answered: ans };
                }
                return item;
            });
            return found ? updated : [...updated, { question_id: qquestions.id, answered: ans }];
        });


    }

    const Pausing = () => {
        setOpenSummary(true)
        setResumeOutside(true)
    }


    useEffect(() => {
        setCreateSummary({
            exam_name: qdata?.name,
            no_of_questions: qdata?.questions_count,
            answered_questions: answerdata?.length,
            not_answered_question: (qdata?.questions_count - answerdata?.length),
            not_visited: qdata?.questions_count - (offset + 1
            )
        })


    }, [answerdata])

    useEffect(() => {
        quizdetailsfetch()
    }, [])
    useEffect(() => {

        quizQuestionsfetch()
    }, [offset])

    useEffect(() => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString("en-CA");
        const formattedTime = now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

        setDate(formattedDate);
        setTime(formattedTime);
    }, []);
    const data = {
        exam_id: qdata?.exam_id,
        exam_quizze_id: id,
        answer_data: answerdata,
        start_date: date,
        start_time: time
    }
    const submitQuizQuestions = async () => {
        try {
            setLoading(true)
            const res = await QuizQuestionsSubmit(token, data)
            if (res?.status === false) {
                Toast.show({
                    type: 'error',
                    text1: res.message
                })
                setLoading(false)
            } else {
                Toast.show({
                    type: 'success',
                    text1: res.message
                })
                setLoading(false)
                navigation.navigate('result', {
                    id: res?.data?.result_id,
                    prof: false
                })

            }
            console.log(res)
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: "Something Went Wrong"
            })
            console.log(error)
            setLoading(false)
        }

    }
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", position: "relative" }}>
            {openSummary ? <QuizSummary setOpenSummary={setOpenSummary} setResume={setResumeOutside} createsummary={createsummary} /> : null}
            {
                loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#6C63FF" />
                </View> :

                    <ScrollView style={{ paddingHorizontal: 18 }}>
                        <BackNav />

                        <View style={quizStyles.intros}>
                            <Image source={quizimg} style={quizStyles.headimage} />
                            <View style={quizStyles.headinfo}>
                                <Image source={pracico}></Image>
                                <Text style={{ width: '80%', fontFamily: "Poppins_400Regular" }}>{qdata?.name}</Text>
                            </View>
                            <Text style={quizStyles.enrolled}>3778.9k+ Students Enrolled</Text>
                            <Text style={quizStyles.lastupdt}>Last Updated On {qdata?.updated_at?.slice(0, 10)}</Text>
                        </View>
                        <Text style={quizStyles.quizname}>New Quiz Work Day - Sepcial</Text>
                        <View style={quizStyles.timer}>
                            {qdata ?
                                <Timer initialTime={qdata?.total_time} onPause={Pausing} isPaused={resumeOutside} /> : null}
                        </View>
                        <TouchableOpacity onPress={() => submitQuizQuestions()} style={quizStyles.submit}>
                            <Text style={{
                                color: "#fff",
                                fontFamily: "Poppins_400Regular"
                            }}>Submit Quiz</Text>
                        </TouchableOpacity>
                        <Text style={quizStyles.noofquestions}>
                            Question {offset + 1} Of {qdata?.questions_count}
                        </Text>
                        {
                            qquestions ? <View style={quizStyles.quizquestions}>
                                <Text style={quizStyles.question} >
                                    {qquestions?.question}
                                </Text>
                                {/* OPTION A */}
                                <TouchableOpacity
                                    style={answers[qquestions?.id] === qquestions?.option_a ? quizStyles.answerselect : quizStyles.answer}
                                    onPress={() => onOptionClick(qquestions?.option_a, "A")}
                                >
                                    <View style={quizStyles.numb}>
                                        <Text style={{ color: "#fff" }}>1</Text>
                                    </View>
                                    <Text style={{ fontFamily: "Poppins_400Regular", color: answers[qquestions?.id] === qquestions?.option_a ? "#fff" : "#000" }}>{qquestions?.option_a}</Text>
                                </TouchableOpacity>
                                {/* OPTION B */}
                                <TouchableOpacity
                                    style={answers[qquestions?.id] === qquestions?.option_b ? quizStyles.answerselect : quizStyles.answer}
                                    onPress={() => onOptionClick(qquestions?.option_b, "B")}
                                >
                                    <View style={quizStyles.numb}>
                                        <Text style={{ color: "#fff" }}>2</Text>
                                    </View>
                                    <Text
                                        style={{ fontFamily: "Poppins_400Regular", color: answers[qquestions?.id] === qquestions?.option_b ? "#fff" : "#000" }}
                                    >
                                        {qquestions?.option_b}
                                    </Text>
                                </TouchableOpacity>
                                {/* OPTION C */}
                                <TouchableOpacity
                                    style={answers[qquestions?.id] === qquestions?.option_c ? quizStyles.answerselect : quizStyles.answer}
                                    onPress={() => onOptionClick(qquestions?.option_c, "C")}
                                >
                                    <View style={quizStyles.numb}>
                                        <Text style={{ color: "#fff" }}>3</Text>
                                    </View>
                                    <Text style={{ fontFamily: "Poppins_400Regular", color: answers[qquestions?.id] === qquestions?.option_c ? "#fff" : "#000" }}>{qquestions?.option_c}</Text>
                                </TouchableOpacity>
                                {/* OPTION D */}
                                <TouchableOpacity
                                    style={answers[qquestions?.id] === qquestions?.option_d ? quizStyles.answerselect : quizStyles.answer}
                                    onPress={() => onOptionClick(qquestions?.option_d, "D")}
                                >
                                    <View style={quizStyles.numb}>
                                        <Text style={{ color: "#fff" }}>4</Text>
                                    </View>
                                    <Text style={{ fontFamily: "Poppins_400Regular", color: answers[qquestions?.id] === qquestions?.option_d ? "#fff" : "#000" }}>{qquestions?.option_d}</Text>
                                </TouchableOpacity>
                                <View style={quizStyles.pagination}>
                                    <TouchableOpacity
                                        onPress={() => setOffset(offset - 1)}
                                        disabled={offset === 1 ? true : false} style={quizStyles.pgn}
                                    >
                                        <Text style={{ color: "#fff", fontFamily: "Poppins_400Regular" }}>Previous</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={quizStyles.pgn}
                                        onPress={() => {
                                            setOffset(offset + 1)
                                            console.log(answerdata)
                                        }}
                                        disabled={offset === qdata?.questions_count - 1 ? true : false}>
                                        <Text style={{ color: "#fff", fontFamily: "Poppins_400Regular" }}>Next</Text>
                                    </TouchableOpacity>
                                </View>
                            </View> : <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 16, textAlign: "center", marginVertical: 20 }}>Sorry No Questions has been updated yet</Text>
                        }


                    </ScrollView>
            }

        </SafeAreaView>
    )
}

export default Quiz