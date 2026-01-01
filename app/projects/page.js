'use client'

import { useState } from 'react';
import Navigation from '../../components/Navigation';
import styles from './Projects.module.css';

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

                    {/* Filter Buttons */}
                    <div className={styles.filterContainer}>
                        {filters.map(filter => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`${styles.filterButton} ${activeFilter === filter.id ? styles.filterButtonActive : ''}`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    <section className={styles.projectsSection}>
                        <div className={styles.projectGrid}>
                            <div className={styles.projectCard}>
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

                            <div className={styles.projectCard}>
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

                            <div className={styles.projectCard}>
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

                            <div className={styles.projectCard}>
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
                            <div className={styles.vizCard}>
                                <div className={styles.vizImagePlaceholder}>
                                    <span className={styles.placeholderText}>Visualization 1</span>
                                </div>
                                <div className={styles.vizInfo}>
                                    <h3 className={styles.vizTitle}>Sales Performance Dashboard</h3>
                                    <p className={styles.vizDescription}>Interactive Tableau dashboard tracking KPIs</p>
                                </div>
                            </div>

                            <div className={styles.vizCard}>
                                <div className={styles.vizImagePlaceholder}>
                                    <span className={styles.placeholderText}>Visualization 2</span>
                                </div>
                                <div className={styles.vizInfo}>
                                    <h3 className={styles.vizTitle}>Customer Segmentation Analysis</h3>
                                    <p className={styles.vizDescription}>Python-based clustering visualization</p>
                                </div>
                            </div>

                            <div className={styles.vizCard}>
                                <div className={styles.vizImagePlaceholder}>
                                    <span className={styles.placeholderText}>Visualization 3</span>
                                </div>
                                <div className={styles.vizInfo}>
                                    <h3 className={styles.vizTitle}>Geospatial Heatmap</h3>
                                    <p className={styles.vizDescription}>Geographic data distribution analysis</p>
                                </div>
                            </div>

                            <div className={styles.vizCard}>
                                <div className={styles.vizImagePlaceholder}>
                                    <span className={styles.placeholderText}>Visualization 4</span>
                                </div>
                                <div className={styles.vizInfo}>
                                    <h3 className={styles.vizTitle}>Time Series Forecasting</h3>
                                    <p className={styles.vizDescription}>Predictive analytics dashboard</p>
                                </div>
                            </div>

                            <div className={styles.vizCard}>
                                <div className={styles.vizImagePlaceholder}>
                                    <span className={styles.placeholderText}>Visualization 5</span>
                                </div>
                                <div className={styles.vizInfo}>
                                    <h3 className={styles.vizTitle}>Network Graph Analysis</h3>
                                    <p className={styles.vizDescription}>Relationship mapping visualization</p>
                                </div>
                            </div>

                            <div className={styles.vizCard}>
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