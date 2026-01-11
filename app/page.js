
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import styles from './Home.module.css';
import { event } from '@/lib/gtag';
import { trackPageView, trackEvent } from '@/lib/trackEvent';  // Import both

export default function Home() {
  useEffect(() => {
    // ONLY ONE page view event needed
    trackPageView({ page: 'home' });
  }, []);
  
  // Keep your existing tracking handlers
  const handleViewResume = () => {
    event({ action: 'view_resume', category: 'Resume', label: 'View Resume - Homepage' });
    trackEvent('resume_view', { source: 'homepage', action: 'view' });
  };

  const handleDownloadResume = () => {
    event({ action: 'download_resume', category: 'Resume', label: 'Download Resume - Homepage' });
    trackEvent('resume_download', { source: 'homepage', action: 'download' });
  };

  const handleContactCTA = () => {
    event({ action: 'cta_click', category: 'CTA', label: 'Contact Me - Homepage' });
    trackEvent('cta_click', { ctaName: 'Contact Me', ctaLocation: 'homepage', ctaUrl: '/contact' });
  };

  return (
    <>
      <Navigation />
      
      <main className={styles.main}>
        {/* Decorative vine background */}
        <div className={styles.vineBackground}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="vines" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <path d="M50 0 Q 75 50 50 100 T 50 200" stroke="#5a6b58" strokeWidth="2" fill="none" />
                <circle cx="50" cy="30" r="3" fill="#5a6b58" />
                <circle cx="50" cy="80" r="3" fill="#5a6b58" />
                <circle cx="50" cy="130" r="3" fill="#5a6b58" />
                <circle cx="50" cy="180" r="3" fill="#5a6b58" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vines)" />
          </svg>
        </div>

        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              {/* Photo */}
              <div className={styles.photoWrapper}>
                <div className={styles.profileImageWrapper}>
                  <img
                    src="/professional-photo.jpg"
                    alt="Abigail Spencer"
                    className={styles.profileImage}
                  />
                </div>
              </div>

              {/* Content */}
              <div className={styles.content}>
                <h1 className={styles.title}>Abigail Spencer</h1>
                <p className={styles.subtitle}>
                  Data Analyst | Data Scientist | <span style={{display: 'inline-block'}}>Python Developer</span>
                </p>
                <p className={styles.location}>
                  <svg className={styles.locationIcon} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Alexandria, VA
                </p>

                <p className={styles.tagline}>
                  Transforming complex data into actionable insights through machine learning, statistical analysis, and intuitive visualizations.
                </p>

                <div className={styles.buttonGroup}>
                  {/* View Resume Button - Tracks when clicked */}
                  <a 
                    href="/resume.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.buttonPrimary}
                    onClick={handleViewResume} // Tracks the view resume event
                  >
                    <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Resume
                  </a>
                  {/* Download Resume Button - Tracks when clicked */}
                  <a 
                    href="/resume.pdf" 
                    download
                    className={styles.buttonSecondary}
                    onClick={handleDownloadResume} // Tracks the download resume event
                  >
                    <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className={styles.workflowSection}>
          <div className={styles.workflowContainer}>
            <div className={styles.workflowGrid}>
              <div className={styles.workflowCard}>
                <div className={styles.workflowIconWrapper}>
                  <svg className={styles.workflowIcon} fill="#879f85" viewBox="0 0 24 24">
                    <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"/>
                    <rect x="2" y="4" width="3" height="2" rx="0.5" fill="#879f85"/>
                    <rect x="2" y="8" width="3" height="2" rx="0.5" fill="#879f85"/>
                    <rect x="2" y="12" width="3" height="2" rx="0.5" fill="#879f85"/>
                  </svg>
                </div>
                <h3 className={styles.workflowTitle}>Retrieve & Clean</h3>
                <p className={styles.workflowDescription}>
                  Extract data from diverse sources including APIs, databases, and web scraping. Clean and transform raw data into structured formats ready for analysis.
                </p>
              </div>

              <div className={styles.workflowCard}>
                <div className={styles.workflowIconWrapper}>
                  <svg className={styles.workflowIcon} fill="#879f85" viewBox="0 0 24 24">
                    <path d="M12 2a1 1 0 011 1v8.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L11 11.586V3a1 1 0 011-1z"/>
                    <rect x="6" y="14" width="4" height="2" rx="1" fill="#879f85"/>
                    <rect x="6" y="18" width="7" height="2" rx="1" fill="#879f85"/>
                    <rect x="14" y="14" width="4" height="2" rx="1" fill="#879f85"/>
                    <circle cx="12" cy="8" r="1.5" fill="#879f85"/>
                  </svg>
                </div>
                <h3 className={styles.workflowTitle}>Analyze & Model</h3>
                <p className={styles.workflowDescription}>
                  Apply statistical methods and machine learning algorithms to uncover patterns, build predictive models, and validate findings through rigorous testing.
                </p>
              </div>

              <div className={styles.workflowCard}>
                <div className={styles.workflowIconWrapper}>
                  <svg className={styles.workflowIcon} fill="#879f85" viewBox="0 0 24 24">
                    <path d="M3 13h2v7H3v-7zm4-6h2v13H7V7zm4 3h2v10h-2V10zm4-2h2v12h-2V8zm4 4h2v8h-2v-8z"/>
                    <circle cx="5" cy="11" r="1.5" fill="#879f85"/>
                    <circle cx="9" cy="5" r="1.5" fill="#879f85"/>
                    <circle cx="13" cy="8" r="1.5" fill="#879f85"/>
                    <circle cx="17" cy="6" r="1.5" fill="#879f85"/>
                    <circle cx="21" cy="10" r="1.5" fill="#879f85"/>
                  </svg>
                </div>
                <h3 className={styles.workflowTitle}>Insights & Action</h3>
                <p className={styles.workflowDescription}>
                  Translate complex findings into clear visualizations and actionable recommendations that drive strategic business decisions and measurable outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Areas of Interest Section */}
        <section className={styles.areasSection}>
          <div className={styles.areasContainer}>
            <h2 className={styles.areasTitle}>Areas of Interest</h2>
            <p className={styles.areasSubtitle}>Take a look at some of the things I love working on.</p>
            
            <div className={styles.areasGrid}>
              <div className={styles.areaCard}>
                <div className={styles.areaIcon}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className={styles.areaTitle}>Data Analysis and Visualization</h3>
                <p className={styles.areaDescription}>
                  I love telling a story. Making a beautiful and compelling presentation is one of my favorite skills.
                </p>
              </div>

              <div className={styles.areaCard}>
                <div className={styles.areaIcon}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className={styles.areaTitle}>Deep Learning</h3>
                <p className={styles.areaDescription}>
                  Machine learning is more than an API call to scikit-learn. I love the math and theory as well as the implementation.
                </p>
              </div>

              <div className={styles.areaCard}>
                <div className={styles.areaIcon}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className={styles.areaTitle}>Full-Stack Development</h3>
                <p className={styles.areaDescription}>
                  I have experience creating interactive tools and dashboards online using modern frameworks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContainer}>
            <h2 className={styles.ctaTitle}>Let's work together on your next project</h2>
            <p className={styles.ctaText}>
              Interested in collaborating? Get in touch with me.
            </p>
            {/* Contact Me CTA Button - Tracks when clicked */}
            <Link 
              href="/contact" 
              className={styles.ctaButton}
              onClick={handleContactCTA} // Tracks the CTA button click
            >
              Contact Me
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
