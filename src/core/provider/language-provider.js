"use client";
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/core/config/lib/i18n';

export const LanguageProvider = ({ children }) => {
    useEffect(() => {
        const initializeLanguage = () => {
            if (typeof window !== 'undefined') {
                try {
                    const savedLanguage = localStorage.getItem('language');
                    if (savedLanguage && ['en', 'az', 'tr'].includes(savedLanguage)) {

                        if (i18n.language !== savedLanguage) {
                            i18n.changeLanguage(savedLanguage);
                        }
                    }
                } catch (error) {
                    console.error('Error initializing language:', error);
                }
            }
        };

        if (i18n.isInitialized) {
            initializeLanguage();
        } else {
            i18n.on('initialized', initializeLanguage);
            return () => i18n.off('initialized', initializeLanguage);
        }
    }, []);

    return <>{children}</>;
};