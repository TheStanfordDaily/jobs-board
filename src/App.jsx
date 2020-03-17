import React, { useEffect, useState } from 'react';
import './index.css';
import { Switch, HashRouter, Route } from "react-router-dom";

import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import Jobs from './components/Jobs';
import JobDetails from './components/JobDetails';
import PostJob from './components/PostJob';
import Advice from './components/Advice';
import Footer from './components/Footer';
import Payment from './components/Payment';
import NotFound from './components/NotFound';
import Helmet from 'react-helmet';
import { checkLoginStatus,parseCodeFromQuery } from './login/actions';

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async function() {
      await parseCodeFromQuery();
      const user = await checkLoginStatus();
      setUser(user);
    })();
  }, []);
  return (
    <div className="flexWrapper">
      <Helmet>
        <title>Stanford Daily Jobs Board</title>
      </Helmet>
      <div className="wrapper">
        <HashRouter>
          <div>
            <NavBar user={user} />
            <Switch>
              <Route exact path='/' render={(props) => <LandingPage {...props} jobs={jobs} />} /> />
              <Route exact path='/jobs' render={(props) => <Jobs {...props} jobs={jobs} />} />
              <Route path='/jobs/:id' render={(props) => <JobDetails {...props} jobs={jobs} />} /> />
              <Route exact path='/advice' component={Advice} />
              <Route exact path='/post' component={PostJob} />
              <Route exact path='/payment' component={Payment} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </HashRouter>
        <Footer />
      </div>
    </div>
  );
};

