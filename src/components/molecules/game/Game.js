import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './Game.css';
import BoardItem from '../../atoms/board-item/Board-item';

const st = classNames.bind(style);

function Game({ gameBoard, playerState, handleClickEvent }) {
  return (
    <div className={st('Game')}>
      {gameBoard.map((innerArr, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className={st('outer-array')}>
          {innerArr.map((item, j) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`${i}${j}`} className={st('inner-array')}>
              <BoardItem
                yaxis={i}
                xaxis={j}
                playerState={playerState}
                handleClickEvent={handleClickEvent}
                item={item}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

Game.defaultProps = {
  gameBoard: [],
  playerState: '',
  handleClickEvent: () => {},
};
Game.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  gameBoard: propTypes.array,
  playerState: propTypes.string,
  handleClickEvent: propTypes.func,
};

export default Game;
