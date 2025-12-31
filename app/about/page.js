'use client'

import Navigation from '../../components/Navigation';
import styles from './About.module.css';

export default function About() {
    // Book data with ISBNs for covers and purchase links
    const books = [
        {
            id: 1,
            title: 'Introduction to Statistical Learning',
            author: 'James, Witten, Hastie, Tibshirani',
            isbn: '9781461471370',
            purchaseUrl: 'https://www.amazon.com/dp/1461471370'
        },
        {
            id: 2,
            title: 'Designing Data-Intensive Applications',
            author: 'Martin Kleppmann',
            isbn: '9781449373320',
            purchaseUrl: 'https://www.amazon.com/dp/1449373321'
        },
        {
            id: 3,
            title: 'The Complete Developer',
            author: 'Martin Krause',
            isbn: '9781718503281',
            purchaseUrl: 'https://www.amazon.com/dp/1718503288'
        },
        {
            id: 4,
            title: 'Deep Learning',
            author: 'Goodfellow, Bengio, Courville',
            isbn: '9780262035613',
            purchaseUrl: 'https://www.amazon.com/dp/0262035618'
        }
    ];

    return (
        <>
            <Navigation />
            
            <main className={styles.main}>
                <div className={styles.container}>
                    {/* Hero Section */}
                    <section className={styles.hero}>
                        <h1 className={styles.heroTitle}>About Me</h1>
                    </section>

                    {/* Bio Section */}
                    <section className={styles.bioSection}>
                        <div className={styles.bioContent}>
                            <p className={styles.paragraph}>
                                I'm currently the Data Lead at the National Geospatial-Intelligence Agency 
                                for an overhead satellite computer vision program. With extensive experience 
                                in Python, SQL, geospatial application and services, and project management, 
                                I specialize in transforming complex datasets into actionable insights through
                                cross-functional collaboration and innovative solutions. I lead multiple teams in 
                                developing data pipelines, dashboards, and machine learning training data to support
                                national security objectives through geospatial intelligence.
                            </p>

                            <p className={styles.paragraph}>
                                Education is a passion of mine, whether for myself or teaching others. 
                                I'm finishing my second bachelor's degree in data science (graduating December 2026)
                                where I have focused on machine learning, statistical analysis, and data visualization.
                                I have experience in database management and full-stack development. In fact, this website 
                                was built from scratch by me using Next.js on top of React (JS) and Tailwind CSS. 
                                After graduation, I plan to pursue graduate studies to further deepen my expertise in engineering and analysis.
                            </p>
                        </div>
                    </section>

                    {/* Reading Section */}
                    <section className={styles.readingSection}>
                        <h2 className={styles.sectionTitle}>What I'm Reading</h2>
                        
                        <div className={styles.bookGrid}>
                            {books.map((book, index) => (
                                <a 
                                    href={book.purchaseUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={book.id} 
                                    className={styles.bookCard}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className={styles.bookCover}>
                                        <img 
                                            src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
                                            alt={`${book.title} by ${book.author}`}
                                            className={styles.bookImage}
                                        />
                                        <div className={styles.bookOverlay}>
                                            <span className={styles.bookStatus}>View on Amazon</span>
                                        </div>
                                    </div>
                                    <div className={styles.bookInfo}>
                                        <h3 className={styles.bookTitle}>{book.title}</h3>
                                        <p className={styles.bookAuthor}>{book.author}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}