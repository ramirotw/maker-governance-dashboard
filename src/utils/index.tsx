import React from 'react'
import { request } from 'graphql-request'
import BigNumber from 'bignumber.js'
import { IconContainer, CloseIcon } from '../components/common'
import {
  getVoterAddresses,
  getVoterRegistries,
  getVoteProxies,
  stakedByAddress,
  getStakedByAddress,
  ZERO,
  getLookup,
  totalStaked,
  getPollVotersPerOption,
} from '../components/PollDetails/data'

import {
  startOfMonth,
  endOfMonth,
  subMonths,
  getUnixTime,
  fromUnixTime,
  format,
  addDays,
  subDays,
  startOfDay,
  endOfDay,
  endOfHour,
  startOfHour,
  subHours,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
  addHours,
} from 'date-fns'
import { LAST_YEAR, LAST_MONTH, LAST_WEEK, LAST_DAY } from '../constants'

export * from './mkr-registry'

const MKR_API_URI = process.env.REACT_APP_MKR_GRAPH_HTTP

const fetchQuery = (url, query, variables) => request(url, query, variables)

export const shortenAccount = (account: string): string =>
  account.slice(0, 6) + '...' + account.slice(account.length - 4)

export const toNiceDate = timestamp => {
  return format(fromUnixTime(timestamp), 'PPp')
}

export const getModalContainer = Content => <Content />

export const timeLeft = (end): string => {
  const today = new Date()
  const end_date = fromUnixTime(end)
  if (differenceInSeconds(end_date, today) <= 0) return 'Ended'

  const minsDiff = differenceInMinutes(end_date, today)
  const hoursDiff = differenceInHours(end_date, today)
  const daysDiff = differenceInDays(end_date, today)
  const weeksDiff = differenceInWeeks(end_date, today)
  const monthsDiff = differenceInMonths(end_date, today)
  const yearsDiff = differenceInYears(end_date, today)

  if (yearsDiff > 0) return yearsDiff === 1 ? `${yearsDiff} year` : `${yearsDiff} year`
  if (monthsDiff > 0) return monthsDiff === 1 ? `${monthsDiff} month` : `${monthsDiff} months`
  if (weeksDiff > 0) return weeksDiff === 1 ? `${daysDiff} week` : `${daysDiff} week`
  if (daysDiff > 0) return daysDiff === 1 ? `${daysDiff} day` : `${daysDiff} days`
  if (hoursDiff > 0) return hoursDiff === 1 ? `${daysDiff} hour` : `${hoursDiff} hours`
  return minsDiff === 1 ? `${minsDiff} minute` : `${minsDiff} minutes`
}

export const getLastYear = () => {
  const today = new Date()
  const periods = Array.from({ length: 13 }, (v, i) => i).map(num => {
    const from = startOfMonth(subMonths(today, num))
    const to = endOfMonth(subMonths(today, num))
    return {
      from: getUnixTime(from),
      to: getUnixTime(to),
      label: format(from, 'MMM yy').toUpperCase(),
    }
  })
  return periods.reverse()
}

export const getLastMonth = () => {
  const today = new Date()
  const lastMonthDate = subMonths(today, 1)
  const getDaysDifference = differenceInDays(today, lastMonthDate)

  const periods = Array.from({ length: getDaysDifference + 1 }, (v, i) => i).map(num => {
    const from = startOfDay(subDays(today, num))
    const to = endOfDay(subDays(today, num))
    return {
      from: getUnixTime(from),
      to: getUnixTime(to),
      label: format(from, 'dd MMM').toUpperCase(),
    }
  })
  return periods.reverse()
}

export const getHourlyFromTo = from => {
  const start = startOfHour(fromUnixTime(from))
  const end = endOfHour(Date.now())
  const getHoursDifference = differenceInHours(end, start)

  const periods = Array.from({ length: getHoursDifference + 1 }, (v, i) => i).map(num => {
    const from = startOfHour(addHours(start, num))
    const to = endOfHour(addHours(start, num))
    return {
      from: getUnixTime(from),
      to: getUnixTime(to),
      label: format(from, 'dd MMM HH mm'),
    }
  })
  return periods
}

export const getDailyFromTo = (from, to) => {
  const start = startOfDay(fromUnixTime(from))
  const end = endOfDay(fromUnixTime(to))
  const getDaysDifference = differenceInDays(end, start)

  const periods = Array.from({ length: getDaysDifference + 1 }, (v, i) => i).map(num => {
    const from = startOfDay(addDays(start, num))
    const to = endOfDay(addDays(start, num))
    return {
      from: getUnixTime(from),
      to: getUnixTime(to),
      label: format(from, 'dd MMM').toUpperCase(),
    }
  })
  return periods
}

export const getLastWeek = () => {
  const today = new Date()

  const periods = Array.from({ length: 8 }, (v, i) => i).map(num => {
    const from = startOfDay(subDays(today, num))
    const to = endOfDay(subDays(today, num))
    return {
      from: getUnixTime(from),
      to: getUnixTime(to),
      label: format(from, 'dd MMM').toUpperCase(),
    }
  })
  return periods.reverse()
}

export const getLastDay = () => {
  const today = new Date()

  const periods = Array.from({ length: 25 }, (v, i) => i).map(num => {
    const from = startOfHour(subHours(today, num))
    const to = endOfHour(subHours(today, num))
    return {
      from: getUnixTime(from),
      to: getUnixTime(to),
      label: format(from, 'HH') + 'hs',
    }
  })
  return periods.reverse()
}

export const filters = [
  { label: 'Last year', value: LAST_YEAR },
  { label: 'Last month', value: LAST_MONTH },
  { label: 'Last week', value: LAST_WEEK },
  { label: 'Last day', value: LAST_DAY },
]

export const getIconContainer = (Component, cb, isModalOpen = false) => (
  <IconContainer onClick={cb}>{isModalOpen ? <CloseIcon /> : <Component />}</IconContainer>
)

export const getVoterBalances = async (address, endDate) => {
  // Query
  const query = `
    query getAccountBalances($voter: Bytes!, $endDate: BigInt!, $skip: Int = 0 ) {
      accountBalanceSnapshots(
        first: 1000,
        skip: $skip,
        where:{
          account: $voter,
          timestamp_lte: $endDate
        },
        orderBy: timestamp, orderDirection: desc
      ) {
        account {
          address
        }
        amount
        timestamp
      }
    }
  `

  let skip = 0
  let more = true
  let result = []
  while (more) {
    const partial: any = await fetchQuery(MKR_API_URI, query, {
      voter: address,
      endDate,
      skip,
    })

    result = result.concat(partial.accountBalanceSnapshots)
    more = !(partial.accountBalanceSnapshots.length < 1000)
    skip += 1000
  }

  return result
}

