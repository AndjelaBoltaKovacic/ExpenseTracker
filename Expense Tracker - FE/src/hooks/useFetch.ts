import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: unknown | null;
    fetchData: any;
}

const useFetch = <T>(url: string, method: HttpMethod): FetchState<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown | null>(null);
    const fetchData = async (body?: any) => {
        try {
            setLoading(true);
            setError(null);

            const response: AxiosResponse<T> = await axios({
                method,
                url,
                data: body,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setData(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    return { data, loading, error, fetchData };
};

export default useFetch;
