import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./BranchTable.css";
// import data from "./mock-data.json";
import data from "./dataproduct.json"
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import { Button } from "@mui/material";
    
const BranchTable = () => {
    const [contacts, setContacts] = useState(data);
    const [addFormData, setAddFormData] = useState({
        username: "",
        phonebook: "",
        branch: "",
        address: "",
    });

    const [editFormData, setEditFormData] = useState({
        username: "",
        phonebook: "",
        branch: "",
        address: "",
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
        username: addFormData.username,
        phonebook: addFormData.phonebook,
        branch: addFormData.branch,
        address: addFormData.address,
        };

        const newContacts = [...contacts, newContact];
        setContacts(newContacts);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedContact = {
        _id: editContactId,
        username: editFormData.username,
        phonebook: editFormData.phonebook,
        branch: editFormData.branch,
        address: editFormData.address,
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
        username: contact.username,
        phonebook: contact.phonebook,
        branch: contact.branch,
        address: contact.address,
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
                <th>Phone Book</th>
                <th>Branch</th>
                <th>Address</th>
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
        <h2>Create New Admin</h2>
        <form onSubmit={handleAddFormSubmit}>
            <input
            type="text"
            name="username"
            required="required"
            placeholder="Enter a username..."
            onChange={handleAddFormChange}
            />
            <input
            type="text"
            name="phonebook"
            required="required"
            placeholder="Enter a phonebook..."
            onChange={handleAddFormChange}
            />
            <input
            type="text"
            name="branch"
            required="required"
            placeholder="Enter a branch..."
            onChange={handleAddFormChange}
            />
            <input
            type="text"
            name="address"
            required="required"
            placeholder="Enter an address..."
            onChange={handleAddFormChange}
            />
            <Button variant="contained" color="primary" type="submit">Add</Button>
        </form>
        </div>
    );
};

export default BranchTable;
