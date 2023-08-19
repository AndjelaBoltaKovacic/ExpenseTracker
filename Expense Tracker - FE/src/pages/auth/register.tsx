import { ReactNode, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Container, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { ThemeContext } from '@emotion/react';
import { getInputLabelColor } from '../../theme/overrides';
import { emailValidation, passwordValidation } from './form/validation-patterns';
import PasswordVisibility from './form/passwordVisibility';
import { baseUrl } from '../../services/urls';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import NoticeCard from '../../common/notice-card';
import Loader from '../../common/loader';

function RegistrationForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const { palette }: any = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { data, loading, error, fetchData } = useFetch(`${baseUrl}/users`, 'POST');
  const password = watch('password', '');
  const navigate = useNavigate();
  const inputLabelColorOverride = getInputLabelColor(palette.mode);

  const onSubmit = (data: any) => {
    fetchData(data);
  };

  return (
    <Loader isLoading={loading}>
      {data ? (
        <NoticeCard
          title="Your account has been created successfuly"
          buttonText="Login"
          onButtonClick={() => navigate('/login')}
        />
      ) : (
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
                  {...register('passwordConfirmation', {
                    validate: (value) =>
                      !value ? 'Confirm Password is required' : value === password || 'Passwords do not match',
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
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <FormControlLabel
                  control={<Checkbox {...register('premiumUser')} />}
                  label="Sign Up As A Premium User"
                />
              </Grid>
            </Grid>
            {error && (
              <Typography color="error" mt={2} mb={2} textAlign="center">
                {error.response.data}
              </Typography>
            )}
            <Button sx={{ marginTop: 2 }} type="submit" fullWidth variant="contained" color="primary">
              Register
            </Button>
          </form>
        </Container>
      )}
    </Loader>
  );
}

export default RegistrationForm;
