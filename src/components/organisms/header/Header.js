import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './Header.css';

const st = classNames.bind(style);

function Header({ winner }) {
  const [$winner, setWinner] = useState('');

  useEffect(() => {
    setWinner(winner);
    console.log('update-header');
    return () => {
      console.log('cleanup-header');
    };
  }, [winner]);

  return (
    <header className={st('Header')}>
      <div className={st('title')}>TIC-TAC-TO</div>
      <div className={st('massage')}>
        {$winner === ''
          ? ''
          : `승리는 Player '${$winner}' 입니다. 게임을 초기화 해주세요!`}
      </div>
    </header>
  );
}
Header.defaultProps = {
  winner: '',
};
Header.propTypes = {
  winner: propTypes.string,
};
export default Header;
