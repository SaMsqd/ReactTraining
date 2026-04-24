import React from "react"

import styles from "./Modal.module.css"


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    closeOnOverlayClick?: boolean;
    closeOnEsc?: boolean;
    width?: string | number;
    showCloseButton?: boolean;
    footer?: React.ReactNode
  }
  
  export function Modal({ 
    isOpen, 
    onClose, 
    children, 
    title,
    closeOnOverlayClick = true,
    closeOnEsc = true,
    width = '500px',
    showCloseButton = true,
    footer
  }: ModalProps) {
    
    React.useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (closeOnEsc && e.key === 'Escape' && isOpen) {
          onClose();
        }
      };
      
      if (isOpen) {
        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden'; // Блокируем скролл body
      }
      
      return () => {
        document.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
      };
    }, [isOpen, closeOnEsc, onClose]);
  
    if (!isOpen) return null;
  
    const handleOverlayClick = (e: React.MouseEvent) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose();
      }
    };
  
    return (
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <div className={styles.modal} style={{ width }}>
          <div className={styles.header}>
            {title && <h2>{title}</h2>}
            {showCloseButton && (
              <button onClick={onClose} className={styles.closeBtn}>
                ✕
              </button>
            )}
          </div>
          
          <div className={styles.content}>
            {children}
          </div>
          
          {footer && (
            <div className={styles.footer}>
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }