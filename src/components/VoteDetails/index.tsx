import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import {
  Card,
  DescriptionBox,
  DescriptionWrapper,
  Modal,
  NoData,
  StrippedRowsContainer,
  StrippedTableWrapper,
  StrippedTableCell,
  StrippedTableRow,
} from '../common'
import { getModalContainer } from '../../utils'
import { VotersVsMkrChart, ApprovalsByAddressChart, ExecutiveVsHatChart } from './Charts'
import {
  defaultFilters,
  getApprovalsByAddress,
  getComponentData,
  getTopSupporters,
  getTopSupportersTableData,
  getVoteTableData,
  getVotersVsMkrData,
  getExecutiveVsHat,
} from './helpers'

const VoteDetailContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${props => props.theme.themeBreakPoints.xl}) {
    column-gap: ${props => props.theme.separation.gridSeparation};
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: ${props => props.theme.separation.gridSeparation};
    grid-template-areas:
      'col1 col2 col2'
      'col4 col5 col6';
  }
`

const CardStyled = styled(Card)`
  height: 400px;
  margin-bottom: ${props => props.theme.separation.gridSeparation};

  &:last-child {
    margin-bottom: 0;
  }

  @media (min-width: ${props => props.theme.themeBreakPoints.xl}) {
    margin-bottom: 0;
  }
