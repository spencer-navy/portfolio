'use client'

import { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import AnalyticsNetworkViz from '../../components/AnalyticsNetworkViz';
import NetworkGraphViz from '../../components/NetworkGraphViz';
import VizModal from '../../components/VizModal';
import styles from './Projects.module.css';
import { event } from '@/lib/gtag';
import { trackEvent } from '@/lib/trackEvent';

export default function Projects() {
    useEffect(() => {
        trackEvent('page_view', {
            page: 'projects'
        });
    }, []);

    const [activeFilter, setActiveFilter] = useState('all');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedViz, setSelectedViz] = useState(null);

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

    const techRegistry = {
        'mongodb': { display: 'MongoDB', filters: ['sql', 'data-eng'] },
        'ml': { display: 'Machine Learning', filters: ['ml'] },
        'sql': { display: 'SQL', filters: ['sql', 'data-eng'] },
        'postgresql': { display: 'PostgreSQL', filters: ['sql', 'data-eng'] },
        'mysql': { display: 'MySQL', filters: ['sql', 'data-eng'] },
        'nosql': { display: 'NoSQL', filters: ['sql', 'data-eng'] },
        'python': { display: 'Python', filters: ['python'] },
        'javascript': { display: 'JavaScript', filters: ['js'] },
        'typescript': { display: 'TypeScript', filters: ['js'] },
        'r': { display: 'R', filters: ['ml'] },
        'nodejs': { display: 'Node.js', filters: ['js'] },
        'nextjs': { display: 'Next.js', filters: ['js'] },
        'react': { display: 'React', filters: ['js'] },
        'tableau': { display: 'Tableau', filters: ['tableau'] },
        'matplotlib': { display: 'Matplotlib', filters: ['python'] },
        'seaborn': { display: 'Seaborn', filters: ['python'] },
        'plotly': { display: 'Plotly Dash', filters: ['python'] },
        'geopandas': { display: 'GeoPandas', filters: ['gis', 'python'] },
        'time-series-forecasting': { display: 'Time Series Forecasting', filters: ['ml', 'python'] },
        'tensorflow': { display: 'TensorFlow', filters: ['ml', 'python'] },
        'pytorch': { display: 'PyTorch', filters: ['ml', 'python'] },
        'scikit-learn': { display: 'scikit-learn', filters: ['ml', 'python'] },
        'statistical-modeling': { display: 'Statistical Modeling', filters: ['ml'] },
        'gis': { display: 'GIS', filters: ['gis', 'data-eng'] },
        'geoserver': { display: 'GeoServer', filters: ['gis', 'data-eng'] },
        'etl': { display: 'ETL', filters: ['data-eng'] },
        'data-engineering': { display: 'Data Engineering', filters: ['data-eng'] },
        'data-pipeline': { display: 'Data Pipeline', filters: ['data-eng'] },
        'plotly/dash': { display: 'Plotly Dash', filters: ['python'] }
    };

    const computeDisplayTags = (techIds) => {
        return techIds.map(techId => techRegistry[techId]?.display).filter(Boolean);
    };

    const computeFilterTags = (techIds) => {
        const filterTags = new Set();
        techIds.forEach(techId => {
            const tech = techRegistry[techId];
            if (tech && tech.filters) {
                tech.filters.forEach(filterId => filterTags.add(filterId));
            }
        });
        return Array.from(filterTags);
    };

    const rawProjects = [
        {
            id: 'proj_001',
            title: 'Marketing Mix Modeling & Channel Attribution',
            description: 'Advanced statistical analysis of multi-channel DTC e-commerce campaigns using Marketing Mix Modeling (MMM) to quantify incremental impact, optimize budget allocation, and maximize return on ad spend across paid search, social media, display advertising, email, and affiliate channels',
            techIds: ['r', 'statistical-modeling', 'python', 'sql'],
            link: '/projects/mixed-marketing-modeling',
            techIds: ['python', 'sql', 'ml', 'statistical-modeling'],
            progress: 80
        },
        {
            id: 'proj_003',
            title: 'Predictive Customer Churn Model & Retention Strategy',
            description: 'End-to-end classification model predicting customer churn with ROI-optimized retention targeting strategy',
            techIds: ['statistical-modeling', 'python', 'sql', 'ml', 'scikit-learn'],
            progress: 0
        },

        {
            id: 'proj_005',
            title: 'Real-Time Event Analytics Pipeline',
            description: 'Event tracking system that captures user interactions across the portfolio site and stores behavioral data in MongoDB. Built with a flexible NoSQL schema designed to support future machine learning recommendation features',
            techIds: ['mongodb', 'data-engineering', 'nosql', 'nextjs', 'nodejs'],
            link: '/projects/real-time-event-analytics',
            isLive: true
        },
        {
            id: 'proj_006',
            title: 'Maritime Anomaly Detection & Pattern-of-Life Analysis',
            description: 'Anomalous maritime geospatial ML system detecting illicit maritime activity through pattern-of-life analysis of vessel tracking data',
            techIds: ['python', 'gis', "scikit-learn", 'time-series-forecasting', 'geopandas', 'plotly/dash'],
            progress: 0
        }
    ];

    const rawVisualizations = [
        {
            id: 'viz_001',
            title: 'Sales Performance Dashboard',
            description: 'Interactive Tableau dashboard tracking KPIs',
            techIds: ['tableau'],
            hasViz: false,
            inProgress: false
        },
        {
            id: 'viz_002',
            title: 'Customer Segmentation Analysis',
            description: 'Python-based clustering visualization',
            techIds: ['python', 'scikit-learn'],
            hasViz: false,
            inProgress: true
        },
        {
            id: 'viz_003',
            title: 'Geospatial Heatmap',
            description: 'Geographic data distribution analysis',
            techIds: ['python', 'gis'],
            hasViz: false,
            inProgress: false
        },
        {
            id: 'viz_004',
            title: 'Time Series Forecasting',
            description: 'Predictive analytics dashboard',
            techIds: ['python', 'statistical-modeling'],
            hasViz: false,
            inProgress: false
        },
        {
            id: 'viz_005',
            title: 'Network Graph Analysis',
            description: 'Interactive force-directed graph visualization exploring relationship structures and connection patterns. This D3.js-powered network demonstrates hierarchical clustering with dynamic node positioning, animated data flow particles, and real-time force simulation. The central hub represents the primary entity with weighted connections to secondary and tertiary nodes, revealing community structures and information flow pathways.',
            techIds: ['javascript'],
            hasViz: true,
            inProgress: false
        },
        {
            id: 'viz_006',
            title: 'Statistical Model Results',
            description: 'Python-based statistical visualization',
            techIds: ['statistical-modeling', 'python'],
            hasViz: false,
            inProgress: false
        }
    ];

    const allProjects = rawProjects.map(project => ({
        ...project,
        displayTags: computeDisplayTags(project.techIds),
        tags: computeFilterTags(project.techIds)
    }));

    const allVisualizations = rawVisualizations.map(viz => ({
        ...viz,
        tags: computeFilterTags(viz.techIds)
    }));

    // Separate live projects from others
    const liveProjects = allProjects.filter(p => p.isLive);
    const otherProjects = allProjects.filter(p => !p.isLive);

    const filteredLiveProjects = activeFilter === 'all' 
        ? liveProjects
        : liveProjects.filter(project => project.tags.includes(activeFilter));

    const filteredOtherProjects = activeFilter === 'all' 
        ? otherProjects
        : otherProjects.filter(project => project.tags.includes(activeFilter));

    const filteredVisualizations = activeFilter === 'all'
        ? allVisualizations
        : allVisualizations.filter(viz => viz.tags.includes(activeFilter));

    const handleFilterClick = (filterId, filterLabel) => {
        setActiveFilter(filterId);
        
        const projectCount = filterId === 'all' 
            ? allProjects.length 
            : allProjects.filter(p => p.tags.includes(filterId)).length;
        
        const vizCount = filterId === 'all'
            ? allVisualizations.length
            : allVisualizations.filter(v => v.tags.includes(filterId)).length;
        
        const totalCount = projectCount + vizCount;
        
        event({
            action: 'filter_click',
            category: 'Projects',
            label: `Filter: ${filterLabel}`,
        });
        
        trackEvent('filter_click', {
            filterType: 'technology',
            filterValue: filterLabel,
            filterId: filterId,
            resultCount: totalCount,
            projectCount: projectCount,
            vizCount: vizCount
        });
    };

    const handleProjectClick = (projectTitle, projectId) => {
        event({
            action: 'project_click',
            category: 'Projects',
            label: projectTitle,
        });
        
        trackEvent('project_click', {
            projectTitle: projectTitle,
            projectId: projectId,
            activeFilter: activeFilter
        });
    };

    const handleVizClick = (viz) => {
        event({
            action: 'visualization_click',
            category: 'Projects',
            label: viz.title,
        });

        trackEvent('visualization_click', {
            vizTitle: viz.title,
            vizId: viz.id,
            activeFilter: activeFilter
        });

        if (viz.hasViz) {
            setSelectedViz(viz);
            setModalOpen(true);
        }
    };

    return (
        <>
            <Navigation />
            
            <main className={styles.main}>
                <div className={styles.container}>
                    <section className={styles.hero}>
                        <h1 className={styles.heroTitle}>Projects</h1>
                        <p className={styles.heroSubtitle}>
                            In-depth case studies on data science, machine learning, and analytics projects
                        </p>
                    </section>

                    <div className={styles.filterContainer}>
                        {filters.map(filter => (
                            <button
                                key={filter.id}
                                onClick={() => handleFilterClick(filter.id, filter.label)}
                                className={`${styles.filterButton} ${activeFilter === filter.id ? styles.filterButtonActive : ''}`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {/* Featured Live Projects Section */}
                    {filteredLiveProjects.length > 0 && (
                        <section className={styles.featuredSection}>
                            {filteredLiveProjects.map(project => (
                                <div
                                    key={project.id}
                                    className={styles.featuredCard}
                                    onClick={() => {
                                        handleProjectClick(project.title, project.id);
                                        if (project.link) {
                                            window.location.href = project.link;
                                        }
                                    }}
                                >
                                    <div className={styles.featuredImage}>
                                        <div className={styles.featuredVizContainer}>
                                            <AnalyticsNetworkViz />
                                        </div>
                                        <div className={styles.liveBadgeLarge}>
                                            <span className={styles.liveDot}></span>
                                            LIVE PROJECT
                                        </div>
                                    </div>
                                    
                                    <div className={styles.featuredContent}>
                                        <h2 className={styles.featuredTitle}>{project.title}</h2>
                                        <p className={styles.featuredDescription}>{project.description}</p>
                                        
                                        <div className={styles.tags}>
                                            {project.displayTags.map(tag => (
                                                <span key={tag} className={styles.tag}>{tag}</span>
                                            ))}
                                        </div>

                                        <button className={styles.viewProjectButton}>
                                            View Live Project
                                            <span className={styles.arrow}>→</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Other Projects Section */}
                    {filteredOtherProjects.length > 0 && (
                        <section className={styles.projectsSection}>
                            <div className={styles.projectGrid}>
                                {filteredOtherProjects.map(project => (
                                    <div
                                        key={project.id}
                                        className={styles.projectCard}
                                        onClick={() => {
                                            handleProjectClick(project.title, project.id);
                                            if (project.link) {
                                                window.location.href = project.link;
                                            }
                                        }}
                                        style={project.link ? { cursor: 'pointer' } : {}}
                                    >
                                        <div className={styles.projectContent}>
                                            <div className={styles.projectHeader}>
                                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                                {project.progress !== undefined && (
                                                    <span className={project.progress === 0 ? styles.plannedBadge : styles.inProgressBadge}>
                                                        {project.progress === 0 ? 'PLANNED' : 'IN PROGRESS'}
                                                    </span>
                                                )}
                                            </div>
                                            <p className={styles.projectDescription}>
                                                {project.description}
                                            </p>
                                            {project.progress !== undefined && project.progress > 0 && (
                                                <div className={styles.projectStatusBar}>
                                                    <div className={styles.projectStatusBarContainer}>
                                                        <div
                                                            className={styles.projectStatusBarFill}
                                                            style={{ width: `${project.progress}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className={styles.projectProgressText}>{project.progress}%</span>
                                                </div>
                                            )}
                                            <div className={styles.tags}>
                                                {project.displayTags.map(tag => (
                                                    <span key={tag} className={styles.tag}>{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Data Visualizations Section */}
                    <section className={styles.visualizationsSection}>
                        <h2 className={styles.sectionTitle}>Data Visualizations & Dashboards</h2>

                        <div className={styles.vizGrid}>
                            {filteredVisualizations.map(viz => (
                                <div
                                    key={viz.id}
                                    className={`${styles.vizCard} ${viz.hasViz ? styles.vizCardClickable : ''}`}
                                    onClick={() => handleVizClick(viz)}
                                >
                                    <div className={styles.vizImagePlaceholder}>
                                        {viz.hasViz ? (
                                            <>
                                                <div className={styles.vizPreview}>
                                                    <NetworkGraphViz width={350} height={250} />
                                                </div>
                                                <div className={styles.viewFullOverlay}>
                                                    <div className={styles.viewFullText}>Click to View Full Visualization</div>
                                                </div>
                                            </>
                                        ) : viz.inProgress ? (
                                            <div className={styles.inDevOverlay}>
                                                <div className={styles.inDevText}>IN PROGRESS</div>
                                                <div className={styles.statusBar}>
                                                    <div className={styles.statusBarFill}></div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={styles.plannedOverlay}>
                                                <div className={styles.plannedIcon}>📊</div>
                                                <div className={styles.plannedText}>Coming Soon</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.vizInfo}>
                                        <h3 className={styles.vizTitle}>{viz.title}</h3>
                                        <p className={styles.vizDescription}>
                                            {viz.hasViz
                                                ? 'Interactive force-directed graph visualization'
                                                : viz.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            {/* Visualization Modal */}
            {selectedViz && selectedViz.hasViz && (
                <VizModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={selectedViz.title}
                    description={selectedViz.description}
                >
                    <NetworkGraphViz width={800} height={600} />
                </VizModal>
            )}
        </>
    );
}