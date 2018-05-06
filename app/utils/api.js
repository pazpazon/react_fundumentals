import axios from 'axios';

const fetchPopularRepos = async (language) => {

  let encodedUri = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

  return ( await axios.get(encodedUri) ).data.items;

}

export default { fetchPopularRepos };