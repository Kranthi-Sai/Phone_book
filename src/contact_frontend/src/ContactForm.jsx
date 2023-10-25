import React, { useState,useEffect } from 'react';
import './App.css'; 
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import {contact_backend} from '../../declarations/contact_backend';


function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [contactList, setContactList] = useState([]);

  const contactActor = contact_backend;

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (name && phone) {
      // Check if the name or phone number already exists in the contact list
      if (contactList.some(contact => contact.name === name || contact.phone === phone)) {
        alert('Contact with this name or phone number already exists!');
      } else {
        // Create a new contact through the Motoko actor
        await contactActor.createContact(name, phone);
        
        // Fetch the updated contact list from the actor
        const contacts = await contactActor.readContacts();
        setContactList(contacts);
  
        // Clear the input fields
        setName('');
        setPhone('');
      }
    }
  };
  

  const handleDelete = async (index) => {
    // Remove a contact through the Motoko actor
    await contactActor.removeContact(index);

    // Fetch the updated contact list from the actor
    const contacts = await contactActor.readContacts();
    setContactList(contacts);
  };

  useEffect(() => {
    async function fetchData() {
      // Fetch the initial contact list from the Motoko actor
      const contacts = await contactActor.readContacts();
      setContactList(contacts);
    }
    fetchData();
  }, [contactActor]);

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className="name_feild" 
          placeholder="Name"
          required
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="text"
          name="phone"
          className="name_feild"  
          placeholder="Phone Number"
          minLength="10"
          maxLength="10"
          required
          value={phone}
          onChange={handlePhoneChange}
        />
        <button type="submit" id="add_button">Add</button> 
      </form>

      <ul className="list_style">
  {contactList.map((contact, index) => (
    <li key={index}>
      <table>
        <tr>
          <th>
           <div className="icon"><PermIdentityIcon />{'\u00A0'}{contact.name} </div> 
            
          </th>
          <th id="last">{contact.phone}</th>
          <th>
            <button onClick={() => handleDelete(index)} className="trash">
              <DeleteOutlinedIcon />
            </button>
          </th>
        </tr>
      </table>
    </li>
  ))}
</ul>
    </div>
  );
}

export default ContactForm;
