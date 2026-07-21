import { View, Text, CheckBox } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackNav from '../../components/backNavigation/BackNav';
import { ScrollView } from 'react-native';
import { paymentstyles } from './styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import { fetchSiteSettings } from '../../services/cms';
import striptags from 'striptags';

const ExamPayment = ({ route, navigation }) => {
  const { exams, exam_price, selectedexam, subs } = route.params;
  const [price, setPrice] = useState(exam_price?.price);
  const [selected, setSelected] = useState(selectedexam);
  const whenSelect = (e) => {
    setSelected(e?.id);
    setPrice(e?.price);
  };
  const fetchKeys = async () => {
    const res = await fetchSiteSettings();
    console.log(res?.data);
  };
  useEffect(() => {
    fetchKeys();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <BackNav />
        <Text style={paymentstyles.head}>{subs?.offer_text} </Text>
        {/* <View style={paymentstyles.paymentinfobox}>
                    <View style={paymentstyles.paymentinfos}>
                        <Ionicons
                            style={paymentstyles.icos} name="document-text-outline" size={20} color="black" />
                        <Text style={paymentstyles.payinfotext}>17000+ Prev. Year Paper Tests</Text>
                    </View>
                    <View style={paymentstyles.paymentinfos}>
                        <Feather style={paymentstyles.icos} name="repeat" size={20} color="black" />
                        <Text style={paymentstyles.payinfotext}>Access to Practice Pro Questions</Text>
                    </View>
                    <View style={paymentstyles.paymentinfos}>
                        <MaterialCommunityIcons name="message-processing-outline" size={20}
                            style={paymentstyles.icos} color="black" />
                        <Text style={paymentstyles.payinfotext}>Access to Pro Live Tests</Text>
                    </View>

                </View> */}
        <Text style={paymentstyles.choose}>Choose Your Exam</Text>
        {!exams || exams.length === 0 ? (
          <Text
            style={{
              textAlign: 'center',
              marginVertical: 20,
              fontFamily: 'Poppins_600SemiBold',
            }}
          >
            No Exams to show
          </Text>
        ) : (
          <View style={paymentstyles.examchecks}>
            {exams?.map((e) => (
              <View
                key={e.id}
                style={
                  selected === e.id
                    ? paymentstyles.examsets2
                    : paymentstyles.examsets
                }
              >
                <View style={paymentstyles.checkboxset}>
                  <TouchableOpacity
                    onPress={() => whenSelect(e)}
                    style={
                      selected === e.id
                        ? paymentstyles.checkboxchecked
                        : paymentstyles.checkbox
                    }
                  ></TouchableOpacity>
                  <Text style={paymentstyles.exmname}>{e.exam_name}</Text>
                </View>
                <Text style={paymentstyles.exmprice}>₹{e.price}</Text>
              </View>
            ))}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('purchase', {
                  id: selected,
                  price: price,
                })
              }
              style={paymentstyles.buybutt}
            >
              <Text style={paymentstyles.buybuttext}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExamPayment;
