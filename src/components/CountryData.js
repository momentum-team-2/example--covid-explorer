import React from 'react'
import axios from 'axios'

export default class CountryData extends React.Component {
  constructor () {
    super()
    this.state = {
      covidData: []
    }
  }

  componentDidMount () {
    axios.get(`https://api.covid19api.com/dayone/country/${this.props.country.Slug}/status/confirmed`)
      .then(response => {
        this.setState({ covidData: response.data })
      })
  }

  componentWillUnmount () {
    console.log('CountryData will unmount')
  }

  render () {
    const { country, clearCountry } = this.props
    const { covidData } = this.state
    const data = covidData[covidData.length - 1] || {}
    const linkClasses = 'bn bg-white dark-blue underline pointer'

    return (
      <div className='CountryData'>
        <h1>{country.Country}</h1>
        <p>
          <button className={linkClasses} onClick={clearCountry}>
            Go back to all countries
          </button>
        </p>
        <p>
          Data last recorded at {data.Date}
        </p>
        <dl>
          <dt>Confirmed cases</dt>
          <dd>{data.Cases}</dd>
        </dl>
      </div>
    )
  }
}
