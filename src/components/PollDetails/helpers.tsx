import styled from 'styled-components'
import { fromUnixTime, format, formatDistanceToNow, addDays, startOfDay, endOfDay, differenceInDays } from 'date-fns'
import { Card, TitleContainer } from '../common/styled'

import { shortenAccount, timeLeft } from '../../utils'

import { getPollData, getVoterAddresses } from './data'

import { LAST_YEAR } from '../../constants'
import { getUnixTime } from 'date-fns/esm'

export const TableContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  font-size: 12px;
`

export const Container = styled(TitleContainer)`
  flex: 0;
  padding-left: 1.5rem;
  padding-top: 0.75rem;
  padding-bottom: 0.5rem;
`

export const TableRow = styled.div`
  display: flex;
  flex: 1;
  padding: 0.25rem 1.5rem;
  align-items: center;
  justify-content: space-between;
  &:nth-child(odd) {
    background-color: #fafafa;
  }
`

export const WrappedContainer = styled.div`
  ${TitleContainer} {
    span {
      font-size: 12px !important;
    }
  }
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  ${Card} {
    flex: 0 0 28%;
    width: 25%;
  }
  @media (max-width: 768px) {
    ${Card} {
      width: 40%;
      flex: unset;
    }
  }
  @media (max-width: 580px) {
    ${Card} {
      width: 100% !important;
      flex: unset;
    }
  }
`
export const defaultFilters = {
  votersVsMkr: LAST_YEAR,
}

export const getPollTableData = poll => {
  return [
    { value: shortenAccount(poll.source.toLowerCase()), label: 'Source' },
    { value: format(fromUnixTime(poll.startDate), 'P'), label: 'Started' },
    { value: Number(poll.votesCount) === 0 ? 'No' : 'Yes', label: 'Voted' },
    { value: timeLeft(poll.endDate) === 'Ended' ? 'Yes' : 'No', label: 'Ended' },
    { value: timeLeft(poll.endDate) === 'Ended' ? 'Closed' : 'Active', label: 'Status' },
    { value: formatDistanceToNow(fromUnixTime(poll.startDate), { addSuffix: false }), label: 'Time opened' },
  ]
}

export const getTimeLeftData = (start, end): Array<any> => {
  const isEnded = timeLeft(end) === 'Ended'
  const today = getUnixTime(new Date())
  const seconds = Math.floor(end - today)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  hours = hours - days * 24
  minutes = minutes - days * 24 * 60 - hours * 60

  if (isEnded) return [{ value: today, text: 'Ended' }, { value: 0 }]

  return [{ time: { days, hours, minutes }, value: today / 1000 }, { value: seconds }]
}

export const getPollPerOptionData = poll => getPollData(poll)

export const getComponentData = (
  type: string,
  component: string,
  content: string,
  expanded: boolean,
  versus = undefined,
) => {
  return {
    type,
    component,
    content,
    expanded,
    versus,
  }
}

const getPollPeriods = poll => {
  const start = fromUnixTime(poll.startDate)
  const end = fromUnixTime(poll.endDate)

  const long = differenceInDays(endOfDay(end), startOfDay(start))

  return Array.from({ length: long + 1 }, (v, i) => {
    let from = startOfDay(addDays(start, i))
    return {
      label: format(from, 'dd MMM'),
      from,
      to: endOfDay(addDays(start, i)),
    }
  })
}

export const getPollVotersHistogramData = poll => {
  const periods = getPollPeriods(poll)

  const pollOptions = ['Abstein', ...poll.options]
  const options = pollOptions.reduce((acc, el) => {
    return {
      ...acc,
      [el]: 0,
    }
  }, {})

  const voters = getVoterAddresses(poll).reduce((acc, voter) => {
    return {
      ...acc,
      [voter]: 0,
    }
  }, {})

  return periods.map(period => {
    poll.timeLine.forEach(el => {
      if (
        el.type === 'VotePollAction' &&
        el.timestamp >= getUnixTime(period.from) &&
        el.timestamp <= getUnixTime(period.to)
      ) {
        const prevVote = voters[el.sender]
        const option = pollOptions[el.option]

        options[option] += 1
        voters[el.sender] = option

        if (prevVote) options[prevVote] -= 1
      }
    })

    return {
      ...period,
      ...options,
    }
  })
}