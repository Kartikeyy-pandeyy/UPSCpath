// AboutUPSC.jsx
import React from 'react';
import './AboutUPSC.css';
import { motion } from 'framer-motion';

const AboutUPSC = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="about-upsc-wrapper">
      <motion.h2
        className="about-title"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        About UPSC Civil Services Examination (CSE)
      </motion.h2>

      <motion.section
        className="about-section"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="section-title">Introduction to UPSC CSE</h3>
        <p className="about-text">
          The Union Public Service Commission (UPSC) is India’s premier recruiting agency tasked with conducting the Civil Services Examination (CSE), a highly esteemed and fiercely competitive examination designed to select candidates for the country’s top administrative positions. Established under Article 315 of the Indian Constitution, the UPSC ensures a merit-based selection process for roles in the All India Services—such as the Indian Administrative Service (IAS), Indian Police Service (IPS), and Indian Foreign Service (IFS)—as well as various Central Civil Services like the Indian Revenue Service (IRS), Indian Audit and Accounts Service (IAAS), and more. The CSE is conducted annually and attracts over a million aspirants, with only a few hundred ultimately securing positions, making it one of the toughest exams globally. This examination is not just a test of academic knowledge but a comprehensive evaluation of a candidate’s intellectual depth, analytical skills, ethical grounding, and ability to handle the multifaceted challenges of governance in a diverse, democratic nation like India. Its prestige stems from its role in shaping the bureaucratic backbone of the country, with successful candidates going on to influence policymaking, public administration, and national development at the highest levels.
        </p>
      </motion.section>

      <motion.section
        className="about-card"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
      >
        <h3 className="card-title">Purpose of UPSC CSE</h3>
        <p className="card-text">
          The primary purpose of the UPSC CSE is to identify and recruit individuals who possess the intellectual acumen, administrative aptitude, and moral integrity required to serve as the stewards of India’s governance system. The examination is designed to filter candidates who can effectively manage the complex socio-economic and political challenges of a country with over 1.4 billion people, diverse cultures, languages, and regional disparities. It aims to select individuals who can formulate and implement policies that address pressing issues such as poverty alleviation, infrastructure development, education reform, healthcare access, and environmental sustainability. Beyond technical expertise, the CSE evaluates a candidate’s ability to think critically, make sound decisions under pressure, and uphold the principles of justice, equity, and public welfare. The selected civil servants are entrusted with responsibilities ranging from district-level administration (e.g., as District Magistrates or Superintendents of Police) to high-level policymaking in ministries and international diplomacy. This examination serves as a gateway to a career that offers unparalleled opportunities to contribute to nation-building, maintain law and order, and represent India on global platforms. The rigorous nature of the CSE ensures that only those with a deep sense of duty, resilience, and a holistic understanding of India’s historical, cultural, and contemporary context rise to these pivotal roles, making it a cornerstone of India’s democratic framework.
        </p>
      </motion.section>

      <motion.section
        className="about-card"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
      >
        <h3 className="card-title">Examination Structure</h3>
        <div className="exam-stages">
          <div className="stage">
            <h4>1. Preliminary Examination</h4>
            <p>
              - <strong>Objective:</strong> Screening test<br />
              - <strong>Papers:</strong> Two (General Studies I & CSAT)<br />
              - <strong>Marks:</strong> 400 (200 each, CSAT qualifying)<br />
              - <strong>Duration:</strong> 2 hours per paper<br />
              - <strong>Syllabus:</strong> Current affairs, history, geography, polity, economy, environment, science, and aptitude.
            </p>
          </div>
          <div className="stage">
            <h4>2. Mains Examination</h4>
            <p>
              - <strong>Objective:</strong> In-depth assessment<br />
              - <strong>Papers:</strong> Nine (Essay, GS I-IV, Optional I-II, Indian Language, English)<br />
              - <strong>Marks:</strong> 1750 (plus 275 for Interview)<br />
              - <strong>Duration:</strong> 3 hours per paper<br />
              - <strong>Syllabus:</strong> Comprehensive coverage of humanities, sciences, governance, ethics, and optional subjects.
            </p>
          </div>
          <div className="stage">
            <h4>3. Personality Test (Interview)</h4>
            <p>
              - <strong>Objective:</strong> Assess personality and suitability<br />
              - <strong>Marks:</strong> 275<br />
              - <strong>Duration:</strong> 20-30 minutes<br />
              - <strong>Focus:</strong> Mental alertness, leadership, integrity, and communication skills.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="about-card"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
      >
        <h3 className="card-title">Eligibility Criteria</h3>
        <p className="card-text">
          To appear for the UPSC CSE, candidates must meet stringent eligibility requirements that ensure a baseline of maturity, education, and commitment. These criteria are meticulously designed to balance accessibility with the demands of civil service roles:
        </p>
        <ul className="criteria-list">
          <li>
            <strong>Nationality:</strong> Candidates must be Indian citizens for IAS, IPS, and most services. However, for certain services like the Central Civil Services, citizens of Nepal, Bhutan, or Tibetan refugees who arrived in India before January 1, 1962, with the intention of permanent settlement are eligible, subject to a certificate of eligibility issued by the Government of India. Migrants from Pakistan, Sri Lanka, Myanmar, and select East African countries with similar intent are also considered under specific conditions.
          </li>
          <li>
            <strong>Age Limit:</strong> Candidates must be between 21 and 32 years old as of August 1 of the exam year. Relaxations include 5 years for SC/ST candidates, 3 years for OBC (non-creamy layer), up to 10 years for PwBD (Persons with Benchmark Disabilities), and additional relaxations for ex-servicemen (up to 5 years) and candidates from Jammu & Kashmir during the period of unrest (1980-1989). The upper age limit ensures candidates have the physical and mental stamina for a long career, while relaxations promote inclusivity.
          </li>
          <li>
            <strong>Educational Qualification:</strong> A bachelor’s degree from any university recognized by the University Grants Commission (UGC) or an equivalent qualification is mandatory. Candidates in their final year of graduation can apply provisionally, provided they submit proof of passing before the Mains stage. Degrees from open universities, distance education, or foreign institutions (recognized by Indian authorities) are also accepted, ensuring a broad talent pool. Professional degrees like MBBS or technical qualifications like B.Tech are equally valid, with no preference given to any discipline.
          </li>
          <li>
            <strong>Number of Attempts:</strong> General category candidates get 6 attempts, OBC candidates get 9, and SC/ST candidates have unlimited attempts until they reach the age limit. PwBD candidates receive 9 attempts (General/OBC) or unlimited (SC/ST), while ex-servicemen get additional attempts based on service tenure. An attempt is counted only if a candidate appears for Prelims Paper I, allowing flexibility for preparation without penalizing initial failures.
          </li>
        </ul>
      </motion.section>

      <motion.section
        className="about-card"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
      >
        <h3 className="card-title">Key Features of UPSC CSE</h3>
        <p className="card-text">
          The UPSC CSE stands out due to its unique characteristics, which reflect its role as a cornerstone of India’s administrative recruitment:
        </p>
        <ul className="features-list">
          <li>
            <strong>Annual Conduct:</strong> The exam cycle begins with a notification in February, followed by Prelims in May/June, Mains in September/October, and Interviews in March/April of the following year. This predictable schedule allows aspirants to plan their preparation meticulously, with results typically announced within 2-3 months of each stage.
          </li>
          <li>
            <strong>High Competition:</strong> With approximately 10-12 lakh applicants annually and only 500-1000 final selections, the success rate hovers around 0.1-0.2%. This intense competition stems from the exam’s prestige, the lucrative career it offers, and its reputation as a meritocratic pathway to power and responsibility.
          </li>
          <li>
            <strong>Holistic Syllabus:</strong> The exam emphasizes a broad knowledge base, including current affairs (national and international), governance (Constitution, public policy), ethics (integrity, aptitude), Indian history (ancient to modern), geography (physical, human, economic), economy (planning, development), science & technology, and environmental issues. This ensures candidates are well-rounded and capable of addressing multifaceted administrative challenges.
          </li>
          <li>
            <strong>Optional Subjects:</strong> Candidates can choose from 48 optional subjects for Mains (e.g., Anthropology, Sociology, Mathematics, Literature of various languages), allowing them to leverage their academic strengths. This flexibility accommodates diverse educational backgrounds, from humanities to STEM, and includes regional language literature options like Tamil, Hindi, or Bengali.
          </li>
          <li>
            <strong>Multilingual Framework:</strong> While Prelims and Interviews are in English and Hindi, the Mains can be written in any of the 22 scheduled languages listed in the 8th Schedule of the Constitution (e.g., Assamese, Marathi, Urdu). Question papers are bilingual (English and Hindi), and candidates can opt for regional languages for qualifying papers, promoting linguistic inclusivity.
          </li>
          <li>
            <strong>Transparency and Fairness:</strong> The UPSC maintains strict confidentiality in evaluation, with answer sheets anonymized and interviews recorded. The commission’s autonomy ensures an impartial process, free from political interference, upholding its reputation as a gold standard in public recruitment.
          </li>
        </ul>
      </motion.section>

      <motion.section
        className="about-card"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
      >
        <h3 className="card-title">Preparation Insights</h3>
        <p className="card-text">
          Preparing for the UPSC CSE is a marathon that demands discipline, strategy, and resilience. Most successful candidates dedicate 1-2 years of full-time preparation, though some with prior knowledge or exceptional focus succeed in less time. Here’s an in-depth look at the process:
        </p>
        <ul className="prep-list">
          <li>
            <strong>Study Material:</strong> Foundational reading starts with NCERT textbooks (Class 6-12) for subjects like History, Geography, Polity, Economy, and Science, providing a clear conceptual base. Advanced resources include standard books such as *Indian Polity* by M. Laxmikanth, *Modern India* by Spectrum, *Indian Economy* by Ramesh Singh, and *Certificate Physical and Human Geography* by G.C. Leong. Supplementary materials like government reports (Economic Survey, Budget), PRS Legislative Research summaries, and NITI Aayog publications deepen understanding of contemporary issues.
          </li>
          <li>
            <strong>Current Affairs:</strong> Daily reading of newspapers like *The Hindu* or *The Indian Express* is essential for staying updated on national and international events, government schemes, and policy debates. Monthly magazines like *Yojana* and *Kurukshetra* offer in-depth analysis of development topics, while online platforms like PIB (Press Information Bureau) and RSTV (Rajya Sabha TV) archives provide official perspectives. Compiling notes by theme (e.g., health, education, international relations) ensures retention and quick revision.
          </li>
          <li>
            <strong>Practice:</strong> Regular practice is critical—solving previous years’ question papers (available on the UPSC website) helps understand the exam’s pattern and difficulty. Mock tests from coaching institutes (e.g., Vision IAS, InsightsIAS) simulate exam conditions, improving time management and accuracy. Answer writing practice, especially for Mains, hones articulation and structure, with platforms like Insights’ Secure Initiative offering daily questions. Essay writing requires blending factual knowledge with creative expression, often practiced on topics like social justice or technology.
          </li>
          <li>
            <strong>Time Management:</strong> A typical preparation schedule involves 8-12 hours of daily study, split between static syllabus (50-60%), current affairs (30-40%), and revision/practice (10-20%). Beginners often start with broad reading for 6-8 months, followed by focused study and mock tests in the final 4-6 months. Toppers recommend monthly targets (e.g., completing Polity in 3 weeks) and weekly revisions to consolidate learning.
          </li>
          <li>
            <strong>Optional Subject Strategy:</strong> Choosing an optional requires balancing interest, scoring potential, and resource availability. Popular choices like Public Administration or Geography have concise syllabi and overlap with GS, while literature subjects suit those with linguistic flair. Coaching notes, university textbooks, and past toppers’ strategies guide preparation, with consistent practice ensuring mastery.
          </li>
        </ul>
      </motion.section>

      <motion.section
        className="about-card"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
      >
        <h3 className="card-title">Services Offered</h3>
        <p className="card-text">
          The UPSC CSE opens doors to a wide array of prestigious services, with allocations based on rank, preference, and vacancies. Here’s a detailed overview:
        </p>
        <ul className="services-list">
          <li>
            <strong>All India Services:</strong>
            <ul>
              <li><strong>Indian Administrative Service (IAS):</strong> The flagship service, involving district administration (e.g., District Collector), state secretariat roles, and central ministry postings. IAS officers oversee policy implementation, development projects, and crisis management, with career progression to Chief Secretary or Cabinet Secretary.</li>
              <li><strong>Indian Police Service (IPS):</strong> Focused on law enforcement, public safety, and internal security. IPS officers serve as SPs, DIGs, or DGPs, managing police forces, counter-terrorism, and VIP security, with opportunities in agencies like CBI or IB.</li>
              <li><strong>Indian Foreign Service (IFS):</strong> India’s diplomatic corps, handling foreign policy and international relations. IFS officers work as Ambassadors, Consuls, or in the Ministry of External Affairs, representing India at the UN, WTO, and bilateral negotiations.</li>
            </ul>
          </li>
          <li>
            <strong>Central Civil Services (Group A):</strong>
            <ul>
              <li><strong>Indian Revenue Service (IRS):</strong> Administers taxation (Income Tax, Customs, GST), with roles in investigation, revenue policy, and anti-smuggling operations.</li>
              <li><strong>Indian Audit and Accounts Service (IAAS):</strong> Oversees government audits, ensuring financial accountability, with postings in CAG offices.</li>
              <li><strong>Indian Railway Traffic Service (IRTS):</strong> Manages railway operations, logistics, and passenger services, critical to India’s transport network.</li>
              <li><strong>Indian Information Service (IIS):</strong> Handles government media and communication, with roles in PIB, Doordarshan, or All India Radio.</li>
            </ul>
          </li>
          <li>
            <strong>Group B Services:</strong>
            <ul>
              <li><strong>Delhi, Andaman & Nicobar Islands Civil Service (DANICS):</strong> Administrative roles in Union Territories, akin to state civil services.</li>
              <li><strong>Delhi, Andaman & Nicobar Islands Police Service (DANIPS):</strong> Police administration in UTs, supporting law enforcement.</li>
              <li><strong>Pondicherry Civil/Police Services:</strong> Similar roles in Pondicherry UT.</li>
            </ul>
          </li>
          <li>
            <strong>Cadre Allocation:</strong> Candidates are assigned state cadres (e.g., Gujarat, Tamil Nadu) for IAS/IPS, with periodic central deputation opportunities. Preferences are submitted post-Mains, and top ranks secure preferred services/cadres.
          </li>
        </ul>
      </motion.section>
    </div>
  );
};

export default AboutUPSC;