
import {styled} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { mainColor } from '../common/utils';

export const inputProps = {
    style: {color: 'grey', borderColor: 'grey'},
    focused: {borderColor: 'grey'}
  }
  
export const inputLabelProps = {
style: {color: 'grey'}
}

const FormTextField = styled(TextField)(({ theme }) => ({
    marginTop: 1,
    width: 250,
    '& label.Mui-focused': {
        color: 'white', // Color when focused
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'white', // Underline color when focused
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'black', // Border color
        },
        '&:hover fieldset': {
          borderColor: 'white', // Border color on hover
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
    }
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
    backgroundColor: mainColor,
    color: 'white',
    '&:hover': {
        backgroundColor: '#292221',
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

const Header = (props) => {
  return (
    <Typography
      variant='h5'
      color='white'
      sx={{
          marginBottom: '60px',
          marginTop: '10px',
      }}
    >
      {props.text}
    </Typography>
  )
}


export {FormTextField, FormBox, FormButton, StyledAlert, ItemInfoButton, Header};