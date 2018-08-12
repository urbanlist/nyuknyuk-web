import axios from 'axios';


class NewsController {
  constructor() {

  }

  get(resAction) {
    axios
      .get('//localhost:10717/api/nyuknyuk/news')
      .then(res => {
        resAction && resAction(res.data);
      })
      .catch(res => {
        console.log(res);
      });
  }
}


export default NewsController;