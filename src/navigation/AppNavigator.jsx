import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Intro from '../screens/intro/Intro'
import Login from '../screens/auth/login/Login'
import SignUp from '../screens/auth/signup/SignUp'
import Home from '../screens/home/Home'
import UpdateProfileInitial from '../screens/fullinfo/FullInfo'
import OtpScreen from '../screens/auth/forget/ForgetOtp'
import ForgetEmail from '../screens/auth/forget/ForgetEmail'
import NewPassword from '../screens/auth/forget/NewPassword'
import { AuthContext } from '../context/AuthContext'
import Examdetails from '../screens/examdetails/Examdetails'
import ExamPayment from '../screens/examPayment/ExamPayment'
import RazorpayPayment from '../screens/webPurchase/WebPurchase'
import Quiz from '../screens/quiz/Quiz'
import Results from '../screens/results/Results'
import Sidebar from '../components/Sidebar/Sidebar'
import Subscription from '../screens/studentProfile/Subscription'
import MySchedule from '../screens/studentProfile/MySchedule'
import MyExams from '../screens/studentProfile/MyExams'
import ChangePassword from '../screens/studentProfile/ChangePassword'
import TeacherList from '../screens/studentProfile/TeacherList'
import MySessions from '../screens/sessions/MySessions'
import Verification from '../screens/auth/verification/Verification'
import { StatusBar } from 'expo-status-bar'
import TimeSchedule from '../screens/TimeSchedule/TimeSchedule'
import ConfirmPay from '../screens/webPurchase/ConfirmPay'
import RazorpayPayment2 from '../screens/webPurchase/WebPurchase2'
import Test from '../screens/testseries/Test'
import FooterBar from '../components/footerbar/FooterBar'

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    const { authUser, openbar, setOpenBar } = useContext(AuthContext)
    return (
        <NavigationContainer>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            {
                openbar ? <Sidebar setSideBar={setOpenBar} /> : null
            }

            <Stack.Navigator screenOptions={{
                headerShown: false,
            }} initialRouteName="intro">
                <Stack.Screen name='intro' component={Intro} />
                <Stack.Screen name='login' component={authUser ? Home : Login} />
                <Stack.Screen name='signup' component={SignUp} />
                <Stack.Screen name='forgetemail' component={ForgetEmail} />
                <Stack.Screen name='forget' component={OtpScreen} />
                <Stack.Screen name='newpassword' component={NewPassword} />
                <Stack.Screen name='verify' component={Verification} />
                <Stack.Screen name='home' component={Home} />
                <Stack.Screen name='updateinitial' component={UpdateProfileInitial} />
                <Stack.Screen name='examdetails' component={Examdetails} />
                <Stack.Screen name='quiz' component={Quiz} />
                <Stack.Screen name='test' component={Test} />
                <Stack.Screen name='subscription' component={Subscription} />
                <Stack.Screen name='result' component={Results} />
                <Stack.Screen name='exampurchase' component={ExamPayment} />
                <Stack.Screen name='purchase' component={RazorpayPayment} />
                <Stack.Screen name='purchaseschedule' component={RazorpayPayment2} />
                <Stack.Screen name='confirmpay' component={ConfirmPay} />
                {/*  Student Routes */}
                <Stack.Screen name='studentschedule' component={MySchedule} />
                <Stack.Screen name='myexams' component={MyExams} />
                <Stack.Screen name='teacherlist' component={TeacherList} />
                <Stack.Screen name='changepassword' component={ChangePassword} />
                {/* Teacher Routes */}
                <Stack.Screen name='sessions' component={MySessions}></Stack.Screen>
                <Stack.Screen name='timeschedule' component={TimeSchedule}></Stack.Screen>
            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default AppNavigator