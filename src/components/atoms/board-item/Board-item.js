/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './Board-item.css';

const st = classNames.bind(style);

function BoardItem({ xaxis, yaxis, handleClickEvent, item }) {
  const [player, setPlayer] = useState('');
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    setPlayer(item);
    setX(xaxis);
    setY(yaxis);
    console.log('cleanup-item', x, y, player);
    return () => {
      console.log('cleanup-item');
    };
  }, [xaxis, yaxis, item, x, y, player]);

  return (
    <div className={st('inner-array')}>
      <div
        className={st('Board-item')}
        onClick={() => {
          handleClickEvent(x, y, player);
        }}
      >
        {item === '' ? (
          ''
        ) : (
          <div className={st(`set-board player-${player}`)}>{player}</div>
        )}
      </div>
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
