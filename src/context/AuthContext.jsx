import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getStudentProfile } from '../services/student';
import { getTeacherProfile } from '../services/teachers';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openbar, setOpenBar] = useState(false)
    const [profile, setProfile] = useState(null)
    const [profileupdt, setProfileupdt] = useState(false)

    // Load saved token on app start
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('auth_token');
                const user = await AsyncStorage.getItem('auth_user');
                if (token && user) {
                    setAuthToken(token);
                    setAuthUser(JSON.parse(user));
                }
            } catch (e) {
                console.error('Failed to load auth data', e);
            } finally {
                setLoading(false);
            }
        };
        loadUserData();
    }, []);

    // Save login info
    const login = async (token, user) => {
        await AsyncStorage.setItem('auth_token', token);
        await AsyncStorage.setItem('auth_user', JSON.stringify(user));
        setAuthToken(token);
        setAuthUser(user);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('auth_token');
        await AsyncStorage.removeItem('auth_user');
        setAuthToken(null);
        setAuthUser(null);

    };

    const studentProfile = async () => {
        try {
            if (authUser?.data?.role_name === "STUDENT") {
                const res = await getStudentProfile(authToken);
                setProfile(res?.data)
                console.log(res)
            } else {
                const res = await getTeacherProfile(authToken);
                setProfile(res?.data)

            }

        } catch (error) {

        }
    }

    useEffect(() => {
        studentProfile()
    }, [authUser, authToken, profileupdt])


    return (
        <AuthContext.Provider value={{ authUser, authToken, login, logout, loading, openbar, setOpenBar, profile, setProfileupdt }}>
            {children}
        </AuthContext.Provider>
    );
};
