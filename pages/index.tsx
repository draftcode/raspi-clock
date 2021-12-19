import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Row, Col } from "antd";
import { DateTime } from "luxon";

const Clock = ({
  className,
  clock,
  zone,
}: {
  className: string;
  clock: DateTime;
  zone: string;
}) => {
  const c = clock.setZone(zone);
  var zoneName = c.toFormat("ZZZZ");
  if (zone === "JST") {
    zoneName = zone;
  }

  return (
    <div className={`clock ${className}`}>
      <div className="date">{c.toFormat("MM/dd")}</div>
      <div className="time">{c.toFormat("H:mm")}</div>
      <div className="note">
        {zoneName}
        {c.toFormat("(Z)")}
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const [clock, setClock] = useState(DateTime.now());
  useEffect(() => {
    const id = setInterval(() => {
      setClock(DateTime.now());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Row>
      <Col span={8}>
        <Clock clock={clock} className="clock-1" zone="JST" />
      </Col>
      <Col span={8}>
        <Clock clock={clock} className="clock-2" zone="UTC" />
      </Col>
      <Col span={8}>
        <Clock clock={clock} className="clock-3" zone="US/Pacific" />
      </Col>
    </Row>
  );
};

export default Home;
