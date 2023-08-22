import { useState } from 'react';
import { HttpMethod, VoidFn } from '../models/common';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: any;
  fetchData: VoidFn;
}

const useFetch = <T>(dependencyService?: any, method?: HttpMethod, path?: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fetchData = (body: any, path?: string) => {
    setLoading(true);
    setError(null);

    dependencyService(method, body, path)
      .then((responseData: T) => {
        setData(responseData);
      })
      .catch((err: any) => {
        console.log(err);
        setError(err);
      }).finally(() => {
        setLoading(false)
      });
  };

  return { data, loading, error, fetchData };
};

export default useFetch;
