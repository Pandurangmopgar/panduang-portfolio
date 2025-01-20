import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Pandurang Mopgar </span>
            from <span className="purple"> Mumbai, India.</span>
            <br />
             currently in my fourth year of Computer Engineering at MGM College of Engineering, Kamothe.
            
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Chess
            </li>
            <li className="about-activity">
              <ImPointRight /> Reading books
            </li>
            <li className="about-activity">
              <ImPointRight /> Watching videos on Youtube
            </li>
          </ul>

          
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
