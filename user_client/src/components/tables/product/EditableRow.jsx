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
            placeholder="Enter a name..."
            name="name"
            value={editFormData.name}
            onChange={handleEditFormChange}
            ></input>
        </td>
        <td>
            <input
            type="text"
            required="required"
            placeholder="Enter an description..."
            name="description"
            value={editFormData.description}
            onChange={handleEditFormChange}
            ></input>
        </td>
        <td>
            <input
            type="text"
            required="required"
            placeholder="Enter a price..."
            name="price"
            value={editFormData.price}
            onChange={handleEditFormChange}
            ></input>
        </td>
        <td>
            <input
            type="text"
            required="required"
            placeholder="Enter an image..."
            name="image"
            value={editFormData.image}
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