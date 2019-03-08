import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:8080/file'
  // withCredentials: true // => you might need this when having the users in the app
});

export default {
  service,
  handleUpload(photo) {
    return service.post('/upload', photo)
      .then(res => res.data)
      .catch((err) => {
        throw err;
      });
  }
};
