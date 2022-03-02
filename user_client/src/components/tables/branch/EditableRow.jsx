import { Button } from "@mui/material";
import React from "react";

const EditableRow = ({
    editFormData,
    handleEditFormChange,
    handleCancelClick,
}) => {
    return (
        <tr>
        <td>
            <input
            type="text"
            required="required"
            placeholder="Enter an username..."
            name="username"
            value={editFormData.username}
            onChange={handleEditFormChange}
            ></input>
        </td>
        <td>
            <input
            type="text"
            required="required"
            placeholder="Enter a phonebook..."
            name="phonebook"
            value={editFormData.phonebook}
            onChange={handleEditFormChange}
            ></input>
        </td>
        <td>
            <input
            type="text"
            required="required"
            placeholder="Enter an branch..."
            name="branch"
            value={editFormData.branch}
            onChange={handleEditFormChange}
            ></input>
        </td>
        <td>
            <input
            type="text"
            required="required"
            placeholder="Enter an Address..."
            name="Address"
            value={editFormData.address}
            onChange={handleEditFormChange}
            ></input>
        </td>
        <td>
            <Button variant="contained" color="primary"type="submit">Save</Button>
            <Button variant="outlined" color="secondary"type="button" onClick={handleCancelClick}>
            Cancel
            </Button>
        </td>
        </tr>
    );
};

export default EditableRow;