const jobs = [
  {
    id: "683ae113-dc17-4232-b586-a16035f8e45b",
    title: "Software Architect",
    logo: "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbEo0IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--24c3c00c8e47a8d62e02416614d76eadc6c4919d/EverydayHealthGroupLogo.png",
    company: "Everyday Health",
    location: "San Francisco",
    description: "<p>BabyCenter, the world's number one digital parenting resource, is seeking a talented hands-on Software Architect with a passion for building world-class experiences for over 100 million people monthly.  BabyCenter is a subsidiary of J2 Global under the Everyday Health Group’s Parenting &amp; Pregnancy vertical.</p>\n<p>As Software Architect, you will design and architect stable, scalable and secure web applications and services with state-of-the-art cloud technologies. You are a hands-on lead developer in the implementation of new solutions, prototypes, as well as actively contributing to the ideation and design phases of each project.  You will work with an inspired and inquisitive team of technologists who are already developing and deploying applications to the highest standards.</p>\n<p>You have experience building large-capacity consumer-facing web services and sites, experience working with new technologies, and a desire to build great products for new and expecting parents.</p>\n<p>This is a full-time position at our location in San Francisco, and reports to the Director of Engineering.</p>\n<p>Pursuant to the San Francisco Fair Chance Ordinance, we will consider for employment qualified applicants with arrest and conviction records.</p>\n<p>Position Overview</p>\n<p>The BabyCenter Software Architect is responsible for the construction of consumer and advertising software solutions, using a team-based approach and collaborating with all functions on the team to ensure that each feature delivered is of the highest quality and conforms to BabyCenter engineering standards.</p>\n<p>Roles &amp; Responsibilities</p>\n<p>Lead and architect cloud solutions for scalable, highly available, secure web services and websites on AWS platform\nPlan and manage initiatives to migrate systems to AWS platform\nPartner with Engineering managers to build the technological vision, drives technology strategy and influences business partners and technology leaders on strategic direction\nDesign, implementation, and maintenance of new and existing features\nParticipate in defining and improving coding standards\nCollaborate with other software engineers to ensure that solutions are built in a consistent framework to a high-quality standard\nCollaborate with product, marketing, and sales teams to develop new products and features, gather requirements, and scope work\nMentor, coach, and support engineers in their technical growth and learning industry best practices\nRequirements</p>\n<p>8+ years web development experience, with 3+ years of experience as cloud solutions architect\nDeep understanding of frontend and backend web architecture and frameworks\nExpertise in services and tools on AWS platform, including Lambda, API gateway, SQS, SNS and S3, Kinesis, DynamoDB, Redshift\nHands on with Relational Database, NoSQL and Columnar Storage.\nProficient in modern web technologies including Java, Node.js and ReactJS\nExperience with designing and re-architecting application for cloud platforms running in AWS\nWorking knowledge of building RESTful web services in a service-oriented-architecture environment using cloud infrastructures\nAdept in computer science fundamentals, distributed processing, algorithms, problem solving, design patterns, and OO design\nExperience structuring the work of architectural efforts, entrust, guide and mentor other team members.\nExcellent verbal and written communication skills. Superior listening skills. Able to tailor your message to the audience and integrate feedback.\nDemonstrable ability to create clear, accessible, visual explanations of system architecture.\nQualifications</p>\n<p>Master of computer science degree or equivalent working experience\nLarge-scale consumer internet development experience</p>\n",
    type: "Full-time",
    industry: "Technology",
    company_url: "https://www.everydayhealth.com/",
    how_to_apply: "<p>Please apply via this link: <a href=\"https://jobs.jobvite.com/j2-global/job/o2Lrbfw9\">https://jobs.jobvite.com/j2-global/job/o2Lrbfw9</a></p>\n",
  },
  {
    id: "23f89a1-f28d-408e-8ed5-89259c491c21",
    title: "Senior Frontend Engineer (React / Apollo / GraphQL)",
    logo: "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0Y0IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ab76c4473e80a702772e7b1e1dc525a5fdeb2d05/sig.jpeg",
    company: "Make School",
    location: "San Francisco",
    description: "<p>We're looking for a Senior Frontend Engineer to help design and build the applications and services to support the Make School platform.  We view software as the backbone of our classrooms and are working to digitize our entire curriculum to build a better learning experience and to allow instructors to focus on providing better in-person support to our students.  You'll be responsible for our Online Academy, student management system, portfolios, the marketing website, reporting, and other Make School frontend needs.</p>\n<p>Our Stack:</p>\n<p>React, Apollo, Relay (legacy), GraphQL, ES6, Webpack, Jest, Cypress, Ruby on Rails (marketing site), jQuery (legacy)</p>\n<p>Our Process:</p>\n<p>We are an agile team that follows a scrum methodology on Asana. We have stand-ups, sprint planning meetings,  retrospectives, and pair programming sessions. We connect regularly over Slack &amp; Zoom and look forward to seeing your face there!</p>\n<p>Location:</p>\n<p>This position is based at our headquarters in San Francisco.</p>\n<p>What You’ll Do:</p>\n<p>-Play a key role in the continued architecture and implementation of the Make School educational platform</p>\n<p>-Analyze and improve the efficiency and reliability of the Make School infrastructure</p>\n<p>-Write code with best-practices (including TDD) and participate in peer code review</p>\n<p>-Create the best user experience (for internal &amp; external users)</p>\n<p>What We’re Looking For:</p>\n<p>-4+ years of strong development experience in our stack, especially React/Apollo/GraphQL</p>\n<p>-Debugging, quality-assurance and performance analysis experience</p>\n<p>-Ability to work well with both in-person and remote peers</p>\n<p>-Strong unit and end to end testing experience and ES6 best practices</p>\n<p>-Ability to accurately set timelines and to clearly define specifications</p>\n<p>-Ability to work efficiently and manage trade-offs when faced with conflicting deadlines</p>\n<p>-Ability to clearly communicate thought process</p>\n<p>-Ability and confidence to take ownership of projects</p>\n<p>-A strong understanding of visual design and user experience principles</p>\n<p>-Passion for education</p>\n<p>-Bonus points for experience with Ruby on Rails &amp; GraphQL experience in production environments</p>\n<p>-Bonus points for knowledge of JS tooling and configuration</p>\n<p>About Make School:</p>\n<p>Make School is redesigning college for the 21st century. Our education combines liberal arts, computer science, software development, and character development with a strong emphasis on fully preparing students for successful careers as software engineers, product managers, or entrepreneurs. Our alumni work at Facebook, Google, Apple, Snap, LinkedIn, Lyft and more.</p>\n<p>Our college is accessible to students of all backgrounds, 40% are underrepresented minority students and 50% come from low-income families. Students pay tuition as a percentage of earnings once they are employed, directly aligning their incentives with ours. Make School is funded by Learn Capital, Y Combinator, Mitch Kapor, Alexis Ohanian, Tim Draper, and others.</p>\n<p>Need more reasons on why we love engineers:</p>\n<p>make.sc/5-reasons-to-join-our-team</p>\n<p>A few of our awesome benefits:</p>\n<blockquote>\n<p>Employer-paid health, dental and vision insurance\nUnlimited PTO\nOpportunity to work from home\nCatered lunches every Wednesday\nProfessional development funds\nCommuter benefits\nAnd more!</p>\n</blockquote>\n<p>We are an equal opportunity employer and value diversity at our company. We do not discriminate on the basis of race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status.</p>\n",
    type: "Internship",
    industry: "Finance",
    company_url: null,
    how_to_apply: "<p><a href=\"https://jobs.lever.co/makeschool/1edb94b9-0757-4f2f-a0bb-9cb795778699/apply\">https://jobs.lever.co/makeschool/1edb94b9-0757-4f2f-a0bb-9cb795778699/apply</a></p>\n",
  },
  {
    id: "b0d46b76-a0f8-48c1-bce4-b24190e88d58",
    title: "Full-time Contract Interaction Designer (junior to mid level)",
    logo: "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdHgzIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4bbe0ea7a6168a84638594585d741c6aeb343ccd/logo-120x120.png",
    company: "Institute for Creative Integration",
    location: "Los Altos, CA",
    description: "<p>Starting immediately till March 2020, working onsite in the South Bay, the contract Interaction Designer will be responsible for translating user experience narratives into pseudocode and other interaction design implementation tools. Working closely with the engineering team, this position will understand the intention of the interaction scenario and will be capable to implement multimodal interactions effectively.</p>\n<p>Responsibilities</p>\n<p>-Translate narratives into structured and implementable description that engineers will understand how exactly they should code.</p>\n<p>-Utilizing pseudocode or Markup Languages to adjust the interaction flow.\nDevelop and present documentation, user flows, annotated wireframes, and interactive prototypes</p>\n<p>Qualifications</p>\n<p>-Bachelor Degree in Human Computer Interaction (HCI) or equivalent</p>\n<p>-2+ years' of experience in interaction design involving multimodal scenarios</p>\n<p>-Proficient in wire framing tools, Markup Languages, such as HTML and SSML</p>\n<p>-Experience in using GitHub</p>\n<p>-Basic meta knowledge about coding, such as JavaScript or Python</p>\n<p>-Fast learner</p>\n<p>-Japanese-English bilingual is a plus</p>\n",
    type: "On-campus",
    industry: "Art",
    company_url: "http://creative-integration.com",
    how_to_apply: "<p><a href=\"mailto:career@creative-integration.com\">career@creative-integration.com</a></p>\n"
  },
]

export default App;