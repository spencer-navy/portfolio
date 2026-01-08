'use client'; // Required directive for components that use interactive features like onClick

import Link from 'next/link';
import styles from './Navigation.module.css';
import { event } from '@/lib/gtag'; // Import the Google Analytics event tracking function
import { trackEvent } from '@/lib/trackEvent'; // Import MongoDB tracking

export default function Navigation() {
  // Function to track navigation clicks - sends event to both Google Analytics and MongoDB
  const handleNavClick = (linkName, linkUrl) => {
    // Google Analytics tracking (existing)
    event({
      action: 'navigation_click',    // The type of event (what happened)
      category: 'Navigation',         // The category this event belongs to
      label: linkName,                // Specific label identifying which link was clicked
    });

    // MongoDB tracking (new)
    // This captures more context about the navigation:
    // - Where they're navigating TO (linkUrl)
    // - Where they're navigating FROM (current page)
    // - What they clicked (linkName)
    trackEvent('navigation_click', {
      linkName: linkName,                    // Which link was clicked (e.g., "Home", "Projects")
      linkUrl: linkUrl,                      // Where the link goes (e.g., "/", "/projects")
      fromPage: window.location.pathname     // Where they are NOW (before clicking)
    });
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {/* Logo/Name - Clicking this tracks "Logo - Home" event */}
        <Link 
          href="/" 
          className={styles.logo}
          onClick={() => handleNavClick('Logo - Home', '/')} // Tracks logo click
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
              onClick={() => handleNavClick('Home', '/')} // Tracks Home click
            >
              Home
            </Link>
          </li>
          <li>
            {/* Projects Link - Clicking this tracks "Projects" event */}
            <Link 
              href="/projects" 
              className={styles.link}
              onClick={() => handleNavClick('Projects', '/projects')} // Tracks Projects click
            >
              Projects
            </Link>
          </li>
          <li>
            {/* About Link - Clicking this tracks "About" event */}
            <Link 
              href="/about" 
              className={styles.link}
              onClick={() => handleNavClick('About', '/about')} // Tracks About click
            >
              About
            </Link>
          </li>
          <li>
            {/* Contact Link - Clicking this tracks "Contact" event */}
            <Link 
              href="/contact" 
              className={styles.link}
              onClick={() => handleNavClick('Contact', '/contact')} // Tracks Contact click
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}