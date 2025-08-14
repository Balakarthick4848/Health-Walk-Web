import React, { useState, useEffect, useRef } from 'react';
import API_BASE_URL from '../config';

export default function StatsCards() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [registerscount, setRegisterscount] = useState(0);
  const [notParticipantsCount, setNotParticipantsCount] = useState(0);
  
        const getRegisterCount = async () => {
          setLoading(true);
          setError('');
          try {
              let url = `${API_BASE_URL}/userregistrationcontroller/count`;
              const response = await fetch(url, {
                  method: 'GET',
                  headers: { 'Content-Type': 'application/json' }
              }); 
              const data = await response.json();
              console.log('Register count""""', data);
           if (response.ok) {
        setRegisterscount(data.user_count || 0); // store number
      } else {
        setError(data.message || 'Failed to fetch count');
      }
          } catch (err) {
              setError('Network error');
          }
          setLoading(false);
      };
        const getNotParticipantsCount = async () => {
          setLoading(true);
          setError('');
          try {
              let url = `${API_BASE_URL}/events/non-participants`;
              console.log('Fetching:????????', url);
              const response = await fetch(url, {
                  method: 'GET',
                  headers: { 'Content-Type': 'application/json' }
              }); 
              const data = await response.json();
              console.log('non-participants userdata""""', data);
           if (response.ok) {
        setNotParticipantsCount(data.message || 0); // store number
      } else {
        setError(data.message || 'Failed to fetch count');
      }
          } catch (err) {
              setError('Network error');
          }
          setLoading(false);
      };

      useState(() => {
        getRegisterCount();
        getNotParticipantsCount();
      }, []);

  return (
   
<div class="stats-cards">
  <div class="stat-card">
    <div>
      <div class="stat-value">Total Registers</div>
      <div class="stat-label"> {loading ? '...' : registerscount}</div>
      <div class="stat-change green">+8.5% Up from yesterday</div>
    </div>
    <div class="stat-icon" >📦</div>
  </div>
  
  <div class="stat-card">
    <div>
      <div class="stat-value">Not Participate List</div>
      <div class="stat-label">{loading ? '...' : notParticipantsCount}</div>
      <div class="stat-change green">+8.5% Up from yesterday</div>
    </div>
        <div class="stat-icon" style={{background: '#fef9c3'}}>📦</div>
  </div>

</div>
  );
}