"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ActionButton({ buttonType, onClick, icon, text, buttonClassName, iconClassName, widthLimiter, style, disabled }) {
  const disabledClasses = disabled
    ? 'opacity-50 !cursor-not-allowed'
    : '';

  return (
    <button
      className={`${buttonType === 'accept' ? 'companydetails-accept-btn' : 'companydetails-reject-btn'} companydetails-action-button button-30 ${buttonClassName} ${widthLimiter ? 'companydetails-width-limiter' : ''} ${disabledClasses}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {icon && <FontAwesomeIcon icon={icon} className={`companydetails-action-icon ${iconClassName}`} />} {text}
    </button>
  );
}
