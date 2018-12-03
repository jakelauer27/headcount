import React from 'react';
import PropTypes from 'prop-types';
import {uid} from 'react-uid';

export default function Card({location, stats, selected, id, selectCard}) {
  const statsKeys = Object.keys(stats);
  let previousStat = 0;
  let headerSize = 'normal-header';

  if (location.length > 15) {
    headerSize = 'small-header'
  }

  const cardStats = statsKeys.map( year => {
    let color = 'green';
    let arrowColor = 'red';
    let direction = 'fa-arrow-down';
    let noChange = !previousStat || stats[year] === previousStat;

    if (stats[year] <= .5) {
      color='red';
    }

    if (stats[year] > previousStat) {
      direction = 'fa-arrow-up';
      arrowColor = 'green'
    }

    if (noChange) {
      arrowColor = 'grey';
      direction = 'fa-minus'
    }

    previousStat = stats[year];

    return (
      <tbody key={uid(year)}>
        <tr className='stat-line'>
          <td className='year'>{year}</td>
          <td className={`value ${color}`}>{(stats[year] * 100).toFixed(0)}%</td>
          <td className='arrow'>
            <i className={`fas ${direction} ${arrowColor}`}></i>
          </td>
        </tr>
      </tbody>
    )
  })

  return (
    <article className={`district-card ${selected}`} onClick={() => selectCard(location)}>
      <div className='left-triangle'></div>
      <div className='right-triangle'></div>
      <div className='content-container'>
        <h1 className={`card-header ${headerSize}`}>{location}</h1>
        <table className='stats-table'>
        {cardStats} 
        </table>
      </div>
    </article> 
  )
} 

Card.propTypes = {
  location: PropTypes.string.isRequired,
  stats: PropTypes.objectOf(PropTypes.number).isRequired,
  id: PropTypes.string.isRequired,
}