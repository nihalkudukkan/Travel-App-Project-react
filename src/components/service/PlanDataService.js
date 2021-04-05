import axios from 'axios';

const PLAN_API_URL = 'http://localhost:8080';

class PlanDataService {
    retrieveAllPlan(){
        return axios.get(`${PLAN_API_URL}/sortPlan`);
    }
    retrieveUserPlan(name) {
        return axios.get(`${PLAN_API_URL}/plans/${name}`)
    }
    postPlan(Plan) {
        return axios.post(`${PLAN_API_URL}/plan`, Plan)
    }
    deleteUserPlan(name){
        return axios.delete(`${PLAN_API_URL}/plan/del/${name}`)
    }
    deletePlanId(id){
        return axios.delete(`${PLAN_API_URL}/plan/delete/${id}`)
    }
}

export default new PlanDataService()