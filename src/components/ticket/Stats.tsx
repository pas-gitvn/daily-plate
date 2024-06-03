interface Aprops {
  ticketStat: (column:number) => number;
  ticketsLength: number;
}

const Stats = (props:Aprops) => {

  const calcPercentage = (column:number) => {
    return (props.ticketStat(column)/(props.ticketsLength || 1)*100).toFixed(0);
  }

  return (
      <div className='block'>
        <strong>Stats</strong>
        <ul>
          <li>Waiting {props.ticketStat(1)} - {calcPercentage(1)}%</li>
          <li>Doing {props.ticketStat(2)} - {calcPercentage(2)}%</li>
          <li>Testing {props.ticketStat(3)} - {calcPercentage(3)}%</li>
          <li>Done {props.ticketStat(4)} - {calcPercentage(4)}%</li>
        </ul>
      </div>
  )
}

export default Stats;
