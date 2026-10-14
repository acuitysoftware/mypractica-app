import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
} from "react-native";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackNav from "../../components/backNavigation/BackNav2";
import quizimg from "../../../assets/quizimg.png";
import pracico from "../../../assets/pracico.png";
import { resultstyles } from "./styles";
import { getStudentResult } from "../../services/exam";
import { AuthContext } from "../../context/AuthContext";
import ProfileImage from "../../components/profiles/ProfileImage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import FooterBar from "../../components/footerbar/FooterBar";

const Results = ({ route }) => {
  const { authUser } = useContext(AuthContext);
  const [result, setResult] = useState(null);
  const token = authUser?.token;
  const { id, prof } = route.params;
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("home");
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => subscription.remove();
    }, [navigation, id]),
  );

  const getResults = async () => {
    try {
      const res = await getStudentResult(token, id);
      setResult(res?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ paddingHorizontal: 18, marginBottom: 90 }}>
        <BackNav onPress={() => navigation.navigate("home")} />
        {prof ? <ProfileImage /> : null}

        {/* HEADER SECTION */}
        <View style={resultstyles.intros}>
          <Image source={quizimg} style={resultstyles.headimage} />
          <View style={resultstyles.headinfo}>
            <Image source={pracico} />
            <Text style={{ width: "80%", fontFamily: "Poppins_400Regular" }}>
              {result?.name}
            </Text>
          </View>

          <Text style={resultstyles.enrolled}>3778.9k+ Students Enrolled</Text>
          <Text style={resultstyles.lastupdt}>
            Last Updated On {result?.last_update?.slice(0, 10)}
          </Text>
          <Text style={resultstyles.lastupdt}>{result?.set_name}</Text>
        </View>

        {/* RESULT SUMMARY */}
        <Text style={resultstyles.resultText}>Result</Text>
        <View style={resultstyles.infohead}>
          <Text style={styles.info}>
            Number Of Questions : {result?.no_of_questions}
          </Text>
          <Text style={styles.info}>
            Questions Attempted: {result?.answered_question}
          </Text>
          <Text style={styles.info}>
            Correct Answers : {result?.correct_anwsers_count}
          </Text>
          <Text style={styles.info}>Time Taken : {result?.time_taken}</Text>
        </View>

        {/* QUESTION + ANSWERS LIST */}
        {result?.questions?.map((q, index) => {
          const isAnswered = !!q?.answered;
          const isCorrect = isAnswered && q?.answered === q?.correct_answer;

          return (
            <View key={q?.id} style={resultstyles.resultqn}>
              {/* QUESTION */}
              <Text style={resultstyles.question}>
                <Text style={{ fontWeight: "600" }}>Q {index + 1}. </Text>

                {q?.question ? (
                  q.question
                ) : q?.question_image_path ? (
                  <Image
                    source={{ uri: q.question_image_path }}
                    style={{
                      width: "100%",
                      height: 200,
                      resizeMode: "contain",
                    }}
                  />
                ) : (
                  <Text style={{ color: "gray" }}>Question unavailable</Text>
                )}
              </Text>

              {/* WRONG ANSWER — ONLY WHEN ANSWERED + WRONG */}
              {isAnswered && !isCorrect && (
                <View style={resultstyles.answerwrong}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      gap: 6,
                      flexWrap: "wrap",
                      flexShrink: 1,
                      width: "100%",
                    }}
                  >
                    <View style={resultstyles.numb2}>
                      <Text style={{ color: "#fff" }}>{q.answered}</Text>
                    </View>

                    {getAnsweredImage(q) ? (
                      <Image
                        source={{ uri: getAnsweredImage(q) }}
                        style={{
                          width: 120,
                          height: 120,
                          resizeMode: "contain",
                        }}
                      />
                    ) : (
                      <Text
                        style={{
                          fontFamily: "Poppins_400Regular",
                          fontSize: 12,
                          flexShrink: 1,
                          flexWrap: "wrap",
                          width: "80%",
                        }}
                      >
                        {getAnsweredText(q)}
                      </Text>
                    )}
                  </View>

                  <View style={resultstyles.wrong}>
                    <Text style={{ color: "#fff" }}>Wrong Answer</Text>
                  </View>
                </View>
              )}

              {/* NOT ANSWERED */}
              {!isAnswered && (
                <View style={resultstyles.answerwrong}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                      width: "100%",
                    }}
                  >
                    <View style={resultstyles.numb2}>
                      <Text style={{ color: "#fff" }}></Text>
                    </View>

                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        fontSize: 12,
                        flexShrink: 1,
                      }}
                    >
                      Not Answered
                    </Text>
                  </View>
                </View>
              )}

              {/* CORRECT ANSWER — ALWAYS SHOW */}
              <View style={resultstyles.answercorrect}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 6,
                    flexWrap: "wrap",
                    flexShrink: 1,
                    width: "100%",
                  }}
                >
                  <View style={resultstyles.numb}>
                    <Text style={{ color: "#fff" }}>{q.correct_answer}</Text>
                  </View>

                  {getCorrectImage(q) ? (
                    <Image
                      source={{ uri: getCorrectImage(q) }}
                      style={{
                        width: 120,
                        height: 120,
                        resizeMode: "contain",
                      }}
                    />
                  ) : (
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        maxWidth: "80%",
                        fontSize: 12,
                        flexShrink: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      {getCorrectText(q)}
                    </Text>
                  )}
                </View>

                <View style={resultstyles.right}>
                  <Text style={{ color: "#fff" }}>Right Answer</Text>
                </View>
              </View>
            </View>
          );
        })}
        {/* DOUBT BUTTON */}
        <TouchableOpacity
          onPress={() => navigation.navigate("teacherlist")}
          style={{
            marginVertical: 30,
            paddingVertical: 12,
            alignItems: "center",
            backgroundColor: "#6565E2",
            borderRadius: 6,
          }}
        >
          <Text style={{ color: "#fff", fontFamily: "Poppins_600SemiBold" }}>
            Request For Doubt Clearance
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <FooterBar />
    </SafeAreaView>
  );
};

export default Results;

/* -----------------------------------
   Helper Functions (same logic as web)
------------------------------------ */

const getAnsweredImage = (q) => {
  if (q?.answered === "A") return q?.option_a_image_path;
  if (q?.answered === "B") return q?.option_b_image_path;
  if (q?.answered === "C") return q?.option_c_image_path;
  if (q?.answered === "D") return q?.option_d_image_path;
  return null;
};

const getCorrectImage = (q) => {
  if (q?.correct_answer === "A") return q?.option_a_image_path;
  if (q?.correct_answer === "B") return q?.option_b_image_path;
  if (q?.correct_answer === "C") return q?.option_c_image_path;
  if (q?.correct_answer === "D") return q?.option_d_image_path;
  return null;
};

const getAnsweredText = (q) => {
  if (q?.answered === "A") return q?.option_a;
  if (q?.answered === "B") return q?.option_b;
  if (q?.answered === "C") return q?.option_c;
  if (q?.answered === "D") return q?.option_d;
  return "Not Answered";
};

const getCorrectText = (q) => {
  if (q?.correct_answer === "A") return q?.option_a;
  if (q?.correct_answer === "B") return q?.option_b;
  if (q?.correct_answer === "C") return q?.option_c;
  if (q?.correct_answer === "D") return q?.option_d;
  return "";
};

const styles = {
  info: { fontFamily: "Poppins_600SemiBold", fontSize: 12 },
};
