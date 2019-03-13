import axios from 'axios';

class AuthService {
  constructor() {
    const service = axios.create({
      baseURL: 'http://localhost:8080',
      withCredentials: true
    });
    this.service = service;
  }

  signup(name, username, password) {
    return this.service.post('/users/signup', { name, username, password })
      .then(response => response.data)
      .catch(err => console.log(err));
  }

  loggedin() {
    return this.service.get('/users/loggedin')
      .then(response => response.data);
  }

  login(username, password) {
    return this.service.post('/users/login', { username, password })
      .then(response => response.data);
  }

  logout() {
    return this.service.post('/users/logout', {})
      .then(response => response.data);
  }
}

export default AuthService;
