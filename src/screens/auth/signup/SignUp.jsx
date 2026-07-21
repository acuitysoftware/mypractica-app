import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollViewBase,
  ScrollView,
  FlatList,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import authimg from "../../../../assets/auth-img.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SignupStyles } from "./styles";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import {
  fetchcourselist,
  fetchStateList,
  fetchSubjectList,
} from "../../../services/cms";
import Toast from "react-native-toast-message";
import { StudentRegister, TeacherRegister } from "../../../services/auth";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const [role, setRole] = useState("Student");
  const [states, setStates] = useState(null);
  const [courses, setCourses] = useState(null);
  const [subject, setSubject] = useState(null);
  const [stateid, setStateId] = useState("");
  const [loading, setLoading] = useState(false);
  const [subject_id, setSubjectId] = useState([]);
  const [subject_name, setSubjectName] = useState([]);
  const [category_id, setCategoryId] = useState([]);
  const [category_name, setCategoryName] = useState([]);
  const subjects = ["Bengali", "English", "Math"];
  const [viewDropStates, setViewDropStates] = useState(false);
  const [statename, setStateName] = useState("");
  const [viewCourses, setViewCourses] = useState(false);
  const [course, setCourse] = useState([]);
  const [viewSubs, setViewSubs] = useState(false);
  const [qfication, setQfication] = useState("");
  const [subs, setSubs] = useState([]);
  const navigation = useNavigation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const fetchState = async () => {
    try {
      const res = await fetchStateList();
      console.log(res);
      setStates(res);
    } catch (error) {}
  };
  const fetchCategory = async () => {
    try {
      const res = await fetchcourselist();
      console.log(res);
      setCourses(res);
    } catch (error) {}
  };
  const fetchSubject = async () => {
    try {
      const res = await fetchSubjectList();
      console.log(res);
      setSubject(res);
    } catch (error) {}
  };
  const handleChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const qficationOnChange = (e) => {
    if (role === "Teacher") {
      setQfication(e);
      setForm((prev) => ({
        ...prev,
        education: e,
      }));
    } else {
      null;
    }
  };

  const submit_form = async () => {
    setLoading(true);
    try {
      if (role === "Student") {
        if (
          !form.name ||
          !form.email ||
          !form.password ||
          !form.password_confirmation
        ) {
          setLoading(false);
          Toast.show({
            text1: "Please Fill all the fields before signup",
            type: "error",
          });
        } else {
          const res = await StudentRegister(form);
          console.log(res);
          if (res.status === false) {
            setLoading(false);
            Toast.show({ text1: res?.message, type: "error" });
          } else {
            setLoading(false);
            Toast.show({ text1: res?.message, type: "success" });
            // navigateTo(`/otp/${form.email}?type=${logintype}`)
            navigation.navigate("verify", {
              email: form.email,
              type: "Student",
            });
          }
        }
      } else if (role === "Teacher") {
        if (
          !form.name ||
          !form.email ||
          !form.password ||
          !form.password_confirmation ||
          qfication.length === 0
        ) {
          Toast.show({
            text1: "Please Fill all the fields before signup",
            type: "error",
          });
          setLoading(false);
        } else {
          const res = await TeacherRegister(form);
          console.log(res);
          if (res.status === false) {
            setLoading(false);
            Toast.show({ text1: res?.message, type: "error" });
          } else {
            setLoading(false);
            Toast.show({ text1: res?.message, type: "error" });
            // navigateTo(`/otp/${form.email}?type=${logintype}`)
            navigation.navigate("verify", {
              email: form.email,
              type: "Teacher",
            });
          }
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchState();
  }, []);
  useEffect(() => {
    fetchCategory();
  }, []);
  useEffect(() => {
    fetchSubject();
  }, []);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={100}
        style={SignupStyles.container}
      >
        <View style={SignupStyles.upperBox}>
          <Image source={authimg} style={SignupStyles.upperBoxImage} />
        </View>
        <View style={SignupStyles.signupContent}>
          <Text style={SignupStyles.head}>Sign Up</Text>
          <View style={SignupStyles.radioContainer}>
            {["Student", "Teacher"].map((option) => (
              <TouchableOpacity
                key={option}
                style={SignupStyles.radioButton}
                onPress={() => setRole(option)}
              >
                <View style={SignupStyles.radioOuter}>
                  {role === option && <View style={SignupStyles.radioInner} />}
                </View>
                <Text style={SignupStyles.radioLabel}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={SignupStyles.input}
            placeholder="Name *"
            placeholderTextColor="#888"
            onChangeText={(text) => handleChange("name", text)}
          />
          <TextInput
            style={SignupStyles.input}
            placeholder="Mobile No*"
            placeholderTextColor="#888"
            onChangeText={(text) => handleChange("phone", text)}
          />
          <TextInput
            style={SignupStyles.input}
            placeholder="Email*"
            placeholderTextColor="#888"
            onChangeText={(text) => handleChange("email", text)}
          />
          {role === "Teacher" ? (
            <TextInput
              style={SignupStyles.input}
              placeholder="Qualification*"
              placeholderTextColor="#888"
              onChangeText={qficationOnChange}
            />
          ) : null}

          <View>
            <TextInput
              style={SignupStyles.input}
              placeholder="Password *"
              placeholderTextColor="#888"
              onChangeText={(text) => handleChange("password", text)}
              secureTextEntry={true}
            />
            <Text>Minimum 8 characters 1 Alphabet 1 Numeric</Text>
          </View>
          <View>
            <TextInput
              style={SignupStyles.input}
              placeholder="Password Confirmation*"
              placeholderTextColor="#888"
              onChangeText={(text) =>
                handleChange("password_confirmation", text)
              }
              secureTextEntry={true}
            />
            <Text>Minimum 8 characters 1 Alphabet 1 Numeric</Text>
          </View>
          <TouchableOpacity
            style={SignupStyles.dropInputs}
            onPress={() => setViewDropStates(!viewDropStates)}
          >
            <TextInput
              style={SignupStyles.input}
              placeholder={statename ? statename : "State"}
              placeholderTextColor="#888"
              readOnly
              value={statename}
            />
            <AntDesign
              onPress={() => setViewDropStates(!viewDropStates)}
              style={SignupStyles.icon}
              name="down"
              size={13}
              color="#888"
            />
            {viewDropStates ? (
              <ScrollView nestedScrollEnabled style={SignupStyles.stateList}>
                {states?.map((e, i) => (
                  <Text
                    style={SignupStyles.state}
                    key={i}
                    onPress={() => {
                      setStateName(e?.name);
                      setViewDropStates(false);
                      setStateId(e?.id);
                      setForm((prev) => ({
                        ...prev,
                        state_id: e?.id,
                      }));
                    }}
                  >
                    {e?.name}
                  </Text>
                ))}
              </ScrollView>
            ) : null}
          </TouchableOpacity>
          {role === "Teacher" ? (
            <TouchableOpacity
              style={SignupStyles.dropInputs}
              onPress={() => setViewSubs(!viewSubs)}
            >
              <TextInput
                style={SignupStyles.input}
                placeholder="Select Subject"
                placeholderTextColor="#888"
                readOnly
              />
              <AntDesign
                style={SignupStyles.icon}
                name="down"
                size={13}
                color="#888"
                onPress={() => setViewSubs(!viewSubs)}
              />
              {viewSubs ? (
                <ScrollView nestedScrollEnabled style={SignupStyles.stateList}>
                  {subject?.map((e, i) => (
                    <Text
                      style={SignupStyles.state}
                      key={i}
                      onPress={() => {
                        const newSubId = e?.id;
                        setSubjectId((prev) => {
                          if (prev.includes(newSubId)) return [...prev];
                          return [...prev, newSubId];
                        });
                        setSubjectName((prev) => {
                          const exists = prev.find((c) => c.id === e.id);
                          if (exists) return prev;
                          return [...prev, { name: e.name, id: e.id }];
                        });
                        setForm((prev) => ({
                          ...prev,
                          subject_id: [...subject_id, newSubId], // manually append to old categoryId
                        }));
                        setViewSubs(false);
                      }}
                    >
                      {e?.name}
                    </Text>
                  ))}
                </ScrollView>
              ) : null}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setViewCourses(!viewCourses)}
              style={SignupStyles.dropInputs}
            >
              <TextInput
                style={SignupStyles.input}
                placeholder="Interested Course"
                placeholderTextColor="#888"
                readOnly
                onPress={() => setViewCourses(!viewCourses)}
              />
              <AntDesign
                style={SignupStyles.icon}
                name="down"
                size={13}
                color="#888"
                onPress={() => setViewCourses(!viewCourses)}
              />
              {viewCourses ? (
                <ScrollView nestedScrollEnabled style={SignupStyles.stateList}>
                  {courses?.map((e, i) => (
                    <Text
                      style={SignupStyles.state}
                      key={i}
                      onPress={() => {
                        const newCategoryId = e?.id;
                        setViewCourses(false);
                        setCategoryId((prev) => {
                          if (prev.includes(newCategoryId)) return [...prev];
                          return [...prev, newCategoryId];
                        });
                        setCategoryName((prev) => {
                          const exists = prev.find((c) => c.id === e.id);
                          if (exists) return prev;
                          return [...prev, { name: e.name, id: e.id }];
                        });
                        setForm((prev) => ({
                          ...prev,
                          category_id: [...category_id, newCategoryId], // manually append to old categoryId
                        }));
                      }}
                    >
                      {e?.name}
                    </Text>
                  ))}
                </ScrollView>
              ) : null}
            </TouchableOpacity>
          )}

          {category_name?.length !== 0 ? (
            <FlatList
              data={category_name}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={SignupStyles.flat}>
                  <Text style={SignupStyles.text}>{item?.name}</Text>
                  <Entypo
                    onPress={() => {
                      const cf = category_name?.filter((e) => e !== item);
                      setCategoryName(cf);
                      const catid = category_id?.filter((e) => e !== item?.id);
                      setCategoryId(catid);
                      setForm((prev) => ({
                        ...prev,
                        category_id: catid,
                      }));
                    }}
                    name="cross"
                    size={16}
                    color="black"
                  />
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          ) : null}
          {subject_name?.length !== 0 ? (
            <FlatList
              data={subject_name}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={SignupStyles.flat}>
                  <Text style={SignupStyles.text}>{item?.name}</Text>
                  <Entypo
                    onPress={() => {
                      const cf = subject_name?.filter((e) => e !== item);
                      setSubjectName(cf);
                      const subid = subject_id?.filter((e) => e !== item?.id);
                      setSubjectId(subid);
                      setForm((prev) => ({
                        ...prev,
                        subject_id: subid, // manually append to old categoryId
                      }));
                    }}
                    name="cross"
                    size={16}
                    color="black"
                  />
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          ) : null}
          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="#6C63FF" />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => submit_form()}
              style={SignupStyles.button}
            >
              <Text style={SignupStyles.buttonText}>Create Account</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
