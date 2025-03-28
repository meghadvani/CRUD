import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './UpdateDataStyles.css'; // We'll create this CSS file

const UpdateData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hobby: "",
    gender: "",
    img: "",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("formData")) || [];
    setFormData(data[id] || { name: "", email: "", hobby: "", gender: "", img: "" });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("formData")) || [];
    data[id] = formData;
    localStorage.setItem("formData", JSON.stringify(data));
    navigate("/display");
  };

  return (
    <div className="update_container">
      <div className="update_form_area">
        <h2 className="update_title">Update Data</h2>
        <form onSubmit={handleSubmit}>
          <div className="form_group">
            <label className="form_label">Name</label>
            <input 
              type="text" 
              name="name" 
              className="form_style" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Enter name" 
              required
            />
          </div>
          <div className="form_group">
            <label className="form_label">Email</label>
            <input 
              type="email" 
              name="email" 
              className="form_style" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Enter email" 
              required
            />
          </div>
          <div className="form_group">
            <label className="form_label">Hobby</label>
            <input 
              type="text" 
              name="hobby" 
              className="form_style" 
              value={formData.hobby} 
              onChange={handleChange} 
              placeholder="Enter hobby" 
            />
          </div>
          <div className="form_group">
            <label className="form_label">Gender</label>
            <select 
              name="gender" 
              className="form_style" 
              value={formData.gender} 
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form_group">
            <label className="form_label">Image URL</label>
            <input 
              type="text" 
              name="img" 
              className="form_style" 
              value={formData.img} 
              onChange={handleChange} 
              placeholder="Enter image URL" 
            />
            {formData.img && (
              <img 
                src={formData.img} 
                alt="Preview" 
                className="image_preview" 
              />
            )}
          </div>
          <button type="submit" className="submit_btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateData;