import React from 'react'
import { Bar, Cell, YAxis } from 'recharts'
import { Chart, ChartWrapper, LegendLi } from '../../common'
import { CustomSvg } from '../../common/Icon'

const renderLegend = props => {
  const { data } = props
  const casted = !!data.find(el => el.casted)
  const isNext = !!data.find(el => el.isNext)
  return (
    <ul className="recharts-default-legend" style={{ listStyleType: 'none', paddingLeft: 0 }}>
      <LegendLi>
        <CustomSvg color={casted ? '#27a02c' : '#ffc353'} />
        <span>Executive vote</span>
      </LegendLi>
      <LegendLi>
        <CustomSvg color={'#a04827'} />
        <span>{isNext ? 'Next Highest Executive' : 'Current Hat'}</span>
      </LegendLi>
    </ul>
  )
}

const ExecutiveVsHatChart = props => {
  const { wrapperProps, modalProps } = props
  return (
    <ChartWrapper {...wrapperProps} hideFilters>
      <Chart {...modalProps} legend={renderLegend}>
        <YAxis />
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