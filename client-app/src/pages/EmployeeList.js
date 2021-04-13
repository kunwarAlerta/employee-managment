import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import { useDispatch ,useSelector} from 'react-redux';
import { getEmployees } from 'src/services/employeeService';
import { useEffect } from 'react';

const EmployeeList = () => {

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
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ pt: 3 }}>
          <CustomerListResults customers={employees} />
        </Box>
      </Container>
    </Box>
  </>
);
    }

export default EmployeeList;
