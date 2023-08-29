import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Notice from './form/steps/notice';
import CustomModal from './modal/custom-modal';
import { Outcome } from '../values/enums/form-steps';
import ReportService from '../services/report.service';
import { useUserContext } from '../contexts/userContext';
import useFetch from '../hooks/useFetch';

function ReportGenerator({ isExpense }: any) {
  const [logoutModal, setOpenLogoutModal] = useState(false);
  const handleCloseLogout = () => {
    setOpenLogoutModal(false);
  };

  const { user } = useUserContext();

  const { data, error, loading, fetchData } = useFetch(
    ReportService.sendReport,
    `transactionType=${isExpense ? 'EXPENSE' : 'INCOME'}&reportStrategy=PDFReportStrategy&email=${user?.email}`
  );

  useEffect(() => {
    data && setOpenLogoutModal(true);
  }, [data]);
  return (
    <>
      <Box width='100%' display='flex' justifyContent='end' mt={3}>
        <Button variant='contained' color='primary' onClick={() => fetchData()}>
          Get Report
        </Button>
      </Box>
      <CustomModal
        isOpen={logoutModal}
        title={'Your report has been generated successfully'}
        handleClose={handleCloseLogout}
      >
        <Notice handleClose={handleCloseLogout} btnText='Close' outcome={Outcome.Success} />
      </CustomModal>
    </>
  );
}

export default ReportGenerator;
