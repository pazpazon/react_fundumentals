import React from 'react';
import PropTypes from 'prop-types';

const SelectLanguage = (props) => {

  const languages = ['All', 'Javascript', 'Ruby', 'Java', 'Css', 'Python'];

  return (
    <ul className='languages'>
      {languages.map(v => {
        return (
          <li
            className={v === props.selectedLanguage ? 'selected' : ''}
            onClick={
              props.onSelect.bind(null, v)
            }
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
      selectedLanguage: 'All'
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(lang) {
    this.setState( () => {
      return { selectedLanguage: lang};
    });
  }

  render(){
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
      </div>
    );
  }
}

export default Popular;