// App.js
import React from 'react';
import './App.css'; // Import your CSS file
import Header from './Header';
import ContactForm from './ContactForm';

function App() {
  const contact_list = [] // Initialize with your data or fetch it as needed
  const title = "Contact Book"; // Set your title

  return (
    <div>
      <Header title={title} />  
      <ContactForm />
    </div>
  );
}

export default App;
