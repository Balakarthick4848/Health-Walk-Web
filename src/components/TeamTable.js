import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "@react-icons/all-files/fa/FaArrowLeft";
import {FaArrowRight} from "@react-icons/all-files/fa/FaArrowRight";
import API_BASE_URL from '../config';

export default function TeamTable() {
   const [currentPage, setCurrentPage] = useState(1);
   const rowsPerPage = 2; // Define number of rows per page
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  
  //pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = users.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(users.length / rowsPerPage);
  
   const handlePageChange = (page) => {
    setCurrentPage(page);
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
              console.log('API register response((((((((*****)))))))):', data);
              if (response.ok) {
                  // setEvents(data);
                  setUsers(Array.isArray(data.data) ? data.data : []);
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
    // <Card sx={{ borderRadius: 3 }}>
    //   <CardContent>
    //     <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
    //       <Typography variant="h6" sx={{ fontWeight: "bold" }}>Team members</Typography>
    //       <Chip label="100 users" size="small" color="primary" />
    //     </Box>
    //     <TableContainer>
    //       <Table>
    //         <TableHead>
    //           <TableRow>
    //             <TableCell>Name</TableCell>
    //             <TableCell>Gender</TableCell>
    //             <TableCell>Mobile Number</TableCell>
    //             <TableCell>Emergency Mobile Number</TableCell>
    //             <TableCell>Email address</TableCell>
    //             <TableCell>AADHAR NUMBER</TableCell>
    //             <TableCell>City</TableCell>
    //             <TableCell>Year</TableCell>
    //             <TableCell>Certificate</TableCell>
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>
    //           {rows.map((row, idx) => (
    //             <TableRow key={idx}>
    //               <TableCell>
    //                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    //                   <Avatar sx={{ width: 28, height: 28 }}>{row.name[0]}</Avatar>
    //                   <Box>
    //                     <Typography variant="body2">{row.name}</Typography>
    //                     <Typography variant="caption" color="text.secondary">{row.username}</Typography>
    //                   </Box>
    //                 </Box>
    //               </TableCell>
    //               <TableCell>{row.gender}</TableCell>
    //               <TableCell>{row.mobile}</TableCell>
    //               <TableCell>{row.emergency}</TableCell>
    //               <TableCell>{row.email}</TableCell>
    //               <TableCell>{row.aadhar}</TableCell>
    //               <TableCell>{row.city}</TableCell>
    //               <TableCell>
    //                 {row.year.map(y => (
    //                   <Chip key={y} label={y} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
    //                 ))}
    //               </TableCell>
    //               <TableCell>
    //                 <Chip label={row.certificate} color="primary" size="small" />
    //               </TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //   </CardContent>
    // </Card>

<div class="team-table-card">
  <div class="team-table-header">
    <span class="team-table-title">Register Members
    <span class="team-table-chip">100 users</span></span>
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
  );
}