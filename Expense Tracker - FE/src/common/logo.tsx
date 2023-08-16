import { Typography } from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';

export const Logo = ({ isLargeScreen }: { isLargeScreen?: boolean }) => {
    const display = isLargeScreen ? { xs: 'none', md: 'flex' } : { xs: 'flex', md: 'none' };
    return (
        <>
            <SavingsIcon sx={{
                display, mr: 1, fontSize: {
                    md: 40,
                    sm: 30,
                    xs: 20
                }
            }} />
            <Typography
                variant="h6"
                noWrap
                sx={{
                    display,
                    mr: 2,
                    ml: 2,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    lineHeight: 1,
                    flexGrow: !isLargeScreen ? 1 : 0,
                    fontSize: {
                        sm: 20,
                        xs: 10
                    }
                }}
            >
                <span>
                    Expense
                    <br />
                    Tracker
                </span>
            </Typography>
        </>
    );
};
