import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// This is the global wrapper component
const KeyboardWrapper = ({ children }) => {
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollViewContainer}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
        >
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.inner}
                >
                    {children}
                </KeyboardAvoidingView>
            </View>
        </KeyboardAwareScrollView>
    );
};

// Styles for the wrapper component
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    scrollViewContainer: {
        flex: 1,
    },
});

export default KeyboardWrapper;
