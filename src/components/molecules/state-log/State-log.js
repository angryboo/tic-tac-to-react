import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './State-log.css';
import LogList from '../../atoms/log-list/Log-list';

const st = classNames.bind(style);

function StateLog({ getLog, handleGameLog }) {
  const [$getlog, setLog] = useState([]);

  useEffect(() => {
    setLog(getLog);
    console.log('update-log');
    return () => {
      console.log('cleanup-log');
    };
  }, [getLog]);
  return (
    <div className={st('State-list')}>
      <div className={st('log-title')}>Log-List</div>
      <ul className={st('log-list')}>
        {$getlog.map((log, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <LogList key={i} log={log} index={i} handleGameLog={handleGameLog} />
        ))}
      </ul>
    </div>
  );
}
StateLog.defaultProps = {
  getLog: [],
  handleGameLog: () => {},
};
StateLog.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  getLog: propTypes.array,
  handleGameLog: propTypes.func,
};
export default StateLog;
