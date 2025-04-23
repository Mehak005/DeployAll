/**
 * App Component
 *
 * This is the main component that manages the Student Connect application.
 * Features:
 * - View profiles in either Card or Table format.
 * - Create, edit, and delete student profiles.
 * - Like profiles to increase engagement.
 * - Toggle dark mode for better user experience.
 */

import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import Card from "./Card";
import TableView from "./TableView";
import ProfileForm from "./ProfileForm";


function App() {
  const [profiles, setProfiles] = useState([]);
  const [view, setView] = useState("cards");
  const [showModal, setShowModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  // 🔑 Use **relative** API path so it works from any host
  const API_URL = '/api/students';

  // Fetch all profiles
  const fetchProfiles = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProfiles(data))
      .catch((err) => console.error("Failed to load profiles:", err));
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.className = darkMode
      ? "bg-dark text-light"
      : "bg-light text-dark";
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const addProfile = async (newProfile) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProfile, likes: 0 }),
      });
      await res.json();
      fetchProfiles();
    } catch (error) {
      console.error("Error adding profile:", error);
    }
  };

  const editProfile = async (updatedProfile) => {
    try {
      const res = await fetch(`${API_URL}/${updatedProfile.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile),
      });
      await res.json();
      fetchProfiles();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const deleteProfile = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchProfiles();
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  const handleLike = async (id) => {
    const profile = profiles.find((p) => p.id === id);
    if (!profile) return;
    const updated = { ...profile, likes: profile.likes + 1 };
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      await res.json();
      fetchProfiles();
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div
      className={`container-fluid ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <Navbar
        view={view}
        setView={setView}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <div className="container">
        <h2 className="text-center mt-4 mb-4">My Classmates</h2>

        {view === "cards" ? (
          <div className="row mt-3">
            {profiles.length > 0 ? (
              profiles.map((person) => (
                <div className="col-md-4 mb-4" key={person.id}>
                  <Card
                    person={person}
                    onDelete={deleteProfile}
                    onEdit={() => {
                      setEditingProfile(person);
                      setShowModal(true);
                    }}
                    onLike={() => handleLike(person.id)}
                    darkMode={darkMode}
                  />
                </div>
              ))
            ) : (
              <p className="text-center">No classmates added yet.</p>
            )}
          </div>
        ) : (
          <TableView
            profiles={profiles}
            onEdit={(person) => {
              setEditingProfile(person);
              setShowModal(true);
            }}
            onDelete={deleteProfile}
            setShowModal={setShowModal}
            darkMode={darkMode}
          />
        )}

        <div className="text-center mt-4">
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            Add Profile
          </button>
        </div>

        {showModal && (
          <ProfileForm
            show={showModal}
            handleClose={() => {
              setShowModal(false);
              setEditingProfile(null);
            }}
            addProfile={addProfile}
            editProfile={editProfile}
            editingProfile={editingProfile}
            darkMode={darkMode}
          />
        )}
      </div>
    </div>
  );
}

export default App;
