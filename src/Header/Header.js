import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useState, useEffect } from 'react';
import './Header.css';
function Header() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useEffect(() => {
    const getCounriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          setCountries(countries);
        });
    };

    getCounriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };
  return (
    <div className='header'>
      <h1>COVID Tracker</h1>
      <FormControl className='header__dropdown'>
        <Select variant='outlined' value={country} onChange={onCountryChange}>
          <MenuItem value='worldwide'>Worldwide</MenuItem>
          {countries.map((contry, key) => (
            <MenuItem key={key} value={contry.value}>
              {contry.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Header;
