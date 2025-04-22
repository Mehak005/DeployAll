/**
 * ProfileForm Component
 *
 * Modal form for adding or editing student profiles.
 */

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ProfileForm({ show, handleClose, addProfile, editProfile, editingProfile, darkMode }) {
  const [profile, setProfile] = useState({ name: "", favouriteColor: "", favouriteFood: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingProfile) {
      setProfile({
        id: editingProfile.id,
        name: editingProfile.name,
        favouriteColor: editingProfile.favouriteColor,
        favouriteFood: editingProfile.favouriteFood,
        likes: editingProfile.likes
      });
    } else {
      setProfile({ name: "", favouriteColor: "", favouriteFood: "" });
    }
  }, [editingProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};
    const textRegex = /^[A-Za-z\s]+$/;

    if (!profile.name.trim()) {
      newErrors.name = "Name is required!";
    } else if (!textRegex.test(profile.name)) {
      newErrors.name = "Name can only contain letters and spaces!";
    }

    if (!profile.favouriteColor.trim()) {
      newErrors.favouriteColor = "Favourite color is required!";
    } else if (!textRegex.test(profile.favouriteColor)) {
      newErrors.favouriteColor = "Color can only contain letters!";
    }

    if (!profile.favouriteFood.trim()) {
      newErrors.favouriteFood = "Favourite food is required!";
    } else if (!textRegex.test(profile.favouriteFood)) {
      newErrors.favouriteFood = "Food can only contain letters!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingProfile) {
      editProfile({ ...profile, id: editingProfile.id });
    } else {
      addProfile({ ...profile, likes: 0 });
    }

    handleClose();
  };

  return (
    <div className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className={`modal-content ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
          <div className="modal-header">
            <h5 className="modal-title">{editingProfile ? "Edit Profile" : "Add Profile"}</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Favourite Color</label>
                <input
                  type="text"
                  className={`form-control ${errors.favouriteColor ? "is-invalid" : ""}`}
                  name="favouriteColor"
                  value={profile.favouriteColor}
                  onChange={handleChange}
                  required
                />
                {errors.favouriteColor && <div className="invalid-feedback">{errors.favouriteColor}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Favourite Food</label>
                <input
                  type="text"
                  className={`form-control ${errors.favouriteFood ? "is-invalid" : ""}`}
                  name="favouriteFood"
                  value={profile.favouriteFood}
                  onChange={handleChange}
                  required
                />
                {errors.favouriteFood && <div className="invalid-feedback">{errors.favouriteFood}</div>}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingProfile ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
