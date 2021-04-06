import axios from 'axios';

const FRIEND_API_URL = 'http://localhost:8080';

class FriendDataService {
    getUserFriends(name){
        return axios.get(`${FRIEND_API_URL}/friend/name/${name}`)
    }
    getUserConnect(name){
        return axios.get(`${FRIEND_API_URL}/friend/connect/${name}`)
    }
    postFriend(Friend){
        return axios.post(`${FRIEND_API_URL}/friend/add`, Friend)
    }
    deleteFriendByName(name){
        return axios.delete(`${FRIEND_API_URL}/friend/del/name/${name}`)
    }
    deleteFriendByConnect(connect){
        return axios.delete(`${FRIEND_API_URL}/friend/del/connect/${connect}`)
    }
}

export default new FriendDataService()