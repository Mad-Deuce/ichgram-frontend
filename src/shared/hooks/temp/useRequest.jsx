import { useState } from "react";

const useRequest = (initialState = null) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const sendRequest = async (request) => {
    setLoading(true);
    setError(null);
    const { data, error } = await request();
    setLoading(false);
    if (error) {
      return setError(error.response?.data?.message || error.message);
    }
    setMessage(data.message);
    return data;
  };

  return { state, setState, loading, setLoading, error, setError, message, setMessage, sendRequest};
};

export default useRequest;
