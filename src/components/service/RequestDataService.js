import axios from 'axios';

const COURSE_API_URL = 'http://localhost:8080';

class RequestDataService {
    getUserFriendReq(name){
        return axios.get(`${COURSE_API_URL}/request/${name}`)
    }
    postRequest(req){
        return axios.post(`${COURSE_API_URL}/request/send`, req)
    }
    deleteRequest(id){
        return axios.delete(`${COURSE_API_URL}/request/delete/${id}`)
    }
    deleteRequestByName(name){
        return axios.delete(`${COURSE_API_URL}/request/del/sender/${name}`)
    }
    deleteRequestByReceiver(name){
        return axios.delete(`${COURSE_API_URL}/request/del/receiver/${name}`)
    }
}

export default new RequestDataService()