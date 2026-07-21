import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const getTeacherDashboard = async (token) => {
    let _data = await axios.post(
        `${BASE_URL}/teachers/dashboard`,
        {},

        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'Authorization': `Bearer ${token}`,
            },
        }
    );
    //console.log("course list", _data?.data?.course);

    return _data?.data;
};

export const TeacherBookedSchedule = async (token, fromdate, todate, statusid, offset) => {
    let _data = await axios.post(
        `${BASE_URL}/teachers/my-booked-schedules`,
        {
            from_date: fromdate,
            to_date: todate,
            status: statusid,
            offset: offset
        },

        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'Authorization': `Bearer ${token}`,
            },
        }
    );
    //console.log("course list", _data?.data?.course);

    return _data?.data;
};




export const TeacherScheduleAccept = async (token, id, pname, plink) => {
    let _data = await axios.post(
        `${BASE_URL}/teachers/schedules-accept`,
        {
            booking_id: id,
            platform_name: pname,
            link: plink
        },

        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'Authorization': `Bearer ${token}`,
            },
        }
    );
    //console.log("course list", _data?.data?.course);

    return _data?.data;
};
export const TeacherScheduleReject = async (token, id) => {
    let _data = await axios.post(
        `${BASE_URL}/teachers/schedules-reject`,
        {
            booking_id: id,

        },

        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'Authorization': `Bearer ${token}`,
            },
        }
    );
    //console.log("course list", _data?.data?.course);

    return _data?.data;
};


export const availableTeachersList = async (token) => {
    let _data = await axios.post(
        `${BASE_URL}/students/available-teachers-list`,
        {
        },

        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'Authorization': `Bearer ${token}`,
            },
        }
    );
    //console.log("course list", _data?.data?.course);

    return _data?.data;
};
export const availableTeachersDetail = async (token, tid, date) => {
    let _data = await axios.post(
        `${BASE_URL}/students/available-teachers-details`,
        {
            teacher_id: tid,
            date: date
        },
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'Authorization': `Bearer ${token}`,
            },
        }
    );
    //console.log("course list", _data?.data?.course);

    return _data?.data;
};



export const schedulePurchase = async (token, data) => {
    let _data = await axios.post(
        `${BASE_URL}/students/session-purchased`,

        data
        ,
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'Authorization': `Bearer ${token}`,
            },
        }
    );
    //console.log("course list", _data?.data?.course);

    return _data?.data;
};



export const getTeacherScheduleList = async (token, offset) => {
    let _data = await axios.post(
        `${BASE_URL}/teachers/time-schedules-list`,
        {
            limit: 5,
            offset: offset
        },

        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'Authorization': `Bearer ${token}`,
            },
        }
    );
    //console.log("course list", _data?.data?.course);

    return _data?.data;
};


export const getTeacherSubjectList = async (token) => {
    let _data = await axios.post(
        `${BASE_URL}/teachers/subject-list`,
        {},

        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'Authorization': `Bearer ${token}`,
            },
        }
    );
    //console.log("course list", _data?.data?.course);

    return _data?.data;
};


export const createSchedule = async (token, slots) => {
    let _data = await axios.post(
        `${BASE_URL}/teachers/time-schedules/create`,
        {
            slots: slots
        },

        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'Authorization': `Bearer ${token}`,
            },
        }
    );
    //console.log("course list", _data?.data?.course);

    return _data?.data;
};

export const getTeacherProfile = async (token) => {
    let _data = await axios.post(
        `${BASE_URL}/teachers/get-profile`,
        {},

        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'Authorization': `Bearer ${token}`,
            },
        }
    );
    //console.log("course list", _data?.data?.course);

    return _data?.data;
};


export const updateTeachersProfile = async (token, address, education, age, state_id, city_id, category_id, image, cimage) => {
    const formData = new FormData();

    formData.append('address', address);
    formData.append('education', education);
    formData.append('age', age);
    formData.append('state_id', state_id);
    formData.append('city_id', city_id);
    category_id.forEach(id => {
        formData.append('subject_id[]', id);
    });
    if (image) {
        formData.append('image', image);
    }
    if (cimage) {
        formData.append('certificate', cimage);
    }
    let _data = await axios.post(
        `${BASE_URL}/teachers/update-profile`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                'Authorization': `Bearer ${token}`,
            },
        }
    );

    return _data?.data;
};