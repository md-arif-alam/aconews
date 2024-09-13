import React from "react";
import "./about.css";
// import GitHubIcon from '@mui/icons-material/GitHub';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const About = () => {
  const visitGithub = () => {
    window.location = "https://github.com/md-arif-alam";
  };
  return (
    <div className="aboutSection">
      <div className="aboutSectionGradient">
        <div className="aboutSectionContainer" >
          <h1>About Me</h1>

          <div>
            <div >
              <img
                style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0", borderRadius: "70px" }}
                src="https://res.cloudinary.com/dgmljtcbq/image/upload/v1716566633/avatars/nasy92qmsguogttnjp1p.jpg"
                alt="Founder"
              />
              <h2 style={{ color: "black" }}>Md Arif Alam</h2>
              <button onClick={visitGithub} style={{ color: "black" }}>
                Freelance Web Developer
              </button>
              <span style={{ fontFamily: "cursive" }}>
                Hello World !!!! this website is all about fetching data from gnews.io testing the api using postman then creating whole app's frontend as well as backend. Frontend tech stacks includes "ReactJs", "TailwindCss", "ShadCN" & "Bootstrap". Backend inlcudes "NodeJs", "ExpressJs", "CORS", "axios" and for hosting used "Firebase" , made by @MdArifAlam.You can vist my github for
                sourcecode..!
              </span>
            </div>
            <div className="aboutSectionContainer2">

              <div style={{ marginTop: "20px", marginBottom: "25px", }}>
                <h2 style={{ textAlign: "center", color: "black" }}>
                  "Something About Me"
                </h2>
                <p style={{ color: "black", fontFamily: "cursive" }}>
                  "I'm a passionate Frontend Developer with a keen interest in exploring Fullstack MERN (MongoDB, Express.js, React.js, Node.js) development. My journey in the tech world began with a fascination for creating beautiful user interfaces, and it has since evolved into a quest to build robust, scalable applications that solve real-world problems"
                </p>
              </div>
              <div>

                <a
                  href="https://www.linkedin.com/in/md-arif-alam0316"
                  target="blank"
                  style={{ color: "black" }}
                >
                  LinkedIn
                </a>
                <span>{" "}</span>
                <span>{"|"}</span>
                <span>{" "}</span>
                <a href="https://github.com/md-arif-alam" style={{ color: "black" }} target="blank">
                  Github
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
