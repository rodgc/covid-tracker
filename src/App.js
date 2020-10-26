import { Card, CardContent } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import { Header } from './Header';
import { InfoBox } from './InfoBox';
import { LineGraph } from './LineGraph';
import { Map } from './Map';
import { Table } from './Table';
import 'leaflet/dist/leaflet.css';
import { prettyPrintStat } from './Utils/prettyPrintStat';

function App() {
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

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
      .then((data) => setCountryInfo(data));
  };

  const getCountryinfo = async (countryCode) => {
    await fetch(`https://disease.sh/v3/covid-19/countries/${countryCode}`)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        console.log(data.countryInfo);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
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
          setMapCountries={setMapCountries}
        />
        <div className='app__stats'>
          <InfoBox
            title='Coronavarius cases'
            total={prettyPrintStat(countryInfo.cases)}
            cases={prettyPrintStat(countryInfo.todayCases)}
          />
          <InfoBox
            title='Recoverd'
            total={prettyPrintStat(countryInfo.recovered)}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
          />
          <InfoBox
            title='Deaths'
            total={prettyPrintStat(countryInfo.deaths)}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
          />
        </div>
        <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />
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
