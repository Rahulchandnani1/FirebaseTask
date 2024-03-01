import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app'; // Update the import statement
import 'firebase/compat/database'; // Import the database module
import "./App.css";
import firebaseConfig from './firebaseConfig';
// Initializeing Firebase

// Adding data to the database
firebase.initializeApp(firebaseConfig);

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page
  const db = firebase.database();



const [searchQuery, setSearchQuery] = useState('');
useEffect(() => {
  const fetchData = async () => {
    const dbRef = firebase.database().ref('employees');
    const snapshot = await dbRef.once('value');
    const data = snapshot.val();
    if (data) {
      setEmployees(Object.values(data));
    }
  };
  fetchData();
}, []);

// setting rows accordig to user selection
const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
};

const handleSearchInputChange = (event) => {
  setSearchQuery(event.target.value);
};
// filtering data on basis of search query
const filteredEmployees = employees.slice(0, rowsPerPage).filter((employee) =>
  employee.name.toLowerCase().includes(searchQuery.toLowerCase())
);
console.log(employees.length)
return (
  <div>
    <h1>Employee Data</h1>

    <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
    <label htmlFor="rowsPerPage">Rows Per Page:</label>
    <select id="rowsPerPage" value={rowsPerPage} onChange={handleChangeRowsPerPage}>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={15}>15</option>
     
    </select>
    {employees.length>0?
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Position</th>
          <th>Department</th>
          <th>Income</th>
        </tr>
      </thead>
     
      <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.age}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{employee.income}</td>
            </tr>
          ))}
        </tbody>
    </table>:<p className='loadingtext'>Loading Employees Data....</p>}
    <p>By Rahul Chandnani</p>
  </div>
);
};
export default App;
