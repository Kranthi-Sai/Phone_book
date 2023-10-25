// Header.js
import React from 'react';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import './App.css';
function Header({ title }) {
  return (
    <h1 id="heading_style">
     <PermContactCalendarIcon sx={{ fontSize: 40 }}/>
      {title}
    </h1>
  );
}

export default Header;
