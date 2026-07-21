import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import DateTimePicker from "@react-native-community/datetimepicker";
import AntDesign from '@expo/vector-icons/AntDesign';
import { examResultstyles } from '../../screens/studentProfile/styles';
import Entypo from '@expo/vector-icons/Entypo';

const SessionFilters = ({ setStatusId, setFrom_date, setTo_date }) => {
    const [startdate, setStartDate] = useState(new Date());
    const [dateshow, setDateShow] = useState(false)
    const [showPicker, setShowPicker] = useState(false);
    const [showPicker2, setShowPicker2] = useState(false);
    const [enddate, setEndDate] = useState(new Date());
    const [dateshow2, setDateShow2] = useState(false)
    const [statDrop, setStatDrop] = useState(false)
    const [statusshown, setStatusShown] = useState('')

    const status = [
        {
            id: 0,
            name: "Pending"
        },
        {
            id: 1,
            name: "Accepted"
        },
        {
            id: 2,
            name: "Rejected"
        },
        {
            id: 3,
            name: "Completed"
        }
    ]

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || startdate;
        setShowPicker(false);
        setStartDate(currentDate);
        setFrom_date(currentDate)
        setDateShow(true)
        console.log("Start Date : ", startdate)
    };
    const handleDateChange2 = (event, selectedDate) => {
        const currentDate = selectedDate || enddate;
        setShowPicker2(false);
        setEndDate(currentDate);
        setTo_date(currentDate)
        setDateShow2(true)
        console.log("End Date : ", enddate)
    };

    return (
        <View style={examResultstyles.inputsFilters}>

            <TouchableOpacity onPress={() => setStatDrop(true)} style={examResultstyles.inputpos}>
                <TextInput
                    placeholder={statusshown ? statusshown : 'Status'}
                    placeholderTextColor={"#888"}
                    style={{ fontFamily: "Poppins_400Regular", color: "#000" }}
                    onChangeText={(text) => setSearchName(text)}
                />
                <Entypo name="chevron-small-down" size={18} color="#888888" />

                {
                    statDrop ? <View style={{ position: "absolute", zIndex: 10, top: "100%", width: "100%" }}>
                        {
                            status?.map((e) => (
                                <TouchableOpacity
                                    style={{ backgroundColor: "#fff" }}
                                    key={e.id}
                                    onPress={() => {
                                        setStatusId(e?.id)
                                        setStatDrop(false)
                                        setStatusShown(e?.name)
                                    }}
                                >
                                    <Text style={{ padding: 5 }} >{e?.name}</Text>
                                </TouchableOpacity>
                            ))
                        }

                    </View> : null
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowPicker(true)} style={examResultstyles.inputpos2}>
                {showPicker && (
                    <DateTimePicker
                        value={startdate}
                        mode="date"
                        display={Platform.OS === "ios" ? "inline" : "default"}
                        onChange={handleDateChange}
                    />
                )}
                <Text style={{ fontFamily: "Poppins_400Regular", color: "#888888" }}>
                    {dateshow ? startdate.toDateString() : "Start Date"}
                </Text>
                <AntDesign name="calendar" size={18} color="#888888" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowPicker2(true)} style={examResultstyles.inputpos2}>
                {showPicker2 && (
                    <DateTimePicker
                        value={enddate}
                        mode="date"
                        display={Platform.OS === "ios" ? "inline" : "default"}
                        onChange={handleDateChange2}
                    />
                )}
                <Text style={{ fontFamily: "Poppins_400Regular", color: "#888888" }}>
                    {dateshow2 ? enddate.toDateString() : "End Date"}
                </Text>
                <AntDesign name="calendar" size={18} color="#888888" />
            </TouchableOpacity>


            <TouchableOpacity style={examResultstyles?.searchbuttons}>
                <Text style={{ fontSize: 13, fontFamily: "Poppins_400Regular", color: "#fff" }}>Search</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SessionFilters