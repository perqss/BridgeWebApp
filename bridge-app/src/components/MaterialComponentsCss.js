
import {styled} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';


const FormTextField = styled(TextField)(({ theme }) => ({
    marginTop: 1,
    width: 250,
}));

const FormBox = styled(Box)(({ theme }) => ({
    p: 2,
    boxShadow: '24',
    bgcolor: 'background.paper',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
}));

const FormButton = styled(Button)(({ theme }) => ({
    marginTop: 10, 
    backgroundColor: '#03adfc',
    color: 'white',
    '&:hover': {
        backgroundColor: '#03bafc'
    }
}));

const ItemInfoButton = styled(Button)(({ theme }) => ({
    marginTop: 40, 
    backgroundColor: '#0c2d64',
}))

const StyledAlert = styled(Alert)(({ theme }) => ({
    width: 250,
    marginTop: 1,
}));

export {FormTextField, FormBox, FormButton, StyledAlert, ItemInfoButton};