import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import { getAllCategories, getCategoryIcon } from "../../config/categories";
import "./CreateProject.css";

const CreateProject = () => {
  const navigate = useNavigate();
  const { addProject } = useProjects();
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    category: "",
    target: "",
    minInvestment: "",
    duration: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const allCategories = getAllCategories();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setProjectData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      ...projectData,
      icon: getCategoryIcon(projectData.category),
      daysLeft: parseInt(projectData.duration) || 30,
      image: imagePreview, // Use the preview URL for now
    };
    addProject(newProject);
    navigate("/");
  };

  return (
    <div className="create-project">
      <div className="form-container">
        <h2>Create New Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Project Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={projectData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={projectData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={projectData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {allCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="target">Target Amount (£)</label>
              <input
                type="number"
                id="target"
                name="target"
                value={projectData.target}
                onChange={handleChange}
                min="1000"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="minInvestment">Minimum Investment (£)</label>
              <input
                type="number"
                id="minInvestment"
                name="minInvestment"
                value={projectData.minInvestment}
                onChange={handleChange}
                min="100"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration (Days)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={projectData.duration}
              onChange={handleChange}
              min="1"
              max="365"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Project Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              required
              className="file-input"
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Project preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Create Project
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
