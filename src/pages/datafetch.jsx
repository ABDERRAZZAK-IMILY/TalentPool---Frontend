import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FetchDataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      setError(new Error('Token not found!'));
      setLoading(false);
      return;
    }

    axios.get('http://localhost/api/admin/users', {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })
      .then(response => {
        setData(response.data);

        console.log(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Fetched Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>

    </div>
  );
};
