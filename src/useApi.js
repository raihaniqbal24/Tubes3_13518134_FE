import { useEffect, useState } from 'react';

const useApi = (func) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const request = async (...args) => {
    try {
      setLoading(true);
      setData(null);
      setError('');
      let token = null;
      await func(...args, { token }).then(res => {
        setLoading(false);
        setData(res.data);
        setError('');
      });
    } catch (err) {
      let message = err.message;
      if (err.response) {
        if (err.response.data) {
          message = err.response.data;
        } else {
          if (
            err.response._response &&
            err.response._response.startsWith('Failed to connect')
          ) {
            message =
              'Oops! Server sedang tidak bisa dihubungi. Coba beberapa saat lagi.';
          } else {
            message = 'Oops! Permintaan belum bisa diproses...';
          }
        }
      }
      if (message.startsWith('timeout')) {
        message =
          'Oops! Server sedang tidak bisa dihubungi. Coba beberapa saat lagi.';
      }
      setData(null);
      setLoading(false);
      setError(message);
    }
  };

  return {
    loading,
    data,
    error,
    request,
  };
};

export default useApi;
