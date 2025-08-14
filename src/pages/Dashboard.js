import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import StatsCards from '../components/StatsCards';
import Charts from '../components/Charts';
import TeamTable from '../components/TeamTable';
import { FaArrowLeft } from '@react-icons/all-files/fa/FaArrowLeft';
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight';
import API_BASE_URL from '../config';
import '../styles/Sidebar.css';
import '../styles/DashboardHeader.css';
import '../styles/StatsCards.css';
import '../styles/Charts.css';  
import '../styles/TeamTable.css';



const Dashboard = () => {
   
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); 
  const rowsPerPage = 5; // Define number of rows per page
  
   // Pagination + Search logic
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.mobile?.toString().includes(searchTerm)
  );

      // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

        function getPagination(current, total) {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= total; i++) {
            if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    }

      const getUsers = async () => {
          setLoading(true);
          setError('');
          try {
              let url = `${API_BASE_URL}/userregistrationcontroller/all`;
              const response = await fetch(url, {
                  method: 'GET',
                  headers: { 'Content-Type': 'application/json' }
              }); 
              const data = await response.json();
              console.log('Register userdata""""', data);
              if (response.ok) {
                  // setEvents(data);
                  setUsers(Array.isArray(data) ? data : []);
              } else {
                  setError(data.message);
              }
          } catch (err) {
              setError('Network error');
          }
          setLoading(false);
      };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="flex">
      {/* <Sidebar selected={selectedTitle} onSelect={setSelectedTitle} /> */}
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen p-6">
        <DashboardHeader />
         <StatsCards />
        <Charts />
        {/* <TeamTable />  */}
        <div class="team-table-card">
          <div class="team-table-header">
            <span class="team-table-title">Register Members
            <span class="team-table-chip">100 users</span></span>
             <input
              type="text"
              placeholder="Search by Name or Mobile..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              style={{
                padding: "6px 10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                marginLeft: "auto"
              }}
            />
          </div>
          <table class="team-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Mobile Number</th>
                <th>Emergency Mobile Number</th>
                <th>Email address</th>
                <th>City</th>
                <th>DOB</th> 
                <th>Certificate</th> 
              </tr>
            </thead>
                    <tbody>
                      {currentRows.map((row, idx) => (
                        <tr key={idx}>
                          <td>
                            <div className="table-avatar">
                             <span className="avatar">{row.name ? row.name[0] : ''}</span>
                              <div>
                                <div>{row.name}</div>
                                 {/* <div className="username">{row.username}</div> */}
                              </div>
                            </div>
                          </td>
                          <td>{row.gender}</td>
                          <td>{row.mobile}</td>
                          <td>{row.emergencyContact}</td>
                          <td>{row.email}</td>
                          <td>{row.address?.city || ''}</td>
                          <td>{row.dob || '-'}</td>
                          <td>{row.certificate || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn">
            <FaArrowLeft style={{verticalalign: 'middle'}} />
           Previous
            </button>
          
            {getPagination(currentPage, totalPages).map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && handlePageChange(page)}
                className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                disabled={page === "..."}
              >
                {page}
              </button>
            ))}
          
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next <FaArrowRight style={{verticalalign: 'middle', bottom: '10px'}} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;