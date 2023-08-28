import { useState } from 'react';
import { ManageGroupsSteps } from '../../../values/enums/form-steps';
import Manage from './steps/manage';
import { _void } from '../../../models/common';
import { Box } from '@mui/material';

function ManageGroups(handleClose: { handleClose: _void }) {
  const [step, setStep] = useState(ManageGroupsSteps.Manage);
  return (
    <Box minHeight={'450px'}>
      {
        {
          [ManageGroupsSteps.Manage]: <Manage />,
          [ManageGroupsSteps.Confirm]: <div></div>,
          [ManageGroupsSteps.Success]: <div></div>,
          [ManageGroupsSteps.Fail]: <div></div>,
        }[step]
      }
    </Box>
  );
}

export default ManageGroups;
