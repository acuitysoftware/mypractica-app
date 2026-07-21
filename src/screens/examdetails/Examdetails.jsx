import {
  View,
  Text,
  ScrollView,
  Platform,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import BackNav from '../../components/backNavigation/BackNav';
import { edStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import OverView from '../../components/examdetails/OverView';
import SuperCoaching from '../../components/examdetails/SuperCoaching';
import TestSeries from '../../components/examdetails/TestSeries';
import Quizzes from '../../components/examdetails/Quizzes';
import ExamInfo from '../../components/examdetails/ExamInfo';
import PrevPaper from '../../components/examdetails/PrevPaper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchSubscriptionList, getExamDetails } from '../../services/exam';
import RenderHTML from 'react-native-render-html';
import { AuthContext } from '../../context/AuthContext';
import { getStudentSubs } from '../../services/student';
import FooterBar from '../../components/footerbar/FooterBar';

const Examdetails = ({ route }) => {
  const [activenav, setActiveNav] = useState('overview');
  const [getdetails, setGetDetails] = useState(null);
  const { examid } = route.params;
  console.log(examid);
  const [exam_price, setExam_Price] = useState(null);
  const [selectedExam, setSelectedExam] = useState('');
  const [mysubs, setMySubs] = useState(null);
  const [exams, setExams] = useState(null);
  const [loading, setLoading] = useState(false);
  const { authUser } = useContext(AuthContext);
  const token = authUser?.token;

  const fetchStudentSubscriptions = async () => {
    try {
      setLoading(true);
      const res = await getStudentSubs(token);
      setMySubs(res?.data);

      const myExamNames = new Set(res?.data.map((sub) => sub.exam_name));
      const examRes = await fetchSubscriptionList();
      const filtered_data = examRes?.data.filter(
        (exam) => !myExamNames.has(exam.exam_name),
      );

      setExams(filtered_data);
      const currentExam = examRes?.data.find(
        (e) => e.exam_name === getdetails?.exam?.name,
      );
      if (currentExam) {
        setExam_Price(currentExam);
        setSelectedExam(currentExam.id);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log(exams);

  useEffect(() => {
    fetchStudentSubscriptions();
  }, []);

  const navs = [
    {
      name: 'Overview',
      id: 'overview',
    },
    {
      name: 'Super Coaching',
      id: 'supercoaching',
    },
    {
      name: 'Test Series',
      id: 'series',
    },
    {
      name: 'Quizzes',
      id: 'quizzes',
    },
    {
      name: 'Exam Info',
      id: 'examinfo',
    },
    {
      name: 'Prev. Paper',
      id: 'prevpaper',
    },
  ];

  const examdetails = async () => {
    try {
      const res = await getExamDetails(examid);
      // console.log(res)
      setGetDetails(res?.data);
    } catch (error) {}
  };

  useEffect(() => {
    examdetails();
  }, []);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#6C63FF" />
        </View>
      ) : (
        <ScrollView style={{ paddingHorizontal: 20, marginBottom: 90 }}>
          <BackNav />
          <View style={edStyles.navs}>
            {navs?.map((nav) => (
              <TouchableOpacity
                key={nav?.id}
                onPress={() => setActiveNav(nav?.id)}
                style={
                  nav?.id === activenav
                    ? edStyles.navbuttssel
                    : edStyles.navbutts
                }
              >
                <Text
                  style={
                    nav?.id === activenav
                      ? edStyles.navbuttsText2
                      : edStyles.navbuttsText
                  }
                >
                  {nav.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={edStyles.compBody}>
            {activenav === 'overview' ? (
              <OverView details={getdetails} />
            ) : null}
            {activenav === 'supercoaching' ? (
              <SuperCoaching details={getdetails} />
            ) : null}
            {activenav === 'series' && exams ? (
              <TestSeries
                details={getdetails}
                exams={exams}
                selectedExam={selectedExam}
                exam_price={exam_price}
                setActiveNav={setActiveNav}
              />
            ) : null}
            {activenav === 'quizzes' && exams ? (
              <Quizzes
                details={getdetails}
                exams={exams}
                setActiveNav={setActiveNav}
              />
            ) : null}
            {activenav === 'examinfo' ? (
              <ExamInfo details={getdetails} />
            ) : null}
            {activenav === 'prevpaper' ? (
              <PrevPaper details={getdetails} />
            ) : null}
          </View>
        </ScrollView>
      )}

      <FooterBar />
    </SafeAreaView>
  );
};

export default Examdetails;
