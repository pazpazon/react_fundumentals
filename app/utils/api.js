import axios from 'axios';

const clientID = "ea8c25304f01b4d9ca6c";
const clientSecret = "ca84fa1fc395a1db3ae375546465bb949e7a6e36";
const authParams = `?client_id=${clientID}&client_secret=${clientSecret}`;


const getProfile = async username => {
  let fetchUri = window.encodeURI(
    `https://api.github.com/users/${username}${authParams}`
  );
  return (await axios.get(fetchUri)).data;
};

const getRepos = async username => {
  let fetchUri = window.encodeURI(
    `https://api.github.com/users/${username}/repos${authParams}&per_page=100`
  );
  return (await axios.get(fetchUri)).data;
};

const getStarCount = (repos) => repos.reduce( (acc, repo) => acc + repo.stargazers_count, 0);

const calculateScore = (profile, repos) => {
  let followers = profile.followers;
  let totalStars = getStarCount(repos);
  return followers * 3 + totalStars;
}

const handleError = (err) => console.warn(err);

const getUserData = async (player) => {

  let data = await axios.all([getProfile(player), getRepos(player)]);
  let profile = data[0];
  let repos = data[1];
  return {profile, score: calculateScore(profile, repos)}
}

const sortPlayers = (players) => players.sort( (a, b) => b.score - a.score);

const battle = async (players) => {
  try {
    return sortPlayers( await axios.all(players.map(getUserData)) );
  } catch (err) {
    handleError(err);
  }
}

const fetchPopularRepos = async (language) => {
  let fetchUri = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories${authParams}`);
  return ( await axios.get(fetchUri) ).data.items;
}

export default { fetchPopularRepos, battle };