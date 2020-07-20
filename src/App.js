import React from 'react'
import axios from 'axios'
import 'tachyons'
import './App.css'
import CountryData from './components/CountryData'

class App extends React.Component {
  constructor () {
    super()
    console.log('App constructor()')
    this.state = {
      countries: [],
      selectedCountry: null
    }
    this.setSelectedCountry = this.setSelectedCountry.bind(this)
  }

  componentDidMount () {
    console.log('App componentDidMount()')
    axios.get('https://api.covid19api.com/countries')
      .then(response => {
        this.setState({
          countries: response.data.sort((a, b) => {
            if (a.Country > b.Country) {
              return 1
            }
            return -1
          })
        })
      })
  }

  setSelectedCountry (country) {
    this.setState({ selectedCountry: country })
  }

  render () {
    console.log('App render()')
    const { selectedCountry, countries } = this.state
    const linkClasses = 'bn bg-white dark-blue underline pointer'

    return (
      <div className='App'>
        {selectedCountry
          ? <CountryData country={selectedCountry} clearCountry={() => this.setSelectedCountry(null)} />
          : (
            <div>
              <h1>Countries</h1>
              <ul>
                {countries.map(country => (
                  <li key={country.ISO2}>
                    <button
                      className={linkClasses}
                      onClick={() => this.setSelectedCountry(country)}
                    >
                      {country.Country}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

      </div>
    )
  }
}

export default App
