import React, { useState, useEffect } from 'react';
import './TicketList.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// import { useNavigate } from 'react-router-dom';

const TicketList = () => {
  // const navigate = useNavigate()
  // Sample ticket data (replace this with your actual ticket data)
  const [tickets, setTickets] = useState([
    // { id: 1, subject: 'Issue 1', issueMessage: 'Description of issue 1', screenshot: null },
    // { id: 2, subject: 'Issue 2', issueMessage: 'Description of issue 2', screenshot: null },
    // { id: 3, subject: 'Issue 3', issueMessage: 'Description of issue 3', screenshot: null },
    // { id: 4, subject: 'Issue 4', issueMessage: 'Description of issue 4', screenshot: null },
    // // Add more ticket objects as needed
  ]);

  useEffect(()=>{
     gettickets();

     const interval = setInterval(()=>{
         gettickets();
     },10000)
  },[])

  const gettickets= async() =>{
    let result = await fetch("http://localhost:5001/tickets");

    result = await result.json();
    setTickets(result);
    
  } 

  // Function to delete a ticket by ID
  const handleDelete = async (id) => {
    // const updatedTickets = tickets.filter((ticket) => ticket.id !== id);
    // setTickets(updatedTickets);
    let result = await fetch(`http://localhost:5001/tickets/${id}`,{
      method:"Delete",

    });
    result =await result.json()
    if(result){
      gettickets();
    }
    
    // setIsChatBoxOpen(true)
    // navigate('/chat')

  };

  return (
    <div className="container mt-4">
      <h2>Product List</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {tickets.map((ticket) => (
          <div key={ticket._id} className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ticket.subject}</h5>
                <p className="card-text">{ticket.issueMessage}</p>
                { ticket.status === "on Progress" ? (<p className='card-status text-danger'>Pending</p>)
                   : 
                (<p className='card-status text-green'>{ticket.status}</p>)
                }      
                {/* Display uploaded screenshot (if available) */}
                {ticket.screenshot && (
                  <img src={ticket.screenshot} alt="Screenshot" className="img-fluid mb-3" />
                )}
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(ticket._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketList;
