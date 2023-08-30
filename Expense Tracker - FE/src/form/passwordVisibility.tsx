import { VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";

function PasswordVisibility({ showPass, onClick }: { showPass: boolean, onClick: React.Dispatch<React.SetStateAction<boolean>> }) {

    const handlePasswordVisibilityToggle = () => {
        onClick((prevShowPassword: boolean) => !prevShowPassword);
    };

    return (
        <InputAdornment position="end">
            <IconButton color='primary' onClick={handlePasswordVisibilityToggle} edge="end">
                {showPass ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </InputAdornment>
    )
}

export default PasswordVisibility;