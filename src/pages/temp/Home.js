import { useState } from "react";

import {
  Card,
  Col,
  Row,
  Typography,
  Tooltip,
  Progress,
  Upload,
  message,
  Button,
  Timeline,
  Radio,
} from "antd";
import {
  ToTopOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

import ava1 from "../assets/images/logo-shopify.svg";
import ava2 from "../assets/images/logo-atlassian.svg";
import ava3 from "../assets/images/logo-slack.svg";
import ava4 from "../assets/images/logo-spotify.svg";
import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import team1 from "../assets/images/team-1.jpg";
import team2 from "../assets/images/team-2.jpg";
import team3 from "../assets/images/team-3.jpg";
import team4 from "../assets/images/team-4.jpg";

function Home() {
  const { Title, Text } = Typography;

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  const [reverse, setReverse] = useState(false);

  const list = [
    {
      Title: "Soft UI Shopify Version",
      bud: "$14,000",
      progress: <Progress percent={60} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={team3} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Jessica Doe">
            <img className="tootip-img" src={team4} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      Title: "Progress Track",
      bud: "$3,000",
      progress: <Progress percent={10} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      Title: "Fix Platform Errors",
      bud: "Not Set",
      progress: <Progress percent={100} size="small" status="active" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={team3} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      Title: "Launch new Mobile App",
      bud: "$20,600",
      progress: <Progress percent={100} size="small" status="active" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      Title: "Add the New Landing Page",
      bud: "$4,000",
      progress: <Progress percent={80} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={team3} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Jessica Doe">
            <img className="tootip-img" src={team4} alt="" />
          </Tooltip>
        </div>
      ),
    },

    {
      Title: "Redesign Online Store",
      bud: "$2,000",
      progress: (
        <Progress
          percent={100}
          size="small"
          status="exception"
          format={() => "Cancel"}
        />
      ),
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
        </div>
      ),
    },
  ];

  const timelineList = [
    {
      title: "$2,400 - Redesign store",
      time: "09 JUN 7:20 PM",
      color: "green",
    },
    {
      title: "New order #3654323",
      time: "08 JUN 12:20 PM",
      color: "green",
    },
    {
      title: "Company server payments",
      time: "04 JUN 3:10 PM",
    },
    {
      title: "New card added for order #4826321",
      time: "02 JUN 2:45 PM",
    },
    {
      title: "Unlock folders for development",
      time: "18 MAY 1:30 PM",
    },
    {
      title: "New order #46282344",
      time: "14 MAY 3:30 PM",
      color: "gray",
    },
  ];

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>Нөөц</Title>
                  {/* <Paragraph className="lastweek">
                    done this month<span className="blue">40%</span>
                  </Paragraph> */}
                </div>
                <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="a">Бүгд</Radio.Button>
                      <Radio.Button value="b">Агуулах</Radio.Button>
                      <Radio.Button value="c">Бараа</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <div className="ant-list-box table-responsive">
                <table className="width-100">
                  <thead>
                    <tr>
                      <th>Агуулах</th>
                      <th>Бараа</th>
                      <th>Тоо ширхэг</th>
                      {/* <th>COMPLETION</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((d, index) => (
                      <tr key={index}>
                        <td>
                          <h6>
                            <img
                              src={d.img}
                              alt=""
                              className="avatar-sm mr-10"
                            />{" "}
                            {d.Title}
                          </h6>
                        </td>
                        <td>{d.member}</td>
                        <td>
                          <span className="text-xs font-weight-bold">
                            {d.bud}{" "}
                          </span>
                        </td>
                        {/* <td>
                          <div className="percent-progress">{d.progress}</div>
                        </td> */}
                      </tr>
                    ))} 
                  </tbody>
                </table>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <div className="timeline-box">
                <Title level={5}>Түүх</Title>
                <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                  {/* this month <span className="bnb2">20%</span> */}
                </Paragraph>

                <Timeline
                  pending="Recording..."
                  className="timelinelist"
                  reverse={reverse}
                >
                  {timelineList.map((t, index) => (
                    <Timeline.Item color={t.color} key={index}>
                      <Title level={5}>{t.title}</Title>
                      <Text>{t.time}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
                <Button
                  type="primary"
                  className="width-100"
                  onClick={() => setReverse(!reverse)}
                >
                  {<MenuUnfoldOutlined />} Буцаан эрэмбэлэх
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;