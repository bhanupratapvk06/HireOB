export const userProfile = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  avatar: '',
  skills: [
    { name: 'React', level: 'Expert', years: 4 },
    { name: 'JavaScript', level: 'Expert', years: 5 },
    { name: 'Node.js', level: 'Intermediate', years: 3 },
    { name: 'TypeScript', level: 'Intermediate', years: 2 },
    { name: 'Python', level: 'Beginner', years: 1 },
  ],
  education: [
    {
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      institution: 'Stanford University',
      startDate: '2016-09',
      endDate: '2020-06',
      gpa: '3.8',
    },
  ],
  experience: [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: '',
      current: true,
      description: 'Lead frontend development for core product features.',
      achievements: [
        'Led migration from Vue to React, improving performance by 40%',
        'Mentored team of 4 junior developers',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
      ],
    },
    {
      title: 'Frontend Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      startDate: '2020-07',
      endDate: '2022-02',
      current: false,
      description: 'Built and maintained customer-facing web applications.',
      achievements: [
        'Developed dashboard used by 10,000+ daily active users',
        'Reduced page load time by 50% through optimization',
      ],
    },
  ],
  social: {
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    portfolio: 'https://johndoe.dev',
    twitter: 'https://twitter.com/johndoe',
  },
};
export const applications = [
  { id: '1', company: 'Google', role: 'Senior Frontend Engineer', location: 'Mountain View, CA', salary: '$180k - $250k', type: 'Full-time', status: 'Interview', appliedDate: '2024-01-15', interviewDate: '2024-02-01', logo: 'G' },
  { id: '2', company: 'Stripe', role: 'Staff Software Engineer', location: 'Remote', salary: '$200k - $280k', type: 'Full-time', status: 'Shortlisted', appliedDate: '2024-01-20', logo: 'S' },
  { id: '3', company: 'Vercel', role: 'Frontend Developer', location: 'Remote', salary: '$150k - $200k', type: 'Full-time', status: 'Applied', appliedDate: '2024-01-25', logo: 'V' },
  { id: '4', company: 'Meta', role: 'React Developer', location: 'Menlo Park, CA', salary: '$190k - $270k', type: 'Full-time', status: 'Rejected', appliedDate: '2024-01-10', logo: 'M' },
  { id: '5', company: 'Netflix', role: 'UI Engineer', location: 'Los Gatos, CA', salary: '$200k - $300k', type: 'Full-time', status: 'Applied', appliedDate: '2024-01-28', logo: 'N' },
];
export const externalJobs = [
  { id: '1', company: 'Airbnb', role: 'Frontend Engineer', link: 'https://airbnb.com/careers', status: 'Applied', appliedDate: '2024-01-22', salary: '$170k', notes: 'Referred by Sarah from networking event' },
  { id: '2', company: 'Figma', role: 'Design Engineer', link: 'https://figma.com/careers', status: 'Interview', appliedDate: '2024-01-18', interviewDate: '2024-02-05', salary: '$160k', notes: 'Technical interview scheduled' },
];
export const activities = [
  { id: '1', type: 'interview', message: 'Interview scheduled with Google for Feb 1', timestamp: '2 hours ago', icon: '📅' },
  { id: '2', type: 'status', message: 'Stripe moved you to Shortlisted', timestamp: '5 hours ago', icon: '⭐' },
  { id: '3', type: 'application', message: 'Applied to Netflix - UI Engineer', timestamp: '1 day ago', icon: '📤' },
  { id: '4', type: 'status', message: 'Meta application was rejected', timestamp: '2 days ago', icon: '❌' },
  { id: '5', type: 'profile', message: 'Resume score updated to 85/100', timestamp: '3 days ago', icon: '📊' },
];
export const resumeScore = {
  overall: 85,
  skillsMatch: { score: 90, weight: 30 },
  projects: { score: 80, weight: 25 },
  experience: { score: 85, weight: 30 },
  formatting: { score: 88, weight: 15 },
  strengths: [
    'Strong technical skills with in-demand frameworks',
    'Quantifiable achievements in work experience',
    'Clean, well-structured resume format',
  ],
  improvements: [
    'Add more project links and live demos',
    'Include leadership and mentoring examples',
    'Add relevant certifications',
  ],
  lastAnalyzed: '2024-01-28T10:30:00Z',
};
export const monthlyApplications = [
  { month: 'Aug', count: 8 },
  { month: 'Sep', count: 12 },
  { month: 'Oct', count: 15 },
  { month: 'Nov', count: 10 },
  { month: 'Dec', count: 18 },
  { month: 'Jan', count: 9 },
];
export const statusDistribution = [
  { name: 'Applied', value: 35, color: 'hsl(217, 91%, 60%)' },
  { name: 'Shortlisted', value: 15, color: 'hsl(173, 58%, 39%)' },
  { name: 'Interview', value: 12, color: 'hsl(38, 92%, 50%)' },
  { name: 'Rejected', value: 10, color: 'hsl(0, 72%, 51%)' },
];
export const topRoles = [
  { role: 'Frontend Engineer', count: 22 },
  { role: 'Full Stack Developer', count: 18 },
  { role: 'React Developer', count: 14 },
  { role: 'UI Engineer', count: 10 },
  { role: 'Software Engineer', count: 8 },
];
