import { Card, CardContent, Typography } from '@material-ui/core';
import './InfoBox.css';

function InfoBox({ title, cases, total }) {
  return (
    <Card className='indoBox'>
      <CardContent>
        <Typography color='textSecondary'>{title}</Typography>
        <h2 className='indoBox__cases'>{cases}</h2>
        <Typography color='textSecondary'> {total} Total</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
