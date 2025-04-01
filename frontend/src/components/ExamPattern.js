// ExamPattern.jsx
import React from 'react';
import './ExamPattern.css';
import { motion } from 'framer-motion';

const ExamPattern = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="exam-pattern-wrapper">
      <motion.h2
        className="exam-title"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        UPSC Civil Services Examination Pattern: A Comprehensive Breakdown
      </motion.h2>

      <motion.section
        className="exam-intro"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="intro-title">Overview of the UPSC CSE Exam Pattern</h3>
        <p className="exam-text">
          The UPSC Civil Services Examination (CSE) is an intricate, multi-tiered evaluation process conducted by the Union Public Service Commission (UPSC), India’s apex recruitment body established under Article 315 of the Constitution. This examination is the gateway to prestigious services like the Indian Administrative Service (IAS), Indian Police Service (IPS), Indian Foreign Service (IFS), and numerous other Group A and B posts, shaping the administrative backbone of the nation. Spanning three stages—Preliminary Examination, Main Examination, and Personality Test (Interview)—the CSE assesses a candidate’s intellectual breadth, analytical depth, writing proficiency, and personal attributes over an annual cycle that begins with notifications in February and concludes with results in April/May of the following year. With approximately 10-12 lakh aspirants vying for 500-1000 vacancies annually (a success rate of 0.1-0.2%), it’s among the world’s toughest competitive exams. The total merit is calculated from 2025 marks (1750 from Mains + 275 from Interview), with each stage designed to filter and refine the candidate pool progressively. Beyond testing knowledge, the pattern evaluates critical thinking, ethical grounding, and leadership potential, making it a holistic crucible for future administrators.
        </p>
        <p className="exam-text">
          <strong>Fascinating Fact:</strong> The UPSC CSE traces its origins to the British-era Imperial Civil Service exams, with the first modern exam held in 1922. Today, it’s a symbol of meritocracy in India, with toppers like Tina Dabi (2015, AIR 1) and Athar Aamir (2016, AIR 2) becoming household names. In 2022, women topped the exam for the fourth consecutive year, with Shruti Sharma securing AIR 1, highlighting its evolving inclusivity.
        </p>
      </motion.section>

      <motion.section
        className="exam-card"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
      >
        <h3 className="card-title">Preliminary Examination</h3>
        <p className="card-text">
          The Preliminary Examination, or "Prelims," is the entry point to the UPSC CSE, held annually in May or June across thousands of centers nationwide. It’s a screening test to shortlist roughly 12-15 times the number of vacancies (e.g., ~12,000-15,000 candidates from 10 lakh applicants) for the Mains. Comprising two objective-type papers conducted on the same day (morning and afternoon sessions), Prelims tests general awareness and aptitude under strict time constraints. Negative marking (1/3rd of allotted marks per wrong answer) penalizes guesswork, with a cutoff determined by Paper I alone (CSAT is qualifying). Results, declared within 6-8 weeks, list roll numbers without scores, maintaining UPSC’s tradition of opacity at this stage.
        </p>
        <div className="exam-details">
          <h4>Paper I: General Studies (GS)</h4>
          <p>
            - <strong>Marks:</strong> 200<br />
            - <strong>Duration:</strong> 2 hours (9:30 AM - 11:30 AM)<br />
            - <strong>Questions:</strong> 100 (2 marks each)<br />
            - <strong>Syllabus:</strong> Current events (national: policies like Atmanirbhar Bharat; international: treaties like Paris Agreement), Indian history (Indus Valley, Mughal era, 1857 Revolt, Gandhi’s movements), geography (monsoons, river systems, world trade routes), polity (Constitutional amendments, federal structure, RTI), economy (GDP growth, fiscal policy, MSMEs), environment (biodiversity hotspots, pollution indices), general science (biotech, space missions like Chandrayaan).<br />
            - <strong>Purpose:</strong> Gauges awareness of static and dynamic topics; recent papers included questions on PM-AWAS Yojana or India’s G20 presidency.<br />
            - <strong>Fact:</strong> The 2021 Prelims had a question on the “Pegasus spyware,” reflecting UPSC’s focus on tech-related current affairs.
          </p>
          <h4>Paper II: Civil Services Aptitude Test (CSAT)</h4>
          <p>
            - <strong>Marks:</strong> 200 (qualifying: 33% or 66 marks)<br />
            - <strong>Duration:</strong> 2 hours (2:30 PM - 4:30 PM)<br />
            - <strong>Questions:</strong> 80 (2.5 marks each)<br />
            - <strong>Syllabus:</strong> Comprehension (passages on social issues, science), logical reasoning (syllogisms, analogies), analytical ability (puzzles, sequences), decision-making (ethical scenarios), numeracy (percentages, ratios, averages), data interpretation (bar graphs, pie charts), English comprehension.<br />
            - <strong>Purpose:</strong> Ensures basic aptitude; qualifying nature filters out candidates lacking analytical skills.<br />
            - <strong>Fact:</strong> Introduced in 2011 replacing the optional paper, CSAT’s difficulty spiked in 2014, sparking protests over its “elitist” math and reasoning focus.
          </p>
          <p className="additional-info">
            <strong>Additional Details:</strong> Conducted in English and Hindi, Prelims uses OMR sheets with four options per question (A, B, C, D). Cutoffs fluctuate (e.g., 98 in 2020, 92.51 in 2021 for General), influenced by paper difficulty and applicant performance. Visually impaired candidates get 20 extra minutes per paper. The exam’s unpredictability—shifting from fact-heavy (e.g., 2019’s “Battle of Plassey”) to analytical (2022’s “Gig Economy”)—keeps aspirants on their toes.
          </p>
        </div>
      </motion.section>

      <motion.section
        className="exam-card"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
      >
        <h3 className="card-title">Main Examination</h3>
        <p className="card-text">
          The Main Examination, or "Mains," is the heart of the UPSC CSE, held over 5-7 days in September/October at select centers (e.g., Delhi, Mumbai). It’s a descriptive marathon testing depth, articulation, and intellectual rigor across nine papers—two qualifying and seven for merit. Qualifying approximately 2-3 times the vacancies (e.g., ~2,000-3,000 from Prelims qualifiers), Mains contributes 1750 marks to the final score. Papers are spread across morning (9 AM-12 PM) and afternoon (2 PM-5 PM) sessions, with candidates handwriting responses in 32-40 page booklets. The evaluation, lasting 3-4 months, rewards clarity, structure, and factual richness, often requiring diagrams (e.g., maps in GS I) or examples (e.g., Make in India in GS III).
        </p>
        <div className="exam-details">
          <h4>Qualifying Papers</h4>
          <ul>
            <li>
              <strong>Paper A: Indian Language (300 marks)</strong><br />
              - <strong>Syllabus:</strong> Chosen from 22 scheduled languages (e.g., Assamese, Gujarati, Kannada); includes comprehension, précis, translation, essay, grammar.<br />
              - <strong>Qualifying:</strong> 25% (75 marks); tests Class X-level proficiency.<br />
              - <strong>Fact:</strong> Hindi is the most chosen language, but regional options like Telugu gained traction post-2010.<br />
              - <strong>Exemption:</strong> Candidates from NE states (e.g., Nagaland) or with disabilities (blindness, hearing impairment) can skip this paper.
            </li>
            <li>
              <strong>Paper B: English (300 marks)</strong><br />
              - <strong>Syllabus:</strong> Comprehension, précis, vocabulary, essay, grammar (Class X level).<br />
              - <strong>Qualifying:</strong> 25% (75 marks); ensures functional English skills.<br />
              - <strong>Fact:</strong> In 2013, English qualifying marks were raised from 10% to 25%, sparking debates on accessibility.
            </li>
          </ul>
          <h4>Merit Papers</h4>
          <ul>
            <li>
              <strong>Essay (250 marks)</strong><br />
              - <strong>Duration:</strong> 3 hours<br />
              - <strong>Format:</strong> Two essays (125 marks each) from options like “Education as a Tool for Empowerment” or “Climate Justice.”<br />
              - <strong>Evaluation:</strong> Structure, depth, and perspective; toppers score 130-150.<br />
              - <strong>Fact:</strong> The 2020 essay topic “Life is a long journey between human being and being humane” stumped many for its abstractness.
            </li>
            <li>
              <strong>General Studies I (250 marks)</strong><br />
              - <strong>Syllabus:</strong> Indian culture (classical dances, temples), history (Vedic period, British Raj, Partition), world history (French Revolution, Cold War), geography (plate tectonics, urbanization), post-independence India (Nehru era, Green Revolution).<br />
              - <strong>Questions:</strong> 20 (10-15 marks each).<br />
              - <strong>Fact:</strong> In 2019, a question on “Rani Chennamma” highlighted lesser-known freedom fighters.
            </li>
            <li>
              <strong>General Studies II (250 marks)</strong><br />
              - <strong>Syllabus:</strong> Constitution (fundamental rights, DPSP), polity (election reforms, judicial activism), governance (e-governance, RTI), social justice (SHGs, education policies), international relations (India-China border, SAARC).<br />
              - <strong>Fact:</strong> The 2021 paper asked about “Digital India’s role in governance,” reflecting UPSC’s current-affairs focus.
            </li>
            <li>
              <strong>General Studies III (250 marks)</strong><br />
              - <strong>Syllabus:</strong> Economy (budget, FDI), technology (AI, ISRO missions), environment (wetlands, renewable energy), security (Naxalism, cyber threats), disaster management (cyclones, floods).<br />
              - <strong>Fact:</strong> The 2022 paper featured “Blockchain Technology,” showing UPSC’s tech-forward trend.
            </li>
            <li>
              <strong>General Studies IV (250 marks)</strong><br />
              - <strong>Syllabus:</strong> Ethics (probity, accountability), aptitude, emotional intelligence, case studies (e.g., bribe refusal), thinkers (Gandhi, Aristotle).<br />
              - <strong>Fact:</strong> Introduced in 2013, this paper’s highest score was 161 (2017, Anudeep Durishetty).
            </li>
            <li>
              <strong>Optional Subject Paper I & II (250 marks each, 500 total)</strong><br />
              - <strong>Duration:</strong> 3 hours each<br />
              - <strong>Choices:</strong> 48 subjects, categorized as:
                <ul>
                  <li><strong>Sciences:</strong> Agriculture, Animal Husbandry & Veterinary Science, Anthropology, Botany, Chemistry, Civil Engineering, Electrical Engineering, Geology, Mathematics, Mechanical Engineering, Medical Science, Physics, Statistics, Zoology.</li>
                  <li><strong>Humanities:</strong> Economics, Geography, History, Management, Philosophy, Political Science & International Relations, Psychology, Public Administration, Sociology.</li>
                  <li><strong>Literature:</strong> Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi, Kannada, Kashmiri, Konkani, Maithili, Malayalam, Manipuri, Marathi, Nepali, Odia, Punjabi, Sanskrit, Santhali, Sindhi, Tamil, Telugu, Urdu, English.</li>
                  <li><strong>Law & Commerce:</strong> Commerce & Accountancy, Law.</li>
                </ul>
              - <strong>Details:</strong> Each paper has 8-10 questions (mix of short and essay-type); candidates pick based on interest, overlap with GS (e.g., Pub Ad), or scoring trends (e.g., Anthropology’s concise syllabus).<br />
              - <strong>Facts:</strong> 
                <ul>
                  <li>Public Administration was the most popular optional in the 2000s, peaking with 50%+ candidates.</li>
                  <li>Anthropology gained favor post-2015 for its scientific approach and high scores (e.g., 350+/500).</li>
                  <li>Literature subjects like Hindi or Tamil suit bilingual candidates, with toppers like Ravi Kumar Sihag (2022, AIR 18) scoring 325+ in Hindi Lit.</li>
                  <li>Maths and Physics are rare but high-scoring (e.g., 375+/500) for STEM graduates.</li>
                  <li>In 2017, Sociology helped Saumya Pandey (AIR 4) secure 312 marks.</li>
                </ul>
            </li>
          </ul>
          <p className="additional-info">
            <strong>Additional Details:</strong> Mains is bilingual (English/Hindi questions), but answers can be in any of the 22 scheduled languages (e.g., Marathi, Urdu). Toppers score 900-1100/1750, with optional subjects often deciding ranks (e.g., Anu Kumari’s 318 in Economics, AIR 2, 2017). Extra time (20 mins/hour) is provided for PwBD candidates. The exam tests endurance—writing ~20,000 words across 9 papers in a week!
          </p>
        </div>
      </motion.section>

      <motion.section
        className="exam-card"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
      >
        <h3 className="card-title">Personality Test (Interview)</h3>
        <p className="card-text">
          The Personality Test, or "Interview," is the capstone of the UPSC CSE, conducted from March to April at Dholpur House, UPSC’s headquarters in New Delhi. Worth 275 marks, it’s a 20-40 minute interaction with a 5-7 member panel, chaired by a UPSC member (often a retired IAS/IPS officer) and including experts like psychologists, academicians, or scientists. Unlike a knowledge test, it probes a candidate’s personality, decision-making, and suitability for civil services, contributing 13-15% to the final merit (2025 marks). The Detailed Application Form (DAF), submitted post-Mains, is the foundation—detailing education, hobbies, work experience, and preferences—guiding a tailored, conversational assessment.
        </p>
        <div className="exam-details">
          <h4>Key Aspects</h4>
          <ul>
            <li>
              <strong>Marks:</strong> 275<br />
              - <strong>Range:</strong> Typically 120-200; toppers like Shubham Kumar (2020, AIR 1) scored 204.<br />
              - <strong>Fact:</strong> The highest recorded score is 212 (2014), rare due to subjective grading.
            </li>
            <li>
              <strong>Panel:</strong> Diverse, with members averaging 20-30 years of public service experience.<br />
              - <strong>Style:</strong> Cordial but incisive; questions test consistency (e.g., contradicting DAF claims).<br />
              - <strong>Fact:</strong> Panels are shuffled daily to ensure fairness, with no prior candidate info.
            </li>
            <li>
              <strong>Content:</strong> DAF-based (e.g., “Why engineering then IAS?” for B.Tech grads), current affairs (e.g., “India’s Ukraine stance”), optional subject (e.g., Sociology concepts), situational (e.g., “Flood crisis as DM”), opinion-based (e.g., “Should India ban crypto?”).<br />
              - <strong>Fact:</strong> In 2022, a candidate faced “Why K-pop as a hobby?” from their DAF, showing UPSC’s quirkiness.
            </li>
            <li>
              <strong>Criteria:</strong> Mental alertness, critical thinking, exposition clarity, judgment balance, interest depth, leadership, social traits, integrity.<br />
              - <strong>Fact:</strong> Body language matters—posture, eye contact, and tone can sway scores by 10-20 marks.
            </li>
          </ul>
          <p className="additional-info">
            <strong>Additional Details:</strong> Conducted in English, Hindi, or regional languages (pre-notified), the interview has no minimum marks but significantly impacts ranks (e.g., a 50-mark difference can shift 50-100 ranks). Preparation involves mock interviews (e.g., Vajiram & Ravi), DAF analysis, and daily news (e.g., *The Hindu* editorials). Dress code is formal (suits, sarees), and sessions are recorded for transparency. Final results, merging Mains and Interview scores, determine service allocation—e.g., IAS often requires 950+ total marks.
          </p>
        </div>
      </motion.section>
    </div>
  );
};

export default ExamPattern;