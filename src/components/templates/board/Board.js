/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
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
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  const [gameBoard, setGameBoard] = useState(_.cloneDeep(initStatus));
  const [playerState, changePlayerState] = useState('O');
  const [getLog, setLog] = useState([_.cloneDeep(initStatus)]);
  const [complateGame, setComplateGame] = useState(false);
  const [winner, setWinner] = useState('');

  useEffect(() => {
    console.log('update-board');
    return () => {
      console.log('cleanup-board');
    };
  });

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

  const doMatch = () => {
    let { hztCount, vtlCount } = { hztCount: 0, vtlCount: 0 };
    for (let i = 0; i < 3; i++) {
      for (let j = 1; j < 3; j++) {
        const { hzt, hztPrev, vtl, vtlPrev } = {
          hzt: gameBoard[i][j],
          hztPrev: gameBoard[i][j - 1],
          vtl: gameBoard[j][i],
          vtlPrev: gameBoard[j - 1][i],
        };
        if (hzt === hztPrev && hzt !== '') {
          hztCount += j === 1 ? 2 : 1;
          if (hztCount === 3) {
            setComplateGame(true);
            setWinner(hzt);
            console.log('hzt');
          }
        } else {
          hztCount = 0;
        }
        if (vtl === vtlPrev && vtl !== '') {
          vtlCount += j === 1 ? 2 : 1;
          if (vtlCount === 3) {
            setComplateGame(true);
            setWinner(vtl);
            console.log('vtl');
          }
        } else {
          vtlCount = 0;
        }
      }
      hztCount = 0;
      vtlCount = 0;
    }
  };

  const doMatchDnl = () => {
    let { fwCount, bwCount, loofCount } = {
      fwCount: 0,
      bwCount: 0,
      loofCount: 2,
    };

    for (let i = 1; i < 3; i++) {
      const { fw, fwPrev, bw, bwPrev } = {
        fw: gameBoard[i][i],
        fwPrev: gameBoard[i - 1][i - 1],
        bw: gameBoard[i][loofCount - 1],
        bwPrev: gameBoard[i - 1][loofCount],
      };

      if (fw === fwPrev && fw !== '') {
        fwCount += i === 1 ? 2 : 1;
        if (fwCount === 3) {
          setComplateGame(true);
          setWinner(fw);
          console.log('fw');
        }
      } else {
        fwCount = 0;
      }
      if (bw === bwPrev && bw !== '') {
        bwCount += i === 1 ? 2 : 1;
        if (bwCount === 3) {
          setComplateGame(true);
          setWinner(bw);
          console.log('bw');
        }
      } else {
        bwCount = 0;
      }
      loofCount -= 1;
    }
  };

  const handleClickEvent = (x, y, item) => {
    if (item !== '' || complateGame) return;
    changePlayer();
    makeMove(x, y);
    saveLog();
    doMatch();
    doMatchDnl();
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
