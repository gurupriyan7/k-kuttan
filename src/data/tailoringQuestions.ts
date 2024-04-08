const tailQuestions = [
  {
    name: "Products",
    description:
      "Does your entity have exposures to the following products (select as many as applicable):",
    questions: [
      "Retail",
      "Wholesale",
      "Cross-border",
      "Subordinated products",
      "Debt securities",
      "Revolving/limit based facilities",
      "Purchased credit impaired loans",
      "Non-funded exposures",
    ],
  },
  {
    name: "System",
    description:
      "Does you modelling process involve (select as many as applicable):",
    questions: [
      "Excel spreadsheets",
      "Internally developed applications/scripts - using Python, R, SQL etc.",
      "Low code platforms (like Alteryx)",
      "Off the shelf automated ECL softwares",
      "Modification to existing systems/ERPs for ECL calculations",
      "Custom standalone ECL software",
    ],
  },
  {
    name: "Data",
    description:
      "Does your data sources include (select as many as applicable):",
    questions: [
      "Data sourced directly from internal systems/data warehouse",
      "Additional data manually compiled for modelling purpose",
      "Third party data vendors",
    ],
  },
  {
    name: "PD Model",
    description:
      "Please select the models currently being employed for PD Estimation, in any of the portfolios (select as many as applicable):",
    questions: [
      "Vintage level regression models",
      "Time series regression models",
      "Transition Matrix Models",
      "Structural models",
      "Decision tree",
      "Neural network",
      "Random Forest/Gradient boosting",
      "Vasicek model",
      "Pluto Tasche model",
      "Simulation models",
    ],
  },
  {
    name: "LGD Model",
    description:
      "Please select the models currently being employed for LGD Estimation (select as many as applicable):",
    questions: [
      "Regression models",
      "Jacob Fyre model",
      "Heuristic estimate/regulatory proxies - defined haircuts",
      "Econometric methodology",
      "ML models like Neural Networks",
      "Market LGD",
      "Workout approach",
    ],
  },
  {
    name: "CCF Model",
    description:
      "Please select the models currently being employed for CCF Estimation (select as many as applicable):",
    questions: [
      "Workout approach",
      "Regression models",
      "Heuristic estimate/regulatory proxies - defined haircuts",
    ],
  },
  {
    name: "Data",
    description: "Are following data sources used for preparing models?",
    questions: [
      "Behavioural",
      "Financial",
      "Demographic",
      "Credit Bureau Data",
      "Employment and Income Data",
      "Financial Statement Data (For Businesses)",
      "Loan Application Data",
      "Asset and Collateral Information",
      "Industry-Specific Data (For Business PD Models)",
      "External Ratings and Credit Scores",
    ],
  },
];

const tailSections = [
  "Products",
  "System",
  "Data",
  "PD Model",
  "LGD Model",
  "CCF Model",
  "Data",
];

export default { tailQuestions, tailSections };
