/**
 * Navbar Component
 *
 * This component serves as the top navigation bar for the Student Connect application.
 * It provides:
 * - A title for the website (now a button instead of an anchor for accessibility).
 * - View toggle buttons (Cards/Table) for profile display.
 * - A dark mode toggle button to switch themes.
 * - Automatically adjusts colors for dark and light modes.
 */

import React from "react"; // Import React library
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap for styling

/**
 * Navbar Component
 *
 * Props:
 * @param {String} view - Current view mode ('cards' or 'table').
 * @param {Function} setView - Function to toggle between card and table view.
 * @param {Boolean} darkMode - Determines if dark mode is enabled.
 * @param {Function} toggleDarkMode - Function to toggle dark mode on/off.
 */
function Navbar({ view, setView, darkMode, toggleDarkMode }) {
  return (
    /**
     * Navbar Container
     * - Uses Bootstrap classes for responsive design.
     * - `bg-primary` for light mode and `bg-dark` for dark mode.
     * - `navbar-dark` ensures text contrast in dark mode.
     */
    <nav className={`navbar navbar-expand-lg ${darkMode ? "bg-dark navbar-dark" : "bg-primary navbar-light"} px-3`}>

      {/* Website Title (Now a Button for Better Accessibility) */}
      <button className="navbar-brand text-light btn btn-link">
        Student Connect
      </button>

      {/* Navbar Items (View Toggle & Dark Mode) */}
      <div className="d-flex align-items-center ms-auto">

        {/* Toggle View Buttons */}
        <div className="btn-group me-3">
          <button
            className={`btn ${view === "cards" ? "btn-light" : "btn-outline-light"}`}
            onClick={() => setView("cards")}
          >
            View as Cards
          </button>
          <button
            className={`btn ${view === "table" ? "btn-light" : "btn-outline-light"}`}
            onClick={() => setView("table")}
          >
            View as Table
          </button>
        </div>

        {/* Dark Mode Toggle Button */}
        <button className="btn btn-secondary" onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
