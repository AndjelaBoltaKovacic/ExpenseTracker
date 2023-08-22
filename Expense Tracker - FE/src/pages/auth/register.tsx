import { ReactNode, useContext, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { TextField, Button, Grid, Container, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { ThemeContext } from '@emotion/react';
import { getInputLabelColor } from '../../theme/overrides';
import { emailValidation, passwordValidation } from '../../common/form/validation-patterns';
import PasswordVisibility from '../../common/form/passwordVisibility';
import NoticeCard from '../../common/notice-card';
import Loader from '../../common/loader';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';

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

  const { data, loading, error, fetchData } = useFetch(UserService.register, 'POST');
  const password = watch('password', '');
  const navigate = useNavigate();
  const inputLabelColorOverride = getInputLabelColor(palette.mode);

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    const { premiumUser, passwordConfirmation, ...rest } = data;
    fetchData({ ...rest, role: premiumUser ? 'PREMIUM' : 'USER' } as User);
  };

  return (
    <Loader isLoading={loading}>
      {data ? (
        <NoticeCard
          title='Your account has been created successfuly'
          buttonText='Login'
          onButtonClick={() => navigate('/login')}
        />
      ) : (
        <Container component='main' maxWidth='xs' sx={{ marginTop: 8, marginBottom: 2 }}>
          <Typography variant='h4' align='center' gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={inputLabelColorOverride}
                  fullWidth
                  label='First Name'
                  {...register('firstname', { required: 'First Name is required' })}
                  error={!!errors.firstname}
                  helperText={errors.firstname?.message as ReactNode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={inputLabelColorOverride}
                  fullWidth
                  label='Last Name'
                  {...register('lastname', { required: 'Last Name is required' })}
                  error={!!errors.lastname}
                  helperText={errors.lastname?.message as ReactNode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={inputLabelColorOverride}
                  fullWidth
                  label='Email'
                  type='email'
                  {...register('email', emailValidation)}
                  error={!!errors.email}
                  helperText={errors?.email?.message as ReactNode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={inputLabelColorOverride}
                  fullWidth
                  label='Password'
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
                  label='Confirm Password'
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('passwordConfirmation', {
                    required: 'Confirm Password is required',
                    validate: (value) =>
                      !value ? 'Confirm Password is required' : value === password || 'Passwords do not match',
                  })}
                  error={!!errors.passwordConfirmation}
                  helperText={errors?.passwordConfirmation?.message as ReactNode}
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
                  label='Sign Up As A Premium User'
                />
              </Grid>
            </Grid>
            {error && (
              <Typography color='error' mt={2} mb={2} textAlign='center'>
                {error}
              </Typography>
            )}
            <Button sx={{ marginTop: 2 }} type='submit' fullWidth variant='contained' color='primary'>
              Register
            </Button>
          </form>
        </Container>
      )}
    </Loader>
  );
}

export default RegistrationForm;
