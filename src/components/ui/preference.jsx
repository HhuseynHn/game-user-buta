import React from 'react'
import { useTranslation } from 'react-i18next';

const Preference = () => {
  const { t } = useTranslation();
  return (
    <div>{t("Preference")}</div>
  )
}

export default Preference