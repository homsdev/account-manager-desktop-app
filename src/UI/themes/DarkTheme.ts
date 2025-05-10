import {createTheme} from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#B4D088',
        },
        background: {
            default: '#12140E',
        },
        secondary: {
            main: '#C0CAAC',
        },
        error: {
            main: '#FFB4AB',
        }
    }
});

export default darkTheme;