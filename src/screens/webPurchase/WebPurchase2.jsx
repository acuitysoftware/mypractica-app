import React, { useContext, useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { Alert, ActivityIndicator, View } from 'react-native';
import { fetchSiteSettings } from '../../services/cms';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStudentSubs, getSubcriptionfromid, schedulePurchase } from '../../services/student';

import Toast from 'react-native-toast-message';
import { AuthContext } from '../../context/AuthContext';

export default function RazorpayPayment2({ route }) {
  const { id, date, topic, amount } = route.params
  const formatdate = new Date(date).toISOString().split("T")[0];
  console.log(id, formatdate, topic, amount)
  const { authUser } = useContext(AuthContext)
  const token = authUser?.token
  const [key, setKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // ✅ Get navigation prop
  console.log(token)
  const fetchKeys = async () => {
    const res = await fetchSiteSettings();
    setKey(res?.data || null);
    setLoading(false);
  };

  useEffect(() => {
    fetchKeys();
  }, []);


  const handlePaymentResponse = async (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === "success") {
      const paymentId = data.response.razorpay_payment_id;
      const paymentData = {
        schedule_id: id,
        transaction_id: paymentId,
        date: formatdate,
        topic: topic || ""
      }
      setLoading(true)
      try {
        const res = await schedulePurchase(token, paymentData)
        console.log(res)
        if (res.status === false) {
          setLoading(false)
          Toast.show({
            type: "error",
            text1: res.message
          })
          console.log(res.message, "??")
          console.log(res, "??")
        } else {
          setLoading(false)
          Toast.show({
            type: "success",
            text1: res.message
          })
          Alert.alert('Success', 'Subscription activated');
          navigation.navigate('confirmpay'); // ✅ Navigate on success
        }

      } catch (error) {
        Alert.alert('Error', 'Backend call failed');
        console.log(error)
        if (error.response) {
          console.error("API Error:", error.response.data);
        } else if (error.request) {
          console.error("Network Error:", error.request);
        } else {
          console.error("Unexpected Error:", error.message);
        }
      }
    } else if (data.type === "cancel") {
      Alert.alert('Cancelled', 'Payment was cancelled');
      navigation.navigate('home'); // ✅ Navigate on cancel
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#3399cc" />
        </View>
      ) : (
        <WebView
          originWhitelist={['*']}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{
            html: `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Razorpay Payment</title>
            <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
            <script>
              document.addEventListener('DOMContentLoaded', function() {
                console.log('Razorpay script loaded');
                var options = {
                  key: '${key?.razor_pay_key}', 
                  amount: ${amount * 100}, 
                  currency: 'INR',
                  name: 'Practica App',
                  description: 'Subscription Payment',
                  handler: function (response) {
                    console.log('Payment Successful:', response);
                    window.ReactNativeWebView.postMessage(JSON.stringify({ type: "success", response }));
                  },
                  prefill: {
                    name: 'John Doe',
                    email: 'john@example.com',
                    contact: '9999999999'
                  },
                  theme: {
                    color: '#3399cc'
                  },
                  modal: {
                    ondismiss: function() {
                      console.log('Payment Cancelled');
                      window.ReactNativeWebView.postMessage(JSON.stringify({ type: "cancel" }));
                    }
                  }
                };
                console.log('Opening Razorpay');
                var rzp = new Razorpay(options);
                rzp.open();
              });
            </script>
          </head>
          <body>
            <h2>Loading Payment Gateway...</h2>
          </body>
          </html>
          `
          }}
          onMessage={(event) => {
            console.log("WebView Message:", event.nativeEvent.data);
            handlePaymentResponse(event);
          }}
          onError={(e) => {
            console.log('WebView Error:', e.nativeEvent);
            Alert.alert('Error', 'Failed to load payment gateway.');
          }}
          onLoadEnd={() => {
            console.log('WebView Loaded');
          }}
          style={{ flex: 1 }}
        />
      )}
    </SafeAreaView>
  );
}
