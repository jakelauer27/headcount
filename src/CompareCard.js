import React from 'react';

export default function CompareCard({card, compareStats}) {
  if (!card) {
    return <div className='choose-card'>Select a District!</div>
  }

  const cardStatKeys = Object.keys(card.stats);
  const compareStatKeys = Object.keys(compareStats);
  const attendanceKey = compareStatKeys.find( key => {
    return key === card.location
  });
  const yLabels = ['100%', '80%', '60%', '40%', '20%', '0%'];
  const xLabels = [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014];
  
  return (
    <div className='compare-card'>
      <h1 className='compare-card-title'>{card.location}</h1>
      <main className='compare-body'>  
        <div className='graph'>
          <ul className='y-labels'>
            {
              yLabels.map( label => {
                return <li>{label}</li>
              })
            }
          </ul>
          <ul className='x-labels'>
            {
              xLabels.map( label => {
                return <li className='x-label'>{label}</li>
              })
            }
          </ul>
          {
            cardStatKeys.map( year => {
              let color = '#2BE5AD';
              if (card.stats[year] < .5) {
                color = '#E95A5A';
              }
              return (
                <div 
                className='stat-bar'
                style={{
                  backgroundColor: color,
                  height: (card.stats[year] * 100).toString() + '%'
                }}>
                </div>
              )
            })
          }
        </div>
        <div className='average-attendance'>
          <h2 className='average-attendance-label'>Average Attendance</h2>
          <div className='attendance-underline'></div>
          <h2 className='average-attendance-value'>{(compareStats[attendanceKey] * 100).toFixed(1) + '%'}</h2>
        </div>
      </main>
    </div>
  )
}