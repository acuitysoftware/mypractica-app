import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';



const Timer = ({ initialTime, isPaused, onComplete, onPause, onStart }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime * 60);
    const [isCompleted, setIsCompleted] = useState(false);
    const [internalPaused, setInternalPaused] = useState(isPaused);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (internalPaused || isCompleted) return;

        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    setIsCompleted(true);
                    onComplete && onComplete();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [internalPaused, isCompleted]);

    useEffect(() => {
        setInternalPaused(isPaused);
    }, [isPaused]);

    const togglePause = () => {
        setInternalPaused((prev) => !prev);
        if (internalPaused) onStart && onStart();
        else onPause && onPause(timeLeft);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${secs}`;
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={togglePause} style={styles.button}>
                {
                    internalPaused ? <AntDesign name="play" size={24} color="black" /> : <Feather name="pause-circle" size={24} color="black" />
                }
            </TouchableOpacity>
            {isCompleted ? (
                <Text style={styles.timerText}>Time's Up!</Text>
            ) : (
                <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', marginVertical: 14 },
    timerText: { fontSize: 20, marginRight: 10 },
    button: { padding: 6, borderRadius: 25, alignItems: "center" },
    buttonText: { color: '#fff' }
});

export default Timer;
