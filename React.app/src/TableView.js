/**
 * TableView Component
 *
 * This component displays a table of student profiles using TanStack Table.
 * Users can:
 * - View profiles in a structured table format.
 * - Edit profiles via a modal form.
 * - Delete profiles directly from the table.
 * - Supports dark mode for better visibility.
 */

import React from "react"; // Import React
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"; // Import TanStack Table for dynamic rendering
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap for table styling

/**
 * TableView Component
 *
 * Props:
 * @param {Array} profiles - List of student profiles.
 * @param {Function} onEdit - Function to handle profile editing.
 * @param {Function} onDelete - Function to delete a profile.
 * @param {Function} setShowModal - Function to control the ProfileForm modal visibility.
 * @param {Boolean} darkMode - Determines if dark mode is enabled.
 */
function TableView({ profiles, onEdit, onDelete, setShowModal, darkMode }) {

  /**
   * Column Definitions for the Table
   * Each column represents a field in the profile.
   */
  const columns = [
    { header: "ID", accessorKey: "id" }, // Unique identifier for each profile
    { header: "Name", accessorKey: "name" }, // Displays student name
    { header: "Favorite Color", accessorKey: "favouriteColor" }, // Displays favorite color
    { header: "Favorite Food", accessorKey: "favouriteFood" }, // Displays favorite food
    { header: "Likes", accessorKey: "likes" }, // Displays the number of likes
    {
      header: "Actions",
      accessorKey: "actions",
      /**
       * Renders action buttons for each row:
       * - Edit: Opens modal to edit the selected profile.
       * - Delete: Removes the selected profile.
       */
      cell: ({ row }) => (
        <div>
          <button
            className="btn btn-warning btn-sm mx-1"
            onClick={() => {
              onEdit(row.original); // Pass the selected profile to the editing function
              setShowModal(true); // Open the modal form for editing
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(row.original.id)} // Call delete function for this profile
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  /**
   * Initializes the TanStack Table instance with:
   * - `data`: Profile list.
   * - `columns`: Column definitions.
   * - `getCoreRowModel`: Generates the table row structure.
   */
  const table = useReactTable({
    data: profiles,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-responsive">
      {/* Render Table with Dark Mode Support */}
      <table className={`table table-striped table-bordered ${darkMode ? "table-dark" : "table-light"}`}>

        {/* Table Header */}
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* Table Body */}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default TableView;
