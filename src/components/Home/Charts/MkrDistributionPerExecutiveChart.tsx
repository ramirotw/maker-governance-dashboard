import React from 'react'
import { Bar, Cell, YAxis } from 'recharts'
import { Chart, ChartWrapper } from '../../common'

const MkrDistributionPerExecutiveChart = props => {
  const { wrapperProps, modalProps, currentMkr } = props
  const maxValue = Math.max(...modalProps.data.map(o => o.mkr), 0)
  return (
    <ChartWrapper {...wrapperProps} hideFilters>
      <Chart {...modalProps} showXaxis={3}>
        <YAxis style={{ fontSize: '13px' }} type="number" domain={[0, maxValue]} />
        <Bar
          isAnimationActive={modalProps.data ? false : true}
          name={`Executive vote - Current ${currentMkr}`}
          dataKey="mkr"
        >
          {modalProps.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.isHat ? '#000000' : '#a04827'} />
          ))}
        </Bar>
      </Chart>
    </ChartWrapper>
  )
}

export default MkrDistributionPerExecutiveChart
