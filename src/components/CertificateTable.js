import React, { useState, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import API_BASE_URL from '../config';

import { FaArrowLeft } from "@react-icons/all-files/fa/FaArrowLeft";
import {FaArrowRight} from "@react-icons/all-files/fa/FaArrowRight";
import DashboardHeader from '../components/DashboardHeader';
import '../styles/Sidebar.css';
import '../styles/DashboardHeader.css';
import '../styles/Schedule.css';

const rows = [
  {
    name: "Olivia Rhye",
    username: "@olivia",
    gender: "Male",
    mobile: "+91 98657 43251",
    emergency: "+91 98657 43251",
    email: "olivia@untitledui.com",
    city: "Madurai",
    year: ["2021", "2022", "2023"],
    certificate: "Certificate"
  },
  {
    name: "Phoenix Baker",
    username: "@phoenix",
    gender: "Male",
    mobile: "+91 98657 43251",
    emergency: "+91 98657 43251",
    email: "phoenix@untitledui.com",
    city: "Coimbatore",
    year: ["2021", "2022", "2023"],
    certificate: "Certificate"
  },
  {
    name: "Lita",
    username: "@Lita",
    gender: "Felame",
    mobile: "+91 98765 43210",
    emergency: "+91 98765 433210",
    email: "Lita@untitledui.com",
    city: "Coimbatore",
    year: ["2021", "2022", "2023"],
    certificate: "Certificate"
  },
  {
    name: "John Baker",
    username: "@john",
    gender: "Male",
    mobile: "+91 98657 12345",
    emergency: "+91 98657 12345",
    email: "john@untitledui.com",
    city: "Coimbatore",
    year: ["2021", "2022", "2023"],
    certificate: "Certificate"
  },
    {
    name: "Rosy Smith",
    username: "@Rosy",
    gender: "Felame",
    mobile: "+91 98799 43288",
    emergency: "+91 98799 43288",
    email: "Rosy@untitledui.com",
    city: "Coimbatore",
    year: ["2021", "2022", "2023"],
    certificate: "Certificate"
  }
];

export default function CertificateTable() {
      const [currentPage, setCurrentPage] = useState(1);
        const rowsPerPage = 10;
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState('');
        const [certificates, setCertificates] = useState([]);
      
        const indexOfLastRow = currentPage * rowsPerPage;
        const indexOfFirstRow = indexOfLastRow - rowsPerPage;
        const currentRows = certificates.slice(indexOfFirstRow, indexOfLastRow);
        const totalPages = Math.ceil(certificates.length / rowsPerPage);
      

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
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}


  const getCertificates = async () => {
    setLoading(true);
    setError('');
    try {
      let url = `${API_BASE_URL}/api/certificates`;
      console.log('Fetching:', url);
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
          console.log('Response status:', response.status);
      const data = await response.json();
          console.log('certificate response:', data);
      if (response.ok) {
        setCertificates(Array.isArray(data) ? data : []);
      } else {
        setError(data.message || 'Failed to fetch certificates');
      }
    } catch (err) {
      setError('Network erroaa');
    }
    setLoading(false);
  };


  useEffect(() => {
    getCertificates();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen p-6">
        <DashboardHeader />

            <div className="team-table-card">
              <div className="team-table-header">
                <span className="team-table-title">
                  Register members
                  <span className="team-table-chip">{certificates.length} users</span>
                </span>
              </div>
              <table className="team-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Mobile Number</th>
                    <th>Emergency Mobile Number</th>
                    <th>Email address</th>
                    {/* <th>City</th>
                    <th>Year</th>
                    <th>Certificate</th> */}
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="table-avatar">
                          <span className="avatar">{row.userEmail[0]}</span>
                          <div>
                            <div>{row.userEmail}</div>
                            <div className="username">{row.userEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td>{row.userEmail}</td>
                      <td>{row.eventName}</td>
                      <td>{row.startLocation}</td>
                      <td>{row.endLocation}</td>
                      <td>{row.endLocation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
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
}