`

type Props = {
  vote: any
  votingActions: Array<any>
  executives: Array<any>
  governanceInfo: any
}

function VoteDetails(props: Props) {
  const { vote, votingActions, executives, governanceInfo } = props
  const [isModalOpen, setModalOpen] = useState(false)
  const [isModalChart, setModalChart] = useState(false)
  const [chartFilters, setChartFilters] = useState(defaultFilters)
  const [modalData, setModalData] = useState({ type: '', component: '' })
  const topSupporters = getTopSupporters(votingActions)
  const voteMap = {
    table: {
      description: {
        data: vote.about,
        component: props => <Description expanded content="Description" component="description" {...props} />,
      },
    },
    chart: {
      mkrStaked: {
        data: getVotersVsMkrData(votingActions, vote),
        component: props => <VotersVsMkr expanded content="MKR Staked" component="mkrStaked" {...props} />,
      },
      numberOfVoters: {
        data: getVotersVsMkrData(votingActions, vote),
        component: props => (
          <VotersVsMkr voters expanded content="Number of Voters" component="numberOfVoters" {...props} />
        ),
      },
      executiveVsHat: {
        data: getExecutiveVsHat(vote, executives, governanceInfo.hat),
        component: props => <ExecutiveVsHat expanded content="Vs Current Hat" component="executiveVsHat" {...props} />,
      },
      approvalsByAddress: {
        data: getApprovalsByAddress(votingActions),
        component: props => (
          <ApprovalsByAddress expanded content="Approvals by Address Size" component="approvalsByAddress" {...props} />
        ),
      },
    },
  }

  const setModal = (data: any, isChart: boolean = false): void => {
    setModalOpen(true)
    setModalChart(isChart)
    setModalData(data)
  }

  const setFilter = (e, component) => {
    const obj = {
      ...chartFilters,
      [component]: e.target.value,
    }
    setChartFilters(obj)
  }

  const getModalProps = (type, component, expanded = false) => {
    const data = voteMap[type][component].data
    return {
      modalStyles: expanded ? { width: '99%', aspect: 3 } : undefined,
      width: 100,
      height: 400,
      data,
    }
  }

  const getWrapperProps = data => {
    const { content, versus = null, component, expanded } = data
    const isChart = data.type === 'table' ? false : true
    const handleModal = !expanded ? () => setModal(data, isChart) : () => setModalOpen(false)
    return {
      content,
      versus,
      value: chartFilters[data.component],
      handleModal,
      onChange: e => setFilter(e, component),
      isModalOpen: expanded,
    }
  }

  // Voters vs mkr data
  const VotersVsMkr = props => {
    const data = getComponentData('chart', props.component, props.content, props.expanded, props.versus)
    return (
      <VotersVsMkrChart
        voters={props.voters}
        modalProps={getModalProps(data.type, data.component, data.expanded)}
        wrapperProps={getWrapperProps(data)}
      />
    )
  }

  // Executive vs current hat
  const ExecutiveVsHat = props => {
    const data = getComponentData('chart', props.component, props.content, props.expanded, props.versus)
    return (
      <ExecutiveVsHatChart
        modalProps={getModalProps(data.type, data.component, data.expanded)}
        wrapperProps={getWrapperProps(data)}
      />
    )
  }

  // Approvals by address
  const ApprovalsByAddress = props => {
    const data = getComponentData('chart', props.component, props.content, props.expanded, props.versus)
    return (
      <ApprovalsByAddressChart
        modalProps={getModalProps(data.type, data.component, data.expanded)}
        wrapperProps={getWrapperProps(data)}
      />
    )
  }

  // Description Data
  const Description = props => {
    const data = getComponentData('table', props.component, props.content, props.expanded)
    return (
      <>
        <DescriptionWrapper {...getWrapperProps(data)}>
          <DescriptionBox expanded={props.expanded}>
            <ReactMarkdown source={voteMap.table[props.component].data} />
          </DescriptionBox>
        </DescriptionWrapper>
      </>
    )
  }

  return (
    <>
      <VoteDetailContainer>
        <CardStyled style={{ padding: 0, gridArea: 'col1' }}>
          <StrippedTableWrapper content="Details">
            {getVoteTableData(vote).map(el => (
              <StrippedTableRow key={el.label}>
                <StrippedTableCell>{el.label}</StrippedTableCell>
                <StrippedTableCell>{el.value}</StrippedTableCell>
              </StrippedTableRow>
            ))}
          </StrippedTableWrapper>
        </CardStyled>
        <CardStyled style={{ gridArea: 'col2' }}>
          {vote.about ? (
            <Description content="Description" component="description" />
          ) : (
            <NoData>Cannot fetch executive description.</NoData>
          )}
        </CardStyled>
        <CardStyled style={{ gridArea: 'col4' }}>
          <VotersVsMkr content="MKR Staked" component="mkrStaked" />
        </CardStyled>
        <CardStyled style={{ gridArea: 'col5' }}>
          <VotersVsMkr content="Number of Voters" voters component="numberOfVoters" />
        </CardStyled>
        <CardStyled style={{ gridArea: 'col6' }}>
          <ApprovalsByAddress content="Approvals by Address Size" component="approvalsByAddress" />
        </CardStyled>
        <CardStyled style={{ padding: 0 }}>
          <StrippedTableWrapper
            markdown
            info={`This tile shows a leaderboard for the top MKR wallets that have voted for this executive. This is primarily a navigational aid, allowing access to each address’s voting history and etherscan page. <br><br> This metric is generated using the Lock and Free events emitted by the DSChief governance contract which relate to this executive proposal. This MKR value is then converted into a percentage of the total MKR locked in this executive proposal. This list is then sorted large to small and the addresses are displayed.`}
            links={[
              {
                title: 'MakerDAO Governance Graph',
                uri: 'https://thegraph.com/explorer/subgraph/protofire/makerdao-governance?query=Executive%20vote',
              },
            ]}
            content="Top Supporters"
          >
            <StrippedRowsContainer>
              {getTopSupportersTableData(topSupporters, vote)
                .slice(0, 8)
                .map(el => (
                  <StrippedTableRow key={el.sender}>
                    <StrippedTableCell>{el.supports}%</StrippedTableCell>
                    <StrippedTableCell>{el.s}</StrippedTableCell>
                  </StrippedTableRow>
                ))}
            </StrippedRowsContainer>
          </StrippedTableWrapper>
        </CardStyled>
        <CardStyled>
          <ExecutiveVsHat content="Vs Current Hat" component="executiveVsHat" />
        </CardStyled>
      </VoteDetailContainer>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} isChart={isModalChart} closeModal={() => setModalOpen(false)}>
          {getModalContainer(voteMap[modalData.type][modalData.component].component)}
        </Modal>
      )}
    </>
  )
}

export default VoteDetails
