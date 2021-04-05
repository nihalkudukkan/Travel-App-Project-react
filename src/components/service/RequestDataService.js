import axios from 'axios';

const COURSE_API_URL = 'http://localhost:8080';

class RequestDataService {
    getUserFriendReq(name){
        return axios.get(`${COURSE_API_URL}/request/${name}`)
    }
}

export default new RequestDataService()