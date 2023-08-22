import { ReactNode, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { emailValidation, passwordValidation } from '../../common/form/validation-patterns';
import PasswordVisibility from '../../common/form/passwordVisibility';
import { ThemeContext } from '@emotion/react';
import { getInputLabelColor } from '../../theme/overrides';
import { baseUrl } from '../../services/urls';
import useFetch from '../../hooks/useFetch';
import { useUserContext } from '../../contexts/userContext';
import Loader from '../../common/loader';
import { Link, useNavigate } from 'react-router-dom';
import { UserToken } from '../../models/user';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { palette }: any = useContext(ThemeContext);
  const inputLabelColorOverride = getInputLabelColor(palette.mode);
  const { data, loading, error, fetchData } = {} as any;
  const { login } = useUserContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    fetchData(data);
  };

  useEffect(() => {
    if (data) {
      login(data);
      navigate('/dashboard');
    }
  }, [data]);

  return (
    <Loader isLoading={loading}>
      <Container maxWidth='xs' sx={{ marginTop: 8 }}>
        <Typography variant='h4' align='center' gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            InputLabelProps={inputLabelColorOverride}
            label='Email'
            variant='outlined'
            fullWidth
            margin='normal'
            {...register('email', emailValidation)}
            error={!!errors.email}
            helperText={errors?.email?.message as ReactNode}
          />
          <TextField
            InputLabelProps={inputLabelColorOverride}
            label='Password'
            type={showPassword ? 'text' : 'password'}
            variant='outlined'
            fullWidth
            margin='normal'
            {...register('password', passwordValidation)}
            error={!!errors.password}
            helperText={errors?.password?.message as ReactNode}
            InputProps={{
              endAdornment: <PasswordVisibility showPass={showPassword} onClick={setShowPassword} />,
            }}
          />
          {error && (
            <Typography color='error' mt={2} mb={2} textAlign='center'>
              {error.response.data}
            </Typography>
          )}
          <Button type='submit' variant='contained' color='primary' fullWidth sx={{ marginTop: 2 }}>
            Login
          </Button>
          <Box display='flex' justifyContent='center' mt={3}>
            <Link to='/'>Forgot password?</Link>
          </Box>
        </form>
      </Container>
    </Loader>
  );
};

export default LoginForm;
