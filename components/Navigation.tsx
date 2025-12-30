import Link from 'next/link';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {/* Logo/Name */}
        <Link href="/" className={styles.logo}>
          Abigail Spencer
        </Link>
        
        {/* Navigation Links */}
        <ul className={styles.navLinks}>
          <li>
            <Link href="/" className={styles.link}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/projects" className={styles.link}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="/about" className={styles.link}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className={styles.link}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}