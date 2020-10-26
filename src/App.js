import { Card, CardContent } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import { Header } from './Header';
import { InfoBox } from './InfoBox';
import { LineGraph } from './LineGraph';
import { Map } from './Map';
import { Table } from './Table';

function App() {
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    if (countryCode === 'worldwide') {
      getAllContriesInformation();
    } else {
      getCountryinfo(countryCode);
    }
  };

  const getAllContriesInformation = async () => {
    await fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  };

  const getCountryinfo = async (countryCode) => {
    await fetch(`https://disease.sh/v3/covid-19/countries/${countryCode}`)
      .then((response) => response.json())
      .then((data) => setCountryInfo(data));
  };

  useEffect(() => {
    getAllContriesInformation();
  }, []);

  return (
    <div className='app'>
      <div className='app__left'>
        <Header
          country={country}
          onCountryChange={onCountryChange}
          setTableData={setTableData}
        />
        <div className='app__stats'>
          <InfoBox
            title='Coronavarius cases'
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
          />
          <InfoBox
            title='Recoverd'
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
          />
          <InfoBox
            title='Deaths'
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
          />
        </div>
        <Map />
      </div>
      <Card className='app__right'>
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
