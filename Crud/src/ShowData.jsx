import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faHome, faPen, faPenAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import './ShowDataStyles.css'; // We'll create this CSS file

const ShowData = () => {
  const [Data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const pagePer = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("formData")) || [];
    setData(data);
  }, []);

  const handleDelete = (index) => {
    const updatedData = Data.filter((_, i) => i !== index);
    setData(updatedData);
    localStorage.setItem("formData", JSON.stringify(updatedData));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = () => {
    const sortedData = [...Data].sort((a, b) => {
      return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });
    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filter = Data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
  
  const end = currentPage * pagePer;
  const start = end - pagePer;
  const current = filter.slice(start, end);
  
  const totalPages = Math.ceil(filter.length / pagePer);

  return (
    <div className="data_container">
      <div className="data_header">
        <h2 className="data_title">Entry</h2>
        
        <div className="search_sort_container">
          <input 
            type="text" 
            className="search_input" 
            placeholder="Search by name..." 
            value={search} 
            onChange={handleSearch} 
          />
          <button 
            className="sort_btn"
            onClick={handleSort}>
            Sort {sortOrder === "asc" ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
          </button>
        </div>
      </div>

      <div className="table_container">
        <table className="data_table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Hobby</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {current.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.hobby.join(", ")}</td>
                <td>{item.gender}</td>
                <td>
                  {item.img && <img src={item.img} alt="User" className="user_image" />}
                </td>
                <td className="action_buttons">
                  <button className="edit_btn" onClick={() => navigate(`/update/${start + index}`)}>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button className="delete_btn" onClick={() => handleDelete(start + index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination_container">
        <button 
          className="pagination_btn" 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`page_number ${currentPage === i + 1 ? "active_page" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        
        <button 
          className="pagination_btn" 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShowData;