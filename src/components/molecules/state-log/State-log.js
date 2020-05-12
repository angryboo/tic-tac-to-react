import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './State-log.css';
import LogList from '../../atoms/log-list/Log-list';

const st = classNames.bind(style);

function StateLog({ getLog, handleGameLog }) {
  return (
    <div className={st('State-list')}>
      <div className={st('log-title')}>Log-List</div>
      <ul className={st('log-list')}>
        {getLog.map((log, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={`li-${i}`}>
            <LogList log={log} index={i} handleGameLog={handleGameLog} />
          </li>
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
