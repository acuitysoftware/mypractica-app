import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  Pressable,
} from 'react-native';
import BackNav from '../../components/backNavigation/BackNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileImage from '../../components/profiles/ProfileImage';
import { updateProfile } from './styles';
import {
  fetchCityList,
  fetchcourselist,
  fetchStateList,
  fetchSubjectList,
} from '../../services/cms';
import {
  getStudentProfile,
  updateStudentProfile,
} from '../../services/student';
import { AuthContext } from '../../context/AuthContext';
import Toast from 'react-native-toast-message';
import {
  getTeacherProfile,
  updateTeachersProfile,
} from '../../services/teachers';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import FooterBar from '../../components/footerbar/FooterBar';

const UpdateProfileInitial = () => {
  const { authUser, setProfileupdt } = useContext(AuthContext);
  const token = authUser?.token;

  // Dropdown States
  const [opendrp, setOpenDrp] = useState(false);
  const [opendrp2, setOpenDrp2] = useState(false);
  const [openstatedrp, setOpenStateDrp] = useState(false);
  const [opencitydrp, setOpenCityDrp] = useState(false);

  // Close ALL dropdowns
  const closeAll = () => {
    setOpenDrp(false);
    setOpenDrp2(false);
    setOpenStateDrp(false);
    setOpenCityDrp(false);
  };

  const [course, setCourse] = useState(null);
  const [course2, setCourse2] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [age, setAge] = useState('');
  const [profile, setProfile] = useState(null);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [courseSelect, setCourseSelect] = useState([]);
  const [courseSelect2, setCourseSelect2] = useState([]);
  const [address, setAddress] = useState('');
  const [education, setEducation] = useState('');
  const [state_id, setState_id] = useState('');
  const [city_id, setCity_id] = useState('');
  const [cityname, setCityName] = useState('');
  const [statename, setStateName] = useState('');
  const [category_id, setCategory_id] = useState([]);
  const [category_id2, setCategory_id2] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const uriToFile = async (uri) => {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    const fileName = uri.split('/').pop();
    const fileType = fileName.split('.').pop();
    return {
      uri,
      name: fileName,
      type: `image/${fileType}`,
    };
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selected = result.assets[0];
      const file = await uriToFile(selected.uri);
      setSelectedImage(file);
    }
  };

  const studentProfile = async () => {
    try {
      if (authUser?.data?.role_name === 'STUDENT') {
        const res = await getStudentProfile(token);
        setProfile(res?.data);
      } else {
        const res = await getTeacherProfile(token);
        setProfile(res?.data);
      }
    } catch (error) {}
  };

  const courseslist = async () => {
    try {
      const res = await fetchcourselist();
      setCourse(res);
    } catch (error) {}
  };

  const courseslist2 = async () => {
    try {
      const res = await fetchSubjectList();
      setCourse2(res);
    } catch (error) {}
  };

  const stateslist = async () => {
    try {
      const res = await fetchStateList();
      setState(res);
    } catch (error) {}
  };

  const citylist = async () => {
    try {
      const res = await fetchCityList(state_id);
      setCity(res);
    } catch (error) {}
  };

  useEffect(() => {
    setCategory_id(profile?.courses?.map((e) => e.id));
    setCategory_id2(profile?.subjects?.map((e) => e.id));
    setAddress(profile?.address);
    setEducation(profile?.education);
    setState_id(profile?.state_id);
    setCity_id(profile?.city_id);
    setPhone(profile?.phone);
    setStateName(profile?.state?.name);
    setCityName(profile?.city?.name);
    setCourseSelect(profile?.courses);
    setCourseSelect2(profile?.subjects);
    setAge(profile?.age);
  }, [profile]);

  const courseClick = async (e) => {
    setCategory_id((prev) => (prev.includes(e?.id) ? prev : [...prev, e.id]));
    setCourseSelect((prev) => {
      if (!prev.some((item) => item.id === e.id)) {
        return [...prev, { name: e?.name, id: e?.id }];
      }
      return prev;
    });
    setOpenDrp(false);
  };

  const courseClick2 = async (e) => {
    setCategory_id2((prev) => (prev.includes(e?.id) ? prev : [...prev, e.id]));
    setCourseSelect2((prev) => {
      if (!prev.some((item) => item.id === e.id)) {
        return [...prev, { name: e?.name, id: e?.id }];
      }
      return prev;
    });
    setOpenDrp2(false);
  };

  const handleSubmit = async () => {
    try {
      if (authUser?.data?.role_name === 'STUDENT') {
        const res = await updateStudentProfile(
          token,
          address,
          education,
          state_id,
          city_id,
          category_id,
          selectedImage,
        );

        if (res?.status === false) {
          Toast.show({ type: 'error', text1: res?.message });
        } else {
          Toast.show({ type: 'success', text1: res?.message });
          setProfileupdt(true);
        }
      } else {
        const res = await updateTeachersProfile(
          token,
          address,
          education,
          age,
          state_id,
          city_id,
          category_id2,
          selectedImage,
          '',
        );

        if (res?.status === false) {
          Toast.show({ type: 'error', text1: res?.message });
        } else {
          Toast.show({ type: 'success', text1: res?.message });
          setProfileupdt(true);
        }
      }
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Something Went Wrong' });
    }
  };

  useEffect(() => {
    courseslist();
    courseslist2();
    stateslist();
    studentProfile();
  }, []);

  useEffect(() => {
    citylist();
  }, [state_id]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ paddingHorizontal: 20, marginBottom: 90 }}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable style={{ flex: 1 }} onPress={closeAll}>
          <BackNav />
          <ProfileImage pickImage={pickImage} selectedImage={selectedImage} />

          <Text
            style={{
              fontSize: 23,
              marginVertical: 12,
              fontFamily: 'Poppins_600SemiBold',
              textAlign: 'center',
            }}
          >
            Update Profile
          </Text>

          {/* ===================
              NAME
          =================== */}
          <Text style={{ fontFamily: 'Poppins_400Regular', marginTop: 8 }}>
            Name *
          </Text>
          <TextInput
            style={updateProfile.inputs}
            placeholder="Name"
            value={authUser?.data?.name}
          />

          {/* ===================
              PHONE
          =================== */}
          <Text style={{ fontFamily: 'Poppins_400Regular', marginTop: 8 }}>
            Mobile No.
          </Text>
          <TextInput
            style={updateProfile.inputs}
            placeholder="Mobile No."
            value={authUser?.data?.phone}
          />

          {/* ===================
              EMAIL
          =================== */}
          <Text style={{ fontFamily: 'Poppins_400Regular', marginTop: 8 }}>
            Email *
          </Text>
          <TextInput
            style={updateProfile.inputs}
            placeholder="Email"
            value={authUser?.data?.email}
          />

          {/* ===================
              ADDRESS
          =================== */}
          <Text style={{ fontFamily: 'Poppins_400Regular', marginTop: 8 }}>
            Address
          </Text>
          <TextInput
            style={updateProfile.inputs}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />

          {/* ===================
              EDUCATION
          =================== */}
          <Text style={{ fontFamily: 'Poppins_400Regular', marginTop: 8 }}>
            Education
          </Text>
          <TextInput
            style={updateProfile.inputs}
            placeholder="Education"
            value={education}
            onChangeText={setEducation}
          />

          {/* ===================
              TEACHER ONLY — AGE
          =================== */}
          {authUser?.data?.role_name === 'TEACHER' && (
            <>
              <Text style={{ fontFamily: 'Poppins_400Regular', marginTop: 8 }}>
                Age
              </Text>
              <TextInput
                style={updateProfile.inputs}
                placeholder="Age"
                value={age}
                onChangeText={setAge}
              />
            </>
          )}

          {/* ===================
              STATE DROPDOWN
          =================== */}
          <Text style={{ fontFamily: 'Poppins_400Regular', marginTop: 8 }}>
            State
          </Text>

          <View style={updateProfile.inputs}>
            <Text
              onPress={() => {
                closeAll();
                setOpenStateDrp(!openstatedrp);
              }}
              style={{
                color: '#888888',
                fontFamily: 'Poppins_400Regular',
              }}
            >
              {statename || 'State'}
            </Text>

            {openstatedrp && (
              <Pressable
                style={updateProfile.drop}
                onStartShouldSetResponder={() => true}
              >
                <ScrollView nestedScrollEnabled style={{ maxHeight: 180 }}>
                  {state?.map((s) => (
                    <Text
                      key={s.id}
                      style={{ paddingVertical: 6, paddingHorizontal: 4 }}
                      onPress={() => {
                        setState_id(s.id);
                        setStateName(s.name);
                        setOpenStateDrp(false);
                      }}
                    >
                      {s.name}
                    </Text>
                  ))}
                </ScrollView>
              </Pressable>
            )}
          </View>

          {/* ===================
              CITY DROPDOWN
          =================== */}
          <Text style={{ fontFamily: 'Poppins_400Regular', marginTop: 8 }}>
            City *
          </Text>

          <View style={updateProfile.inputs}>
            <Text
              onPress={() => {
                closeAll();
                setOpenCityDrp(!opencitydrp);
              }}
              style={{
                color: '#888888',
                fontFamily: 'Poppins_400Regular',
              }}
            >
              {cityname || 'City'}
            </Text>

            {opencitydrp && (
              <Pressable
                style={updateProfile.drop}
                onStartShouldSetResponder={() => true}
              >
                <ScrollView nestedScrollEnabled style={{ maxHeight: 180 }}>
                  {city?.map((c) => (
                    <Text
                      key={c.id}
                      style={{ paddingVertical: 6, paddingHorizontal: 4 }}
                      onPress={() => {
                        setCity_id(c.id);
                        setCityName(c.name);
                        setOpenCityDrp(false);
                      }}
                    >
                      {c.name}
                    </Text>
                  ))}
                </ScrollView>
              </Pressable>
            )}
          </View>

          {/* ===================
              COURSE / SUBJECT DROPDOWN
          =================== */}
          <Text style={{ fontFamily: 'Poppins_400Regular', marginTop: 8 }}>
            {authUser?.data?.role_name === 'STUDENT'
              ? 'Interested Course'
              : 'Subject Preferences'}
          </Text>

          {authUser?.data?.role_name === 'STUDENT' ? (
            <View style={updateProfile.inputs}>
              <Text
                onPress={() => {
                  closeAll();
                  setOpenDrp(!opendrp);
                }}
                style={{
                  color: '#888888',
                  fontFamily: 'Poppins_400Regular',
                }}
              >
                Interested Course
              </Text>

              {opendrp && (
                <Pressable
                  style={updateProfile.drop}
                  onStartShouldSetResponder={() => true}
                >
                  <ScrollView nestedScrollEnabled style={{ maxHeight: 180 }}>
                    {course?.map((c) => (
                      <Text
                        key={c.id}
                        style={{ paddingVertical: 6, paddingHorizontal: 4 }}
                        onPress={() => courseClick(c)}
                      >
                        {c.name}
                      </Text>
                    ))}
                  </ScrollView>
                </Pressable>
              )}
            </View>
          ) : (
            <View style={updateProfile.inputs}>
              <Text
                onPress={() => {
                  closeAll();
                  setOpenDrp2(!opendrp2);
                }}
                style={{
                  color: '#888888',
                  fontFamily: 'Poppins_400Regular',
                }}
              >
                Subject Preferences
              </Text>

              {opendrp2 && (
                <Pressable
                  style={updateProfile.drop}
                  onStartShouldSetResponder={() => true}
                >
                  <ScrollView nestedScrollEnabled style={{ maxHeight: 180 }}>
                    {course2?.map((c) => (
                      <Text
                        key={c.id}
                        style={{ paddingVertical: 6, paddingHorizontal: 4 }}
                        onPress={() => courseClick2(c)}
                      >
                        {c.name}
                      </Text>
                    ))}
                  </ScrollView>
                </Pressable>
              )}
            </View>
          )}

          {/* ===================
              SELECTED TAGS
          =================== */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 15,
              marginTop: 10,
              flexWrap: 'wrap',
              marginBottom: 30,
            }}
          >
            {authUser?.data?.role_name === 'STUDENT'
              ? courseSelect?.map((course) => (
                  <View
                    key={course.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                      backgroundColor: '#ddd',
                      paddingHorizontal: 4,
                      paddingVertical: 6,
                      borderRadius: 10,
                    }}
                  >
                    <Text>{course.name}</Text>
                    <Text
                      onPress={() => {
                        setCourseSelect((prev) =>
                          prev.filter((c) => c.id !== course.id),
                        );
                        setCategory_id((prev) =>
                          prev.filter((id) => id !== course.id),
                        );
                      }}
                    >
                      X
                    </Text>
                  </View>
                ))
              : courseSelect2?.map((course) => (
                  <View
                    key={course.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                      backgroundColor: '#ddd',
                      paddingHorizontal: 4,
                      paddingVertical: 6,
                      borderRadius: 10,
                    }}
                  >
                    <Text>{course.name}</Text>
                    <Text
                      onPress={() => {
                        setCourseSelect2((prev) =>
                          prev.filter((c) => c.id !== course.id),
                        );
                        setCategory_id2((prev) =>
                          prev.filter((id) => id !== course.id),
                        );
                      }}
                    >
                      X
                    </Text>
                  </View>
                ))}
          </View>

          {/* ===================
              SUBMIT BUTTON
          =================== */}
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              paddingVertical: 13,
              backgroundColor: '#6565E2',
              borderRadius: 5,
              alignItems: 'center',
              marginBottom: 50,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: '#fff',
                fontFamily: 'Poppins_600SemiBold',
              }}
            >
              Update
            </Text>
          </TouchableOpacity>
        </Pressable>
      </ScrollView>

      <FooterBar />
    </SafeAreaView>
  );
};

export default UpdateProfileInitial;
