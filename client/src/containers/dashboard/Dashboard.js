import React from 'react';
import PropTypes from 'prop-types';

export const Dashboard = ({ children }) => (
  <div>{children}</div>
);

Dashboard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

export default Dashboard;
