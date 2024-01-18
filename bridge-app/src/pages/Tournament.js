import React, {useState, useEffect} from 'react';
import { DataGrid, gridPageCountSelector, GridPagination, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography'
import { backgroundColor } from '../common/utils';
import { Header, FormButton } from '../components/MaterialComponentsCss';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Service from "../services/Service";


const columns = [
    { field: 'id', headername: 'id', hide: true},
    { field: 'Username', headerName: 'Username', width: 130 },
    { field: 'deals', headerName: 'Deals', width: 130},
    { field: 'points', headerName: 'Points', width: 130},
];

const Tournament = () => {

    const [data, setData] = useState([]);
    const [tournamentName, setTournamentName] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const tournamentId = useParams().tournamentName;

    Service.getTournament(tournamentId).then(response => {
        setTournamentName(response.data.name);
    }).catch(e => {
            console.error('Error fetching tournament:', e);
    });

    useEffect(() => {
        const fetchUserPoints = async () => {
            try {
                const response = await Service.getUserPoints(tournamentId);
                setData(response.data);
            } catch (e) {
                console.error('Error fetching user points:', e);
            }
        };

        fetchUserPoints();
    }, []);

    useEffect(() => {
        const fetchUserPoints = async () => {
            try {
                const response = await Service.getUserPoints(tournamentId);
                setData(response.data);
            } catch (e) {
                console.error('Error fetching user points:', e);
            }
        };

        fetchUserPoints();
    }, []);

  useEffect(() => {
    const sortedRows = data.slice().sort((a, b) => b.points - a.points);
    setData(sortedRows);
  }, [])

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
                onClick={() => navigate('/game', {state: { tournamentId: tournamentId } })}
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