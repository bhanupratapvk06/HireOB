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

const assets = {
  categories,
  jobTypes,
  experienceLevels,
  datePosted,
  tags
};

export default assets;
