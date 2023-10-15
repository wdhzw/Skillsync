import React from 'react';
import './JobItem.css';
 
function JobItem({ job }) {

    return (
    <div className="job-grid-item">
            <img src={job.emppicture}/>
            <p><b>Job Name: </b>{job.name}</p>
            <p><b>Employer: </b>{job.employer}</p>
            <p><b>Job Description: </b></p>
            {job.description}
    </div>

    );
  }
  
  export default JobItem;
  