import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

const Wrapper = styled.div`
  width: 100px;

  ${props => props.wide && css`
    width: 150px;
  `}

  @media (max-width: 420px) {
    width: 80px;
  }
`;

function CardActions({
  onEditHandler,
  onDeleteHandler,
  customAction,
}) {
  return (
    <Wrapper wide={!!customAction}>
      {customAction
        && (
          <IconButton
            name={customAction.name ? customAction.name : ''}
            title={customAction.title ? customAction.title : ''}
            onClick={customAction.handler}
            color="default"
          >
            {customAction.icon}
          </IconButton>
        )
      }
      <IconButton
        onClick={onEditHandler}
        name="edit-meal"
        color="default"
      >
        <Edit />
      </IconButton>
      <IconButton
        onClick={onDeleteHandler}
        name="delete-meal"
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
  customAction: PropTypes.shape({
    icon: PropTypes.element.isRequired,
    handler: PropTypes.func.isRequired,
    title: PropTypes.string,
  }),
};

CardActions.defaultProps = {
  customAction: null,
};

export default CardActions;
