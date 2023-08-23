import { useState } from 'react';
import { AxiosError } from 'axios';
import { User } from '../models/user';
import { HttpMethod } from '../values/enums/service';
import TransactionService from '../services/trasnaction.service';
import UserService from '../services/user.service';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: any;
  fetchData: (body: User) => void;
}

const useFetch = <T>(dependencyService: any, path?: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = (body: any) => {
    setLoading(true);
    setError(null);

    dependencyService({ path, body })
      .then((responseData: T) => {
        setData(responseData);
      })
      .catch((err: AxiosError) => {
        setError(err.message);
      }).finally(() => {
        setLoading(false)
      });
  };

  return { data, loading, error, fetchData };
};

export default useFetch;