export const getVotersBalance = async (poll, balancesLookup) => {
  const votersAddresses = getVoterAddresses(poll)
  const voteRegistries = await getVoterRegistries(votersAddresses, poll.endDate)
  const voteProxies = getVoteProxies(voteRegistries)

  const stakedProxies = stakedByAddress(await getStakedByAddress(voteProxies, poll.endDate))
  const stakedVoters = stakedByAddress(await getStakedByAddress(votersAddresses, poll.endDate))

  const hotCold = Array.from(new Set(voteRegistries.flatMap((el: any) => [el.coldAddress, el.hotAddress])))
  const votersHotCold = Array.from(new Set([...votersAddresses, ...hotCold]))

  const balances = votersHotCold.reduce((acc, addr) => {
    const snapshots = balancesLookup[addr]
    if (snapshots) {
      const last = snapshots.find(snap => snap.timestamp <= poll.endDate)
      if (last) {
        return {
          ...acc,
          [addr]: last.amount,
        }
      }
    }

    return acc
  }, {})

  const stakedVotersAndBalances = votersHotCold.reduce((acc, key) => {
    const staked = stakedVoters[key] || ZERO
    const balance = balances[key] ? new BigNumber(balances[key]) : ZERO
    const amount = staked.plus(balance).toString()

    return {
      ...acc,
      [key]: amount,
    }
  }, {})

  const lookup = getLookup(votersAddresses, voteRegistries)
  const stakedTotal = totalStaked(poll, lookup, balances, stakedProxies)

  return Array.from(new Set([...Object.keys(stakedTotal), ...Object.keys(stakedVotersAndBalances)])).reduce(
    (acc, key) => {
      const st = stakedTotal[key] || new BigNumber('0')
      const vt = stakedVotersAndBalances[key] ? new BigNumber(stakedVotersAndBalances[key]) : new BigNumber('0')
      const amount = st.plus(vt)

      return {
        ...acc,
        [key]: amount,
      }
    },
    {},
  )
}

export const getPollData = async (poll, balancesLookup) => {
  const mkrVoter = await getVotersBalance(poll, balancesLookup)
  const votersPerOption = getPollVotersPerOption(poll)
  const mkrOptions = Object.keys(votersPerOption).reduce((acc, op) => {
    const voters = votersPerOption[op]
    const total = voters.reduce((acc, v) => {
      return acc.plus(mkrVoter[v])
    }, ZERO)

    return {
      ...acc,
      [op]: total.toNumber().toFixed(2),
    }
  }, {})

  const ret = poll.options.map((key, i) => {
    return {
      label: key,
      mkr: mkrOptions[i + 1] || 0,
      voter: votersPerOption[i + 1] ? votersPerOption[i + 1].length : 0,
    }
  })

  return ret
}

export const getPollsBalances = async polls => {
  const now = new Date()
  const allVoters = Array.from(
    new Set(polls.flatMap(poll => poll.votes.reduce((voters, v) => [...voters, v.voter], []))),
  )
  const allBalances = await Promise.all(allVoters.map(addr => getVoterBalances(addr, getUnixTime(now))))
  return allBalances.flat().reduce((lookup, snapshot: any) => {
    const account = snapshot.account.address
    const balances = lookup[account] || []
    const newBalances = [
      ...balances,
      {
        amount: snapshot.amount,
        timestamp: snapshot.timestamp,
      },
    ]
    return {
      ...lookup,
      [account]: newBalances,
    }
  }, {})
}

export const getTimeOpened = (from, to) => {
  const diffDays = differenceInDays(to, from)
  const diffHours = differenceInHours(to, from) % 24
  if (diffDays > 0 && diffHours > 0) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ${diffHours} ${diffHours === 1 ? 'hour' : 'hours'}`
  } else if (diffDays <= 0) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'}`
  else return `${diffDays} ${diffDays === 1 ? 'day' : 'days'}`
}

export const mergeEventPages = (data: object) => {
  const merged: any = {}

  Object.keys(data).forEach(key => {
    if (key.includes('_')) {
      const [name] = key.split('_')

      merged[name] = [...(merged[name] || []), ...data[key].reverse()]
    } else {
      merged[key] = data[key]
    }
  })

  return merged
}

// Since TG returns a maximum of 1000 results per collection then it's necessary to paginate to get all events
// Note: the max number of events per type supported with this configuration is 10000. Increase pageCount parameter
// if we need to support more that that value.
export const getAllEvents = (getQuery, orderBy = 'timestamp', pageCount = 10, pageSize = 1000) => {
  const pages = Array.from(Array(pageCount).keys()).reverse()

  const ordering = `orderBy: ${orderBy}, orderDirection: desc`

  return pages.map(pageIndex => {
    const offset = pageSize * pageIndex
    return getQuery(pageIndex, pageSize, offset, ordering)
  })
}
