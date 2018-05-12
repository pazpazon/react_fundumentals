import React from "react";
import PropTypes from "prop-types";
import {fetchPopularRepos} from "../utils/api";
import Loading from './Loading';

const SelectLanguage = ({selectedLanguage, onSelect}) => {
  const languages = ["All", "JavaScript", "Ruby", "Java", "Css", "Python"];

  return (
    <ul className="languages">
      {languages.map(v => {
        return (
          <li
            className={v === selectedLanguage ? "selected" : ""}
            onClick={() => onSelect(v)}
            key={v}
          >
            {v}
          </li>
        );
      })}
    </ul>
  );
};

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

const RepoGrid = ({repos}) => {
  return (
    <ul className="popular-list">
      {repos.map((repo, idx) => {
        return (
          <li key={repo.url} className="popular-item">
            <div className="popular-rank">{idx + 1}</div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={repo.owner.avatar_url}
                  alt={`Avatar for ${repo.owner.login}`}
                />
              </li>
              <li>
                <a href={repo.html_url}>{repo.name}</a>
              </li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

class Popular extends React.Component {
  
  state = {
    selectedLanguage: "All",
    repos: null
  };

  componentDidMount = () => {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = async (lang) => {
    this.setState(() => ({ selectedLanguage: lang, repos: null }));

    const repos = await fetchPopularRepos(lang);
    this.setState(() => ({ repos }));
  }

  render() {
    const {selectedLanguage, repos} = this.state;
    return (
      <div>
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!repos ? (
          <Loading />
        ) : (
          <RepoGrid repos={repos} />
        )}
        <pre>
          <code className="debug">
            {repos ? JSON.stringify(repos, null, 2) : ""}
          </code>
        </pre>
      </div>
    );
  }
}

export default Popular;
