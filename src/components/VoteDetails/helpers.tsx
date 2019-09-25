import styled from 'styled-components'
import { fromUnixTime, format, formatDistanceToNow } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

import { getLastYear, getLastWeek, getLastMonth, getLastDay, shortenAccount } from '../../utils'

import { Card, TitleContainer } from '../common/styled'
import {
  LAST_YEAR,
  LAST_MONTH,
  LAST_WEEK,
  LAST_DAY,
  VOTING_ACTION_FREE,
  VOTING_ACTION_LOCK,
  VOTING_ACTION_ADD,
  VOTING_ACTION_REMOVE,
} from '../../constants'

export const getVoteTableData = vote => {
  const startDate = vote.timestamp
    ? utcToZonedTime(fromUnixTime(vote.timestamp), Intl.DateTimeFormat().resolvedOptions().timeZone)
    : new Date(vote.date)
  const mkr_approvals = vote.approvals ? Number(vote.approvals).toFixed(2) : vote.end_approvals
  return [
    { value: shortenAccount(vote.source), label: 'Source' },
    { value: format(startDate, 'P'), label: 'Started' },
    { value: mkr_approvals ? 'Yes' : 'No', label: 'Voted' },
    { value: vote.casted ? 'Yes' : 'No', label: 'Ended' },
    { value: vote.casted ? 'Closed' : 'Active', label: 'Status' },
    { value: formatDistanceToNow(startDate, { addSuffix: false }), label: 'Time opened' },
    { value: mkr_approvals, label: 'MKR in support' },
    { value: vote.casted ? 'Yes' : 'No', label: 'Executed' },
  ]
}

const periodsMap = {
  [LAST_YEAR]: getLastYear,
  [LAST_MONTH]: getLastMonth,
  [LAST_WEEK]: getLastWeek,
  [LAST_DAY]: getLastDay,
}

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

export const defaultFilters = {
  votersVsMkr: LAST_YEAR,
}

const initializeMkr = (el, data, prev) => {
  return data
    .filter(d => d.timestamp < el)
    .reduce(
      (acum, value) => (value.type === VOTING_ACTION_FREE ? acum - Number(value.wad) : acum + Number(value.wad)),
      prev,
    )
}

const formatMkrData = (el, data, prev) => {
  return data
    .filter(d => d.timestamp >= el.from && d.timestamp <= el.to)
    .reduce(
      (acum, value) => (value.type === VOTING_ACTION_FREE ? acum - Number(value.wad) : acum + Number(value.wad)),
      prev,
    )
}

export const getVotersVsMkrData = (data: Array<any>, time: string): Array<any> => {
  const periods = periodsMap[time]()
  const countData = data.filter(el => el.type === VOTING_ACTION_ADD || el.type === VOTING_ACTION_REMOVE)
  const mkrData = data.filter(el => el.type === VOTING_ACTION_LOCK || el.type === VOTING_ACTION_FREE)

  let count = countData.filter(el => el.timestamp < periods[0].from).length
  let mkr = initializeMkr(periods[0].from, mkrData, 0)

  return periods.map(el => {
    mkr = formatMkrData(el, mkrData, mkr)
    count += countData.filter(d => d.timestamp >= el.from && d.timestamp <= el.to).length
    return {
      ...el,
      count,
      mkr: mkr.toFixed(2),
    }
  })
}
