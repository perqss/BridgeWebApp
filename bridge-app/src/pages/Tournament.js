import React, {useState, useEffect} from 'react';
import { DataGrid, gridPageCountSelector, GridPagination, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography'
import { backgroundColor } from '../common/utils';
import { Header, FormButton } from '../components/MaterialComponentsCss';
import { useParams, useNavigate, useLocation } from 'react-router-dom';


const columns = [
    { field: 'id', headername: 'id', hide: true},
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 }, 
    { field: 'deals', headerName: 'Deals', width: 130},
    { field: 'points', headerName: 'Points', width: 130},
];

// change to an API call
const rows = [
    {id: 1, firstName: 'admin', lastName: 'admin', deals: 7, points: 100},
    {id: 2, firstName: 'admin', lastName: 'admin', deals: 3, points: 40},
    {id: 3, firstName: 'admin', lastName: 'admin', deals: 5, points: 50},
    {id: 4, firstName: 'admin', lastName: 'admin', deals: 10, points: 70},
    {id: 5, firstName: 'admin', lastName: 'admin', deals: 9, points: 97},
    
];

const Tournament = () => {

  const [data, setData] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location?.state?.counter);

  useEffect(() => {
    const sortedRows = rows.slice().sort((a, b) => b.points - a.points);
    setData(sortedRows);
  }, [])

  const tournamentName = useParams().tournamentName;
  return (
    <div style={{ height: '100vh', width: '100vw', marginTop: '60px', display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <Header
                text={tournamentName}
            />
            <FormButton // render if user has less than 10 deals
                sx={{
                    marginBottom: '20px'
                }}
                onClick={() => navigate('/game')}
            >
                Play Next Deal
            </FormButton>
        </div>
      {data && <DataGrid
        sx={{
            color: 'white',
            backgroundColor: backgroundColor,
        }}
        rows={data}
        columns={columns}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false
            },
          },
        }}
        hideFooter
      />}
    </div>
  );
}

export default Tournament;