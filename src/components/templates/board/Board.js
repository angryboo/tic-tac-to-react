/* eslint-disable no-plusplus */
import React, { useState } from 'react';
// import propTypes from 'prop-types';
import * as _ from 'lodash';
import classNames from 'classnames/bind';
import style from './Board.css';
import Header from '../../organisms/header/Header';
import Game from '../../molecules/game/Game';
import StateLog from '../../molecules/state-log/State-log';

const st = classNames.bind(style);

function Board() {
  const initStatus = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const [gameBoard, setGameBoard] = useState(_.cloneDeep(initStatus));
  const [playerState, changePlayerState] = useState('O');
  const [getLog, setLog] = useState([_.cloneDeep(initStatus)]);
  const [complateGame, setComplateGame] = useState(false);
  const [winner, setWinner] = useState('');

  const makeMove = (x, y) => {
    const tempArr = [...gameBoard];
    tempArr[y][x] = playerState;
    setGameBoard(tempArr);
  };

  const saveLog = () => {
    setLog([...getLog, _.cloneDeep(gameBoard)]);
  };

  const changePlayer = () => {
    changePlayerState(playerState === 'O' ? 'X' : 'O');
  };

  const matchingHzt = () => {
    let count = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 1; j < 3; j++) {
        if (gameBoard[i][j] === gameBoard[i][j - 1] && gameBoard[i][j] !== 0) {
          count += j === 1 ? 2 : 1;
          if (count === 3) {
            setComplateGame(true);
            setWinner(gameBoard[i][j]);
          }
        } else {
          count = 0;
        }
      }
    }
  };

  const matchingVtl = () => {
    let count = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 1; j < 3; j++) {
        if (gameBoard[j][i] === gameBoard[j - 1][i] && gameBoard[j][i] !== 0) {
          count += j === 1 ? 2 : 1;
          if (count === 3) {
            setComplateGame(true);
            setWinner(gameBoard[j][i]);
          }
        } else {
          count = 0;
        }
      }
    }
  };

  const matchingDnl = () => {
    let fwCount = 0;
    let bwCount = 0;
    let loofCount = 2;
    for (let i = 1; i < 3; i++) {
      const fw = gameBoard[i][i];
      const fwPrev = gameBoard[i - 1][i - 1];
      const bw = gameBoard[i][loofCount - 1];
      const bwPrev = gameBoard[i - 1][loofCount];
      if (fw === fwPrev && fw !== 0) {
        fwCount += i === 1 ? 2 : 1;
        if (fwCount === 3) {
          setComplateGame(true);
          setWinner(fw);
        }
      } else {
        fwCount = 0;
      }
      if (bw === bwPrev && bw !== 0) {
        bwCount += i === 1 ? 2 : 1;
        if (bwCount === 3) {
          setComplateGame(true);
          setWinner(bw);
        }
      } else {
        bwCount = 0;
      }
      loofCount -= 1;
    }
  };

  const handleClickEvent = (x, y, item) => {
    if (item !== 0 || complateGame) return;
    changePlayer();
    makeMove(x, y);
    saveLog();
    matchingHzt();
    matchingVtl();
    matchingDnl();
  };

  const handleGameLog = (log, index) => {
    if (complateGame) return;
    setGameBoard(log);
    const cloneArr = _.cloneDeep(getLog);
    setLog(cloneArr.filter((v, i) => i <= index));
    changePlayerState(index % 2 === 0 ? 'O' : 'X');
  };

  const initGame = () => {
    setGameBoard(_.cloneDeep(initStatus));
    changePlayerState('O');
    setLog([_.cloneDeep(initStatus)]);
    setWinner('');
    setComplateGame(false);
  };

  return (
    <div className={st('Board')}>
      <Header winner={winner} />
      <div className={st('warp-gameboard')}>
        <Game
          gameBoard={gameBoard}
          playerState={playerState}
          handleClickEvent={handleClickEvent}
        />
        <StateLog getLog={getLog} handleGameLog={handleGameLog} />
      </div>
      <button className={st('init-game')} type="button" onClick={initGame}>
        게임 초기화
      </button>
    </div>
  );
}

export default Board;
