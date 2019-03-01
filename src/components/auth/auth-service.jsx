import axios from 'axios';

class AuthService {
  constructor() {
    const service = axios.create({
      baseURL: 'https://pro-geek-ecommerce-api.herokuapp.com/',
      withCredentials: true
    });
    this.service = service;
  }

  signup(name, username, password, birthDate) {
    return this.service.post('/users/signup', { name, username, password, birthDate })
      .then(response => response.data)
      .catch(err => console.log())
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
