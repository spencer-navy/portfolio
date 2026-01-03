'use client'

import Image from 'next/image';
import Navigation from '../../components/Navigation';
import styles from './About.module.css';

export default function About() {
    // Currently Reading - lighter, more practical books
    const currentlyReading = [
        {
            id: 6,
            title: 'Storytelling with Data: A Data Visualization Guide for Business Professionals',
            author: 'Cole Nussbaumer Knaflic',
            isbn: '1119002257',
            purchaseUrl: 'https://www.amazon.com/dp/1119002257',
            coverUrl: 'https://m.media-amazon.com/images/I/71EN1l+uQKL._SL1500_.jpg'
        },
        {
            id: 7,
            title: "Midnight in Chernobyl: The Untold Story of the World's Greatest Nuclear Disaster",
            author: 'Adam Higginbotham',
            isbn: '9781501134630',
            purchaseUrl: 'https://www.barnesandnoble.com/w/midnight-in-chernobyl-adam-higginbotham/1129511685',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9781501134630_p0_v6_s600x595.jpg'
        },
        {
            id: 19,
            title: 'Naked Statistics: Stripping the Dread from the Data',
            author: 'Charles Wheelan',
            isbn: '9780393347777',
            purchaseUrl: 'https://www.amazon.com/dp/039334777X',
            coverUrl: 'https://m.media-amazon.com/images/I/51rHcg145LL._SL1200_.jpg'
        },
        {
            id: 11,
            title: 'Why Machines Learn: The Elegant Math Behind Modern AI',
            author: 'Anil Ananthaswamy',
            isbn: '9780593185742',
            purchaseUrl: 'https://www.amazon.com/dp/0593185749',
            coverUrl: 'https://m.media-amazon.com/images/I/81ZtMfYNTeL._SL1500_.jpg'
        },
    ];

    // Up Next - mix of technical and lighter reading
    const upNext = [
        {
            id: 2,
            title: 'The Design of Web APIs, Second Edition',
            author: 'Arnaud Lauret',
            isbn: '1633438147',
            purchaseUrl: 'https://www.amazon.com/dp/1633438147',
            coverUrl: 'https://m.media-amazon.com/images/I/61eyHP2izrL._SL1500_.jpg'
        },
        {
            id: 24,
            title: 'Probably Overthinking It: How to Use Data to Answer Questions, Avoid Statistical Traps, and Make Better Decisions',
            author: 'Allen B. Downey',
            isbn: '9780226845555',
            purchaseUrl: 'https://www.barnesandnoble.com/w/probably-overthinking-it-allen-b-downey/1143199878',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9780226845555_p0_v3_s600x595.jpg'
        },
        {
            id: 8,
            title: "The Nuclear Age: An Epic Race for Arms, Power, and Survival",
            author: 'Serhii Plokhy',
            isbn: '9781324051176',
            purchaseUrl: 'https://www.barnesandnoble.com/w/the-nuclear-age-serhii-plokhy/1146855293',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9781324051176_p0_v2_s600x595.jpg'
        },
        {
            id: 34,
            title: "The Signal and the Noise: Why So Many Predictions Fail--but Some Don't",
            author: 'Nate Silver',
            isbn: '9780143125082',
            purchaseUrl: 'https://www.barnesandnoble.com/w/the-signal-and-the-noise-nate-silver/1114055243',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9780143125082_p0_v3_s600x595.jpg'
        },
        {
            id: 15,
            title: 'Real-World Machine Learning',
            author: 'Henrik Brink, Joseph Richards, Mark Fetherolf',
            isbn: '9781617291920',
            purchaseUrl: 'https://www.amazon.com/dp/1617291927',
            coverUrl: 'https://m.media-amazon.com/images/I/71qPOljCDNL._SL1500_.jpg'
        },
        {
            id: 20,
            title: 'Fundamentals of Data Engineering: Plan and Build Robust Data Systems',
            author: 'Joe Reis, Matt Housley',
            isbn: '9781098108304',
            purchaseUrl: 'https://www.amazon.com/dp/1098108302',
            coverUrl: 'https://m.media-amazon.com/images/I/81+oMD7Lm7L._SL1500_.jpg'
        },
        {
            id: 25,
            title: 'The Missing README: A Guide for the New Software Engineer',
            author: 'Chris Riccomini, Dmitriy Ryaboy',
            isbn: '9781718501836',
            purchaseUrl: 'https://www.barnesandnoble.com/w/the-missing-readme-chris-riccomini/1139537571',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9781718501836_p0_v2_s600x595.jpg'
        },
        {
            id: 26,
            title: 'Prisoners of Geography: Ten Maps That Explain Everything About the World',
            author: 'Tim Marshall',
            isbn: '9781501121470',
            purchaseUrl: 'https://www.barnesandnoble.com/w/prisoners-of-geography-tim-marshall/1121494741',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9781501121470_p0_v20_s600x595.jpg'
        },
        {
            id: 27,
            title: 'Algorithms',
            author: 'Panos Louridas',
            isbn: '9780262539029',
            purchaseUrl: 'https://www.barnesandnoble.com/w/algorithms-panos-louridas/1136401277',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9780262539029_p0_v3_s600x595.jpg'
        },
        {
            id: 31,
            title: 'How Charts Lie: Getting Smarter about Visual Information',
            author: "Alberto Cairo",
            isbn: '9780393358421',
            purchaseUrl: 'https://www.barnesandnoble.com/w/how-charts-lie-alberto-cairo/1130420282',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9780393358421_p0_v4_s600x595.jpg'
        },
        {
            id: 17,
            title: 'The Art of Statistics: How to Learn from Data',
            author: 'David Spiegelhalter',
            isbn: '9781541618510',
            purchaseUrl: 'https://www.amazon.com/dp/1541618513',
            coverUrl: 'https://m.media-amazon.com/images/I/91fposOm+OL._SL1500_.jpg'
        },
        {id: 35,
            title: 'Practical Deep Learning, 2nd Edition',
            author: 'Ronald T. Kneusel',
            isbn: '9781718504202',
            purchaseUrl: 'https://nostarch.com/practical-deep-learning-python-2E',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9781718504202_p0_v2_s600x595.jpg'
        },
        {
            id: 36,
            title: 'Data Structures the Fun Way: An Amusing Adventure with Coffee-Filled Examples',
            author: 'Jeremy Kubica',
            isbn: '9781718502604',
            purchaseUrl: 'https://nostarch.com/data-structures-fun-way',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9781718502604_p0_v2_s600x595.jpg'
        },
        {
            id: 42,
            title: 'Chernobyl Roulette: War in the Nuclear Disaster Zone',
            author: 'Serhii Plokhy',
            isbn:   '9781324079415',
            purchaseUrl: 'https://www.barnesandnoble.com/w/chernobyl-roulette-serhii-plokhy/1144659202',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9781324079415_p0_v2_s600x595.jpg'
        },
        {
            id: 37,
            title: 'Math for Deep Learning: What You Need to Know to Understand Neural Networks',
            author: 'Jeremy Kubica',
            isbn: '9781718501904',
            purchaseUrl: 'https://nostarch.com/math-deep-learning',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9781718501904_p0_v1_s600x595.jpg'
        },
        {
            id: 39,
            title: 'Dive Into Algorithms: A Pythonic Adventure for the Intrepid Beginner',
            author: 'Bradford Tuckfield',
            isbn: '9781718500686',
            purchaseUrl: 'https://nostarch.com/Dive-Into-Algorithms',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9781718500686_p0_v4_s600x595.jpg'
        },
        {
            id: 40,
            title: 'Bayesian Statistics the Fun Way',
            author: 'Will Kurt',
            isbn: '9781593279561',
            purchaseUrl: 'https://nostarch.com/learnbayes',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9781593279561_p0_v2_s600x595.jpg'
        },
        {
            id: 43,
            title: "The Great Heist: China's Epic Campaign to Steal America's Secrets",
            author: 'David R. Shedd, Andrew Badger',
            isbn: '9780063451834',
            purchaseUrl: 'https://www.barnesandnoble.com/w/the-great-heist-david-r-shedd/1147333812',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9780063451834_p0_v4_s600x595.jpg'
        }
    ];

    // 10 Year Reading - Heavy technical and foundational books
    const tenYearReading = [
        {
            id: 4,
            title: 'Deep Learning',
            author: 'Goodfellow, Bengio, Courville',
            isbn: '9780262035613',
            purchaseUrl: 'https://www.amazon.com/dp/0262035618',
            coverUrl: 'https://m.media-amazon.com/images/I/61fim5QqaqL.jpg'
        },
        {
            id: 10,
            title: 'Deep Learning: Foundations and Concepts',
            author: 'Christopher M. Bishop, Hugh Bishop',
            isbn: '9783031454677',
            purchaseUrl: 'https://www.amazon.com/dp/3031454677',
            coverUrl: 'https://m.media-amazon.com/images/I/61ex1w3dnCL._SL1175_.jpg'
        },
        {
            id: 12,
            title: 'Foundations of Computer Vision',
            author: 'Antonio Torralba, Phillip Isola',
            isbn: '9780262048972',
            purchaseUrl: 'https://www.amazon.com/dp/0262048973',
            coverUrl: 'https://m.media-amazon.com/images/I/81ILyrEEyyL._SL1500_.jpg'
        },
        {
            id: 13,
            title: 'Theory of Spatial Statistics: A Concise Introduction',
            author: 'M.N.M. van Lieshout',
            isbn: '9780367146399',
            purchaseUrl: 'https://www.amazon.com/dp/0367146398',
            coverUrl: 'https://m.media-amazon.com/images/I/61nc5jQj1qL._SL1360_.jpg'
        },
        {
            id: 14,
            title: 'Statistical Rethinking: A Bayesian Course with Examples in R and STAN',
            author: 'Richard McElreath',
            isbn: '9780367139919',
            purchaseUrl: 'https://www.amazon.com/dp/036713991X',
            coverUrl: 'https://m.media-amazon.com/images/I/81cEpsiTCFL._SL1500_.jpg'
        },
        {
            id: 16,
            title: 'Deep Learning for Vision Systems',
            author: 'Mohamed Elgendy',
            isbn: '9781617296192',
            purchaseUrl: 'https://www.amazon.com/dp/1617296198',
            coverUrl: 'https://m.media-amazon.com/images/I/71MgK4MhOjL._SL1500_.jpg'
        },
        {
            id: 21,
            title: 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow',
            author: 'Aurélien Géron',
            isbn: '9781492032649',
            purchaseUrl: 'https://www.amazon.com/dp/1492032646',
            coverUrl: 'https://m.media-amazon.com/images/I/81R5BmGtv-L._SL1500_.jpg'
        }
    ];

    // Books I've Finished - add books here when ready
    const finishedBooks = [
        {
            id: 5,
            title: 'Designing Machine Learning Systems: An Iterative Process for Production-Ready Applications',
            author: 'Chip Huyen',
            isbn: '1098107969',
            purchaseUrl: 'https://www.amazon.com/dp/1098107969',
            coverUrl: 'https://m.media-amazon.com/images/I/81aSHEzSB1L._SL1500_.jpg'
        },
        {
            id: 9,
            title: "In Order to Live: A North Korean Girl's Journey to Freedom",
            author: 'Yeonmi Park, Maryanne Vollers',
            isbn: '9780143109747',
            purchaseUrl: 'https://www.barnesandnoble.com/w/in-order-to-live-yeonmi-park/1121236211',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9780143109747_p0_v2_s600x595.jpg'
        },
        {
            id: 1,
            title: 'Mining Social Media: Finding Stories in Internet Data',
            author: 'Lam Thuy Vo',
            isbn: '1593279167',
            purchaseUrl: 'https://www.amazon.com/dp/1593279167',
            coverUrl: 'https://m.media-amazon.com/images/I/81utS+d6wGL._SL1500_.jpg'
        },
        {
            id: 23,
            title: 'Weapons of Math Destruction: How Big Data Increases Inequality and Threatens Democracy',
            author: "Cathy O'Neil",
            isbn: '9780553418835',
            purchaseUrl: 'https://www.amazon.com/dp/0553418831',
            coverUrl: 'https://m.media-amazon.com/images/I/71UCr1GIFrL._SL1500_.jpg'
        },
        {
            id: 22,
            title: 'How Not to Be Wrong: The Power of Mathematical Thinking',
            author: 'Jordan Ellenberg',
            isbn: '9781594205224',
            purchaseUrl: 'https://www.amazon.com/dp/1594205221',
            coverUrl: 'https://m.media-amazon.com/images/I/51D1tuz3XmL._SL1200_.jpg'
        },
        {
            id: 3,
            title: 'The Complete Developer',
            author: 'Martin Krause',
            isbn: '9781718503281',
            purchaseUrl: 'https://www.amazon.com/dp/1718503288',
            coverUrl: 'https://m.media-amazon.com/images/I/7163IqH4nkL._SL1500_.jpg'
        },
        {
            id: 28,
            title: 'Red Scarf Girl: A Memoir of the Cultural Revolution',
            author: 'Ji-li Jiang',
            isbn: '9780064462082',
            purchaseUrl: 'https://www.barnesandnoble.com/w/red-scarf-girl-ji-li-jiang/1102123609',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9780064462082_p0_v5_s600x595.jpg'
        },
        {
            id: 29,
            title: 'Doing Data Science: Straight Talk from the Frontline',
            author: "Cathy O'Neil, Rachel Schutt",
            isbn: '9781449358655',
            purchaseUrl: 'https://www.barnesandnoble.com/w/doing-data-science-cathy-oneil/1117555191',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9781449358655_p0_v11_s600x595.jpg'
        },
        {
            id: 30,
            title: 'Things Fall Apart',
            author: "Chinua Achebe",
            isbn: '9780385474542',
            purchaseUrl: 'https://www.barnesandnoble.com/w/things-fall-apart-chinua-achebe/1116754130',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9780385474542_p0_v6_s600x595.jpg'
        },
        {
            id: 32,
            title: 'Educated: A Memoir',
            author: "Tara Westover",
            isbn: '9780399590528',
            purchaseUrl: 'https://www.barnesandnoble.com/w/educated-tara-westover/1126358348',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9780399590528_p0_v7_s600x595.jpg'
        },
        {
            id: 18,
            title: 'How to Lie with Statistics',
            author: 'Darrell Huff',
            isbn: '9780393310726',
            purchaseUrl: 'https://www.amazon.com/dp/0393310728',
            coverUrl: 'https://m.media-amazon.com/images/I/71ASFP9sBXL._SL1200_.jpg'
        },
        {
            id: 33,
            title: 'Python for Data Analysis: Data Wrangling with pandas, NumPy, and Jupyter',
            author: 'Wes McKinney',
            isbn: '9781098104030',
            purchaseUrl: 'https://www.barnesandnoble.com/w/python-for-data-analysis-wes-mckinney/1141119355',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9781098104030_p0_v5_s600x595.jpg'
        },
        {
            id: 38,
            title: 'How AI Works: From Sorcery to Science',
            author: 'Ronald T. Kneusel',
            isbn: '9781718503724',
            purchaseUrl: 'https://nostarch.com/how-ai-works',
            coverUrl: 'https://prodimage.images-bn.com/pimages/9781718503724_p0_v1_s600x595.jpg'
        }
    ];

    // Add this helper function before renderBookGrid
    const getRetailerName = (url) => {
        if (url.includes('amazon.com')) return 'Amazon';
        if (url.includes('barnesandnoble.com') || url.includes('bn.com')) return 'Barnes & Noble';
        if (url.includes('nostarch.com')) return 'No Starch Press';
        // Add more retailers as needed
        return 'Retailer'; // fallback
    };


    const renderBookGrid = (books) => (
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
                        {book.coverUrl ? (
                            <img 
                                src={book.coverUrl}
                                alt={`${book.title} by ${book.author}`}
                                className={styles.bookImage}
                            />
                        ) : (
                            <div className={styles.bookImagePlaceholder} />
                        )}
                        <div className={styles.bookOverlay}>
                            <span className={styles.bookStatus}>
                                View on {getRetailerName(book.purchaseUrl)}
                            </span>
                        </div>
                    </div>
                    <div className={styles.bookInfo}>
                        <h3 className={styles.bookTitle}>{book.title}</h3>
                        <p className={styles.bookAuthor}>{book.author}</p>
                    </div>
                </a>
            ))}
        </div>
    );

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
                            <div className={styles.profileImageWrapper}>
                                <Image 
                                    src="/professional-photo.jpg"
                                    alt="Abigail Spencer"
                                    width={400}
                                    height={500}
                                    quality={95}
                                    priority
                                    className={styles.profileImage}
                                />
                            </div>
                            
                            <div className={styles.bioText}>
                                <p className={styles.paragraph}>
                                    Welcome! I currently work at the National Geospatial-Intelligence Agency (NGA) 
                                    as the Data Lead for the overhead satellite component of a large computer vision program. 
                                    I specialize in transforming complex datasets into actionable insights through
                                    cross-functional collaboration and innovative solutions. With extensive experience in data strategy,
                                    management, analysis, and science, I'm passionate about leveraging data to drive informed decision-making
                                    and leading technical discussions across various domains and applications. 
                                </p>

                                <p className={styles.paragraph}>
                                    I excel in breaking down complex problems and building solutions that have immediate actionable insights
                                    and recommendations. My day-to-day consists of leading multiple cross-functional technincal teams 
                                    in the acquisition, pre-processing, curation, and labeling of petabytes of high-quality training data for model development. 
                                    This includes managing complex data pipelines, setting data priortizations, developing data team strategies, and conducting 
                                    in-depth data analysis to ensure the highest quality data in support of state-of-the-art deep learning model development for national 
                                    security objectives through geospatial intelligence.
                                </p>

                                <p className={styles.paragraph}>
                                    I served in the United States Navy for eight years, with three overseas deployments as an intelligence analyst.
                                    This invaluable experience instilled a strong work ethic, attention to detail, and the ability to thrive in 
                                    high-pressure environments. It's also where I got my start in data, working with complex datasets to provide actionable 
                                    intelligence to commanders in the field. This is where I honed my analytical skills and learned the importance of clear,
                                    succint, timely, and most importantly, accurate communication of complex information to diverse audiences.
                                </p>

                                <p className={styles.paragraph}>
                                    Education is a passion of mine, whether for myself or teaching others. 
                                    I'm finishing my second Bachelor of Science degree in data science (graduating December 2026)
                                    with focuses on machine learning, statistical analysis, and data visualization.
                                    My personal projects includes full-stack and data application development; in fact, this website 
                                    was built from scratch using Next.js (React), Tailwind CSS, and a postgreSQL database. 
                                    After graduation, I plan to pursue a Master's of Science in Data Analytics Engineering to further 
                                    deepen my expertise in engineering and analysis.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Reading Sections Container */}
                    <div className={styles.readingSectionsContainer}>
                        {/* What I'm Reading */}
                        <section className={styles.readingSection}>
                            <h2 className={styles.sectionTitle}>What I'm Reading</h2>
                            {renderBookGrid(currentlyReading)}
                        </section>

                        {/* What's Up Next */}
                        <section className={styles.readingSection}>
                            <h2 className={styles.sectionTitle}>Up Next</h2>
                            {renderBookGrid(upNext)}
                        </section>

                        {/* 10 Year Reading */}
                        <section className={styles.readingSection}>
                            <h2 className={styles.sectionTitle}>Deeper Knowledge</h2>
                            {renderBookGrid(tenYearReading)}
                        </section>
                    </div>

                    {/* Books I've Finished - Full Width Section */}
                    {finishedBooks.length > 0 && (
                        <section className={styles.finishedBooksSection}>
                            <h2 className={styles.finishedSectionTitle}>Recently Read</h2>
                            <div className={styles.finishedBookGrid}>
                                {finishedBooks.map((book, index) => (
                                    <a 
                                        href={book.purchaseUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        key={book.id} 
                                        className={styles.bookCard}
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                    >
                                        <div className={styles.bookCover}>
                                            {book.coverUrl ? (
                                                <img 
                                                    src={book.coverUrl}
                                                    alt={`${book.title} by ${book.author}`}
                                                    className={styles.bookImage}
                                                />
                                            ) : (
                                                <div className={styles.bookImagePlaceholder} />
                                            )}
                                            <div className={styles.bookOverlay}>
                                                <span className={styles.bookStatus}>
                                                    View on {getRetailerName(book.purchaseUrl)}
                                                </span>
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
                    )}
                </div>
            </main>
        </>
    );
}
