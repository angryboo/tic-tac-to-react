/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './Log-list.css';

const st = classNames.bind(style);

function LogList({ log, index, handleGameLog }) {
  const [$log, setLog] = useState([]);
  const [$index, setIndex] = useState(0);

  useEffect(() => {
    setLog(log);
    setIndex(index);
    console.log('update-loglist', `${index}`);
    return () => {
      console.log('cleanup-loglist', `${index}`);
    };
  }, [index, log]);
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li className={st('Log-list')} onClick={() => handleGameLog($log, $index)}>
      {$index === 0
        ? '초기상태'
        : `Player '${$index % 2 ? 'O' : 'X'}' ${$index}번째 수`}
    </li>
  );
}
LogList.defaultProps = {
  log: [],
  index: 0,
  handleGameLog: () => {},
};
LogList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  log: propTypes.array,
  index: propTypes.number,
  handleGameLog: propTypes.func,
};
export default LogList;
