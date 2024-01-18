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

	getTournaments() {
		const token = localStorage.getItem('token'); // Retrieve the stored token
		return axios.get("http://localhost:8000/api/tournaments/", {
			headers: {
				'Authorization': `Token ${token}`  // Include the token in the request header
			}
		});
	}

	getUserPoints(tournamentId) {
		const token = localStorage.getItem('token'); // Retrieve the stored token
		return axios.get(`http://localhost:8000/api/userpoints/${tournamentId}/`, {
			headers: {
				'Authorization': `Token ${token}`  // Include the token in the request header
			}
		});
	}

	getTournament(tournamentId) {
		const token = localStorage.getItem('token'); // Retrieve the stored token
		return axios.get(`http://localhost:8000/api/tournaments/${tournamentId}/`, {
			headers: {
				'Authorization': `Token ${token}`  // Include the token in the request header
			}
		})
	}

}

export default new Service();