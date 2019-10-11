import React from 'react'
import { Line, YAxis } from 'recharts'
import { Chart, ChartWrapper } from '../../common'

const VotersDistributionChart = props => {
  const { wrapperProps, modalProps, options, colors } = props
  return (
    <ChartWrapper {...wrapperProps} hideFilters>
      <Chart {...modalProps}>
        <YAxis />
        {options.map((option, i) => (
          <Line
            key={option}
            isAnimationActive={modalProps.data ? false : true}
            dot={false}
            name={`${option}`}
            stroke={colors[i]}
            strokeWidth={2}
            type="monotone"
            dataKey={`${option}`}
          />
        ))}
      </Chart>
    </ChartWrapper>
  )
}

export default VotersDistributionChart