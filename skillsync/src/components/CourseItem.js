import React from 'react';
import './CourseItem.css';
 
function CourseItem({ image, title, content, provider }) 
{

    const baseURL = "https://www.myskillsfuture.gov.sg";

    return (
    <div className="course-grid-item">
      <img src={baseURL + image} alt={title} />
      <h3>{title}</h3>
      <p>{provider}</p>
      <br></br>
      <p>{content}</p>
    </div>

    );
  }
  
  export default CourseItem;
  