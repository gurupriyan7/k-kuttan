const questions = {
  part1: [
    {
      name: "Data Management Framework:",
      questions: [
        {
          question:
            "Is there a documented and formally approved data management framework (i.e., set of policies, procedures and systems) in place at your institution to govern the management of data used for modelling?",
          score: "7",
          level: "High",
        },
        {
          question:
            "Are the roles and responsibilities of parties contributing to the data management/quality assurance clearly defined and documented?",
          score: "3",
          level: "Moderate",
        },
        {
          question:
            "Has the data management framework undergone independent validation by a party external to the data management process?",
          score: "3",
          level: "Moderate",
        },
        {
          question:
            "Are there established procedures for regular review and updation of the data management framework to ensure its relevance and effectiveness over time?",
          score: "3",
          level: "Moderate",
        },
        {
          question:
            "Is there a regular training program in place to ensure that relevant personnel are aware of and understand the principles and requirements of the data management framework?",
          score: "1",
          level: "Low",
        },
      ],
    },
    {
      name: "Data Quality:",
      questions: [
        {
          question:
            "Does the entity complete a documented assessment of data quality and relevance, before its application in modelling?",
          score: "7",
          level: "High",
        },
        {
          question:
            "Does the data management framework document also include detailed discussion on data limitations and underlying assumptions?",
          score: "5",
          level: "Moderate",
        },
        {
          question:
            "Does the entity evaluate whether and how external data can be leveraged for modelling, to address the existing data limitations?",
          score: "5",
          level: "Moderate",
        },
        {
          question:
            "Does the entity formally assess the relevance and representativeness of external data before it is used for modelling?",
          score: "5",
          level: "Moderate",
        },
        {
          question:
            "Is there a policy/controls that the source from which external data is taken (for items like defaults, MEVs etc.) is consistent over time?",
          score: "1",
          level: "Low",
        },
        {
          question:
            "Does your institution establish tolerance levels for data quality, specifying acceptable ranges or limits for different data characteristics?",
          score: "5",
          level: "Moderate",
        },
        {
          question:
            "Is there a defined process for handling outliers and extreme values in the data used for modelling?",
          score: "7",
          level: "High",
        },
        {
          question:
            "Are there established processes to deal with missing data points, along with documented tolerance limits?",
          score: "7",
          level: "High",
        },
        {
          question:
            "Does the different models (like PD, LGD etc.) each source base data from a single system only (as opposed to collating it from multiple systems)?",
          score: "5",
          level: "Moderate",
        },
        {
          question:
            "Is there a versioning system to track changes made to data used for modelling, ensuring audit trail?",
          score: "5",
          level: "Moderate",
        },
        {
          question:
            "Are all dynamic data points (like employment and income details, financial statements data, collateral information) updated at least once a year?",
          score: "5",
          level: "Moderate",
        },
      ],
    },
    {
      name: "Data system and infrastructure:",
      questions: [
        {
          question:
            "Does your data system have capabilities to perform advanced analytics and derive insights from data, using tools like ML algorithms and similar others?",
          score: "3",
          level: "Moderate",
        },
        {
          question:
            "Does your institution establish security controls related to access, transfer and storage of data?",
          score: "5",
          level: "Moderate",
        },
        {
          question:
            "Are regular backups of data performed, and is there a documented and tested data recovery plan in place?",
          score: "5",
          level: "Moderate",
        },
        {
          question:
            "Are regular performance tests conducted to assess system scalability as the volume of data increases?",
          score: "1",
          level: "Low",
        },
        {
          question:
            "Does your data system and infrastructure undergo regular independent IT validation to ensure reliability and security?",
          score: "3",
          level: "Moderate",
        },
      ],
    },
  ],
  part2: [
    {
      question:
        "How would you rate your institution's data management framework, in terms of its robustness and comprehensiveness?",
      score: "10",
    },
    {
      question:
        "How clear are the roles and responsibilities defined under data management framework of your institution?",
      score: "10",
    },
    {
      question:
        "To what extent your institution maximize automated data collections and minimize manual interventions?",
      score: "10",
    },
    {
      question:
        "How is the sufficiency and technical understanding of the team managing data for modelling purposes, reducing reliance on external experts?",
      score: "10",
    },
  ],
};

const name = " Data Management";

export default { questions, name };
