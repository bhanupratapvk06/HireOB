import { FaMeta, FaSlack, FaSpotify } from 'react-icons/fa6';
import { SiAdobe, SiAsana } from 'react-icons/si';

const categories = [
  { id: 1, name: "Commerce", count: 10, selected: false },
  { id: 2, name: "Telecommunications", count: 10, selected: false },
  { id: 3, name: "Hotels & Tourism", count: 10, selected: false },
  { id: 4, name: "Education", count: 10, selected: false },
  { id: 5, name: "Financial Services", count: 10, selected: false }
];

const jobTypes = [
  { id: 1, name: "Full Time", count: 10, selected: false },
  { id: 2, name: "Part Time", count: 10, selected: false },
  { id: 3, name: "Freelance", count: 10, selected: false },
  { id: 4, name: "Seasonal", count: 10, selected: false },
  { id: 5, name: "Fixed-Price", count: 10, selected: false }
];

const experienceLevels = [
  { id: 1, name: "No-experience", count: 10, selected: false },
  { id: 2, name: "Fresher", count: 10, selected: false },
  { id: 3, name: "Intermediate", count: 10, selected: false },
  { id: 4, name: "Expert", count: 10, selected: false }
];


const datePosted = [
  { id: 1, name: "All", count: 10, selected: false },
  { id: 2, name: "Last Hour", count: 10, selected: false },
  { id: 3, name: "Last 24 Hours", count: 10, selected: false },
  { id: 4, name: "Last 7 Days", count: 10, selected: false },
  { id: 5, name: "Last 30 Days", count: 10, selected: false }
];

const tags = [
  { id: 1, name: "engineering", selected: false },
  { id: 2, name: "design", selected: false },
  { id: 3, name: "ui/ux", selected: false },
  { id: 4, name: "marketing", selected: false },
  { id: 5, name: "management", selected: false },
  { id: 6, name: "soft", selected: false }
];

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    companyName: "Spotify",
    logo: "spotify",
    description: "Build modern UI using React and performance best practices.",
    fullDescription:
      "We are looking for a passionate Frontend Developer to create engaging and responsive web interfaces. You will collaborate closely with designers and backend engineers to deliver scalable and user-friendly products used by millions worldwide.",

    responsibilities: [
      "Develop responsive user interfaces using React.",
      "Optimize applications for speed and scalability.",
      "Collaborate with UI/UX designers to implement designs.",
      "Maintain clean, reusable, and maintainable code."
    ],

    skills: ["React", "JavaScript", "CSS", "REST APIs", "Git"],

    requirements: {
      experience: "1-3 years",
      degree: "Bachelor’s degree in Computer Science or related field"
    },

    jobType: "Full-Time",
    workMode: "Remote",
    experience: "1-3 yrs",
    salary: "$9,500",
    location: "Stockholm",
    created_at: "2 days ago"
  },

  {
    id: 2,
    title: "Backend Engineer",
    companyName: "Adobe",
    logo: "adobe",
    description: "Design scalable APIs and microservices.",
    fullDescription:
      "Join our backend engineering team to design secure and scalable APIs powering creative cloud services. You will work on high-performance distributed systems used by global customers.",

    responsibilities: [
      "Build RESTful APIs and backend services.",
      "Design scalable microservice architecture.",
      "Improve application performance and security.",
      "Collaborate with frontend and DevOps teams."
    ],

    skills: ["Node.js", "MongoDB", "Microservices", "Docker", "AWS"],

    requirements: {
      experience: "2-4 years",
      degree: "Bachelor’s degree in Software Engineering or equivalent"
    },

    jobType: "Full-Time",
    workMode: "Hybrid",
    experience: "2-4 yrs",
    salary: "$11,000",
    location: "San Jose",
    created_at: "1 day ago"
  },

  {
    id: 3,
    title: "Product Designer",
    companyName: "Asana",
    logo: "asana",
    description: "Create intuitive UX flows and design systems.",
    fullDescription:
      "As a Product Designer, you will craft seamless user experiences and build scalable design systems that help teams collaborate efficiently.",

    responsibilities: [
      "Design user interfaces and workflows.",
      "Create wireframes and prototypes.",
      "Conduct user research and usability testing.",
      "Collaborate with product managers and developers."
    ],

    skills: ["Figma", "UX Research", "Prototyping", "Design Systems"],

    requirements: {
      experience: "1-2 years",
      degree: "Degree in Design, HCI, or related discipline"
    },

    jobType: "Part-Time",
    workMode: "Remote",
    experience: "1-2 yrs",
    salary: "$7,200",
    location: "Remote",
    created_at: "3 days ago"
  },

  {
    id: 4,
    title: "SDE1",
    companyName: "Meta",
    logo: "meta",
    description: "Work on large-scale distributed systems.",
    fullDescription:
      "Meta is hiring a Software Development Engineer to build scalable distributed systems powering next-generation social platforms.",

    responsibilities: [
      "Design and implement scalable backend services.",
      "Write efficient and maintainable code.",
      "Participate in code reviews and architecture discussions.",
      "Debug and optimize system performance."
    ],

    skills: ["C++", "System Design", "Data Structures", "Algorithms"],

    requirements: {
      experience: "0-2 years",
      degree: "Bachelor’s degree in Computer Science or equivalent"
    },

    jobType: "Full-Time",
    workMode: "Onsite",
    experience: "0-2 yrs",
    salary: "$12,500",
    location: "California",
    created_at: "5 days ago"
  },

  {
    id: 5,
    title: "QA Automation Engineer",
    companyName: "Slack",
    logo: "slack",
    description: "Build automated test pipelines.",
    fullDescription:
      "We are seeking a QA Automation Engineer to improve product reliability through automated testing and continuous integration pipelines.",

    responsibilities: [
      "Develop automated test scripts.",
      "Integrate tests into CI/CD pipelines.",
      "Collaborate with developers to improve product quality.",
      "Identify bugs and ensure release readiness."
    ],

    skills: ["Selenium", "Automation Testing", "CI/CD", "JavaScript"],

    requirements: {
      experience: "2+ years",
      degree: "Degree in Computer Science or relevant field"
    },

    jobType: "Contract",
    workMode: "Remote",
    experience: "2 yrs",
    salary: "$8,000",
    location: "Remote",
    created_at: "4 days ago"
  }
];


const assets = {
  categories,
  jobTypes,
  experienceLevels,
  datePosted,
  tags,
  jobs
};

export default assets;
