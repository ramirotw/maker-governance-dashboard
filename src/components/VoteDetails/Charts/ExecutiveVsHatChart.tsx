import React from 'react'
import { Bar, Cell, YAxis } from 'recharts'
import { Chart, ChartWrapper, LegendLi } from '../../common'
import { CustomSvg } from '../../common/Icon'

const info = `This tile shows the MKR staked on this proposal in comparison to the current hat (or the closest contender if the currently viewed proposal has the hat), giving governance a clear picture of how much more MKR is required for the hat to be assigned either to or from this executive proposal. <br><br> This metric is generated using the Lock and Free events emitted by the DSChief governance contract which relate to this executive proposal, and either the ‘Hat’ proposal or the next closest proposal (if the currently viewed proposal has the ‘Hat’). The total MKR locked into both proposals is tallied and displayed.`
const links = [
  {
    title: 'MakerDAO Governance Graph',
    uri: 'https://thegraph.com/explorer/subgraph/protofire/makerdao-governance?query=Executive%20vote',
  },
]

const renderLegend = props => {
  const { data } = props
  const casted = !!data.find(el => el.casted)
  const isNext = !!data.find(el => el.isNext)
  return (
    <ul className="recharts-default-legend" style={{ listStyleType: 'none', paddingLeft: 0 }}>
      <LegendLi noPointer>
        <CustomSvg color={casted ? '#27a02c' : '#ffc353'} />
        <span>Executive vote</span>
      </LegendLi>
      <LegendLi noPointer>
        <CustomSvg color={'#a04827'} />
        <span>{isNext ? 'Next Highest Executive' : 'Current Hat'}</span>
      </LegendLi>
    </ul>
  )
}

const ExecutiveVsHatChart = props => {
  const { wrapperProps, modalProps } = props
  return (
    <ChartWrapper markdown info={info} links={links} {...wrapperProps} hideFilters>
      <Chart {...modalProps} legend={renderLegend}>
        <YAxis type="number" domain={[0, 'dataMax']} />
        <Bar isAnimationActive={modalProps.data ? false : true} dataKey="mkr">
          {modalProps.data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.isHat || entry.isNext ? '#a04827' : entry.casted ? '#27a02c' : '#ffc353'}
            />
          ))}
        </Bar>
      </Chart>
    </ChartWrapper>
  )
}

export default ExecutiveVsHatChart
