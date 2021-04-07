import axios from 'axios';

const PLAN_API_URL = 'http://localhost:8080';

class PlanNotificationService {
    sendPlanRequest(PlanNotification){
        return axios.post(`${PLAN_API_URL}/planNotification/post`, PlanNotification);
    }
    getPlanRequestByReceiverName(receiver){
        return axios.get(`${PLAN_API_URL}/planNotification/receiver/${receiver}`)
    }
    deletePlanRequestNotification(id){
        return axios.delete(`${PLAN_API_URL}/planNotification/id/${id}`)
    }
}

export default new PlanNotificationService()