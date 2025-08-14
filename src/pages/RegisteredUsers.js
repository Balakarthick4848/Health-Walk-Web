import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import TeamTable from '../components/TeamTable';
import '../styles/Sidebar.css';
import '../styles/DashboardHeader.css';
import '../styles/TeamTable.css';

const RegisterUsers = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen p-6">
        <DashboardHeader />
        <TeamTable /> 
      </div>
    </div>
  );
};

export default RegisterUsers;