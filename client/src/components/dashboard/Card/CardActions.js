import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

const Wrapper = styled.div`
  width: 100px;
`;

function CardActions({
  onEditHandler,
  onDeleteHandler,
}) {
  return (
    <Wrapper>
      <IconButton
        onClick={onEditHandler}
        color="default"
      >
        <Edit />
      </IconButton>
      <IconButton
        onClick={onDeleteHandler}
        color="default"
      >
        <Delete />
      </IconButton>
    </Wrapper>
  );
}

CardActions.propTypes = {
  onEditHandler: PropTypes.func.isRequired,
  onDeleteHandler: PropTypes.func.isRequired,
};

export default CardActions;
