import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';

const SelectLanguage = (props) => {

  const languages = ['All', 'Javascript', 'Ruby', 'Java', 'Css', 'Python'];

  return (
    <ul className='languages'>
      {languages.map(v => {
          return (
            <li
              className={v === props.selectedLanguage ? 'selected' : ''}
              onClick={ () => props.onSelect(v) }
              key={v}>
              {v}
            </li>
          )
        })
      }
    </ul>
  );
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };
  }

  componentDidMount(){
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState( () => {
      return { 
        selectedLanguage: lang,
        repos: null
      };
    });

    api.fetchPopularRepos(lang)
      .then((repos) => {
        this.setState( () => {
           return {repos: repos}
        });
      });
  }

  render(){
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={(lang) => this.updateLanguage(lang)}
        />
        <pre>
          <code>
            {JSON.stringify(this.state.repos, null, 2)}
          </code>
        </pre>
      </div>
    );
  }
}

export default Popular;