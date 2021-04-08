import axios from 'axios';

const FRIEND_API_URL = 'http://localhost:8080';

class ConnectedPlanService {
    postRequest(Plan){
        return axios.post(`${FRIEND_API_URL}/accepted/post`, Plan)
    }
    getByConnName(name){
        return axios.get(`${FRIEND_API_URL}/accepted/connected/${name}`)
    }
    getByReceiver(name){
        return axios.get(`${FRIEND_API_URL}/accepted/receiver/${name}`)
    }
}

export default new ConnectedPlanService()