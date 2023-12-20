import axios from 'axios'; 

class Service {

	login(data) {
		return axios.post("http://localhost:8000/api/login/", data); 
	}
	signup(data) {
		return axios.post("http://localhost:8000/api/signup/", data); 
	}
	changePassword(data) {
		return axios.post("http://localhost:8000/api/change-password/", data); 
	}

}

export default new Service();