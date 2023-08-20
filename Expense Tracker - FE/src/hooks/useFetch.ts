import { useState } from 'react';
import apiService from '../services/api-service';
import { HttpMethod, VoidFn } from '../models/common';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: any;
  fetchData: VoidFn;
}

const useFetch = <T>(url: string, method: HttpMethod): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fetchData = async (body?: any) => {
    try {
      setLoading(true);
      setError(null);

      const responseData: T = await apiService(url, method, body);

      setData(responseData);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useFetch;
