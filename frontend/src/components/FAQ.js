import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FAQ.css';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Expanded FAQ data with ~100 questions
  const faqData = [
    // Eligibility (10 questions)
    {
      question: "What is the eligibility criteria for UPSC?",
      answer: "To appear for UPSC CSE, candidates must hold a bachelor's degree from any recognized university. The age limit is 21-32 years for General category (as of August 1 of exam year), with relaxations of 5 years for SC/ST, 3 years for OBC, and 10 years for PwBD candidates. Indian citizenship is mandatory for IAS/IPS.",
      category: "Eligibility"
    },
    {
      question: "Can final-year students apply for UPSC?",
      answer: "Yes, final-year students can apply, provided they submit proof of passing the degree before the Mains exam. Provisional admission is granted until the degree is verified.",
      category: "Eligibility"
    },
    {
      question: "Is there a minimum percentage required in graduation?",
      answer: "No, UPSC does not specify a minimum percentage in graduation. You only need to have a recognized degree.",
      category: "Eligibility"
    },
    {
      question: "Can NRI or OCI candidates apply for UPSC?",
      answer: "NRIs and OCIs can apply for certain services like IFS or IRS, but IAS and IPS require Indian citizenship.",
      category: "Eligibility"
    },
    {
      question: "What is the age relaxation for defense personnel?",
      answer: "Defense personnel disabled in operations get up to 3-9 years of age relaxation, depending on the nature of disability and category.",
      category: "Eligibility"
    },
    {
      question: "Can candidates with distance education degrees apply?",
      answer: "Yes, as long as the degree is from a UGC-recognized university, distance education is valid for UPSC.",
      category: "Eligibility"
    },
    {
      question: "Is there an upper age limit for SC/ST candidates?",
      answer: "SC/ST candidates have no attempt limit but must not exceed 37 years (with relaxations for PwBD).",
      category: "Eligibility"
    },
    {
      question: "What qualifies as a recognized university?",
      answer: "A university established by an Act of Parliament or State Legislature, or recognized by UGC, is considered valid.",
      category: "Eligibility"
    },
    {
      question: "Can foreign degree holders apply for UPSC?",
      answer: "Yes, but the degree must be recognized by the Association of Indian Universities (AIU) as equivalent to an Indian degree.",
      category: "Eligibility"
    },
    {
      question: "Are there physical standards for UPSC?",
      answer: "Physical standards apply only to specific services like IPS, not for the exam itself. Check the official notification for details.",
      category: "Eligibility"
    },

    // Attempts (10 questions)
    {
      question: "How many attempts are allowed?",
      answer: "General: 6, OBC: 9, SC/ST: unlimited (until age limit), PwBD (General/OBC): 9, PwBD (SC/ST): unlimited.",
      category: "Attempts"
    },
    {
      question: "Does applying for Prelims count as an attempt?",
      answer: "No, an attempt is counted only if you appear for at least one Prelims paper.",
      category: "Attempts"
    },
    {
      question: "What happens if I miss the Prelims exam?",
      answer: "If you don’t appear, it doesn’t count as an attempt, and your attempts remain unchanged.",
      category: "Attempts"
    },
    {
      question: "Is there a gap required between attempts?",
      answer: "No, you can attempt every year until your attempts or age limit is exhausted.",
      category: "Attempts"
    },
    {
      question: "Do attempts reset if I switch categories?",
      answer: "No, attempts are tracked based on your original category at the first attempt.",
      category: "Attempts"
    },
    {
      question: "Can I check my remaining attempts?",
      answer: "UPSC doesn’t provide an official tracker; you must self-calculate based on your category and past appearances.",
      category: "Attempts"
    },
    {
      question: "What if I exhaust my attempts?",
      answer: "You can no longer appear for UPSC CSE but can explore state PSC exams or other career options.",
      category: "Attempts"
    },
    {
      question: "Does failing Mains affect my attempts?",
      answer: "No, attempts are counted only at the Prelims stage, not Mains or Interview.",
      category: "Attempts"
    },
    {
      question: "Are there extra attempts for EWS candidates?",
      answer: "No, EWS candidates get 6 attempts like the General category, but they receive age relaxation.",
      category: "Attempts"
    },
    {
      question: "Can attempts be carried forward if I change services?",
      answer: "Attempts are specific to UPSC CSE and don’t affect other exams or services.",
      category: "Attempts"
    },

    // Preparation (30 questions)
    {
      question: "What is the best optional subject?",
      answer: "It depends on your background. Popular options: Public Administration, Geography, Sociology, History, Mathematics.",
      category: "Preparation"
    },
    {
      question: "How should I prepare for current affairs?",
      answer: "Read The Hindu/Indian Express, follow Yojana, compile thematic notes, and use PIB/PRS.",
      category: "Preparation"
    },
    {
      question: "How many hours should I study daily?",
      answer: "6-8 hours of focused study is ideal for beginners; increase to 10-12 hours closer to the exam.",
      category: "Preparation"
    },
    {
      question: "Which books are best for Prelims?",
      answer: "NCERTs (6th-12th), Laxmikanth (Polity), Spectrum (History), Shankar IAS (Environment).",
      category: "Preparation"
    },
    {
      question: "How to prepare for CSAT?",
      answer: "Practice aptitude, reasoning, and comprehension daily. Use books like RS Aggarwal or previous papers.",
      category: "Preparation"
    },
    {
      question: "Should I join a coaching institute?",
      answer: "Optional. Self-study works if disciplined; coaching helps with structure and guidance.",
      category: "Preparation"
    },
    {
      question: "How to make notes effectively?",
      answer: "Keep them concise, use bullet points, and organize by syllabus topics for quick revision.",
      category: "Preparation"
    },
    {
      question: "What’s the best way to revise?",
      answer: "Use short notes, mind maps, and practice tests. Revise weekly and monthly.",
      category: "Preparation"
    },
    {
      question: "How to improve answer writing for Mains?",
      answer: "Practice daily, follow a structure (intro, body, conclusion), and get feedback.",
      category: "Preparation"
    },
    {
      question: "How to choose an optional subject?",
      answer: "Consider interest, syllabus overlap with GS, scoring potential, and resource availability.",
      category: "Preparation"
    },
    {
      question: "How to prepare for the Essay paper?",
      answer: "Read editorials, practice 2-3 essays weekly, and focus on clarity and structure.",
      category: "Preparation"
    },
    {
      question: "What’s the role of mock tests?",
      answer: "They simulate exam conditions, improve time management, and identify weak areas.",
      category: "Preparation"
    },
    {
      question: "How to cover NCERTs effectively?",
      answer: "Start with 6th-12th, read selectively by syllabus, and summarize key points.",
      category: "Preparation"
    },
    {
      question: "How to stay motivated during preparation?",
      answer: "Set small goals, track progress, and take breaks to avoid burnout.",
      category: "Preparation"
    },
    {
      question: "How to prepare for the Interview?",
      answer: "Know your DAF, current affairs, and practice mock interviews for confidence.",
      category: "Preparation"
    },
    {
      question: "Is it necessary to read newspapers daily?",
      answer: "Yes, for current affairs. Focus on editorials and national news.",
      category: "Preparation"
    },
    {
      question: "How to manage time during preparation?",
      answer: "Create a daily schedule, prioritize weak areas, and stick to deadlines.",
      category: "Preparation"
    },
    {
      question: "What’s the best source for Polity?",
      answer: "M. Laxmikanth’s Indian Polity is the gold standard for UPSC.",
      category: "Preparation"
    },
    {
      question: "How to prepare for Geography?",
      answer: "Study NCERTs, Goh Cheng Leong, and practice map-based questions.",
      category: "Preparation"
    },
    {
      question: "How to tackle Environment topics?",
      answer: "Use Shankar IAS book, follow NIOS notes, and track current events.",
      category: "Preparation"
    },
    {
      question: "Can I prepare while working?",
      answer: "Yes, with 4-5 hours daily and weekend focus, it’s manageable.",
      category: "Preparation"
    },
    {
      question: "How to prepare for Ethics (GS IV)?",
      answer: "Study Lexicon, practice case studies, and link with current examples.",
      category: "Preparation"
    },
    {
      question: "What’s the best way to learn History?",
      answer: "Start with NCERTs, then Spectrum for Modern India, and make timelines.",
      category: "Preparation"
    },
    {
      question: "How to cover Economy?",
      answer: "Read NCERTs, Ramesh Singh, and follow the Economic Survey.",
      category: "Preparation"
    },
    {
      question: "How to prepare for Science & Tech?",
      answer: "Focus on current developments via newspapers and basic NCERT concepts.",
      category: "Preparation"
    },
    {
      question: "Should I follow multiple resources?",
      answer: "No, stick to 1-2 standard sources per subject to avoid confusion.",
      category: "Preparation"
    },
    {
      question: "How to handle stress during preparation?",
      answer: "Meditate, exercise, and maintain a balanced routine.",
      category: "Preparation"
    },
    {
      question: "How to analyze previous year papers?",
      answer: "Identify trends, recurring topics, and question types for focus areas.",
      category: "Preparation"
    },
    {
      question: "What’s the role of online platforms?",
      answer: "Useful for free resources, lectures, and test series if used wisely.",
      category: "Preparation"
    },
    {
      question: "How to start preparation from scratch?",
      answer: "Understand syllabus, gather basic books, and start with NCERTs.",
      category: "Preparation"
    },

    // Exam Pattern (20 questions)
    {
      question: "What is the exam pattern for UPSC CSE?",
      answer: "Three stages: Prelims (2 papers), Mains (9 papers), and Interview.",
      category: "Exam Pattern"
    },
    {
      question: "What is the structure of Prelims?",
      answer: "Two papers: GS (100 Qs, 200 marks) and CSAT (80 Qs, 200 marks, qualifying).",
      category: "Exam Pattern"
    },
    {
      question: "What is the marking scheme for Prelims?",
      answer: "GS: +2 per correct, -0.66 per wrong. CSAT: +2.5 per correct, -0.83 per wrong.",
      category: "Exam Pattern"
    },
    {
      question: "What are the Mains papers?",
      answer: "Essay, GS I-IV, Optional I-II, and two qualifying language papers.",
      category: "Exam Pattern"
    },
    {
      question: "What is the weightage of the Interview?",
      answer: "275 marks, added to Mains (1750 marks) for the final merit.",
      category: "Exam Pattern"
    },
    {
      question: "Are language papers in Mains qualifying?",
      answer: "Yes, English and Indian language papers need 25% to qualify.",
      category: "Exam Pattern"
    },
    {
      question: "How long is the Mains exam?",
      answer: "Spread over 5-7 days, with 3-hour sessions per paper.",
      category: "Exam Pattern"
    },
    {
      question: "What is the cutoff for Prelims?",
      answer: "Varies yearly; usually 90-110 for General in GS Paper I.",
      category: "Exam Pattern"
    },
    {
      question: "How is the final rank calculated?",
      answer: "Based on Mains (1750) + Interview (275) = 2025 total marks.",
      category: "Exam Pattern"
    },
    {
      question: "What’s the duration of the Interview?",
      answer: "Typically 20-40 minutes, depending on the panel.",
      category: "Exam Pattern"
    },
    {
      question: "Can I choose the Interview language?",
      answer: "Yes, you can opt for English, Hindi, or any scheduled language.",
      category: "Exam Pattern"
    },
    {
      question: "What is the syllabus for GS Paper I?",
      answer: "History, Geography, Society, and Indian Heritage/Culture.",
      category: "Exam Pattern"
    },
    {
      question: "What does GS Paper II cover?",
      answer: "Governance, Polity, Constitution, and International Relations.",
      category: "Exam Pattern"
    },
    {
      question: "What is tested in GS Paper III?",
      answer: "Economy, Environment, Technology, and Disaster Management.",
      category: "Exam Pattern"
    },
    {
      question: "What’s the focus of GS Paper IV?",
      answer: "Ethics, Integrity, and Aptitude with case studies.",
      category: "Exam Pattern"
    },
    {
      question: "How many optional subjects are there?",
      answer: "26 subjects, ranging from Anthropology to Mathematics.",
      category: "Exam Pattern"
    },
    {
      question: "Is there negative marking in Mains?",
      answer: "No, Mains is descriptive; no negative marking applies.",
      category: "Exam Pattern"
    },
    {
      question: "What’s the word limit for Essay paper?",
      answer: "Around 1000-1200 words total for two essays.",
      category: "Exam Pattern"
    },
    {
      question: "How many questions in GS Mains papers?",
      answer: "20 questions per paper, split into 10 and 15 markers.",
      category: "Exam Pattern"
    },
    {
      question: "What’s the time gap between Prelims and Mains?",
      answer: "Usually 3-4 months, depending on the exam cycle.",
      category: "Exam Pattern"
    },

    // Miscellaneous (30 questions)
    {
      question: "When is the UPSC notification released?",
      answer: "Typically in February/March each year.",
      category: "Miscellaneous"
    },
    {
      question: "How to apply for UPSC?",
      answer: "Online via the UPSC website (upsconline.nic.in).",
      category: "Miscellaneous"
    },
    {
      question: "What is the application fee?",
      answer: "₹100 for Prelims, ₹200 for Mains; exemptions for SC/ST/PwBD/females.",
      category: "Miscellaneous"
    },
    {
      question: "Can I change my optional subject later?",
      answer: "No, it’s fixed after the Mains application is submitted.",
      category: "Miscellaneous"
    },
    {
      question: "What is the role of DAF in the Interview?",
      answer: "Detailed Application Form (DAF) is the basis for Interview questions.",
      category: "Miscellaneous"
    },
    {
      question: "How many candidates clear Prelims?",
      answer: "Around 10,000-12,000 qualify for Mains annually.",
      category: "Miscellaneous"
    },
    {
      question: "What is the success rate of UPSC?",
      answer: "Less than 1% of applicants make it to the final list.",
      category: "Miscellaneous"
    },
    {
      question: "Can I prepare in my regional language?",
      answer: "Yes, but exam papers are in English/Hindi; resources may vary.",
      category: "Miscellaneous"
    },
    {
      question: "What is the training process after selection?",
      answer: "Selected candidates train at LBSNAA, Mussoorie, for 1-2 years.",
      category: "Miscellaneous"
    },
    {
      question: "What’s the difference between IAS and IPS?",
      answer: "IAS focuses on administration; IPS on law enforcement.",
      category: "Miscellaneous"
    },
    {
      question: "How to check UPSC results?",
      answer: "Available on the official UPSC website as PDFs.",
      category: "Miscellaneous"
    },
    {
      question: "What is the salary of an IAS officer?",
      answer: "Starting at ₹56,100 (Level 10) plus allowances.",
      category: "Miscellaneous"
    },
    {
      question: "Can I appear for both UPSC and State PSC?",
      answer: "Yes, they’re separate exams with no overlap restrictions.",
      category: "Miscellaneous"
    },
    {
      question: "What is the role of UPSC?",
      answer: "UPSC conducts exams for civil services and other central posts.",
      category: "Miscellaneous"
    },
    {
      question: "How to contact UPSC for queries?",
      answer: "Via their official website or helpline numbers in the notification.",
      category: "Miscellaneous"
    },
    {
      question: "What is the age limit for IFS?",
      answer: "Same as IAS: 21-32 years with category relaxations.",
      category: "Miscellaneous"
    },
    {
      question: "Can I withdraw my UPSC application?",
      answer: "Yes, UPSC allows withdrawal before a specified deadline.",
      category: "Miscellaneous"
    },
    {
      question: "What is the reservation policy in UPSC?",
      answer: "Follows GoI norms: 15% SC, 7.5% ST, 27% OBC, 10% EWS.",
      category: "Miscellaneous"
    },
    {
      question: "How many vacancies are there annually?",
      answer: "Around 800-1000, varying by year and service.",
      category: "Miscellaneous"
    },
    {
      question: "What is the role of CSAT in Prelims?",
      answer: "It’s qualifying (33% needed); doesn’t affect merit.",
      category: "Miscellaneous"
    },
    {
      question: "Can I use a calculator in the exam?",
      answer: "No, calculators are not allowed in Prelims or Mains.",
      category: "Miscellaneous"
    },
    {
      question: "What is the dress code for the Interview?",
      answer: "Formal attire: suit/saree for men/women is recommended.",
      category: "Miscellaneous"
    },
    {
      question: "How to get previous year papers?",
      answer: "Download from the UPSC website or coaching portals.",
      category: "Miscellaneous"
    },
    {
      question: "What is the syllabus for Prelims?",
      answer: "GS: History, Polity, Economy, etc.; CSAT: Aptitude, Reasoning.",
      category: "Miscellaneous"
    },
    {
      question: "Can I take the exam in Hindi?",
      answer: "Yes, question papers are bilingual (English/Hindi).",
      category: "Miscellaneous"
    },
    {
      question: "What is the penalty for wrong answers?",
      answer: "One-third marks deducted per wrong answer in Prelims.",
      category: "Miscellaneous"
    },
    {
      question: "How to choose a test center?",
      answer: "Select during application; first-come, first-served basis.",
      category: "Miscellaneous"
    },
    {
      question: "What is the role of optional in Mains?",
      answer: "Contributes 500/1750 marks; crucial for ranking.",
      category: "Miscellaneous"
    },
    {
      question: "How to prepare for unexpected questions?",
      answer: "Stay updated, think critically, and practice mocks.",
      category: "Miscellaneous"
    },
    {
      question: "What’s the best time to start preparation?",
      answer: "1-2 years before your first attempt is ideal.",
      category: "Miscellaneous"
    }
  ];

  // Get all unique categories
  const categories = ['All', ...new Set(faqData.map(item => item.category))];

  // Filter FAQs based on search term and selected category
  const filteredFaqs = faqData.filter(faq => 
    (selectedCategory === 'All' || faq.category === selectedCategory) &&
    (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
     faq.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="faq-container">
      <motion.h2 
        className="faq-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Frequently Asked Questions
      </motion.h2>
      
      <motion.div 
        className="faq-search-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="faq-search-input"
        />
        <span className="search-icon">🔍</span>
      </motion.div>

      <motion.div 
        className="category-filter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-tag ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {filteredFaqs.length > 0 ? (
        <div className="faq-list">
          <AnimatePresence>
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ y: -3 }}
              >
                <div className="faq-header">
                  <h3>{faq.question}</h3>
                  <span className={`faq-category ${faq.category.toLowerCase().replace(' ', '-')}`}>
                    {faq.category}
                  </span>
                </div>
                <p>{faq.answer}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div 
          className="no-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          No FAQs found matching your search.
        </motion.div>
      )}
    </div>
  );
};

export default FAQ;