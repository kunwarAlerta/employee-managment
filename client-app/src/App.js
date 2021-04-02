import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import { Provider } from "react-redux";
import { SnackbarProvider } from 'notistack';
import theme from 'src/theme';

import routes from 'src/routes';
import store from './store/store';
import AxiosConfig from "./utils/responseHandling/AxiosConfig";
AxiosConfig();

const App = () => {
  const routing = useRoutes(routes);
  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={3}>
      <GlobalStyles />
      {routing}
      </SnackbarProvider>
    </ThemeProvider>
    </Provider>
  );
};

export default App;
