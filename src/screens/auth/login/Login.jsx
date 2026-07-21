import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { LoginStyles } from './styles';
import authimg from '../../../../assets/auth-img.png';
import CheckBox from '@react-native-community/checkbox';
import { AuthContext } from '../../../context/AuthContext';
import Toast from 'react-native-toast-message';
import { loginUser } from '../../../services/auth';
import AntDesign from '@expo/vector-icons/AntDesign';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Login = ({ navigation }) => {
  const [role, setRole] = useState('Student');
  const { login } = useContext(AuthContext);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const SubmitUserLog = async () => {
    setLoading(true);
    try {
      const form = {
        email: email,
        password: password,
        user_type: role.toUpperCase(),
      };
      const res = await loginUser(form);
      console.log(res);
      if (res.status !== false) {
        login(res.token, res);
        await Toast.show({
          type: 'success',
          text1: res.message,
        });
        setLoading(false);
      } else {
        Toast.show({
          type: 'error',
          text1: res.message,
        });
        setLoading(false);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Hello',
        text2: 'Something Wrong in Login',
      });
      setLoading(false);
    }
  };

  return (
    <>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={100}
        style={LoginStyles.container}
      >
        <View style={LoginStyles.upperBox}>
          <Image source={authimg} style={LoginStyles.upperBoxImage} />
        </View>
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size="large" color="#6C63FF" />
          </View>
        ) : (
          <View style={LoginStyles.loginContent}>
            <Text style={LoginStyles.head}>Login</Text>
            <View style={LoginStyles.radioContainer}>
              {['Student', 'Teacher'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={LoginStyles.radioButton}
                  onPress={() => setRole(option)}
                >
                  <View style={LoginStyles.radioOuter}>
                    {role === option && <View style={LoginStyles.radioInner} />}
                  </View>
                  <Text style={LoginStyles.radioLabel}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={LoginStyles.input}
              placeholder="Email/Phone No"
              placeholderTextColor="#888"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={LoginStyles.input}
              placeholder="Password *"
              placeholderTextColor="#888"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
            <View style={LoginStyles.rememberRow}>
              <View style={LoginStyles.checkbox}>
                <TouchableOpacity
                  onPress={() => setRememberMe(!rememberMe)}
                  style={
                    rememberMe
                      ? LoginStyles.checkboxticked
                      : LoginStyles.checkboxtick
                  }
                >
                  {rememberMe ? (
                    <AntDesign name="check" size={16} color="white" />
                  ) : null}
                </TouchableOpacity>
                <Text style={LoginStyles.rememberLabel}>Remember Me</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('forgetemail', {
                    role: role,
                    email: email,
                  })
                }
                style={{ marginLeft: 'auto' }}
              >
                <Text style={LoginStyles.forgotText}>Lost Your Password?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={SubmitUserLog}
              style={LoginStyles.signInButton}
            >
              <Text style={LoginStyles.signInText}>Sign In</Text>
            </TouchableOpacity>
            <View style={LoginStyles.signupRow}>
              <Text style={LoginStyles.signupText}>Don’t Have An Account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                <Text style={LoginStyles.signupLink}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAwareScrollView>
    </>
  );
};

export default Login;
