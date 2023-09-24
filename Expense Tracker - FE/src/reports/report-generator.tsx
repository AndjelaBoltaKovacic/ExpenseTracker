import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Notice from '../form/steps/notice';
import CustomModal from '../common/modal/custom-modal';
import { Outcome } from '../values/enums/form-steps';
import ReportService from '../services/report.service';
import { useUserContext } from '../contexts/user.context';
import useFetch from '../hooks/useFetch';
import ReportOptionSelect from './report-option-select';
import ConfirmReport from './confirm-report';
import Loader from '../common/loader';
import { TransactionType } from '../values/enums/transactions';

export enum ReportSteps {
  Select,
  Confirm,
  Success,
  Fail,
}

export enum ReportStrategy {
  PDF = 'PDFReportStrategy',
  Email = 'emailReportStrategy',
}
function ReportGenerator({ type }: { type: TransactionType }) {
  const [modal, setOpenModal] = useState<boolean>(false);
  const [strategy, setStrategy] = useState<ReportStrategy>(ReportStrategy.PDF);
  const [step, setStep] = useState<ReportSteps>(ReportSteps.Select);
  const { user } = useUserContext();
  const { data, error, loading, fetchData } = useFetch(
    ReportService.sendReport,
    `transactionType=${type.toUpperCase()}&reportStrategy=${strategy}&email=${user?.email}`
  );

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleChoice = (choice: ReportStrategy) => {
    setStrategy(choice);
    setStep(ReportSteps.Confirm);
  };

  useEffect(() => {
    data !== null && setStep(ReportSteps.Success);
    error !== null && setStep(ReportSteps.Fail);
  }, [data, error]);

  return (
    <>
      <Box width='100%' display='flex' justifyContent='end' mt={3}>
        <Button variant='contained' color='primary' onClick={handleOpenModal}>
          Get Report
        </Button>
      </Box>
      <CustomModal isOpen={modal} handleClose={handleCloseModal}>
        <Loader isLoading={loading}>
          {
            {
              [ReportSteps.Select]: <ReportOptionSelect handleChoice={handleChoice} />,
              [ReportSteps.Confirm]: (
                <ConfirmReport
                  text={`You are about to send  ${type.toLowerCase()} ${
                    strategy === ReportStrategy.PDF ? 'PDF' : ''
                  } report to your email: ${user?.email}`}
                  onConfirm={fetchData}
                  onClose={handleCloseModal}
                />
              ),
              [ReportSteps.Success]: (
                <Notice
                  text='Your report has been generated successfully'
                  details='Please check your email.'
                  handleClose={handleCloseModal}
                  btnText='Close'
                  outcome={Outcome.Success}
                />
              ),
              [ReportSteps.Fail]: (
                <Notice
                  outcome={Outcome.Fail}
                  text='Oops! Something went wrong. Please try again later'
                  handleClose={handleCloseModal}
                />
              ),
            }[step]
          }
        </Loader>
      </CustomModal>
    </>
  );
}

export default ReportGenerator;
