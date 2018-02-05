import React from 'react';
import axios from 'axios';

const Country = (props) => {
  return (
    <div>
      {props.country.name}
    </div>
  )
}

const DetailedCountry = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <img src={country.flag} width='50%' alt='Not found'></img>
    </div>
  )
}

const ListCountries = (props) => {
  const countries = props.countries
    .filter(country => country.name.toLowerCase().indexOf(props.filter.toLowerCase()) !== -1)


  if (countries.length < 10 && countries.length > 1) {
    return (
      <div>
        {countries.map(country => <div key={country.name}><Country country={country} /></div>)}
      </div>
    )
  } else if (countries.length === 1) {
    return (
      <div>
        <DetailedCountry country={countries[0]} />
      </div>
    )
  } 
  else {
    return (
      <p>Too many matches or no matches, specify another filter</p>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: '',
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }


  handleFilter = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {

    return (

      <div>
        Find countries: <input value={this.state.filter} onChange={this.handleFilter} />
        <ListCountries countries={this.state.countries} filter={this.state.filter} />
      </div>
    );
  }
}

export default App;