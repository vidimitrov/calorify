import React from 'react';
import PropTypes from 'prop-types';

export const Authentication = ({ children }) => (
  <div>{children}</div>
);

Authentication.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

export default Authentication;
