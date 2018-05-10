import React from "react";
import PropTypes from "prop-types";
import api from "../utils/api";
import Loading from './Loading';

const SelectLanguage = props => {
  const languages = ["All", "JavaScript", "Ruby", "Java", "Css", "Python"];

  return (
    <ul className="languages">
      {languages.map(v => {
        return (
          <li
            className={v === props.selectedLanguage ? "selected" : ""}
            onClick={() => props.onSelect(v)}
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

const RepoGrid = props => {
  return (
    <ul className="popular-list">
      {props.repos.map((repo, idx) => {
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
    this.setState(() => {
      return {
        selectedLanguage: lang,
        repos: null
      };
    });

    let repos = await api.fetchPopularRepos(lang);
    this.setState(() => ({ repos }));
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos ? (
          <Loading />
        ) : (
          <RepoGrid repos={this.state.repos} />
        )}
        <pre>
          <code className="debug">
            {this.state.repos ? JSON.stringify(this.state.repos, null, 2) : ""}
          </code>
        </pre>
      </div>
    );
  }
}

export default Popular;
