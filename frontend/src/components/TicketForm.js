import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './TicketForm.css'; // Your custom CSS file
import { useNavigate } from 'react-router-dom';

const TicketForm = () => {
  const [subject, setSubject] = useState('');
  const [issueMessage, setIssueMessage] = useState('');
  const [status,setStatus] = useState('on Progress');
  const [screenshot, setScreenshot] = useState(null);
  const navigate = useNavigate();

  const collectData = async(e) =>{
    e.preventDefault();
    console.log("before fetch");
    console.warn(subject,issueMessage);
    const info = {
        subject:subject,
        issueMessage:issueMessage,
        status:status,
    }
    console.log(info);
    try{
        let result = await fetch("http://localhost:5001/ticketform",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(info)
        });
        console.log("After fetch");
        result = await result.json();
        console.warn(result);
        if(result){
            navigate("/tickets");
        }
    }catch(error){
        console.error("Error sending request:", error);
    }

    // e.preventDefault();
    console.log('Form submitted:', { subject, issueMessage, screenshot });
    setSubject('');
    setIssueMessage('');
    setScreenshot(null);
  }

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleIssueMessageChange = (e) => {
    setIssueMessage(e.target.value);
  };

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    setScreenshot(file);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Form submitted:', { subject, issueMessage, screenshot });
  //   setSubject('');
  //   setIssueMessage('');
  //   setScreenshot(null);
  // };

  return (
    <div className="ticket-form container mt-4">
      <h2 className="mb-4">Add a Product</h2>
      <form onSubmit={collectData}>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">Product Name:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={handleSubjectChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="issueMessage" className="form-label">Product Detail:</label>
          <textarea
            id="issueMessage"
            value={issueMessage}
            onChange={handleIssueMessageChange}
            className="form-control"
            required
          />
        </div>
      
         
        <button  type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default TicketForm;
