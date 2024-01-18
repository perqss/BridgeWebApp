import React, {useState, useEffect} from 'react';
import { DataGrid, gridPageCountSelector, GridPagination, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography'
import { backgroundColor } from '../common/utils';
import { Header, FormButton } from '../components/MaterialComponentsCss';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Service from "../services/Service";
import axios from "axios";


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
    const [count, setCount] = useState(0);

    useEffect(() => {
        Service.getTournament(tournamentId).then(response => {
            setTournamentName(response.data.name);
        }).catch(e => {
            console.error('Error fetching tournament:', e);
        });

    }, []);

    useEffect(() => {
        const userId = localStorage.getItem('id')
        if (location?.state?.counter !== undefined && location?.state?.counter !== null) {
            const updatedData = { deals: location.state.counter };
            axios.get(`http://localhost:8000/api/userpoints/${userId}/${tournamentId}/`)
                .then(response => {
                    // UserPoints exists, update it
                    return axios.put(`http://localhost:8000/api/userpoints/${userId}/${tournamentId}/`,
                        {
                            deals: Number(response.data.deals+1),
                            points: Number(response.data.points)+Number(location.state.counter), }
                    );
                })
                .catch(error => {
                    axios.post(`http://localhost:8000/api/userpoints/`, {
                        UserId: userId,
                        TournamentId: tournamentId,
                        deals: 1,
                        points: location.state.counter,
                    }).catch(error => {console.log(error)});
                })
            navigate(location.pathname, {});
        }
    }, [location?.state?.counter]);

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
    }, [count]);

  useEffect(() => {
    const sortedRows = data.slice().sort((a, b) => b.points - a.points);
    setData(sortedRows);
  }, [count])

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