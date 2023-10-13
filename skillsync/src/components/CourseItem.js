import React from 'react';
import './CourseItem.css';
 
function CourseItem({ course }) {

    return (
    <div className="course-grid-item">
            <img src={course.picture}/>
            <p><b>Course Name: </b>{course.name}</p>
            <p><b>Course Provider: </b>{course.provider}</p>
            <p><b>Course Description: </b></p>
            {course.description}
    </div>

    );
  }
  
  export default CourseItem;
  