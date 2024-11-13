import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [student, setStudent] = useState([]);
  const [filter, setFilter] = useState([]);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState({
    register: "",
    name: "",
    course: "",
    fees: "",
  });

  const getallstudent = async () => {
    await axios.get("http://localhost:5000/mv").then((res) => {
      console.log(res.data);
      setStudent(res.data);
      setFilter(res.data);
    });
  };
  useEffect(() => {
    getallstudent();
  }, []);

  const handlesearch = (e) => {
    const searchtext = e.target.value.toLowerCase();
    const filter = student.filter(
      (student) =>
        student.name.toLowerCase().includes(searchtext) ||
        student.course.toLowerCase().includes(searchtext)
    );
    setFilter(filter);
  };

  const handledelete = async (id) => {
    try {
      const isConformed = window.confirm("ARE YOU SURE WANT TO DELETE ?");
      if (isConformed) {
        await axios.delete(`http://localhost:5000/mv/${id}`);
        const updatedStudents = student.filter((stud) => stud._id !== id);
        setStudent(updatedStudents);
        setFilter(updatedStudents);
      }
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  };

  const addrecord = () => {
    setData({
      register: "",
      name: "",
      course: "",
      fees: "",
    });

    setModal(true);
  };

  const closemodal = () => {
    setModal(false);
    getallstudent();
  };

  const handledata = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlesum = async (e) => {
    e.preventDefault();
    try {
      const res = data._id
        ? await axios.put(`http://localhost:5000/mv/${data._id}`, data)
        : await axios.post("http://localhost:5000/mv", data);
      console.log(res);
      closemodal(); // Close modal on successful submission
    } catch (error) {
      console.error("There was an error processing the request:", error);
    }
  };

  const handleupdate = (student) => {
    setData(student);
    setModal(true);
  };

  return (
    <>
      <div className="cointainer">
        <h3>STUDENT FEE MANAGEMENT</h3>
        <div className="inputsearch">
          <input
            type="search"
            placeholder="SEARCH HERE"
            onChange={handlesearch}
          />
          <button className="btn blue" onClick={addrecord}>
            ADD RECORD
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>REGISTER</th>
              <th>NAME</th>
              <th>COURSE</th>
              <th>FESS</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {filter &&
              filter.map((student, index) => {
                return (
                  <tr key={student._id}>
                    <td>{index + 1}</td>
                    <td>{student.register}</td>
                    <td>{student.name}</td>
                    <td>{student.course}</td>
                    <td>{student.fees}</td>
                    <td>
                      <button
                        className="btn green"
                        onClick={() => handleupdate(student)}
                      >
                        edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn red"
                        onClick={() => handledelete(student._id)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {modal && (
          <div className={`modal ${modal ? 'show' : ''}`}>
            <div className="content">
              <span className="close" onClick={closemodal}>
                X
              </span>
              <h2>   {data._id ? "UPDATE DETAILS" : "CREATE DETAILS"}</h2>
              <div className="inputgrp">
                <label htmlFor="register">REGESTER NUMBER </label>
                <input
                  type="number"
                  value={data.register}
                  name="register"
                  id="register"
                  onChange={handledata}
                />
              </div>
              <div className="inputgrp">
                <label htmlFor="name">FULL NAME</label>
                <input
                  type="text"
                  value={data.name}
                  name="name"
                  id="name"
                  onChange={handledata}
                />
              </div>
              <div className="inputgrp">
                <label htmlFor="course">ENTER THE COURSE</label>
                <input
                  type="text"
                  value={data.course}
                  name="course"
                  id="course"
                  onChange={handledata}
                />
              </div>
              <div className="inputgrp">
                <label htmlFor="fees">PAYMENT</label>
                <input
                  type="text"
                  value={data.fees}
                  name="fees"
                  id="fees"
                  onChange={handledata}
                />
              </div>
              <button className="btn green" onClick={handlesum}>
                {data._id ? "UPDATE" : "CREATE"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
