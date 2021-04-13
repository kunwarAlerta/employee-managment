import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useDispatch ,useSelector} from 'react-redux';
import { getEmployees } from 'src/services/employeeService';
import { useEffect } from 'react';
import EmployeeListDashboard from '../customer/EmployeeListDashboard';

const EmployeeData = () => {

const dispatch =useDispatch();
const employeeData = useSelector((state) => state.employeeData);
const { loading, employees } = employeeData;

  useEffect(()=>{
    dispatch(getEmployees())
  },[]);


  return (
  <>
    <Helmet>
      <title>Employee | Manage Employees</title>
    </Helmet>
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <EmployeeListDashboard customers={employees} />
        </Box>
      </Container>
  </>
);
    }

export default EmployeeData;
