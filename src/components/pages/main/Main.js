import React from 'react';
// import propTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './Main.css';
import Board from '../../templates/board/Board';

const st = classNames.bind(style);

function Main() {
  return (
    <main className={st('Main')}>
      <Board />
    </main>
  );
}

export default Main;
