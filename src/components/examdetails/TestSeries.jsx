import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useContext } from 'react';
import { seriesStyles } from './styles';
import pracico from '../../../assets/pracico.png';
import striptags from 'striptags';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../../context/AuthContext';

const TestSeries = ({
  details,
  exams,
  selectedExam,
  exam_price,
  setActiveNav,
}) => {
  const navigation = useNavigation();
  const { authUser } = useContext(AuthContext);
  console.log(details?.exam?.name);
  console.log(exams, 'kdjgsgdkasj');
  return (
    <View style={seriesStyles.container}>
      <Text style={seriesStyles.head}>{details?.exam?.name} Free Test</Text>
      {details?.exam?.free_series?.map((f) => (
        <View key={f?.id} style={seriesStyles.freetest}>
          <View style={seriesStyles.headfreetest}>
            <Text style={seriesStyles.freetestheadtext}>{f?.chapter_name}</Text>
            <Text
              style={{
                fontSize: 12,
                color: '#fff',
                fontFamily: 'Poppins_400Regular',
              }}
            >
              138.7k Users
            </Text>
          </View>
          <View style={seriesStyles.questioninfo}>
            <Text>{f?.series_sets?.length} Questions</Text>
            {/* <Text>{f?.total_marks} Marks</Text> */}
            <Text>{f?.total_time} Mins</Text>
          </View>
          <TouchableOpacity style={seriesStyles.freebox}>
            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 13,
                color: '#fff',
              }}
            >
              Free
            </Text>
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              gap: 10,
              paddingLeft: 10,
              marginTop: 10,
            }}
          >
            {f?.series_sets?.map((s) => {
              const startDateTimeString = `${s.start_date}T${s.start_time}`;
              const startDateTime = new Date(startDateTimeString);
              const now = new Date();

              const hasStarted = now >= startDateTime;

              return (
                <View
                  key={s.id}
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    backgroundColor: '#fff',
                    width: '90%',
                    borderRadius: 8,
                    marginBottom: 8,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Poppins_400Regular',
                      fontSize: 14,
                      marginBottom: 5,
                      color: '#000',
                    }}
                  >
                    Exam Set : {s.set_name}
                  </Text>

                  {hasStarted ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#4CAF50',
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 6,
                        alignSelf: 'flex-start',
                      }}
                      onPress={() => {
                        if (authUser) {
                          navigation.navigate('test', {
                            id: f.id,
                            seriesid: s.id,
                          });
                        } else {
                          Toast.show({
                            type: 'error',
                            text1: 'Login First',
                          });
                        }
                      }}
                    >
                      <Text
                        style={{
                          color: '#fff',
                          fontFamily: 'Poppins_400Regular',
                          fontSize: 13,
                        }}
                      >
                        Start Now
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <Text
                      style={{
                        color: '#888',
                        fontFamily: 'Poppins_400Regular',
                        fontSize: 13,
                      }}
                    >
                      Starts on {s.start_date} at {s.start_time}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
          {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate('test', {
                id: f.id,
              })
            }
            style={seriesStyles.startnow}
          >
            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 13,
                color: '#fff',
              }}
            >
              Start Now
            </Text>
          </TouchableOpacity> */}
        </View>
      ))}

      <Text style={seriesStyles.secondhead}>{details?.exam?.name} Test</Text>
      {details?.exam?.paid_series?.map((p) => (
        <View key={p?.id} style={seriesStyles.paidtest}>
          <View style={seriesStyles.headpaidtest}>
            <View style={seriesStyles.icoandusers}>
              <Image source={pracico}></Image>
              <Text
                style={{
                  color: '#000',
                  backgroundColor: '#fff',
                  fontSize: 11,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 10,
                  fontFamily: 'Poppins_400Regular',
                }}
              >
                138k Users
              </Text>
            </View>
            <Text style={seriesStyles.paidtestheadtext}>{p?.chapter_name}</Text>
          </View>
          <Text style={seriesStyles.subjects}>{striptags(p?.Languages)}</Text>
          <View style={seriesStyles.alltestlist}>
            <Text
              style={{
                lineHeight: 25,
                fontSize: 13,
                fontFamily: 'Poppins_400Regular',
              }}
            >
              {striptags(p?.description)}
            </Text>
          </View>
          {exams?.find((e) => e.exam_name === details?.exam?.name) ? (
            <TouchableOpacity
              onPress={() => setActiveNav('supercoaching')}
              style={seriesStyles.viewtest}
            >
              <Text style={seriesStyles.buttText}>View Test Series</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                if (authUser) {
                  navigation.navigate('test', {
                    id: p.id,
                  });
                } else {
                  Toast.show({
                    type: 'error',
                    text1: 'Login First',
                  });
                }
              }}
              style={seriesStyles.viewtest}
            >
              <Text style={seriesStyles.buttText}>Start Now</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

export default TestSeries;
