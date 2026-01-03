'use client'

import { useState } from 'react';
import Navigation from '../../components/Navigation';
import styles from './Projects.module.css';
import { event } from '@/lib/gtag'; // Import the Google Analytics event tracking function

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState('all');

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'python', label: 'Python' },
        { id: 'tableau', label: 'Tableau' },
        { id: 'sql', label: 'SQL' },
        { id: 'ml', label: 'Machine Learning' },
        { id: 'gis', label: 'GIS' }
    ];

    // Track when user clicks a filter button
    const handleFilterClick = (filterId, filterLabel) => {
        setActiveFilter(filterId);
        event({
            action: 'filter_click',              // Action: filter button clicked
            category: 'Projects',                 // Category: Projects page interactions
            label: `Filter: ${filterLabel}`,     // Label: which filter was clicked
        });
    };

    // Track when user clicks on a project card
    const handleProjectClick = (projectTitle) => {
        event({
            action: 'project_click',             // Action: project card clicked
            category: 'Projects',                 // Category: Projects page interactions
            label: projectTitle,                  // Label: which project was clicked
        });
    };

    // Track when user clicks on a visualization card
    const handleVizClick = (vizTitle) => {
        event({
            action: 'visualization_click',       // Action: visualization card clicked
            category: 'Projects',                 // Category: Projects page interactions
            label: vizTitle,                      // Label: which visualization was clicked
        });
    };

    return (
        <>
            <Navigation />
            
            <main className={styles.main}>
                <div className={styles.container}>
                    <section className={styles.hero}>
                        <h1 className={styles.heroTitle}>Projects</h1>
                        <p className={styles.heroSubtitle}>
                            Showcasing data science, machine learning, and analytics work
                        </p>
                    </section>

                    {/* Filter Buttons - Each tracks when clicked */}
                    <div className={styles.filterContainer}>
                        {filters.map(filter => (
                            <button
                                key={filter.id}
                                onClick={() => handleFilterClick(filter.id, filter.label)} // Tracks filter click
                                className={`${styles.filterButton} ${activeFilter === filter.id ? styles.filterButtonActive : ''}`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    <section className={styles.projectsSection}>
                        <div className={styles.projectGrid}>
                            {/* Project Card 1 - Tracks when clicked */}
                            <div 
                                className={styles.projectCard}
                                onClick={() => handleProjectClick('Marketing Analytics Dashboard')} // Tracks project click
                            >
                                <div className={styles.projectContent}>
                                    <h3 className={styles.projectTitle}>Marketing Analytics Dashboard</h3>
                                    <p className={styles.projectDescription}>
                                        Interactive dashboard analyzing customer behavior and campaign performance using Python and Tableau.
                                    </p>
                                    <div className={styles.tags}>
                                        <span className={styles.tag}>Python</span>
                                        <span className={styles.tag}>Tableau</span>
                                        <span className={styles.tag}>SQL</span>
                                    </div>
                                </div>
                            </div>

                            {/* Project Card 2 - Tracks when clicked */}
                            <div 
                                className={styles.projectCard}
                                onClick={() => handleProjectClick('Geospatial ML Pipeline')} // Tracks project click
                            >
                                <div className={styles.projectContent}>
                                    <h3 className={styles.projectTitle}>Geospatial ML Pipeline</h3>
                                    <p className={styles.projectDescription}>
                                        Automated pipeline for satellite imagery classification supporting national security objectives.
                                    </p>
                                    <div className={styles.tags}>
                                        <span className={styles.tag}>Python</span>
                                        <span className={styles.tag}>TensorFlow</span>
                                        <span className={styles.tag}>GIS</span>
                                    </div>
                                </div>
                            </div>

                            {/* Project Card 3 - Tracks when clicked */}
                            <div 
                                className={styles.projectCard}
                                onClick={() => handleProjectClick('Statistical Learning Models')} // Tracks project click
                            >
                                <div className={styles.projectContent}>
                                    <h3 className={styles.projectTitle}>Statistical Learning Models</h3>
                                    <p className={styles.projectDescription}>
                                        Applied GAMs, SVMs, and tree-based methods for predictive modeling and analysis.
                                    </p>
                                    <div className={styles.tags}>
                                        <span className={styles.tag}>R</span>
                                        <span className={styles.tag}>Statistical Modeling</span>
                                    </div>
                                </div>
                            </div>

                            {/* Project Card 4 - Tracks when clicked */}
                            <div 
                                className={styles.projectCard}
                                onClick={() => handleProjectClick('Data Engineering Pipeline')} // Tracks project click
                            >
                                <div className={styles.projectContent}>
                                    <h3 className={styles.projectTitle}>Data Engineering Pipeline</h3>
                                    <p className={styles.projectDescription}>
                                        Scalable ETL pipeline processing geospatial data with OGC standards and OpenShift deployment.
                                    </p>
                                    <div className={styles.tags}>
                                        <span className={styles.tag}>Python</span>
                                        <span className={styles.tag}>SQL</span>
                                        <span className={styles.tag}>GeoServer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Data Visualizations Section */}
                    <section className={styles.visualizationsSection}>
                        <h2 className={styles.sectionTitle}>Data Visualizations & Dashboards</h2>
                        
                        <div className={styles.vizGrid}>
                            {/* Visualization Card 1 - Tracks when clicked */}
                            <div 
                                className={styles.vizCard}
                                onClick={() => handleVizClick('Sales Performance Dashboard')} // Tracks viz click
                            >
                                <div className={styles.vizImagePlaceholder}>
                                    <span className={styles.placeholderText}>Visualization 1</span>
                                </div>
                                <div className={styles.vizInfo}>
                                    <h3 className={styles.vizTitle}>Sales Performance Dashboard</h3>
                                    <p className={styles.vizDescription}>Interactive Tableau dashboard tracking KPIs</p>
                                </div>
                            </div>

                            {/* Visualization Card 2 - Tracks when clicked */}
                            <div 
                                className={styles.vizCard}
                                onClick={() => handleVizClick('Customer Segmentation Analysis')} // Tracks viz click
                            >
                                <div className={styles.vizImagePlaceholder}>
                                    <span className={styles.placeholderText}>Visualization 2</span>
                                </div>
                                <div className={styles.vizInfo}>
                                    <h3 className={styles.vizTitle}>Customer Segmentation Analysis</h3>
                                    <p className={styles.vizDescription}>Python-based clustering visualization</p>
                                </div>
                            </div>

                            {/* Visualization Card 3 - Tracks when clicked */}
                            <div 
                                className={styles.vizCard}
                                onClick={() => handleVizClick('Geospatial Heatmap')} // Tracks viz click
                            >
                                <div className={styles.vizImagePlaceholder}>
                                    <span className={styles.placeholderText}>Visualization 3</span>
                                </div>
                                <div className={styles.vizInfo}>
                                    <h3 className={styles.vizTitle}>Geospatial Heatmap</h3>
                                    <p className={styles.vizDescription}>Geographic data distribution analysis</p>
                                </div>
                            </div>

                            {/* Visualization Card 4 - Tracks when clicked */}
                            <div 
                                className={styles.vizCard}
                                onClick={() => handleVizClick('Time Series Forecasting')} // Tracks viz click
                            >
                                <div className={styles.vizImagePlaceholder}>
                                    <span className={styles.placeholderText}>Visualization 4</span>
                                </div>
                                <div className={styles.vizInfo}>
                                    <h3 className={styles.vizTitle}>Time Series Forecasting</h3>
                                    <p className={styles.vizDescription}>Predictive analytics dashboard</p>
                                </div>
                            </div>

                            {/* Visualization Card 5 - Tracks when clicked */}
                            <div 
                                className={styles.vizCard}
                                onClick={() => handleVizClick('Network Graph Analysis')} // Tracks viz click
                            >
                                <div className={styles.vizImagePlaceholder}>
                                    <span className={styles.placeholderText}>Visualization 5</span>
                                </div>
                                <div className={styles.vizInfo}>
                                    <h3 className={styles.vizTitle}>Network Graph Analysis</h3>
                                    <p className={styles.vizDescription}>Relationship mapping visualization</p>
                                </div>
                            </div>

                            {/* Visualization Card 6 - Tracks when clicked */}
                            <div 
                                className={styles.vizCard}
                                onClick={() => handleVizClick('Statistical Model Results')} // Tracks viz click
                            >
                                <div className={styles.vizImagePlaceholder}>
                                    <span className={styles.placeholderText}>Visualization 6</span>
                                </div>
                                <div className={styles.vizInfo}>
                                    <h3 className={styles.vizTitle}>Statistical Model Results</h3>
                                    <p className={styles.vizDescription}>R-based statistical visualization</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}