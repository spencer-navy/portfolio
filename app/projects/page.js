'use client'

import { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import styles from './Projects.module.css';
import { event } from '@/lib/gtag'; // Keep Google Analytics
import { trackEvent } from '@/lib/trackEvent'; // Add MongoDB tracking

export default function Projects() {
    // Track page view when component mounts
    useEffect(() => {
        trackEvent('page_view', {
            page: 'projects'
        });
    }, []);

    // State to track which filter button is currently active
    // Starts with 'all' to show everything by default
    const [activeFilter, setActiveFilter] = useState('all');

    // Array of all available filter options
    // 'id' is used programmatically, 'label' is what users see
    const filters = [
        { id: 'all', label: 'All' },
        { id: 'python', label: 'Python' },
        { id: 'js', label: 'JavaScript' },
        { id: 'tableau', label: 'Tableau' },
        { id: 'sql', label: 'SQL/NoSQL' },
        { id: 'ml', label: 'Machine Learning' },
        { id: 'gis', label: 'Geospatial' },
        { id: 'data-eng', label: 'Data Engineering' }
    ];

    // SINGLE SOURCE OF TRUTH: Technology Registry
    // Define each technology ONCE with:
    // - display: what users see on the card (e.g., 'TensorFlow')
    // - filters: which filter buttons should show projects with this tech
    //
    // When you add a new technology, add ONE entry here
    // Then use lowercase IDs in your projects: techIds: ['mongodb', 'python']
    const techRegistry = {
        // Databases
        'mongodb': {
            display: 'MongoDB',
            filters: ['sql', 'data-eng']
        },
        'sql': {
            display: 'SQL',
            filters: ['sql', 'data-eng']
        },
        'postgresql': {
            display: 'PostgreSQL',
            filters: ['sql', 'data-eng']
        },
        'mysql': {
            display: 'MySQL',
            filters: ['sql', 'data-eng']
        },
        'nosql': {
            display: 'NoSQL',
            filters: ['sql', 'data-eng']
        },
        
        // Programming Languages
        'python': {
            display: 'Python',
            filters: ['python']
        },
        'javascript': {
            display: 'JavaScript',
            filters: ['js']
        },
        'typescript': {
            display: 'TypeScript',
            filters: ['js']
        },
        'r': {
            display: 'R',
            filters: ['ml']
        },
        
        // JavaScript Frameworks & Libraries
        'nodejs': {
            display: 'Node.js',
            filters: ['js']
        },
        'nextjs': {
            display: 'Next.js',
            filters: ['js']
        },
        'react': {
            display: 'React',
            filters: ['js']
        },
        
        // Visualization Tools
        'tableau': {
            display: 'Tableau',
            filters: ['tableau']
        },
        'matplotlib': {
            display: 'Matplotlib',
            filters: ['python']
        },
        'seaborn': {
            display: 'Seaborn',
            filters: ['python']
        },
        'plotly': {
            display: 'Plotly Dash',
            filters: ['python']
        },
        
        // ML Frameworks
        'tensorflow': {
            display: 'TensorFlow',
            filters: ['ml', 'python']
        },
        'pytorch': {
            display: 'PyTorch',
            filters: ['ml', 'python']
        },
        'scikit-learn': {
            display: 'scikit-learn',
            filters: ['ml', 'python']
        },
        'statistical-modeling': {
            display: 'Statistical Modeling',
            filters: ['ml']
        },
        
        // Geospatial
        'gis': {
            display: 'GIS',
            filters: ['gis', 'data-eng']
        },
        'geoserver': {
            display: 'GeoServer',
            filters: ['gis', 'data-eng']
        },
        
        // Data Engineering
        'etl': {
            display: 'ETL',
            filters: ['data-eng']
        },
        'data-engineering': {
            display: 'Data Engineering',
            filters: ['data-eng']
        },
        'data-pipeline': {
            display: 'Data Pipeline',
            filters: ['data-eng']
        }
    };

    // Helper function: Takes lowercase tech IDs and returns formatted display names
    // Example: ['mongodb', 'python'] → ['MongoDB', 'Python']
    //
    // How it works:
    // 1. Loop through each tech ID
    // 2. Look it up in techRegistry to get the display name
    // 3. The "?." is optional chaining - safely handles missing tech IDs
    // 4. filter(Boolean) removes any undefined values (if a tech ID doesn't exist)
    const computeDisplayTags = (techIds) => {
        return techIds
            .map(techId => techRegistry[techId]?.display)  // Look up display name
            .filter(Boolean);  // Remove undefined values
    };

    // Helper function: Takes lowercase tech IDs and returns filter IDs
    // Example: ['mongodb', 'python'] → ['sql', 'data-eng', 'python']
    //
    // How it works:
    // 1. Create a Set to automatically avoid duplicate filter IDs
    // 2. Loop through each tech ID
    // 3. Look it up in techRegistry to get its filter IDs
    // 4. Add all filter IDs to the Set
    // 5. Convert Set back to array
    const computeFilterTags = (techIds) => {
        const filterTags = new Set();  // Use Set to automatically avoid duplicates
        
        techIds.forEach(techId => {
            // Look up this tech in the registry
            const tech = techRegistry[techId];
            
            // If tech exists and has filters defined
            if (tech && tech.filters) {
                // Add all its filter IDs to the set
                // Example: If tech.filters is ['ml', 'python'], add both to set
                tech.filters.forEach(filterId => filterTags.add(filterId));
            }
        });
        
        // Convert Set to array and return
        // Set automatically removed any duplicates
        return Array.from(filterTags);
    };

    // Define all projects using ONLY lowercase tech IDs
    // displayTags and filterTags are computed automatically from techRegistry
    //
    // Each project has:
    // - id: unique identifier for tracking
    // - title: project name
    // - description: what the project does
    // - techIds: lowercase technology identifiers (e.g., ['mongodb', 'python'])
    // - displayTags: (auto-computed) formatted names shown on card
    // - tags: (auto-computed) filter IDs that determine which filters show this project
    const rawProjects = [
        {
            id: 'proj_001',
            title: 'Marketing Analytics Dashboard',
            description: 'Interactive dashboard analyzing customer behavior and campaign performance using Python and Tableau.',
            techIds: ['python', 'tableau', 'sql', 'postgresql']
            // Auto-computed: displayTags = ['Python', 'Tableau', 'SQL', 'PostgreSQL']
            // Auto-computed: filterTags = ['python', 'tableau', 'sql', 'data-eng']
        },
        {
            id: 'proj_002',
            title: 'Geospatial ML Pipeline',
            description: 'Automated pipeline for satellite imagery classification supporting national security objectives.',
            techIds: ['python', 'tensorflow', 'gis']
            // Auto-computed: displayTags = ['Python', 'TensorFlow', 'GIS']
            // Auto-computed: filterTags = ['python', 'ml', 'gis', 'data-eng']
        },
        {
            id: 'proj_003',
            title: 'Statistical Learning Models',
            description: 'Applied GAMs, SVMs, and tree-based methods for predictive modeling and analysis.',
            techIds: ['statistical-modeling']
            // Auto-computed: displayTags = ['Statistical Modeling']
            // Auto-computed: filterTags = ['ml']
        },
        {
            id: 'proj_004',
            title: 'Data Engineering Pipeline',
            description: 'Scalable ETL pipeline processing geospatial data with OGC standards and OpenShift deployment.',
            techIds: ['python', 'sql']
            // Auto-computed: displayTags = ['Python', 'SQL']
            // Auto-computed: filterTags = ['python', 'sql', 'data-eng']
        },
        {
            id: 'proj_005',
            title: 'Real-Time Event Analytics Pipeline',
            description: 'Event tracking system that captures user interactions across the portfolio site and stores behavioral data in MongoDB. Built with a flexible NoSQL schema designed to support future machine learning recommendation features.',
            techIds: ['mongodb', 'data-engineering', 'nosql', 'nextjs', 'nodejs'],
            // Auto-computed: displayTags = ['MongoDB', 'Data Engineering', 'NoSQL']
            // Auto-computed: filterTags = ['sql', 'data-eng']
            link: '/projects/real-time-event-analytics',
            isLive: true  // ADD THIS LINE - marks this project as live
        }
    ];

    // Process raw projects: add computed displayTags and filterTags
    // The spread operator (...) copies all existing fields
    // Then we add two new computed fields based on techIds
    //
    // Example transformation:
    // Input:  { id: 'proj_005', title: '...', techIds: ['mongodb', 'python'] }
    // Output: { id: 'proj_005', title: '...', techIds: ['mongodb', 'python'], 
    //           displayTags: ['MongoDB', 'Python'], tags: ['sql', 'data-eng', 'python'] }
    const allProjects = rawProjects.map(project => ({
        ...project,  // Copy all existing fields (id, title, description, techIds)
        displayTags: computeDisplayTags(project.techIds),  // Add computed display tags
        tags: computeFilterTags(project.techIds)  // Add computed filter tags
    }));

    // Define all visualizations using ONLY lowercase tech IDs
    // Visualizations have techIds for filtering but DON'T display them as badges on cards
    // They're still used to determine which filters show the visualization
    const rawVisualizations = [
        {
            id: 'viz_001',
            title: 'Sales Performance Dashboard',
            description: 'Interactive Tableau dashboard tracking KPIs',
            techIds: ['tableau']
            // Auto-computed: filterTags = ['tableau']
        },
        {
            id: 'viz_002',
            title: 'Customer Segmentation Analysis',
            description: 'Python-based clustering visualization',
            techIds: ['python', 'scikit-learn']
            // Auto-computed: filterTags = ['python', 'ml']
        },
        {
            id: 'viz_003',
            title: 'Geospatial Heatmap',
            description: 'Geographic data distribution analysis',
            techIds: ['python', 'gis']
            // Auto-computed: filterTags = ['python', 'gis', 'data-eng']
        },
        {
            id: 'viz_004',
            title: 'Time Series Forecasting',
            description: 'Predictive analytics dashboard',
            techIds: ['python', 'statistical-modeling']
            // Auto-computed: filterTags = ['python', 'ml']
        },
        {
            id: 'viz_005',
            title: 'Network Graph Analysis',
            description: 'Relationship mapping visualization',
            techIds: ['python']
            // Auto-computed: filterTags = ['python']
        },
        {
            id: 'viz_006',
            title: 'Statistical Model Results',
            description: 'Python-based statistical visualization',
            techIds: ['statistical-modeling', 'python']
            // Auto-computed: filterTags = ['ml', 'python']
        }
    ];

    // Process visualizations: add computed filterTags
    // (displayTags also computed but not used in visualization rendering)
    const allVisualizations = rawVisualizations.map(viz => ({
        ...viz,  // Copy all existing fields
        tags: computeFilterTags(viz.techIds)  // Add computed filter tags
    }));

    // Filter projects based on which filter button is active
    // If activeFilter is 'all', show everything
    // Otherwise, only show projects where the computed tags array includes the activeFilter
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
        // Otherwise, count only projects that have this filterId in their computed tags
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
                            Coming soon: In-depth case studies on data science, machine learning, and analytics projects
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
                                    onClick={() => {
                                        handleProjectClick(project.title, project.id);
                                        // If project has a detail page, navigate to it
                                        if (project.link) {
                                            window.location.href = project.link;
                                        }
                                    }}
                                    style={project.link ? { cursor: 'pointer' } : {}}  // Show clickable cursor if has link     
                                >
                                    <div className={styles.projectContent}>
                                        {/* Add Live badge at the top if project has isLive flag */}
                                        {project.isLive && (
                                            <div style={{marginBottom: '1rem'}}>
                                                <span className={styles.liveBadge}>
                                                    <span className={styles.liveDot}></span>
                                                    Live Now
                                                </span>
                                            </div>
                                        )}

                                        <h3 className={styles.projectTitle}>{project.title}</h3>
                                        <p className={styles.projectDescription}>
                                            {project.description}
                                        </p>
                                        {/* Display tags for this project */}
                                        <div className={styles.tags}>
                                            {/* Map over computed displayTags to create a span for each tag */}
                                            {/* displayTags were auto-computed from techIds via techRegistry */}
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
                                        {/* Visualizations don't display tech badges - only used for filtering */}
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