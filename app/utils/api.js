import axios from 'axios';

module.exports = {
  fetchPopularRepos(language){
    let encodedUri = window.encodeURI(`https://api.github.com/repositories?q=stars>1+language=${language}&sort=stars&order=desc&type=Repositories`);

    return axios.get(encodedUri).then( (res) => {
      return res.data;
    });
  }
}