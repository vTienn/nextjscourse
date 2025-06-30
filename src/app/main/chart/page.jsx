"use client"

import { Pie, Rose, Line, Bar } from "@ant-design/plots"
import GaugeChart from "react-gauge-chart"
import Calendar from "react-calendar"
import { useEffect, useState } from "react"
import "react-calendar/dist/Calendar.css"
import { getCourse } from "../../../../utils/courseService"

const DashboardPage = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCourse()
      setData(res)
    }
    fetchData()
  }, [])

  const levelChartData = data.reduce((acc, item) => {
    const found = acc.find((e) => e.type === item.level)
    if (found) found.value++
    else acc.push({ type: item.level, value: 1 })
    return acc
  }, [])

  const durationChartData = data.map((item) => ({
    type: item.name,
    value: parseInt(item.duration)
  }))

  const lineChartData = data.map((item, i) => ({
    time: `Day ${i + 1}`,
    value: parseInt(item.duration),
    category: item.level
  }))

  const barChartData = data.map((item) => ({
    label: item.level,
    type: item.name,
    value: parseInt(item.duration)
  }))

  return (
    <div style={{ padding: 24, background: "#f0f2f5", minHeight: "100vh" }}>
      <h2> Dashboard Overview </h2>{" "}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: 24
        }}
      >
        <div>
          <h3> Course Level Distribution </h3>{" "}
          <Rose
            data={levelChartData}
            xField='type'
            yField='value'
            seriesField='type'
            radius={0.9}
            label={{ style: { fill: "#fff" } }}
            legend={{ position: "bottom" }}
            style={{ height: 300 }}
          />{" "}
        </div>{" "}
        <div>
          <h3> Course Duration Distribution </h3>{" "}
          <Pie
            data={durationChartData}
            angleField='value'
            colorField='type'
            radius={0.8}
            innerRadius={0.6}
            label={{ type: "inner", offset: "-30%", content: "{name}", style: { fill: "#fff" } }}
            interactions={[{ type: "element-active" }]}
            legend={{ position: "bottom" }}
            style={{ height: 300 }}
          />{" "}
        </div>{" "}
        <div>
          <h3> Weekly Course Duration </h3>{" "}
          <Line
            data={lineChartData}
            xField='time'
            yField='value'
            seriesField='category'
            smooth
            height={300}
          />{" "}
        </div>{" "}
        <div>
          <h3> Bar Chart by Level </h3>{" "}
          <Bar
            data={barChartData}
            xField='value'
            yField='type'
            seriesField='label'
            isGroup
            height={300}
          />{" "}
        </div>{" "}
        <div>
          <h3> Active Rate </h3>{" "}
          <GaugeChart id='gauge-chart1' nrOfLevels={20} percent={0.7} style={{ width: "100%" }} />{" "}
        </div>{" "}
        <div>
          <h3> Calendar </h3> <Calendar />
        </div>{" "}
      </div>{" "}
    </div>
  )
}

export default DashboardPage
