import './Table.css';
import numeral from 'numeral';

function Table({ countries }) {
  return (
    <div className='table'>
      {countries.map(({ country, cases }, key) => (
        <tr key={key}>
          <td>{country}</td>
          <td>
            <strong>{numeral(cases).format('0,0')}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
