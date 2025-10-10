import { useState, useEffect } from "react";

const useFetch = (request, initialState = null) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (request) => {
      setLoading(true);
      setError(null);
      const { data, error } = await request();
      setLoading(false);
      if (error)
        return setError(error.response?.data?.message || error.message);
      setState(data);
    };
    fetchData(request);
  }, [request]);

  return { state, setState, loading, setLoading, error, setError };
};

export default useFetch;
