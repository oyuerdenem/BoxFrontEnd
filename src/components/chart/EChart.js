import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";

function EChart({ values = {} }) {
  const { Title, Paragraph } = Typography;
  return (
    <>
      <div id="chart">
        {values?.options && (
          <ReactApexChart
            className="bar-chart"
            options={{
              ...values.options, tooltip: {
                y: {
                  formatter: function (val) {
                    return "$ " + val + " thousands";
                  },
                },
              },
          }}
            series={values.series}
          type="bar"
          height={220}
          />
        )}
      </div>
      <div className="chart-vistior">
        <Title level={5}>Орлогын үзүүлэлт</Title>
        <Paragraph className="lastweek">
          Энэ долоо хоног <span className="bnb2">+30%</span>
        </Paragraph>
        <Paragraph className="lastweek">
          Дараах үзүүлэлтэд борлуулалт хийсэн агуулахын тоо, худалдаа хийсэн дэлгүүр, худалдагдсан бараа мөн нийт орлогын мэдээлэл багтана.
        </Paragraph>
        <Row gutter>
          {values?.items.map?.((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default EChart;
