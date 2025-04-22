/**
 * Card Component
 * This component displays an individual profile card.
 * Users can like, edit, or delete the profile.
 */

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap for styling

/**
 * Card Component
 *
 * Props:
 * @param {Object} person - Profile details (name, favoriteColor, favoriteFood, likes)
 * @param {Function} onLike - Function to handle "Like" button clicks
 * @param {Function} onEdit - Function to open the edit modal
 * @param {Function} onDelete - Function to delete the profile
 * @param {Boolean} darkMode - Determines if dark mode is enabled
 */
function Card({ person, onLike, onEdit, onDelete, darkMode }) {
  return (
    <div className={`card mb-3 p-3 shadow-sm ${darkMode ? "bg-secondary text-light" : "bg-light text-dark"}`}>
      <div className="card-body">
        <h5 className="card-title">{person.name}</h5>
        <p className="card-text"><strong>Favourite Color:</strong> {person.favouriteColor}</p>
        <p className="card-text"><strong>Favourite Food:</strong> {person.favouriteFood}</p>

        {/* Action buttons: Like, Edit, Delete */}
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-outline-info" onClick={() => onLike(person.id)}>
            Like ({person.likes}) {/* Display number of likes */}
          </button>
          <button className="btn btn-warning mx-2" onClick={onEdit}>
            Edit {/* Opens the edit form */}
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(person.id)}>
            Delete {/* Removes the profile */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
