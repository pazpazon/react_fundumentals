const clientID = "ea8c25304f01b4d9ca6c";
const clientSecret = "ca84fa1fc395a1db3ae375546465bb949e7a6e36";
const authParams = `?client_id=${clientID}&client_secret=${clientSecret}`;


const getProfile = async username => {
  const fetchUri = window.encodeURI( `https://api.github.com/users/${username}${authParams}` );
  const response = await fetch(fetchUri);
  return response.json();
}

const getRepos = async username => {
  const fetchUri = window.encodeURI(`https://api.github.com/users/${username}/repos${authParams}&per_page=100`);
  const response = await fetch(fetchUri);
  return response.json();
}

const getStarCount = (repos) => repos.reduce( (acc, {stargazers_count}) => acc + stargazers_count, 0);

const calculateScore = ({followers}, repos) => followers * 3 + getStarCount(repos);

const handleError = (err) => {
  console.warn(new Error(err));
  return null;
}

const getUserData = async (player) => {
    const [profile, repos] = await Promise.all([getProfile(player), getRepos(player)]);
    return { profile, score: calculateScore(profile, repos) }
}

const sortPlayers = (players) => players.sort( (a, b) => b.score - a.score);

const battle = async (players) => {
  try {
    return sortPlayers( await Promise.all( players.map(getUserData) ) );
  } catch(err) {
    handleError(err);
  }
}

const fetchPopularRepos = async (language) => {
  let fetchUri = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories${authParams}`);
  try {
    return ( await (await fetch(fetchUri) ).json() ).items;
  } catch (e) {
    handleError(e);
  }
}

export { fetchPopularRepos, battle };