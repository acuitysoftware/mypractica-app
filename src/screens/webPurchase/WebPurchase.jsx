import React, { useContext, useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { Alert, ActivityIndicator, View } from 'react-native';
import { fetchSiteSettings } from '../../services/cms';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStudentSubs, getSubcriptionfromid } from '../../services/student';
import { AuthContext } from '../../context/AuthContext';
import Toast from 'react-native-toast-message';

export default function RazorpayPayment({ route }) {
  const { id, price } = route.params;
  console.log(price)
  const { authUser } = useContext(AuthContext)
  const token = authUser?.token
  const [key, setKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // ✅ Get navigation prop

  const fetchKeys = async () => {
    const res = await fetchSiteSettings();
    setKey(res?.data || null);
    setLoading(false);
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const injectedJavaScript = `
    (function() {
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = payNow;
        document.head.appendChild(script);
      } else {
        payNow();
      }

      function payNow() {
        var options = {
          key: '${key?.razor_pay_key}', 
          amount: '${price * 100}', 
          currency: 'INR',
          name: 'Practica App',
          description: 'Subscription Payment',
          handler: function (response) {
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
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: "cancel" }));
            }
          }
        };
        var rzp = new Razorpay(options);
        rzp.open();
      }
    })();
  `;

  const handlePaymentResponse = async (event) => {
    const data = JSON.parse(event.nativeEvent.data);

    if (data.type === "success") {
      const paymentId = data.response.razorpay_payment_id;

      try {
        const res = await getSubcriptionfromid(token, id, paymentId)
        if (res.status === false) {
          Toast.show({
            type: "error",
            text1: res.message
          })
        } else {
          Toast.show({
            type: "success",
            text1: res.message
          })
          Alert.alert('Success', 'Subscription activated');
          navigation.navigate('confirmpay'); // ✅ Navigate on success
        }

      } catch (err) {
        Alert.alert('Error', 'Backend call failed');
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
          source={{ html: '<html><head></head><body></body></html>' }}
          injectedJavaScript={injectedJavaScript}
          onMessage={handlePaymentResponse}
          style={{ flex: 1 }}
        />
      )}
    </SafeAreaView>
  );
}
