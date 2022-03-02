import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./ProductTable.css";
// import data from "./mock-data.json";
import data from "./dataproduct.json"
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import { Button } from "@mui/material";

const ProductTable = () => {
    const [contacts, setContacts] = useState(data);
    const [addFormData, setAddFormData] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
    });

    const [editFormData, setEditFormData] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
    });

    const [editContactId, setEditContactId] = useState(null);

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newContact = {
        _id: nanoid(),
        name: addFormData.name,
        description: addFormData.description,
        price: addFormData.price,
        image: addFormData.image,
        };

        const newContacts = [...contacts, newContact];
        setContacts(newContacts);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedContact = {
        _id: editContactId,
        name: editFormData.name,
        description: editFormData.description,
        price: editFormData.price,
        image: editFormData.image,
        };

        const newContacts = [...contacts];

        const index = contacts.findIndex((contact) => contact._id === editContactId);

        newContacts[index] = editedContact;

        setContacts(newContacts);
        setEditContactId(null);
    };

    const handleEditClick = (event, contact) => {
        event.preventDefault();
        setEditContactId(contact._id);

        const formValues = {
        name: contact.name,
        description: contact.description,
        price: contact.price,
        image: contact.image,
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditContactId(null);
    };

    const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts];

        const index = contacts.findIndex((contact) => contact._id === contactId);

        newContacts.splice(index, 1);

        setContacts(newContacts);
    };
    
    return (
        <div className="app-container">
        <form onSubmit={handleEditFormSubmit}>
            <table>
            <thead>
                <tr>
                <th>Name</th>
                <th>description</th>
                <th>price</th>
                <th>image</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) => (
                <Fragment>
                    {editContactId === contact._id ? (
                    <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                    />
                    ) : (
                    <ReadOnlyRow
                        contact={contact}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                    />
                    )}
                </Fragment>
                ))}
            </tbody>
            </table>
        </form>
        <span/>
        <span/>
        <span/>
        <h2>Add New Product</h2>
        <form onSubmit={handleAddFormSubmit}>
            <input
            type="text"
            name="name"
            required="required"
            placeholder="Enter a name..."
            onChange={handleAddFormChange}
            />
            <input
            type="text"
            name="description"
            required="required"
            placeholder="Enter a description..."
            onChange={handleAddFormChange}
            />
            <input
            type="text"
            name="price"
            required="required"
            placeholder="Enter a price..."
            onChange={handleAddFormChange}
            />
            <input
            type="text"
            name="image"
            required="required"
            placeholder="Enter an image..."
            onChange={handleAddFormChange}
            />
            <Button variant="contained" color="primary" type="submit">Add</Button>
        </form>
        </div>
    );
};

export default ProductTable;