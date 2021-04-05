import axios from 'axios';

const COURSE_API_URL = 'http://localhost:8080';

class UserDataService {

    retrieveAllUser() {
        //console.log('executed service')
        return axios.get(`${COURSE_API_URL}/users`);
    }

    verifyUser(username) {
        // console.log(username);
        return axios.get(`${COURSE_API_URL}/user/${username}`);
    }

    verifyPhone(phone){
        return axios.get(`${COURSE_API_URL}/user/phone/${phone}`)
    }

    verifyEmail(email){
        return axios.get(`${COURSE_API_URL}/user/email/${email}`)
    }

    updateUser(User){
        return axios.put(`${COURSE_API_URL}/addUser`, User)
    }
    // retrieveCourse(name, id) {
    //     //console.log('executed service')
    //     return axios.get(`${INSTRUCTOR_API_URL}/courses/${id}`);
    // }

    deleteUser(id){
        return axios.delete(`${COURSE_API_URL}/user/delete/${id}`)
    }

    // updateCourse(name, id, course) {
    //     //console.log('executed service')
    //     return axios.put(`${INSTRUCTOR_API_URL}/courses/${id}`, course);
    // }

    createUser(User) {
        //console.log('executed service')
        return axios.post(`${COURSE_API_URL}/addUser/`, User);
    }
}

export default new UserDataService()