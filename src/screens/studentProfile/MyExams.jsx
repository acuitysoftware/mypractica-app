import { View, Text, ScrollView, Image, TouchableOpacity, } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { examResultstyles } from './styles'
import pracico2 from "../../../assets/pracico2.png"
import BackNav from '../../components/backNavigation/BackNav'
import ProfileImage from '../../components/profiles/ProfileImage'
import ExamInputFields from '../../components/profiles/ExamInputFields'
import { getStudentAllResult } from '../../services/exam'
import { AuthContext } from '../../context/AuthContext'
import { useNavigation } from '@react-navigation/native'
import FooterBar from '../../components/footerbar/FooterBar'


const MyExams = () => {
    // searchName, from_date, to_date, limit, offset
    const [exam, setExam] = useState([])
    const [searchName, setSearchName] = useState('')
    const [from_date, setFrom_date] = useState('')
    const [to_date, setTo_date] = useState('')
    const [limit, setLimit] = useState('')
    const [offset, setOffset] = useState(1)
    const { authUser } = useContext(AuthContext)
    const token = authUser?.token
    const navigation = useNavigation()
    const getExams = async () => {
        try {
            const res = await getStudentAllResult(token, searchName, from_date, to_date, 5, offset)
            setExam(res?.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getExams()
    }, [searchName, to_date, from_date, offset])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ paddingHorizontal: 20, marginBottom: 90 }}>
                <BackNav />
                <ProfileImage />
                <Text style={examResultstyles.heading}>Exam Result</Text>
                <ExamInputFields
                    setSearchName={setSearchName}
                    setFrom_date={setFrom_date}
                    setTo_date={setTo_date}
                />
                <View style={examResultstyles.examboxes}>
                    {
                        !exam || exam?.length === 0 ? <Text style={{ marginVertical: 20, textAlign: "center", fontFamily: "Poppins_600SemiBold" }}>Sorry No Exams Attempted</Text> :
                            exam?.map((e) => (
                                <View key={e.id} style={examResultstyles.exambox}>
                                    <View style={examResultstyles.boxheading}>
                                        <Image source={pracico2} style={examResultstyles.headimage} />
                                        <Text style={examResultstyles.headtext}>{e?.name}</Text>
                                    </View>
                                    <Text >{e?.student_count}+ Students Enrolled</Text>
                                    <Text>Last Updated on {e?.last_update?.slice(0, 10)}</Text>
                                    <TouchableOpacity style={examResultstyles.viewresult} onPress={() => navigation.navigate("result", {
                                        id: e?.id,
                                        prof: true
                                    })}>
                                        <Text style={{
                                            fontSize: 13,
                                            fontFamily: "Poppins_400Regular",
                                            color: "#fff"
                                        }}>View Result</Text>
                                    </TouchableOpacity>
                                </View>

                            ))
                    }

                </View>
                <View style={examResultstyles.pagination}>
                    {
                        offset === 1 ? null : <TouchableOpacity onPress={() => setOffset(offset - 1)} style={examResultstyles.pgnbtn}>
                            <Text style={{
                                fontSize: 13,
                                fontFamily: "Poppins_400Regular",
                                color: "#fff"
                            }}>Previous</Text>
                        </TouchableOpacity>
                    }

                    {
                        offset === exam?.length ? null : <TouchableOpacity onPress={() => setOffset(offset + 1)} style={examResultstyles.pgnbtn}>
                            <Text style={{
                                fontSize: 13,
                                fontFamily: "Poppins_400Regular",
                                color: "#fff"
                            }}>Next</Text>
                        </TouchableOpacity>
                    }

                </View>
            </ScrollView>
            <FooterBar />
        </SafeAreaView>
    )
}

export default MyExams