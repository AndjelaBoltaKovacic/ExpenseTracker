import { useState } from 'react';
import { User } from '../models/user';

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: any;
  fetchData: (body?: User) => void;
};

const useFetch = <T>(dependencyService: any, path?: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = (body?: any) => {
    setLoading(true);
    setError(null);

    dependencyService({ path, body })
      .then((responseData: T) => {
        console.log(responseData);
        setData(responseData);
      })
      .catch((err: string) => {
        console.log(error);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { data, loading, error, fetchData };
};

export default useFetch;
