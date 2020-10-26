import './App.css';
import { Header } from './Header';
import { InfoBox } from './InfoBox';

function App() {
  return (
    <div className='app'>
      <Header />
      <div className='app__stats'>
        <InfoBox title='Coronavarius cases' total={2000} cases={12} />
        <InfoBox title='Recoverd' total={3000} cases={123} />
        <InfoBox title='Deaths' total={4000} cases={1234} />
      </div>
      {/* InfoBoxs */}
      {/* Table */}
      {/* Grpah */}
      {/* Map */}
    </div>
  );
}

export default App;
