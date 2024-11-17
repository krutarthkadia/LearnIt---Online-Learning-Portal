import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaPlus } from "react-icons/fa";
import "./Styles/InstructorDashboard.css";

// Initial course and quiz data
const initialCoursesData = [
  { id: 1, title: "React & Redux Complete Course 2024", students: 10, revenue: "$1500" },
  { id: 2, title: "Next JS Full Course 2025", students: 10, revenue: "$10000" },
  { id: 3, title: "CSS Full Course 2025", students: 10, revenue: "$4000" },
  { id: 4, title: "Python Full Course 2025", students: 10, revenue: "$50000" },
  { id: 5, title: "JavaScript Mastery 2024", students: 10, revenue: "$5400" },
];

const initialQuizzesData = [
  { id: 1, title: "React Basics Quiz", attempts: 10, passRate: "80%" },
  { id: 2, title: "Next JS Advanced Quiz", attempts: 15, passRate: "70%" },
  { id: 3, title: "CSS Fundamentals Quiz", attempts: 12, passRate: "75%" },
  { id: 4, title: "Python Essentials Quiz", attempts: 8, passRate: "90%" },
];

const InstructorDashboard = () => {
  const [activeTab, setActiveTab] = useState('courses'); // Default to 'courses'
  const [coursesData, setCoursesData] = useState(initialCoursesData); // Managing courses state
  const [quizzesData, setQuizzesData] = useState(initialQuizzesData); // Managing quizzes state
  const navigate = useNavigate();

  // Function to handle edit button click for courses
  const handleEditCourse = (id) => {
    navigate(`/course/${id}`);
  };

  // Function to handle edit button click for quizzes
  const handleEditQuiz = (id) => {
    navigate(`/quiz/${id}`);
  };

  // Function to handle logout
  const handleLogout = () => {
    navigate("/logout");
  };

  // Function to calculate total students
  const getTotalStudents = () => {
    return coursesData.reduce((acc, course) => acc + course.students, 0);
  };

  // Function to calculate total revenue
  const getTotalRevenue = () => {
    return coursesData.reduce((acc, course) => {
      return acc + parseFloat(course.revenue.replace("$", ""));
    }, 0);
  };

  // Function to calculate total courses
  const getTotalCourses = () => {
    return coursesData.length;
  };

  return (
    <div className="courses-page">
      <aside className="sidebar">
        <h2>Instructor View</h2>
        <nav>
          <ul>
            <li 
              className={activeTab === 'courses' ? 'active' : ''} 
              onClick={() => setActiveTab('courses')}
            >
              Courses
            </li>
            <li 
              className={activeTab === 'quizzes' ? 'active' : ''} 
              onClick={() => setActiveTab('quizzes')}
            >
              Quizzes
            </li>
            <li onClick={handleLogout} className="logout-link">
              Logout
            </li>
          </ul>
        </nav>
      </aside>
      <main className="courses-content">
        {activeTab === 'courses' && (
          <>
            <header className="header-2">
              <h1>Courses Dashboard</h1>
              <Link to="/create-course" className="create-course-btn">
                <FaPlus style={{ marginRight: "5px" }} /> New Course
              </Link>
            </header>
            <div className="dashboard-overview">
              <div className="stat-box">
                <h3>Total Courses</h3>
                <p>{getTotalCourses()}</p>
              </div>
              <div className="stat-box">
                <h3>Total Students Enrolled</h3>
                <p>{getTotalStudents()}</p>
              </div>
              <div className="stat-box">
                <h3>Total Revenue</h3>
                <p>${getTotalRevenue().toFixed(2)}</p>
              </div>
            </div>
            <table className="courses-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Students</th>
                  <th>Revenue</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {coursesData.map((course) => (
                  <tr key={course.id}>
                    <td><Link to={`/course/${course.id}`}>{course.title}</Link></td>
                    <td>{course.students}</td>
                    <td>{course.revenue}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEditCourse(course.id)}><FaEdit /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === 'quizzes' && (
          <>
            <header className="header-2">
              <h1>Quizzes</h1>
              <Link to="/create-quiz" className="create-quiz-btn">
                <FaPlus style={{ marginRight: "5px" }} /> New Quiz
              </Link>
            </header>
            <table className="courses-table">
              <thead>
                <tr>
                  <th>Quiz</th>
                  <th>Attempts</th>
                  <th>Pass Rate</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {quizzesData.map((quiz) => (
                  <tr key={quiz.id}>
                    <td><Link to={`/quiz/${quiz.id}`}>{quiz.title}</Link></td>
                    <td>{quiz.attempts}</td>
                    <td>{quiz.passRate}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEditQuiz(quiz.id)}><FaEdit /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
};

export default InstructorDashboard;