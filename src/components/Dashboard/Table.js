import { useEffect, useState } from "react";
import Header from "./Header";
import Swal from "sweetalert2";
import axios from "axios";

const Table = () => {
  const [employeesData, setEmployeesData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/employees")
      .then((res) => setEmployeesData(res.data));
  }, []);
  const handleDelete = () => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        console.log(result, "result");
        //delte api call
        axios
          .delete(`http://localhost:3000/employees/${employeesData[0].id}`)
          .then((res) => setEmployeesData(res.data));

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="contain-table">
      <Header />
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Date</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employeesData.length > 0 ? (
            employeesData.map((employee, i) => (
              <tr key={employee.id}>
                <td>{i + 1}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.salary}</td>
                <td>{employee.date} </td>
                <td className="text-right">
                  <button onClick={() => {}} className="button muted-button">
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => {
                      handleDelete();
                    }}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
