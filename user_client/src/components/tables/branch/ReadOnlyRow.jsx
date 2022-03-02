import { Button } from "@mui/material";
import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.username}</td>
      <td>{contact.phonebook}</td>
      <td>{contact.branch}</td>
      <td>{contact.address}</td>
      <td>
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </Button>
        <Button variant="contained" type="button" color="secondary" onClick={() => handleDeleteClick(contact._id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
