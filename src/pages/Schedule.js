import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import API_BASE_URL from '../config';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from '@react-icons/all-files/fa/FaArrowLeft';
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight';
import DashboardHeader from '../components/DashboardHeader';
import '../styles/Sidebar.css';
import '../styles/DashboardHeader.css';
import '../styles/Schedule.css';

export default function Schedule() {
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10; // Define number of rows per page
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [poster, setPoster] = useState('');
    const [date, setDate] = useState('');
    const [dateISO, setDateISO] = useState('');
    const [startLocation, setStartLocation] = useState('');
    const [via, setVia] = useState('');
    const [endLocation, setEndLocation] = useState('');
    const [distance, setDistance] = useState('');
    const [organizedBy, setOrganizedBy] = useState('');
    const [eventHostNumber, setEventHostNumber] = useState('');
    const [eventHostEmail, setEventHostEmail] = useState('');
    const [events, setEvents] = useState([]);
    const [base64Image, setBase64Image] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [viaLocations, setViaLocations] = useState(['']); // start with one empty field

    const navigate = useNavigate();

    // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = events.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(events.length / rowsPerPage);

    const handleViaChange = (index, value) => {
    const newVias = [...viaLocations];
    newVias[index] = value;
    setViaLocations(newVias);
};

const addVia = () => {
    setViaLocations([...viaLocations, '']);
};

const removeVia = (index) => {
    const newVias = viaLocations.filter((_, i) => i !== index);
    setViaLocations(newVias);
};

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    //     const handleImageUpload = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //       // Create a URL for the image preview
    //       setImageUrl(URL.createObjectURL(file));

    //       // Use FileReader to read the file as a data URL (Base64)
    //       const reader = new FileReader();
    //       reader.onloadend = () => {
    //         // The result is the Base64 string
    //         setBase64Image(reader.result);
    //       };
    //       reader.onerror = (error) => {
    //         console.error('FileReader error: ', error);
    //         alert('An error occurred while reading the file.');
    //       };
    //       reader.readAsDataURL(file);
    //     }
    //   };
const fileInputRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPoster(file.name);
            setImageUrl(URL.createObjectURL(file));
            const reader = new FileReader();
            reader.onloadend = () => {
                // Remove the "data:image/xxx;base64," prefix for API if needed
                const base64String = reader.result.split(',')[1];
                setBase64Image(base64String);
            };
            // reader.onerror = (error) => {
            //     console.error('FileReader error: ', error);
            //     alert('An error occurred while reading the file.');
            // };
            reader.readAsDataURL(file);
        }
        if (fileInputRef.current) {
        fileInputRef.current.value = "";
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

    const eventSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            let eventreqdata = {
                eventName: title,
                eventDistance: distance,
                eventDate: dateISO, // Make sure this is in ISO format (e.g. "2025-12-25T09:00:00Z")
                eventThumb: base64Image || '',
                eventBanner: base64Image || '',
                eventBy: organizedBy,
                email: eventHostEmail,
                phone: eventHostNumber,
                startLocation,
                // via_location: via,
                via_location: viaLocations,
                endLocation,
                status: 'active'
            };
            let url = `${API_BASE_URL}/events/publish`;
            console.log('Event Request Data:???????', eventreqdata);
            // url = 'https://mocki.io/v1/a5a086db-eb2d-40e6-98af-1181da3215af'
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({ title, poster, date, startLocation, via, endLocation, distance, organizedBy, eventHostNumber, eventHostEmail, status: 'Published' }),
                body: JSON.stringify(eventreqdata)
            });
            //   body: JSON.stringify({ "eventID": "vet12",
            // "eventName": "Chennai Annual Marathon 2025",
            // "eventDistance": "42.195 KM",
            // "eventDate": "2025-10-28T06:00:00+05:30",
            // "eventThumb": "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
            // "eventBanner": "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADzCg7NAAAAKUlEQVQI12NkYGBoYGxgyoAJggnEGLgQwg+GB4eDAh/GBYkBMoYAM0kF51I9LAAAAABJRU5ErkJggg==",
            // "eventBy": "Sparks Sports Club",
            // "email": "info@chennaimarathon.org",
            // "phone": "+919876543222",
            // "startLocation": "Marina Beach",
            // "via_location": "OMR Main Road",
            // "endLocation": "Guindy Race Course",
            // "status": "active" }),
            // });
            const data = await response.json();
            if (response.ok) {
                alert('Event create successful!');
                // navigate('/dashboard');
                setShowModal(false);
                getEvents(); // Refresh the events list
            } else {
                setError(data.message || 'Event creation failed');
            }
        } catch (err) {
            setError('Network error');
        }
        setLoading(false);
    };

    const getEvents = async () => {
        setLoading(true);
        setError('');
        try {
            let url = `${API_BASE_URL}/events/getall`;
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            console.log('API response||||||||:', data);
            if (response.ok) {
                // setEvents(data);
                setEvents(Array.isArray(data.data) ? data.data : []);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Network error');
        }
        setLoading(false);
    };

    const setFormDate = (value) => {
        const dateObject = new Date(value);
        const isoString = dateObject.toISOString().slice(0, -5) + 'Z'; // Convert to ISO string format
        console.log('ISO String:', isoString, 'Local Date String:', value);
        setDateISO(isoString);
        setDate(value); // Store the local date string for display
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-gray-50 min-h-screen p-6">
                <DashboardHeader />
                <div>
                    <button
                        style={{ margin: '20px', width: '200px', height: '50px', display: 'inherit', marginLeft: 'auto' }}
                        type="submit"
                        id="createScheduleBtn"
                        onClick={() => setShowModal(true)}
                    >
                        Create Schedule
                    </button>

                    {showModal && (
                        <div className="modal" onClick={() => setShowModal(false)}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <span className="close" onClick={() => setShowModal(false)}>
                                    &times;
                                </span>
                                <h2>Create New Schedule</h2>
                                <form id="scheduleForm" onSubmit={eventSubmit}>
                                    <label htmlFor="title">Title:</label>
                                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="title" required />

                                    <label htmlFor="uploadPoster">Upload Poster:</label>
                                    <input
                                        type="file"
                                        // value={poster}
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        // onChange={(e) => { setPoster(e.target.value); handleImageUpload(e); }}
                                        id="uploadPoster"
                                        accept="image/*"
                                    />
                                    {imageUrl && <img src={imageUrl} alt="Preview" style={{ width: 80, margin: '10px 0' }} />}
                                    <label htmlFor="date">Date:</label>
                                    <input type="datetime-local" value={date} onChange={(e) => setFormDate(e.target.value)} id="date" />

                                    {/* <label htmlFor="time">Time:</label>
              <input type="time" id="time" required /> */}

                                    <label htmlFor="startLocation">Start Location:</label>
                                    <input
                                        type="text"
                                        value={startLocation}
                                        onChange={(e) => setStartLocation(e.target.value)}
                                        id="startLocation"
                                        required
                                    />

                                    <label htmlFor="via">Via:</label>
                                    {viaLocations.map((viaLoc, index) => (
                                        <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
                                         <input type="text" value={viaLoc} onChange={(e) => handleViaChange(index, e.target.value)}  
                                         placeholder={`Via location ${index + 1}`} 
                                         id="via" />
                                         <button type="button" onClick={() => removeVia(index)} style={{ background: 'red', color: 'white' }}>
                                         Remove </button>
                                        </div>
                                        ))}
                                        <button type="button" onClick={addVia} style={{ background: 'green', color: 'white', marginBottom: '10px' }}>
                                            + Add Via Location
                                        </button>
                                 <label htmlFor="endLocation">End Location:</label>
                                    <input
                                        type="text"
                                        value={endLocation}
                                        onChange={(e) => setEndLocation(e.target.value)}
                                        id="endLocation"
                                        required
                                    />

                                    <label htmlFor="distance">Distance:</label>
                                    <input
                                        type="text"
                                        value={distance}
                                        onChange={(e) => setDistance(e.target.value)}
                                        id="distance"
                                        required
                                    />

                                    <label htmlFor="organizedBy">Organized By:</label>
                                    <input
                                        type="text"
                                        value={organizedBy}
                                        onChange={(e) => setOrganizedBy(e.target.value)}
                                        id="organizedBy"
                                    />

                                    <label htmlFor="eventHostNumber">Event Host Mobile Number:</label>
                                    <input
                                        type="text"
                                        value={eventHostNumber}
                                        onChange={(e) => setEventHostNumber(e.target.value)}
                                        id="eventHostNumber"
                                    />

                                    <label htmlFor="eventHostEmail">Event Host Email:</label>
                                    <input
                                        type="email"
                                        value={eventHostEmail}
                                        onChange={(e) => setEventHostEmail(e.target.value)}
                                        id="eventHostEmail"
                                    />

                                    <button type="submit" disabled={loading}>
                                        {loading ? 'Publishing...' : 'Publish'}
                                    </button>
                                    {error && <div className="error-message">{error}</div>}
                                </form>
                            </div>
                        </div>
                    )}
                </div>

                <div className="team-table-card">
                    <div className="team-table-header">
                        <span className="team-table-title">
                            <h2>Event Schedule</h2>
                            <span className="team-table-chip">{events.length} Events</span>
                        </span>
                    </div>
                    <table className="team-table">
                        <thead>
                            <tr>
                                <th>Event Name</th>
                                <th>Image</th>
                                <th>Distance</th>
                                <th>startLocation</th>
                                <th>Via</th>
                                <th>EndLocation</th>
                                <th>Organized By</th>
                                <th>Contact Support</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map((row, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <div className="table-avatar">
                                            <span className="avatar">{row.eventName ? row.eventName[0] : ''}</span>
                                            <div>
                                                <div>{row.eventName}</div>
                                                {/* <div className="username">{row.username}</div> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {row.eventThumb ? (
                                            <img
                                                src={`data:image/png;base64,${row.eventThumb}`}
                                                alt="thumb"
                                                style={{ width: 40, height: 40 }}
                                            />
                                        ) : (
                                            'No Image'
                                        )}
                                    </td>
                                    <td>{row.eventDistance}</td>
                                    <td>{row.startLocation}</td>
                                    <td>{row.via_location}</td>
                                    <td>{row.endLocation}</td>
                                    <td>{row.eventBy}</td>
                                    <td>
                                        {row.email} <br /> {row.phone}
                                    </td>
                                    <td>{new Date(row.eventDate).toLocaleDateString()}</td>
                                    <td>{new Date(row.eventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="pagination-btn">
                            <FaArrowLeft style={{ verticalalign: 'middle' }} />
                            Previous
                        </button>

                        {getPagination(currentPage, totalPages).map((page, index) => (
                            <button
                                key={index}
                                onClick={() => typeof page === 'number' && handlePageChange(page)}
                                className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                                disabled={page === '...'}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="pagination-btn"
                        >
                            Next <FaArrowRight style={{ verticalalign: 'middle', bottom: '10px' }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
