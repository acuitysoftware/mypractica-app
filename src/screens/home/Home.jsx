import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Button,
  Linking,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import myprac from '../../../assets/myparc.png';
import { homeStyles } from './styles';
import ExamCards from '../../components/exmCards/ExamCards';
import { AuthContext } from '../../context/AuthContext';
import {
  fetchcourselist,
  getExamList,
  getStudentDashboard,
} from '../../services/student';
import Sidebar from '../../components/Sidebar/Sidebar';
import {
  getTeacherDashboard,
  TeacherBookedSchedule,
  TeacherScheduleReject,
} from '../../services/teachers';
import JoinModal from '../../components/profiles/JoinModal';
import Toast from 'react-native-toast-message';
import FooterBar from '../../components/footerbar/FooterBar';

const DATA = [
  { id: '1', title: 'Banking Exams' },
  { id: '2', title: 'Civil Services Exam' },
  { id: '3', title: 'SSC Exams' },
  { id: '4', title: 'Railway Exams' },
  // Add more as needed
];

const cardData = [
  {
    id: '1',
    title: 'SSC GD Constable',
    image:
      'https://spunout.ie/wp-content/uploads/2023/09/student_taking_a_college_exam.jpg',
  },
  {
    id: '2',
    title: 'UPSC Civil Services',
    image: 'https://d2zp5xs5cp8zlg.cloudfront.net/image-102753-800.jpg',
  },
  {
    id: '3',
    title: 'JPSC Civil Services',
    image:
      'https://spunout.ie/wp-content/uploads/2023/09/student_taking_a_college_exam.jpg',
  },
  {
    id: '4',
    title: 'SSC CHSL',
    image: 'https://images.indianexpress.com/2020/06/exam-1.jpg',
  },
];

