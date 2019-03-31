import axios from 'axios';


let url = "//localhost:10717";
url = "https://urbanlist.kr";
if (PRODUCTION) {
  url = "https://urbanlist.kr";
}


const getAsync = () => {
  return new Promise((resolve, rejects) => {
    axios
      .get(`${url}/api/nyuknyuk/timeline`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        rejects(err);
      });
  });
}


const postAsync = (data) => {
  return new Promise((resolve, rejects) => {
    axios
      .post(`${url}/api/nyuknyuk/timeline`, data)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        rejects(err);
      });
  });
}


const deleteAsync = (rowKey) => {
  return new Promise((resolve, rejects) => {
    axios
      .delete(`${url}/api/nyuknyuk/timeline?rowKey=${rowKey}`)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        rejects(err);
      });
  });
}


class TimelineController {
  constructor() {

  }

  getAsync() {
    return getAsync();
  }

  postAsync(data) {
    return postAsync(data);
  }

  deleteAsync(rowKey) {
    return deleteAsync(rowKey);
  }
}


export default TimelineController;