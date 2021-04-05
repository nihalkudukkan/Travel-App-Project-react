import axios from 'axios';

const PLAN_API_URL = 'http://localhost:8080';

class PlanDataService {
    retrieveAllPlan(){
        return axios.get(`${PLAN_API_URL}/sortPlan`);
    }
    deleteUserPlan(name){
        return axios.delete(`${PLAN_API_URL}/plan/del/${name}`)
    }
}

export default new PlanDataService()