import React from 'react';
import PropTypes from 'prop-types';

export const Dashboard = ({ children }) => (
  <div>{children}</div>
);

Dashboard.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Dashboard;
