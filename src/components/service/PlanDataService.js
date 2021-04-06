import axios from 'axios';

const PLAN_API_URL = 'http://localhost:8080';

class PlanDataService {
    retrieveAllPlan(){
        return axios.get(`${PLAN_API_URL}/sortPlan`);
    }
    retrieveById(id){
        return axios.get(`${PLAN_API_URL}/plan/id/${id}`)
    }
    retrieveUserPlan(name) {
        return axios.get(`${PLAN_API_URL}/plans/${name}`)
    }
    getByPlan(plan){
        return axios.get(`${PLAN_API_URL}/plans/place/${plan}`)
    }
    postPlan(Plan) {
        return axios.post(`${PLAN_API_URL}/plan`, Plan)
    }
    updatePlan(Plan) {
        return axios.put(`${PLAN_API_URL}/plan`, Plan)
    }
    deleteUserPlan(name){
        return axios.delete(`${PLAN_API_URL}/plan/del/${name}`)
    }
    deletePlanId(id){
        return axios.delete(`${PLAN_API_URL}/plan/delete/${id}`)
    }
}

export default new PlanDataService()