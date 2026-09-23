/**
 * Single source of truth for the whole site.
 * Everything below comes from the resume. Edit here; components update automatically.
 */

export type SkillIcon = "code" | "analysis" | "bi" | "ml" | "database" | "pipeline" | "tools";
export type AboutIcon = "education" | "technical" | "analytics" | "goal";
export type ProjectVisualKind = "dashboard" | "forecast" | "clusters";

export interface NavItem {
  id: string;
  label: string;
}

export interface Highlight {
  value: string;
  label: string;
}

export interface AboutCard {
  icon: AboutIcon;
  title: string;
  body: string;
}

export interface SkillGroup {
  id: string;
  label: string;
  icon: SkillIcon;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  problem: string;
  approach: string[];
  features: string[];
  results: string[];
  contribution: string;
  tech: string[];
  visual: ProjectVisualKind;
  /** Big number shown on the card. Only set when the resume gives one. */
  metric?: Highlight;
  /** Add the project's own repository / live demo links here when you have them. */
  repoUrl?: string;
  demoUrl?: string;
  /** Put images in /public/screens and list them here to show them in the project modal. */
  screenshots?: { src: string; alt: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  points: string[];
  tech: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  grade: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  /** Add `year` or `credentialUrl` once you have them; they render automatically. */
  year?: string;
  credentialUrl?: string;
}

export const profile = {
  name: "Bhumireddy Hemanth Reddy",
  shortName: "Hemanth",
  initials: "BH",
  statusLine: "Seeking an entry-level Data Analyst role",
  roles: ["Data Analyst", "B.Tech CSE (Data Science) student", "Python · SQL · Power BI"],
  intro:
    "Data Analyst skilled in Python, SQL, Excel and Power BI. I clean and explore data, build dashboards and models, and turn datasets into actionable business insights.",
  email: "hemanth.bhumireddy2006@gmail.com",
  location: "Andhra Pradesh, India",
  github: "https://github.com/hemant350",
  linkedin: "https://www.linkedin.com/in/hemant-bhumireddy",
  /** File lives in /public. Replace public/resume.pdf to update the download. */
  resumeFile: "resume.pdf",
  resumeDownloadName: "Bhumireddy_Hemanth_Reddy_Resume.pdf",
};

export const highlights: Highlight[] = [
  { value: "6,435+", label: "sales records analyzed in an internship" },
  { value: "1M+", label: "retail records in the forecasting project" },
  { value: "2", label: "data analytics internships" },
  { value: "8.08", label: "CGPA out of 10" },
];

export const about = {
  paragraphs: [
    "Data Analyst with hands-on experience in Python, SQL, Excel, and Power BI. Skilled in data cleaning, exploratory analysis, visualization, and transforming datasets into actionable business insights.",
    "I'm pursuing a B.Tech in Computer Science and Engineering (Data Science) and completed two data analytics internships in 2026, working on sales analysis, SQL validation, dashboards and reporting.",
  ],
  buildingTitle: "What I enjoy building",
  building: [
    "Interactive Power BI dashboards with KPIs and slicers",
    "Regression models that forecast sales",
    "Customer segments that turn into concrete business actions",
  ],
  cards: [
    {
      icon: "education",
      title: "Education",
      body: "B.Tech in Computer Science and Engineering (Data Science), Sri Venkateswara College of Engineering and Technology. Expected 2027, CGPA 8.08/10.",
    },
    {
      icon: "technical",
      title: "Technical focus",
      body: "Python and SQL for data cleaning, exploratory analysis and feature engineering, plus regression and clustering models with Scikit-learn.",
    },
    {
      icon: "analytics",
      title: "Data & analytics",
      body: "Power BI (Power Query, DAX), Excel and Matplotlib to turn datasets into dashboards and clear business insights.",
    },
    {
      icon: "goal",
      title: "Career goal",
      body: "Seeking an entry-level Data Analyst role to apply analytical and problem-solving skills.",
    },
  ] as AboutCard[],
};

export const skillGroups: SkillGroup[] = [
  { id: "programming", label: "Programming", icon: "code", items: ["Python", "SQL"] },
  {
    id: "analysis",
    label: "Data Analysis",
    icon: "analysis",
    items: ["Pandas", "NumPy", "EDA", "Data Cleaning", "Feature Engineering"],
  },
  {
    id: "bi",
    label: "Visualization & BI",
    icon: "bi",
    items: ["Power BI", "Power Query", "DAX", "Excel", "Matplotlib"],
  },
  {
    id: "ml",
    label: "Machine Learning",
    icon: "ml",
    items: ["Scikit-learn", "Regression", "K-Means Clustering", "PCA"],
  },
  { id: "database", label: "Database", icon: "database", items: ["MySQL"] },
  {
    id: "engineering",
    label: "Data Engineering",
    icon: "pipeline",
    items: ["ETL", "Data Transformation", "Data Pipelines", "Data Modeling"],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "tools",
    items: ["GitHub", "Jupyter Notebook", "Google Sheets"],
  },
];

export const projects: Project[] = [
  {
    id: "walmart-sales",
    title: "Walmart Sales Analysis & Interactive Power BI Dashboard",
    summary:
      "Analysis of 6,435 sales records with an interactive Power BI dashboard covering store, date, holiday and sales views.",
    problem:
      "Understand how individual stores perform, how sales move with the seasons, and what impact holidays have on sales.",
    approach: [
      "Analyzed 6,435 sales records to evaluate store performance, seasonal trends, holiday impact and other key business factors.",
      "Built an interactive Power BI dashboard on top of the analysis.",
    ],
    features: [
      "KPI cards for headline sales metrics",
      "Slicers for store, date and holiday",
      "Visualizations for store, date, holiday and sales analysis",
    ],
    results: [
      "Identified Store 20 as the highest-performing store.",
      "Found higher average weekly sales during holidays.",
    ],
    contribution: "Performed the analysis and built the Power BI dashboard.",
    tech: ["Power BI", "Python", "Pandas"],
    visual: "dashboard",
    metric: { value: "6,435", label: "sales records analyzed" },
  },
  {
    id: "retail-forecasting",
    title: "Retail Sales Forecasting",
    summary:
      "Regression models that forecast future sales, built on 1M+ retail sales records across multiple stores.",
    problem:
      "Find the sales patterns and key business drivers across stores, then forecast future sales and check how well the models predict.",
    approach: [
      "Analyzed 1M+ retail sales records across multiple stores to identify sales patterns and key business drivers.",
      "Engineered date-based and business features to capture temporal patterns.",
      "Prepared the data for store-level sales prediction.",
      "Built and evaluated regression models with Scikit-learn.",
    ],
    features: [
      "Date-based and business feature engineering",
      "Regression models for sales forecasting",
      "Evaluation of predictive performance",
    ],
    results: [
      "Worked with 1M+ retail sales records across multiple stores.",
      "Built and evaluated regression models to forecast future sales and assess predictive performance.",
    ],
    contribution: "Analysis, feature engineering, model building and evaluation.",
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn"],
    visual: "forecast",
    metric: { value: "1M+", label: "retail sales records" },
  },
  {
    id: "customer-segmentation",
    title: "Customer Segmentation Using K-Means Clustering",
    summary:
      "An end-to-end K-Means pipeline that groups customers by purchasing behavior and turns each segment into a business strategy.",
    problem:
      "Segment customers based on purchasing behavior so each group can be approached with a fitting strategy.",
    approach: [
      "Cleaned the data and engineered features.",
      "Applied StandardScaler and PCA to prepare the data.",
      "Used the Elbow Method to identify meaningful clusters.",
      "Developed the full K-Means clustering pipeline end to end.",
    ],
    features: [
      "Data cleaning and feature engineering",
      "StandardScaler and PCA preprocessing",
      "Elbow Method for choosing the number of clusters",
    ],
    results: [
      "Translated customer segments into actionable strategies: loyalty programs, personalized recommendations, discounts and bundled offers.",
    ],
    contribution: "Built the whole pipeline from cleaning to segment strategies.",
    tech: ["Python", "Pandas", "Scikit-learn", "K-Means", "PCA"],
    visual: "clusters",
  },
];

export const experience: Experience[] = [
  {
    id: "avaintern",
    role: "Data Analytics Intern",
    company: "Avaintern Pvt. Ltd.",
    period: "May 1, 2026 – June 29, 2026",
    points: [
      "Analyzed 6,435+ sales records using Python and Pandas to identify sales trends and business insights.",
      "Performed SQL-based data analysis and validation to ensure data accuracy and consistency.",
      "Collaborated with mentors on real-world data analytics projects.",
    ],
    tech: ["Python", "Pandas", "SQL"],
  },
  {
    id: "apex-planet",
    role: "Data Analytics Intern",
    company: "Apex Planet Software Pvt. Ltd.",
    period: "May 2026",
    points: [
      "Performed data preprocessing and exploratory analysis as part of real-world data analytics workflows.",
      "Supported dashboard development and reporting to present analytical findings effectively.",
      "Applied practical knowledge of Python, SQL, data cleaning, and analytics concepts to project-based tasks.",
    ],
    tech: ["Python", "SQL", "Data Cleaning"],
  },
];

export const education: Education[] = [
  {
    id: "btech",
    degree: "Bachelor of Technology in Computer Science and Engineering (Data Science)",
    institution: "Sri Venkateswara College of Engineering and Technology",
    period: "Expected 2027",
    grade: "CGPA: 8.08/10",
  },
];

export const certifications: Certification[] = [
  { id: "tata-forage", name: "GenAI Powered Data Analytics Job Simulation", issuer: "Tata & Forage" },
  { id: "simplilearn", name: "Power BI for Beginners", issuer: "Simplilearn SkillUp" },
  { id: "prepinsta", name: "SQL Certification", issuer: "PrepInsta Technologies" },
  { id: "nasscom-ibm", name: "Gen AI and AI", issuer: "NASSCOM & IBM SkillsBuild" },
];

export const contact = {
  heading: "Let's build something meaningful with data.",
  body: "I'm looking for an entry-level Data Analyst role. If you have an opening, a project or a question, send me a message.",
};

/** Sections that have data. Navigation and page sections are built from this. */
export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  ...(about.paragraphs.length ? [{ id: "about", label: "About" }] : []),
  ...(skillGroups.length ? [{ id: "skills", label: "Skills" }] : []),
  ...(projects.length ? [{ id: "projects", label: "Projects" }] : []),
  ...(experience.length ? [{ id: "experience", label: "Experience" }] : []),
  ...(education.length ? [{ id: "education", label: "Education" }] : []),
  ...(certifications.length ? [{ id: "certifications", label: "Certifications" }] : []),
  { id: "contact", label: "Contact" },
];
