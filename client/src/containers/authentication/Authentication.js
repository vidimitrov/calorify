import React from 'react';
import PropTypes from 'prop-types';

export const Authentication = ({ children }) => (
  <div>{children}</div>
);

Authentication.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Authentication;
