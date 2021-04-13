import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import Budget from 'src/components/dashboard//Budget';
import { useDispatch ,useSelector} from 'react-redux';
import { useEffect } from 'react';
import LatestOrders from 'src/components/dashboard//LatestOrders';
import LatestProducts from 'src/components/dashboard//LatestProducts';
import Sales from 'src/components/dashboard//Sales';
import TasksProgress from 'src/components/dashboard//TasksProgress';
import TotalCustomers from 'src/components/dashboard//TotalCustomers';
import TrafficByDevice from 'src/components/dashboard//TrafficByDevice';
import { getDashboardData } from 'src/services/dashboardService';

const Dashboard = () => {
  const dispatch =useDispatch();
const dashboardData = useSelector((state) => state.dashboardData);
const { loading, dashboard } = dashboardData;

  useEffect(()=>{
    dispatch(getDashboardData())
  },[]);

  console.log(dashboard.employeeCount)
  return(
  <>
    <Helmet>
      <title>Dashboard | Employee </title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            sm={6}
            xl={4}
            xs={12}
          >
            <Budget {...dashboard} />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xl={4}
            xs={12}
          >
            <TotalCustomers  {...dashboard} />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xl={4}
            xs={12}
          >
            <TasksProgress {...dashboard} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={12}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={4}
            xs={12}
          >
            <TrafficByDevice {...dashboard} sx={{ height: '100%' }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);
    }

export default Dashboard;
