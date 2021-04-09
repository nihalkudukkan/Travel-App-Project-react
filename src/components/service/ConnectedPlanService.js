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
    deleteByPlanId(id){
        return axios.delete(`${FRIEND_API_URL}/accept/delete/${id}`)
    }
    deleteByReceiver(name){
        return axios.delete(`${FRIEND_API_URL}/accept/del/receiver/${name}`)
    }
    deleteByConnector(name){
        return axios.delete(`${FRIEND_API_URL}/accept/del/connected/${name}`)
    }
}

export default new ConnectedPlanService()