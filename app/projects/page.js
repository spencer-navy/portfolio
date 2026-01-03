'use client'

import { useState } from 'react';
import Navigation from '../../components/Navigation';
import styles from './Projects.module.css';
import { event } from '@/lib/gtag'; // Keep Google Analytics
import { trackEvent } from '@/lib/trackEvent'; // Add MongoDB tracking

export default function Projects() {
    // State to track which filter button is currently active
    // Starts with 'all' to show everything by default
    const [activeFilter, setActiveFilter] = useState('all');

    // Array of all available filter options
    // 'id' is used programmatically, 'label' is what users see
    const filters = [
        { id: 'all', label: 'All' },
        { id: 'python', label: 'Python' },
        { id: 'tableau', label: 'Tableau' },
        { id: 'sql', label: 'SQL' },
        { id: 'ml', label: 'Machine Learning' },
        { id: 'gis', label: 'GIS' }
    ];

    // Define all projects with their metadata
    // Each project has:
    // - id: unique identifier for tracking
    // - title: project name
    // - description: what the project does
    // - tags: lowercase filter IDs this project matches (used for filtering)
    // - displayTags: formatted tags shown to users (can be different from filter names)
    const allProjects = [
        {
            id: 'proj_001',
            title: 'Marketing Analytics Dashboard',
            description: 'Interactive dashboard analyzing customer behavior and campaign performance using Python and Tableau.',
            tags: ['python', 'tableau', 'sql'],  // Matches 'python', 'tableau', 'sql' filters
            displayTags: ['Python', 'Tableau', 'SQL']  // What user sees as tags
        },
        {
            id: 'proj_002',
            title: 'Geospatial ML Pipeline',
            description: 'Automated pipeline for satellite imagery classification supporting national security objectives.',
            tags: ['python', 'ml', 'gis'],  // Matches 'python', 'ml', 'gis' filters
            displayTags: ['Python', 'TensorFlow', 'GIS']
        },
        {
            id: 'proj_003',
            title: 'Statistical Learning Models',
            description: 'Applied GAMs, SVMs, and tree-based methods for predictive modeling and analysis.',
            tags: ['ml'],  // Only matches 'ml' filter
            displayTags: ['R', 'Statistical Modeling']
        },
        {
            id: 'proj_004',
            title: 'Data Engineering Pipeline',
            description: 'Scalable ETL pipeline processing geospatial data with OGC standards and OpenShift deployment.',
            tags: ['python', 'sql', 'gis'],  // Matches 'python', 'sql', 'gis' filters
            displayTags: ['Python', 'SQL', 'GeoServer']
        }
    ];

    // Define all visualizations with their metadata
    // Structure is similar to projects but simpler (fewer fields)
    const allVisualizations = [
        {
            id: 'viz_001',
            title: 'Sales Performance Dashboard',
            description: 'Interactive Tableau dashboard tracking KPIs',
            tags: ['tableau']  // Only matches 'tableau' filter
        },
        {
            id: 'viz_002',
            title: 'Customer Segmentation Analysis',
            description: 'Python-based clustering visualization',
            tags: ['python', 'ml']  // Matches 'python' and 'ml' filters
        },
        {
            id: 'viz_003',
            title: 'Geospatial Heatmap',
            description: 'Geographic data distribution analysis',
            tags: ['python', 'gis']  // Matches 'python' and 'gis' filters
        },
        {
            id: 'viz_004',
            title: 'Time Series Forecasting',
            description: 'Predictive analytics dashboard',
            tags: ['python', 'ml']  // Matches 'python' and 'ml' filters
        },
        {
            id: 'viz_005',
            title: 'Network Graph Analysis',
            description: 'Relationship mapping visualization',
            tags: ['python']  // Only matches 'python' filter
        },
        {
            id: 'viz_006',
            title: 'Statistical Model Results',
            description: 'R-based statistical visualization',
            tags: ['ml']  // Only matches 'ml' filter
        }
    ];

    // Filter projects based on which filter button is active
    // If activeFilter is 'all', show everything
    // Otherwise, only show projects where the tags array includes the activeFilter
    // Example: if activeFilter is 'python', only show projects with 'python' in their tags array
    const filteredProjects = activeFilter === 'all' 
        ? allProjects  // Show all projects
        : allProjects.filter(project => project.tags.includes(activeFilter));  // Show only matching projects

    // Filter visualizations using the same logic as projects
    const filteredVisualizations = activeFilter === 'all'
        ? allVisualizations  // Show all visualizations
        : allVisualizations.filter(viz => viz.tags.includes(activeFilter));  // Show only matching visualizations

    // Handle when user clicks a filter button
    const handleFilterClick = (filterId, filterLabel) => {
        // Update which filter is active (this triggers re-render with new filtered results)
        setActiveFilter(filterId);
        
        // Calculate how many items match this filter for tracking purposes
        // This tells us how useful each filter is (filters with 0 results might need attention)
        
        // Count projects that match this filter
        // If filter is 'all', count all projects
        // Otherwise, count only projects that have this filterId in their tags
        const projectCount = filterId === 'all' 
            ? allProjects.length 
            : allProjects.filter(p => p.tags.includes(filterId)).length;
        
        // Count visualizations that match this filter (same logic)
        const vizCount = filterId === 'all'
            ? allVisualizations.length
            : allVisualizations.filter(v => v.tags.includes(filterId)).length;
        
        // Total items matching this filter
        const totalCount = projectCount + vizCount;
        
        // Track in Google Analytics (keep existing tracking)
        event({
            action: 'filter_click',
            category: 'Projects',
            label: `Filter: ${filterLabel}`,
        });
        
        // Track in MongoDB (new) - captures much more detail
        // This data lets us analyze:
        // - Which filters are most popular
        // - Which filters return the most/least results
        // - Whether users find what they're looking for after filtering
        trackEvent('filter_click', {
            filterType: 'technology',
            filterValue: filterLabel,
            filterId: filterId,
            resultCount: totalCount,      // Total items shown
            projectCount: projectCount,   // How many projects matched
            vizCount: vizCount            // How many visualizations matched
        });
    };

    // Handle when user clicks on a project card
    const handleProjectClick = (projectTitle, projectId) => {
        // Track in Google Analytics (keep existing)
        event({
            action: 'project_click',
            category: 'Projects',
            label: projectTitle,
        });
        
        // Track in MongoDB (new)
        // By tracking activeFilter, we can see:
        // - Do users click projects after filtering, or with 'all' view?
        // - Which filters lead to the most project clicks?
        trackEvent('project_click', {
            projectTitle: projectTitle,
            projectId: projectId,
            activeFilter: activeFilter  // Track what filter was active when they clicked
        });
    };

    // Handle when user clicks on a visualization card
    const handleVizClick = (vizTitle, vizId) => {
        // Track in Google Analytics (keep existing)
        event({
            action: 'visualization_click',
            category: 'Projects',
            label: vizTitle,
        });
        
        // Track in MongoDB (new)
        // Same logic as project clicks - track which filter was active
        trackEvent('visualization_click', {
            vizTitle: vizTitle,
            vizId: vizId,
            activeFilter: activeFilter  // Track what filter was active when they clicked
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

                    {/* Filter Buttons Section */}
                    {/* Maps over the filters array to create a button for each filter */}
                    <div className={styles.filterContainer}>
                        {filters.map(filter => (
                            <button
                                key={filter.id}  // React needs unique keys for list items
                                onClick={() => handleFilterClick(filter.id, filter.label)}  // Triggers filtering and tracking
                                // Apply active styling if this filter is currently selected
                                // Uses template literal to combine base class with conditional active class
                                className={`${styles.filterButton} ${activeFilter === filter.id ? styles.filterButtonActive : ''}`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {/* Projects Section */}
                    <section className={styles.projectsSection}>
                        <div className={styles.projectGrid}>
                            {/* Render filtered projects (NOT all projects) */}
                            {/* This array changes when activeFilter changes, causing automatic re-render */}
                            {/* .map() creates a project card for each item in filteredProjects */}
                            {filteredProjects.map(project => (
                                <div 
                                    key={project.id}  // Unique key for React
                                    className={styles.projectCard}
                                    onClick={() => handleProjectClick(project.title, project.id)}  // Track clicks
                                >
                                    <div className={styles.projectContent}>
                                        <h3 className={styles.projectTitle}>{project.title}</h3>
                                        <p className={styles.projectDescription}>
                                            {project.description}
                                        </p>
                                        {/* Display tags for this project */}
                                        <div className={styles.tags}>
                                            {/* Map over displayTags to create a span for each tag */}
                                            {project.displayTags.map(tag => (
                                                <span key={tag} className={styles.tag}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Data Visualizations Section */}
                    <section className={styles.visualizationsSection}>
                        <h2 className={styles.sectionTitle}>Data Visualizations & Dashboards</h2>
                        
                        <div className={styles.vizGrid}>
                            {/* Render filtered visualizations (NOT all visualizations) */}
                            {/* Same filtering logic as projects */}
                            {filteredVisualizations.map(viz => (
                                <div 
                                    key={viz.id}  // Unique key for React
                                    className={styles.vizCard}
                                    onClick={() => handleVizClick(viz.title, viz.id)}  // Track clicks
                                >
                                    <div className={styles.vizImagePlaceholder}>
                                        {/* Show viz ID as placeholder text until you add real images */}
                                        <span className={styles.placeholderText}>{viz.id}</span>
                                    </div>
                                    <div className={styles.vizInfo}>
                                        <h3 className={styles.vizTitle}>{viz.title}</h3>
                                        <p className={styles.vizDescription}>{viz.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}