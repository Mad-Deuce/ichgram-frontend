import { useState } from "react";

const useFetch = (initialState = null) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (request) => {
    setLoading(true);
    setError(null);
    const { data, error } = await request();
    setLoading(false);
    if (error) {
      return setError(error.response?.data?.message || error.message);
    }
    setState(data);
  };

  return { state, setState, loading, setLoading, error, setError, fetchData };
};

export default useFetch;
