import { ReactNode, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Container, Typography, IconButton, InputAdornment, InputLabel } from '@mui/material';
import { ThemeContext } from '@emotion/react';
import { getInputLabelColor } from '../../theme/overrides';
import { emailValidation, passwordValidation } from './form/validation-patterns';
import PasswordVisibility from './form/passwordVisibility';

function RegistrationForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { palette }: any = useContext(ThemeContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const password = watch('password', '');
    const inputLabelColorOverride = getInputLabelColor(palette.mode);
    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: 8, marginBottom: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Register
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            InputLabelProps={inputLabelColorOverride}
                            fullWidth
                            label="First Name"
                            {...register('firstName', { required: 'First Name is required' })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message as ReactNode}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            InputLabelProps={inputLabelColorOverride}
                            fullWidth
                            label="Last Name"
                            {...register('lastName', { required: 'Last Name is required' })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message as ReactNode}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            InputLabelProps={inputLabelColorOverride}
                            fullWidth
                            label="Email"
                            type="email"
                            {...register('email', emailValidation)}
                            error={!!errors.email}
                            helperText={errors?.email?.message as ReactNode}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            InputLabelProps={inputLabelColorOverride}
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', passwordValidation)}
                            error={!!errors.password}
                            helperText={errors.password?.message as ReactNode}
                            InputProps={{
                                endAdornment: <PasswordVisibility showPass={showPassword} onClick={setShowPassword} />,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            InputLabelProps={inputLabelColorOverride}
                            fullWidth
                            label="Confirm Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            {...register('confirmPassword', {
                                required: 'Confirm Password is required',
                                validate: (value) => value === password || 'Passwords do not match',
                            })}
                            error={!!errors.confirmPassword}
                            helperText={errors?.confirmPassword?.message as ReactNode}
                            InputProps={{
                                endAdornment: (
                                    <PasswordVisibility showPass={showConfirmPassword} onClick={setShowConfirmPassword} />
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
                <Button sx={{ marginTop: 2 }} type="submit" fullWidth variant="contained" color="primary">
                    Register
                </Button>
            </form>
        </Container>
    );
}

export default RegistrationForm;
