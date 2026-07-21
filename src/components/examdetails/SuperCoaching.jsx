import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { coachingStyles } from './styles';
import savedico from '../../../assets/savedico.png';
import { fetchSubscriptionList, getStudentSubs } from '../../services/exam';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import striptags from 'striptags';

const SuperCoaching = ({ details }) => {
  const [exam_price, setExam_Price] = useState(null);
  const [selectedExam, setSelectedExam] = useState('');
  const [mysubs, setMySubs] = useState(null);
  const [exams, setExams] = useState(null);
  const { authUser } = useContext(AuthContext);
  const token = authUser?.token;

  console.log(details);

  const fetchStudentSubscriptions = async () => {
    try {
      const res = await getStudentSubs(token);
      setMySubs(res?.data);
    } catch (error) {}
  };

  const fetchSubs = async () => {
    try {
      const myExamNames = new Set(mysubs.map((sub) => sub.exam_name));
      const res = await fetchSubscriptionList();
      const filtered_data = res?.data.filter(
        (exam) => !myExamNames.has(exam.exam_name),
      );
      setExams(filtered_data);
      setExam_Price(
        res?.data?.filter((e) => e.exam_name === details?.exam?.name)[0],
      );
      setSelectedExam(
        res?.data?.filter((e) => e.exam_name === details?.exam?.name)[0].id,
      );
    } catch (error) {}
  };

  const navigation = useNavigation();
  useEffect(() => {
    fetchSubs();
  });
  useEffect(() => {
    fetchStudentSubscriptions();
  });
  console.log(details);
  return (
    <View style={coachingStyles.container}>
      <Image
        source={{ uri: details?.exam?.image_path }}
        style={coachingStyles.image}
      />
      <View style={coachingStyles.detailBox}>
        <Text style={coachingStyles.detailheadbox}>
          {details?.exam?.coaching_name}
        </Text>
        <Text style={coachingStyles.offertext}>
          {striptags(details?.subscription?.description)}
        </Text>
        <Text style={coachingStyles.price}>₹ {exam_price?.price}</Text>
        {/* <View style={coachingStyles.savedbox}>
                    <Image source={savedico} style={coachingStyles.savedboxicon} />
                    <Text style={coachingStyles.savedboxtext}>Your Total Savings ₹600</Text>
                </View> */}
        <TouchableOpacity
          style={coachingStyles.purchase}
          onPress={() =>
            navigation.navigate('exampurchase', {
              exams: exams,
              exam_price: exam_price,
              selectedexam: selectedExam,
              subs: details?.subscription,
            })
          }
        >
          <Text style={coachingStyles.purchasetext}>Purchase Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuperCoaching;
