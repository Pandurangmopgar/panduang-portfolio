import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CertificateCard from "./CertificateCard";
import Particle from "../Particle";

// Import your certificate images here
import OCIImage from "../../Assets/Certificates/OCI.png";
import MLImage from "../../Assets/Certificates/ML.png";
import DLImage from "../../Assets/Certificates/DL.jpeg";
import MathMLImage from "../../Assets/Certificates/MATH_ML.png";
import GenAIAppsImage from "../../Assets/Certificates/Geni_ai_12.png";
import PowerBIImage from "../../Assets/Certificates/powerbi.png";
import CareerEssentialsImage from "../../Assets/Certificates/LLM.jpeg";
import LLMImage from "../../Assets/Certificates/LLM2.jpeg";
import AzureMLImage from "../../Assets/Certificates/azure_ml.png";
import MLOPS from "../../Assets/Certificates/MLOPS.png"

function Certificates() {
  const certifications = [
    {
      title: "OCI Certified Generative AI Developer",
      description: "Oracle Cloud Infrastructure certification for Generative AI development",
      imgPath: OCIImage,
    },
    {
      title: "Machine Learning Specialization",
      description: "DeepLearning.AI and Stanford University, Coursera, 2024",
      imgPath: MLImage,
    },
    {
      title: "Deep Learning Specialization",
      description: "DeepLearning.AI, Coursera, 2024",
      imgPath: DLImage,
    },
    {
      title: "Machine Learning In Production",
      description: "DeepLearning.AI, Coursera, 2024",
      imgPath:MLOPS ,
    },
    {
      title: "Mathematics for Machine Learning and Data Science Specialization",
      description: "DeepLearning.AI, Coursera, 2024",
      imgPath: MathMLImage,
    },
    {
      title: "Building 12+ Generative AI Applications",
      description: "Udemy, 2024",
      imgPath: GenAIAppsImage,
    },
    {
      title: "Power BI Data Analyst",
      description: "Microsoft, Coursera (In Progress)",
      imgPath: PowerBIImage,
    },
    {
      title: "Career Essentials in Generative AI",
      description: "Microsoft, LinkedIn Learning, 2024",
      imgPath: CareerEssentialsImage,
    },
    {
      title: "Introduction to Large Language Models",
      description: "DeepLearning.AI and Amazon AWS, Coursera, 2024",
      imgPath: LLMImage,
    },
    {
      title: "Azure Machine Learning",
      description: "Microsoft Learn, 2024",
      imgPath: AzureMLImage,
    },
  ];

  return (
    <Container fluid className="certificate-section">
      <Particle />
      <Container>
        <h1 className="certificate-heading">
          My <strong className="purple">Certifications</strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are some of my recent certifications and completed courses.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {certifications.map((cert, index) => (
            <Col md={4} className="certificate-card" key={index}>
              <CertificateCard
                imgPath={cert.imgPath}
                title={cert.title}
                description={cert.description}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Certificates;