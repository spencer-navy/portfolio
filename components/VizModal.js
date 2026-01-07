'use client'

import { useEffect } from 'react';
import styles from './VizModal.module.css';

export default function VizModal({ isOpen, onClose, title, description, children }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>

                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>{title}</h2>
                </div>

                <div className={styles.vizContainer}>
                    {children}
                </div>

                <div className={styles.modalDescription}>
                    <h3 className={styles.descriptionTitle}>About This Visualization</h3>
                    <p className={styles.descriptionText}>{description}</p>
                </div>
            </div>
        </div>
    );
}
