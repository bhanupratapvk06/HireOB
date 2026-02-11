const dummyJobs = [
  {
    title: "QA Automation Engineer",
    companyName: "Slack",
    logo: "slack",
    description: "Build automated test pipelines.",
    fullDescription: "Improve product reliability through automated testing and CI pipelines.",
    responsibilities: [
      "Develop automated test scripts",
      "Integrate tests into CI/CD",
      "Collaborate with developers",
      "Ensure release readiness"
    ],
    skills: ["Selenium", "Automation Testing", "CI/CD", "JavaScript"],
    requirements: { experience: "2+ years", degree: "Computer Science" },
    jobType: "Contract",
    workMode: "Remote",
    experience: 2,
    salary: "$8,000",
    location: "Remote"
  },

  {
    title: "Frontend Developer",
    companyName: "Airbnb",
    logo: "airbnb",
    description: "Build modern UI applications.",
    fullDescription: "Work with React to build scalable UI systems.",
    responsibilities: [
      "Build reusable components",
      "Optimize UI performance",
      "Work with backend team"
    ],
    skills: ["React", "JavaScript", "CSS", "Redux"],
    requirements: { experience: "1+ years", degree: "B.Tech / MCA" },
    jobType: "Full-Time",
    workMode: "Hybrid",
    experience: 1,
    salary: "$6,000",
    location: "Bangalore"
  },

  {
    title: "Backend Developer",
    companyName: "Stripe",
    logo: "stripe",
    description: "Build secure backend systems.",
    fullDescription: "Develop scalable REST APIs using Node.js.",
    responsibilities: [
      "Develop REST APIs",
      "Database integration",
      "Authentication & security"
    ],
    skills: ["Node.js", "MongoDB", "Express", "JWT"],
    requirements: { experience: "3+ years", degree: "Computer Science" },
    jobType: "Full-Time",
    workMode: "Onsite",
    experience: 3,
    salary: "$10,000",
    location: "Hyderabad"
  },

  {
    title: "DevOps Engineer",
    companyName: "Amazon",
    logo: "amazon",
    description: "Manage cloud infrastructure.",
    fullDescription: "Maintain AWS infrastructure and deployment pipelines.",
    responsibilities: [
      "Manage AWS services",
      "Automate deployments",
      "Monitor infrastructure"
    ],
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    requirements: { experience: "2+ years", degree: "IT / CS" },
    jobType: "Full-Time",
    workMode: "Remote",
    experience: 2,
    salary: "$9,500",
    location: "Remote"
  },

  {
    title: "Machine Learning Engineer",
    companyName: "Google",
    logo: "google",
    description: "Build ML models.",
    fullDescription: "Design and deploy ML systems at scale.",
    responsibilities: [
      "Train ML models",
      "Optimize algorithms",
      "Deploy ML services"
    ],
    skills: ["Python", "TensorFlow", "PyTorch", "Data Science"],
    requirements: { experience: "3+ years", degree: "AI / Data Science" },
    jobType: "Full-Time",
    workMode: "Hybrid",
    experience: 3,
    salary: "$12,000",
    location: "Mumbai"
  },

  {
    title: "UI/UX Designer",
    companyName: "Adobe",
    logo: "adobe",
    description: "Design user experiences.",
    fullDescription: "Create intuitive and visually appealing interfaces.",
    responsibilities: [
      "Wireframing",
      "Prototyping",
      "User research"
    ],
    skills: ["Figma", "Adobe XD", "User Research"],
    requirements: { experience: "2+ years", degree: "Design" },
    jobType: "Full-Time",
    workMode: "Hybrid",
    experience: 2,
    salary: "$7,000",
    location: "Delhi"
  },

  {
    title: "Full Stack Developer",
    companyName: "Netflix",
    logo: "netflix",
    description: "Work across frontend and backend.",
    fullDescription: "Develop scalable full-stack applications.",
    responsibilities: [
      "Build frontend",
      "Develop APIs",
      "Integrate databases"
    ],
    skills: ["React", "Node.js", "MongoDB"],
    requirements: { experience: "2+ years", degree: "Computer Science" },
    jobType: "Full-Time",
    workMode: "Remote",
    experience: 2,
    salary: "$11,000",
    location: "Remote"
  },

  {
    title: "Product Manager",
    companyName: "Microsoft",
    logo: "microsoft",
    description: "Lead product strategy.",
    fullDescription: "Define product roadmap and work with engineering teams.",
    responsibilities: [
      "Product strategy",
      "Stakeholder management",
      "Roadmap planning"
    ],
    skills: ["Agile", "Product Strategy", "Communication"],
    requirements: { experience: "4+ years", degree: "MBA / CS" },
    jobType: "Full-Time",
    workMode: "Onsite",
    experience: 4,
    salary: "$13,000",
    location: "Pune"
  },

  {
    title: "Data Analyst",
    companyName: "Uber",
    logo: "uber",
    description: "Analyze large datasets.",
    fullDescription: "Provide business insights using data analytics.",
    responsibilities: [
      "Data cleaning",
      "Visualization",
      "Report generation"
    ],
    skills: ["SQL", "Power BI", "Python"],
    requirements: { experience: "1+ years", degree: "Statistics / CS" },
    jobType: "Full-Time",
    workMode: "Hybrid",
    experience: 1,
    salary: "$6,500",
    location: "Chennai"
  },

  {
    title: "Cyber Security Analyst",
    companyName: "Cisco",
    logo: "cisco",
    description: "Protect systems from cyber threats.",
    fullDescription: "Monitor networks and prevent security breaches.",
    responsibilities: [
      "Network monitoring",
      "Threat detection",
      "Security audits"
    ],
    skills: ["Network Security", "Firewalls", "Ethical Hacking"],
    requirements: { experience: "2+ years", degree: "Cyber Security" },
    jobType: "Full-Time",
    workMode: "Onsite",
    experience: 2,
    salary: "$9,000",
    location: "Noida"
  },

  // ---- 20 More Compact Entries Below ----

  { title: "Android Developer", companyName: "Samsung", logo: "samsung", description: "Build Android apps.", fullDescription: "Develop native Android apps.", responsibilities: ["Develop apps", "Fix bugs"], skills: ["Kotlin", "Java"], requirements: { experience: "2+ years", degree: "CS" }, jobType: "Full-Time", workMode: "Hybrid", experience: 2, salary: "$7,500", location: "Bangalore" },

  { title: "iOS Developer", companyName: "Apple", logo: "apple", description: "Build iOS apps.", fullDescription: "Develop native iOS apps.", responsibilities: ["Develop apps", "App Store deployment"], skills: ["Swift", "iOS"], requirements: { experience: "2+ years", degree: "CS" }, jobType: "Full-Time", workMode: "Onsite", experience: 2, salary: "$9,000", location: "Mumbai" },

  { title: "Cloud Engineer", companyName: "IBM", logo: "ibm", description: "Manage cloud systems.", fullDescription: "Deploy scalable cloud solutions.", responsibilities: ["Cloud deployment", "Monitoring"], skills: ["Azure", "AWS"], requirements: { experience: "3+ years", degree: "IT" }, jobType: "Full-Time", workMode: "Remote", experience: 3, salary: "$10,500", location: "Remote" },

  { title: "AI Research Intern", companyName: "OpenAI", logo: "openai", description: "Research AI models.", fullDescription: "Work on AI research projects.", responsibilities: ["Model experimentation"], skills: ["Python", "ML"], requirements: { experience: "Fresher", degree: "AI / CS" }, jobType: "Internship", workMode: "Remote", experience: 0, salary: "$3,000", location: "Remote" },

  { title: "Technical Writer", companyName: "Atlassian", logo: "atlassian", description: "Write technical docs.", fullDescription: "Create documentation for APIs.", responsibilities: ["Documentation", "Guides"], skills: ["Writing", "APIs"], requirements: { experience: "1+ years", degree: "Any" }, jobType: "Contract", workMode: "Remote", experience: 1, salary: "$4,000", location: "Remote" },

  { title: "Blockchain Developer", companyName: "Coinbase", logo: "coinbase", description: "Develop blockchain apps.", fullDescription: "Build Web3 applications.", responsibilities: ["Smart contracts"], skills: ["Solidity", "Web3"], requirements: { experience: "2+ years", degree: "CS" }, jobType: "Full-Time", workMode: "Remote", experience: 2, salary: "$11,000", location: "Remote" },

  { title: "Game Developer", companyName: "Epic Games", logo: "epic", description: "Develop video games.", fullDescription: "Work on AAA games.", responsibilities: ["Game logic", "Testing"], skills: ["C++", "Unity"], requirements: { experience: "2+ years", degree: "Game Dev" }, jobType: "Full-Time", workMode: "Onsite", experience: 2, salary: "$8,500", location: "Hyderabad" },

  { title: "SRE Engineer", companyName: "LinkedIn", logo: "linkedin", description: "Ensure system reliability.", fullDescription: "Maintain uptime and reliability.", responsibilities: ["Monitoring", "Incident response"], skills: ["Linux", "Kubernetes"], requirements: { experience: "3+ years", degree: "CS" }, jobType: "Full-Time", workMode: "Hybrid", experience: 3, salary: "$12,000", location: "Bangalore" },

  { title: "CRM Specialist", companyName: "Salesforce", logo: "salesforce", description: "Manage CRM systems.", fullDescription: "Configure and maintain CRM.", responsibilities: ["CRM setup"], skills: ["Salesforce"], requirements: { experience: "2+ years", degree: "Business / IT" }, jobType: "Full-Time", workMode: "Hybrid", experience: 2, salary: "$7,000", location: "Gurgaon" },

  { title: "SEO Specialist", companyName: "HubSpot", logo: "hubspot", description: "Improve SEO rankings.", fullDescription: "Optimize websites for search engines.", responsibilities: ["Keyword research"], skills: ["SEO", "Analytics"], requirements: { experience: "1+ years", degree: "Marketing" }, jobType: "Full-Time", workMode: "Remote", experience: 1, salary: "$5,000", location: "Remote" }
];


export default dummyJobs;