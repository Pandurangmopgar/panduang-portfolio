import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import ChatbotIcon from "../ChatbotIcon";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              Let Me <span className="purple"> Introduce </span> Myself
            </h1>
            <p className="home-about-body">
              I'm passionate about leveraging AI and machine learning to solve complex real-world problems, with a focus on creating innovative solutions that make a meaningful impact.
              <br />
              <br />
              My expertise spans across:
              <i>
                <b className="purple"> Python, Java, JavaScript, and SQL </b>
              </i>
              for programming,
              <br />
              <br />
              I specialize in AI/ML frameworks including{" "}
              <i>
                <b className="purple">TensorFlow, PyTorch, Scikit-learn, and Transformers</b>
              </i>
              <br />
              <br />
              My full-stack development skills include{" "}
              <i>
                <b className="purple">
                  React, Next.js, Node.js, Flask, and FastAPI
                </b>
              </i>
              <br />
              <br />
              I'm particularly experienced in{" "}
              <i>
                <b className="purple">
                  Generative AI, LLMs, Fine-tuning, PEFT, LoRA, RLHF, LangChain, and Prompt Engineering
                </b>
              </i>
              <br />
              <br />
              My goal is to develop innovative AI solutions that make a difference. I'm always excited to learn new technologies and tackle complex problems.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>Find Me On</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/Pandurangmopgar"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://x.com/PMopgar"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/pandurang-mopgar/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/pandurangmopgar/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
              
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;