import { ThemeOptions } from "@mui/material/styles";
import { createTheme } from "@mui/material";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#E50051',
    },
    secondary: {
      main: '#009FE3',
      contrastText: '#fff',
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
      
      @media print {
       
        #app > div, #app > header, #app > button {
          display: none;
        }
        #app main {
          display: block;
          position: static;
          margin: 0;

        }
        #app main > div{
          position: static !important;
        }
      }
      `,
    },
  },
};

export const theme = createTheme(themeOptions);
/*
@page {
  size: 210mm 297mm;
}
#app {
  width: 210mm;
  height: 297mm;
}

width: 210mm;
          height: 297mm;
*/