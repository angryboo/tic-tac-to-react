/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './Board-item.css';
// import Header from '../../organisms/header/Header';

const st = classNames.bind(style);

function BoardItem({ xaxis, yaxis, handleClickEvent, item }) {
  return (
    <div
      className={st('Board-item')}
      onClick={() => handleClickEvent(xaxis, yaxis, item)}
    >
      {item === 0 ? (
        ''
      ) : (
        <div className={st(`set-board player-${item}`)}>{item}</div>
      )}
    </div>
  );
}
BoardItem.defaultProps = {
  item: '',
  xaxis: 0,
  yaxis: 0,
  handleClickEvent: () => {},
};
BoardItem.propTypes = {
  item: propTypes.string,
  xaxis: propTypes.number,
  yaxis: propTypes.number,
  handleClickEvent: propTypes.func,
};
export default BoardItem;
