'use client'; // Required directive for components that use interactive features like onClick

import Link from 'next/link';
import styles from './Navigation.module.css';
import { event } from '@/lib/gtag'; // Import the Google Analytics event tracking function

export default function Navigation() {
  // Function to track navigation clicks - sends event to Google Analytics
  const handleNavClick = (linkName) => {
    event({
      action: 'navigation_click',    // The type of event (what happened)
      category: 'Navigation',         // The category this event belongs to
      label: linkName,                // Specific label identifying which link was clicked
    });
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {/* Logo/Name - Clicking this tracks "Logo - Home" event */}
        <Link 
          href="/" 
          className={styles.logo}
          onClick={() => handleNavClick('Logo - Home')} // Tracks when logo is clicked
        >
          Abigail Spencer
        </Link>
        
        {/* Navigation Links */}
        <ul className={styles.navLinks}>
          <li>
            {/* Home Link - Clicking this tracks "Home" event */}
            <Link 
              href="/" 
              className={styles.link}
              onClick={() => handleNavClick('Home')} // Tracks when Home is clicked
            >
              Home
            </Link>
          </li>
          <li>
            {/* Projects Link - Clicking this tracks "Projects" event */}
            <Link 
              href="/projects" 
              className={styles.link}
              onClick={() => handleNavClick('Projects')} // Tracks when Projects is clicked
            >
              Projects
            </Link>
          </li>
          <li>
            {/* About Link - Clicking this tracks "About" event */}
            <Link 
              href="/about" 
              className={styles.link}
              onClick={() => handleNavClick('About')} // Tracks when About is clicked
            >
              About
            </Link>
          </li>
          <li>
            {/* Contact Link - Clicking this tracks "Contact" event */}
            <Link 
              href="/contact" 
              className={styles.link}
              onClick={() => handleNavClick('Contact')} // Tracks when Contact is clicked
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}