const Home = () => {
  const flatListRef = useRef(null);
  const { logout, authUser, profile } = useContext(AuthContext);
  const [dashData, setDashData] = useState(null);
  const [acceptStudent, setAcceptStudent] = useState({});
  const [loading, setLoading] = useState(false);
  const [opensc, setOpenSc] = useState(false);
  const [schedule, setSchedule] = useState(null);
  const [courses, setCourses] = useState([]);
  const [examid, setExamId] = useState('');
  const [exams, setExams] = useState(null);
  const [sidebar, setSideBar] = useState(false);
  const token = authUser?.token;
  console.log(authUser?.data?.role_name);
  const scrollBy = (direction) => {
    flatListRef.current?.scrollToOffset({
      offset: direction === 'left' ? 0 : Dimensions.get('window').width,
      animated: true,
    });
  };
  const openURL = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      alert("Can't open this URL");
    }
  };

  const getDashBoard = async () => {
    try {
      if (authUser?.data?.role_name === 'STUDENT') {
        const res = await getStudentDashboard(token);
        setDashData(res?.data);
      } else {
        const res = await getTeacherDashboard(token);
        setDashData(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(dashData);
  const fetchCourse = async () => {
    try {
      const res = await fetchcourselist();
      setCourses(res);
    } catch (error) {}
  };

  const fetchExams = async () => {
    try {
      setLoading(true);
      const res = await getExamList(examid);
      setExams(res?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(examid);

  const teacherSchedule = async () => {
    try {
      setLoading(true);
      const res = await TeacherBookedSchedule(token, '', '', '', 0);
      setSchedule(res?.data);
      setLoading(false);
      console.log(res);
    } catch (error) {}
  };

  const rejectStudent = async (e) => {
    try {
      const res = await TeacherScheduleReject(token, e);
      if (res?.status === false) {
        Toast.show({
          type: 'error',
          text1: res?.message,
        });
      } else {
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDashBoard();
  }, []);
  useEffect(() => {
    fetchCourse();
  }, []);
  useEffect(() => {
    teacherSchedule();
  }, []);
  useEffect(() => {
    fetchExams();
  }, [examid]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {opensc ? (
        <JoinModal acceptStudent={acceptStudent} setOpenSc={setOpenSc} />
      ) : null}
      {sidebar ? <Sidebar setSideBar={setSideBar} /> : null}
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#6C63FF" />
        </View>
      ) : (
        <ScrollView
          style={{
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            paddingHorizontal: 20,
            marginBottom: 90,
          }}
        >
          <View style={homeStyles.imageSection}>
            <Image source={myprac} style={homeStyles.logo} />
          </View>
          {/* <TouchableOpacity style={{ alignItems: "center" }} onPress={() => setSideBar(true)}>
                            <Image source={{ uri: profile?.image_path }} style={{ height: 50, width: 50, borderRadius: 215 }} />
                        </TouchableOpacity> */}

          {/* <Button title='Logout' onPress={() => logout()} /> */}
          {
            // !!Student
            authUser?.data?.role_name === 'STUDENT' ? (
              <View style={homeStyles.performance}>
                <View style={homeStyles.boxes}>
                  <View style={homeStyles.numerics}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 20,
                        fontFamily: 'Poppins_600SemiBold',
                      }}
                    >
                      {dashData?.total_test_subscribe}
                    </Text>
                  </View>
                  <Text style={homeStyles.boxtext}>Total Tests Subscribe</Text>
                </View>
                <View style={homeStyles.boxes2}>
                  <View style={homeStyles.numerics}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 20,
                        fontFamily: 'Poppins_600SemiBold',
                      }}
                    >
                      {dashData?.total_test_attempted}
                    </Text>
                  </View>
                  <Text style={homeStyles.boxtext}>Total Tests Attempted</Text>
                </View>
                <View style={homeStyles.boxes}>
                  <View style={homeStyles.numerics}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 20,
                        fontFamily: 'Poppins_600SemiBold',
                      }}
                    >
                      {dashData?.average_score}
                    </Text>
                  </View>
                  <Text style={homeStyles.boxtext}>
                    Average score of attempted exams
                  </Text>
                </View>
              </View>
            ) : (
              // !!Teacher
              <View style={homeStyles.performance}>
                <View style={homeStyles.boxes}>
                  <View style={homeStyles.numerics}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 20,
                        fontFamily: 'Poppins_600SemiBold',
                      }}
                    >
                      {dashData?.total_sessions}
                    </Text>
                  </View>
                  <Text style={homeStyles.boxtext}>Total Complete Session</Text>
                </View>
                <View style={homeStyles.boxes2}>
                  <View style={homeStyles.numerics}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 20,
                        fontFamily: 'Poppins_600SemiBold',
                      }}
                    >
                      {dashData?.today_sessions}
                    </Text>
                  </View>
                  <Text style={homeStyles.boxtext}>Today Join Session</Text>
                </View>
                <View style={homeStyles.boxes}>
                  <View style={homeStyles.numerics}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 20,
                        fontFamily: 'Poppins_600SemiBold',
                      }}
                    >
                      {parseFloat(dashData?.total_hours).toFixed(2)}
                    </Text>
                  </View>
                  <Text style={homeStyles.boxtext}>Total Hours</Text>
                </View>
              </View>
            )
          }
          {authUser?.data?.role_name === 'STUDENT' ? (
            <View style={homeStyles.exmscrolls}>
              <TouchableOpacity
                style={homeStyles.arrowLeft}
                onPress={() => scrollBy('left')}
              >
                <Text style={homeStyles.arrowText}>‹</Text>
              </TouchableOpacity>

              <FlatList
                ref={flatListRef}
                data={courses}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={homeStyles.list}
                renderItem={({ item }) => (
                  <View
                    style={
                      item.id === examid ? homeStyles.card2 : homeStyles.card
                    }
                  >
                    <Text
                      onPress={() => setExamId(item?.id)}
                      style={
                        item.id === examid
                          ? homeStyles.cardText2
                          : homeStyles.cardText
                      }
                    >
                      {item.name}
                    </Text>
                  </View>
                )}
              />

              <TouchableOpacity
                style={homeStyles.arrowRight}
                onPress={() => scrollBy('right')}
              >
                <Text style={homeStyles.arrowText}>›</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {authUser?.data?.role_name === 'STUDENT' ? (
            <View style={homeStyles.exmcardgrid}>
              {exams?.length === 0 ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontFamily: 'Poppins_400Regular' }}>
                    Sorry No Exams Found
                  </Text>
                </View>
              ) : (
                exams?.map((c) => <ExamCards key={c.id} item={c} />)
              )}
            </View>
          ) : null}
          {authUser?.data?.role_name === 'TEACHER' ? (
            <View style={homeStyles?.requestedsession}>
              <Text style={homeStyles?.reqhead}>Requested Session</Text>
              <View style={homeStyles.reqlist}>
                {!schedule || schedule?.length === 0 ? (
                  <Text
                    style={{
                      textAlign: 'center',
                      marginVertical: 40,
                      fontFamily: 'Poppins_400Regular',
                      fontSize: 20,
                    }}
                  >
                    Sorry No Sessions to Show
                  </Text>
                ) : (
                  schedule?.map((s) => (
                    <View key={s?.id} style={homeStyles.reqbox}>
                      <View style={homeStyles.reqsec1}>
                        <View style={homeStyles.reqsec1Left}>
                          <Image
                            style={homeStyles.reqsec1image}
                            source={{ uri: s?.student?.image_path }}
                          ></Image>
                          <Text style={homeStyles.reqPSB}>
                            {s?.student?.name}
                          </Text>
                        </View>
                        <View style={homeStyles.reqsec1Right}>
                          <Text style={homeStyles.reqPSB}>Time</Text>
                          <Text style={homeStyles.reqPR}>{s?.time}</Text>
                        </View>
                      </View>
                      <View style={homeStyles.reqsec2}>
                        <View style={homeStyles.recsec2sec}>
                          <Text style={homeStyles.reqPSB}>Date</Text>
                          <Text style={homeStyles.reqPR}>{s?.date}</Text>
                        </View>
                        <View style={homeStyles.recsec2sec}>
                          <Text style={homeStyles.reqPSB}>Day</Text>
                          <Text style={homeStyles.reqPR}>{s?.day}</Text>
                        </View>
                        <View style={homeStyles.recsec2sec}>
                          <Text style={homeStyles.reqPSB}>Action</Text>
                          {s.current_status === 'Pending' ? (
                            <View style={homeStyles?.reqsecaction}>
                              <TouchableOpacity
                                style={homeStyles.reqsecbutt}
                                onPress={() => {
                                  setAcceptStudent({
                                    id: s.id,
                                    img: s?.student?.image_path,
                                    name: s?.student?.name,
                                    time: s?.time,
                                    date: s?.date,
                                  });
                                  setOpenSc(true);
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: 'Poppins_400Regular',
                                    color: '#fff',
                                    fontSize: 12,
                                  }}
                                >
                                  Accept
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => rejectStudent(s?.id)}
                                style={homeStyles.reqsecbuttr}
                              >
                                <Text
                                  style={{
                                    fontFamily: 'Poppins_400Regular',
                                    color: '#fff',
                                    fontSize: 12,
                                  }}
                                >
                                  Reject
                                </Text>
                              </TouchableOpacity>
                            </View>
                          ) : null}
                          {s?.current_status === 'Acceppted' ? (
                            <View style={homeStyles?.reqsecaction}>
                              <TouchableOpacity
                                onPress={() => openURL(s.link)}
                                style={homeStyles.reqsecbutt}
                              >
                                <Text
                                  style={{
                                    fontFamily: 'Poppins_400Regular',
                                    color: '#fff',
                                    fontSize: 12,
                                  }}
                                >
                                  Join
                                </Text>
                              </TouchableOpacity>
                            </View>
                          ) : null}
                          {s?.current_status === 'Rejected' ? (
                            <View style={homeStyles?.reqsecaction}>
                              <TouchableOpacity style={homeStyles.reqsecbuttr}>
                                <Text
                                  style={{
                                    fontFamily: 'Poppins_400Regular',
                                    color: '#fff',
                                    fontSize: 12,
                                  }}
                                >
                                  Rejected
                                </Text>
                              </TouchableOpacity>
                            </View>
                          ) : null}
                          {s?.current_status === 'Completed' ? (
                            <View style={homeStyles?.reqsecaction}>
                              <TouchableOpacity style={homeStyles.reqsecbutta}>
                                <Text
                                  style={{
                                    fontFamily: 'Poppins_400Regular',
                                    color: '#fff',
                                    fontSize: 12,
                                  }}
                                >
                                  Completed
                                </Text>
                              </TouchableOpacity>
                            </View>
                          ) : null}
                        </View>
                      </View>
                    </View>
                  ))
                )}
              </View>
            </View>
          ) : null}
        </ScrollView>
      )}
      <FooterBar />
    </SafeAreaView>
  );
};

export default Home;
