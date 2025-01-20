import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiSlack,

  SiJupyter,
  SiGooglecolab,
  SiDocker,
  SiGithub,
  SiTensorflow,
  SiPytorch,
 
} from "react-icons/si";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      
      <Col xs={4} md={2} className="tech-icons">
        <SiVisualstudiocode />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiSlack />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiJupyter />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiGooglecolab />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiDocker />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiGithub />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiTensorflow />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPytorch />
      </Col>
      
     
    </Row>
  );
}

export default Toolstack;
