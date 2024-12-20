import React from 'react';
import empty from '../../images/pngs/empty.jpg'

const EmptyState = ({
  title = "No Trade Leads Available", 
  description = "Explore and respond to potential business opportunities.",
  actionLabel = "Refresh Leads",
  onActionClick,
  ActionIcon
}) => {
  return (
    <div className="emptyStateContainer">
      <div className="emptyStateContent">
        <img 
          src={empty}
          alt="No trade leads" 
          className="emptyStateIllustration"
        />
        <h2 className="emptyStateTitle">{title}</h2>
        <p className="emptyStateDescription">{description}</p>
        {onActionClick && (
          <button 
            onClick={onActionClick}
            className="emptyStateCreateButton"
          >
            <ActionIcon size={20} className="buttonIcon" />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;