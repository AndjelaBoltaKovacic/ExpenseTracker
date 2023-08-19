import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: any;
  fetchData: (body: any) => void;
}

const useFetch = <T>(url: string, method: HttpMethod): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const fetchData = async (body?: any) => {
    try {
      setLoading(true);
      setError(null);
      const response: AxiosResponse<T> = await axios({
        method,
        url,
        data: body,
      });

      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.log(error);
      setError(err);
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useFetch;
