import { Box, Typography } from '@mui/material';
import { useUserContext } from '../../contexts/user.context';
import NoticeCard from './notice-card';
import { _void } from '../../models/common';
import { TransactionType } from '../../values/enums/transactions';
import ActionButtons from '../../pages/content/dashboard/action-buttons';
import { useState } from 'react';


enum GetStartedSteps {
    Start,
    Select,
}
function GetStartedCard({
    type,
    handleManageCategories,
    handleAddTransactions,
}: {
    type?: TransactionType;
    handleAddTransactions: _void;
    handleManageCategories?: _void;
}) {
    const [step, setStep] = useState(GetStartedSteps.Start);
    const { user } = useUserContext();
    const isWelcomeCard = handleManageCategories || null;

    const handleClick = () => {
        if (isWelcomeCard) {
            setStep(GetStartedSteps.Select)
        } else {
            handleAddTransactions()
        }
    }

    return (
        <>
            {
                {
                    [GetStartedSteps.Start]: (
                        <NoticeCard
                            title={`${isWelcomeCard ? 'Welcome' : 'Hi'}, ${user?.firstname}!`}
                            text={`It seems like you don't have any ${type?.toLowerCase() + 's' || 'transactions'} yet.`}
                            buttonText={isWelcomeCard ? 'Get Started' : 'Add Transaction'}
                            onButtonClick={() => handleClick()}
                        />
                    ),
                    [GetStartedSteps.Select]: (
                        <>

                            <Box
                                border={1}
                                borderColor="primary.main"
                                borderRadius="7px"
                                boxShadow={2}
                                p={3}
                                margin="auto"
                                marginTop="10vw"
                                textAlign="center"
                                sx={{ width: { xs: '85%', md: '60%' } }}
                            >
                                <Typography variant="h4" component="div" mb={2}>
                                    What would you like to do?
                                </Typography>
                                <Box display='flex' width='100%'>
                                    <ActionButtons onAdd={handleAddTransactions} onManage={handleManageCategories as _void} />
                                </Box>


                            </Box>

                        </>
                    ),
                }[step]
            }
        </>
    );
}

export default GetStartedCard;
