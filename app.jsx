
import { useState } from "react";
import "./App.css";

function App() {
  const [studentName, setStudentName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!studentName.trim() || !age || !course) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (Number(age) < 1 || Number(age) > 120) {
      setMessage("Please enter a valid age.");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: studentName.trim(),
      age: Number(age),
      course: course,
    };

    setStudents([...students, newStudent]);

    setStudentName("");
    setAge("");
    setCourse("");
    setMessage("Student registered successfully!");
  }

  function deleteStudent(id) {
    setStudents(students.filter((student) => student.id !== id));
    setMessage("Student removed successfully.");
  }

  return (
    <div className="app">
      <div className="registration-card">
        <h1>Student Registration</h1>
        <p className="subtitle">
          Enter student information below
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="studentName">Student Name</label>
          <input
            id="studentName"
            type="text"
            placeholder="Enter student's full name"
            value={studentName}
            onChange={(event) =>
              setStudentName(event.target.value)
            }
            required
          />

          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            placeholder="Enter student's age"
            min="1"
            max="120"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            required
          />

          <label htmlFor="course">Course</label>
          <select
            id="course"
            value={course}
            onChange={(event) => setCourse(event.target.value)}
            required
          >
            <option value="">Select a course</option>
            <option value="Software Development">
              Software Development
            </option>
            <option value="Networking">Networking</option>
            <option value="Database Management">
              Database Management
            </option>
            <option value="Web Development">
              Web Development
            </option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>

          <button type="submit">Register Student</button>
        </form>

        {message && (
          <p className="message" role="status">
            {message}
          </p>
        )}

        <div className="student-list">
          <h2>Registered Students ({students.length})</h2>

          {students.length === 0 ? (
            <p className="empty">
              No students registered yet.
            </p>
          ) : (
            students.map((student) => (
              <div className="student-item" key={student.id}>
                <div>
                  <h3>{student.name}</h3>
                  <p>Age: {student.age}</p>
                  <p>Course: {student.course}</p>
                </div>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
