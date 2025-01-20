import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

// Import your project images here
import IntelligentEnterpriseAssistant from "../../Assets/Projects/ai-enterprice-assistant.png";
import ResumeExpert from "../../Assets/Projects/ats_resume.png";
import DocuChatAI from "../../Assets/Projects/multidocument_chat.jpg";
import AIWaterWellPredictor from "../../Assets/Projects/AI_water_predictor.png";
import BrainTumor from "../../Assets/Projects/brain_tumor_detection.jpg";
import LLMFinetuning from "../../Assets/Projects/LLM2.jpeg";
import Transformer from "../../Assets/Projects/Transformer.png";
import UNet from "../../Assets/Projects/Image_segmentation.png";
import AINewsletter from "../../Assets/Projects/ai_newsletter.png"; 
import AIReasoning from "../../Assets/Projects/ai_reasoning_breakthrough.png"; 

function Projects() {
  const projects = [
    {
      imgPath: BrainTumor, // Using BrainTumor image as placeholder for OmniHealth
      isBlog: false,
      title: "OmniHealth: AI-Powered Multi-Disease Prediction and Personalized Healthcare Platform",
      description: `Built a unified AI system for predicting multiple diseases including diabetes, heart disease, lung cancer, pneumonia, brain tumors, and Alzheimer's disease, achieving 99%+ diagnostic accuracy across conditions, with the Alzheimer's prediction model achieving 99.14% accuracy.
      
      Key Features:
      • Employed advanced techniques including attention mechanisms in Vision Transformers for medical imaging (CT scans, X-rays, MRIs) and ensemble approaches for analyzing clinical data
      • Integrated AI-powered assistants like Nutrition Analyzer, Diet planner, Exercise coach, Symptom Analyzer, and Mental Health Assistant for personalized care solutions tailored to patient needs
      • Showcased potential to revolutionize early disease detection and improve healthcare outcomes through innovative diagnostic and care tools`,
      demoLink: "https://omni-health.vercel.app/",
      isWebsite: true,
    },
    {
      imgPath: IntelligentEnterpriseAssistant,
      isBlog: false,
      title: "Intelligent Enterprise Assistant",
      description: "Award-winning AI-driven Enterprise Assistant that won first prize in the college's internal Smart India Hackathon (SIH). Built with React, Flask, Node.js, and Express, it uses Google's Gemini API, Langchain, and LlamaIndex for advanced NLP and RAG. Features include AI-powered responses, PDF document analysis, two-factor authentication, personalized email services, and continuous learning through RLHF. Addresses real-world challenges in information retrieval, policy questions, and employee onboarding.",
      ghLink: "https://www.linkedin.com/feed/update/urn:li:activity:7237421763687575552/",
      isLinkedIn: true,
    },
    {
      imgPath: AIWaterWellPredictor,
      isBlog: false,
      title: "AI-Enabled Water Well Predictor",
      description: "Collaborated with the Government of India to develop an AI water well prediction system for the Smart India Hackathon. Implemented KNN for geospatial interpolation, classification, and regression models. Created 5 models for water well suitability, water-bearing zones, discharge rate, drilling techniques, and water quality.",
      ghLink: "https://github.com/Pandurangmopgar/AI-enabled-water-well-predictor",
    },
    {
      imgPath: AINewsletter,
      isBlog: false,
      title: "AI-Powered Personalized Newsletter with Multi-Agent System",
      description: `Developed a one-of-a-kind AI newsletter platform enabling users to modify their preferences and add custom interests, leveraging a multi-agent system with Google's Gemini API for intelligent content curation and personalized delivery.
      
      Key Features:
      • Built the entire application using Next.js, integrated Supabase for sleek UI design, implemented Redis for efficient caching, and utilized Supabase for secure storage of user preferences and custom interests
      • Created a high-impact, developer-focused newsletter delivering curated AI insights, breaking news, and analysis of new technologies' impact on software development, supporting continuous learning in the rapidly evolving field of AI`,
      ghLink: "https://news-letter-22km.vercel.app/"
    },
    {
      imgPath: AIReasoning,
      isBlog: false,
      title: "Breakthrough in AI Reasoning: Enhanced Chain of Thought",
      description: `Achieved a significant milestone in fine-tuning language models for advanced reasoning.
      
      Key Achievements:
      • Successfully solved complex problems that challenge even advanced models like Claude 3.5 Sonnet and GPT-4
      • Implemented ChatGPT-01-style Chain of Thought (CoT) reasoning on Qwen 2.5 7B and Llama 3.2 3B Instruct models
      • Utilized Low-Rank Adaptation (LoRA) for efficient fine-tuning`,
      ghLink: "https://lnkd.in/dg9C5xvN",
    },
    {
      imgPath: ResumeExpert,
      isBlog: false,
      title: "ATS Resume Expert",
      description: "Developed a Generative AI solution using Google's Gemini-1.5 Flash LLM for resume analysis, job matching, and skill improvement suggestions. Features include Smart Analysis for detailed resume insights, Skills Boost for personalized recommendations, and Job Match to align with dream job requirements. Implemented with Streamlit frontend for minimal latency and accurate analysis.",
      ghLink: "https://www.linkedin.com/posts/pandurang-mopgar_excited-to-share-my-latest-project-ive-activity-7230579096198500352-9TRc?utm_source=share&utm_medium=member_desktop"
    },
    {
      imgPath: DocuChatAI,
      isBlog: false,
      title: "DocuChat AI",
      description: "Created an intelligent multi-document assistant using RAG (Retrieval-Augmented Generation) technology. Users can upload multiple PDF documents, which are converted into vectors and stored in a vector database. The system allows users to ask questions about the documents' content, providing quick and accurate answers by leveraging the RAG concept for efficient information retrieval and generation.",
      ghLink: "https://github.com/Pandurangmopgar/ChatWithDoc",
    },
    {
      imgPath: BrainTumor,
      isBlog: false,
      title: "Brain Tumor Detection using Vision Transformer",
      description: "Developed a brain tumor detection model using Vision Transformer architecture, achieving 98% accuracy. This state-of-the-art approach surpasses traditional models in predicting brain tumors.",
      ghLink: "https://github.com/Pandurangmopgar/Brain_tumor_detection_VIT",
    },
    {
      imgPath: LLMFinetuning,
      isBlog: false,
      title: "LLM Fine-tuning with RLHF",
      description: "Fine-tuned a Language Model (LLM) using Flan-T5 architecture, leveraging Reinforcement Learning from Human Feedback (RLHF) to develop a Proximal Policy Optimization (PPO) agent on Amazon SageMaker, resulting in a 40% increase in model accuracy.",
      ghLink: "https://github.com/YourUsername/LLM-Finetuning-RLHF",
    },
    {
      imgPath: Transformer,
      isBlog: false,
      title: "Transformer Implementation",
      description: "Implemented the Transformer architecture from scratch, gaining deep insights into the workings of this powerful model that revolutionized natural language processing. This project demonstrates a thorough understanding of attention mechanisms, positional encoding, and the overall Transformer structure.",
      ghLink: "https://github.com/YourUsername/Transformer-Implementation",
    },
    {
      imgPath: UNet,
      isBlog: false,
      title: "Image Segmentation with U-Net",
      description: "Developed an image segmentation model using the U-Net architecture, which is widely used in biomedical image segmentation. This project showcases the ability to work with complex neural network architectures and apply them to real-world problems in computer vision.",
      ghLink: "https://github.com/YourUsername/UNet-Image-Segmentation",
    },
  ];

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {projects.map((project, index) => (
            <Col md={4} className="project-card" key={index}>
              <ProjectCard
                imgPath={project.imgPath}
                isBlog={project.isBlog}
                title={project.title}
                description={project.description}
                demoLink={project.demoLink}
                ghLink={project.ghLink}
                isLinkedIn={project.isLinkedIn}
                isWebsite={project.isWebsite}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;