const fs = require('fs');
const PDFJS = require('pdfjs-dist');
const textract = require('textract');


function extractResumeDetails(resumeText) {
  const details = {
    name: '',
    email: '',
    education: '',
    experience: '',
    skills: [],
  };

  // Extract name
  const nameRegex = /[A-Za-z]+\s[A-Za-z]+/;
  const nameMatch = resumeText.match(nameRegex);
  if (nameMatch) {
    details.name = nameMatch[0];
  }

  // Extract email
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
  const emailMatch = resumeText.match(emailRegex);
  if (emailMatch) {
    details.email = emailMatch[0];
  }

  // Extract education
  const education_keywords = ['education', 'educational background', 'academic qualifications'];

  const educations = [];

  for (const keyword of education_keywords) {
      const startIndex = resumeText.toLowerCase().indexOf(keyword.toLowerCase());

if (startIndex !== -1) {
  const endIndex = resumeText.indexOf('\n\n', startIndex);
  const educationText = resumeText.slice(startIndex, endIndex !== -1 ? endIndex : undefined).trim();
  educations.push(educationText);
}
}

  if (educations.length > 0) {
details.education = educations;
}


  // Extract experience
  const experience_keywords = ['internship','projects','experience', 'employment history', 'work experience', 'professional experience', 'internships', 'job history', 'position of responsibility'];

  const experiences = [];
  
  for (const keyword of experience_keywords) {
    const startIndex = resumeText.toLowerCase().indexOf(keyword.toLowerCase());
    
    if (startIndex !== -1) {
      const endIndex = resumeText.indexOf('\n\n', startIndex);
      const experienceText = resumeText.slice(startIndex, endIndex !== -1 ? endIndex : undefined).trim();
      experiences.push(experienceText);
    }
  }
  
  if (experiences.length > 0) {
    details.experience = experiences;
  }




  // Extract skills
  const technicalSkillsKeywords = [
      'Python', 'C++', 'C', 'HTML', 'CSS', 'JavaScript', 'SQL',
      'React', 'Node.js', 'Bootstrap', 'jQuery', 'NumPy', 'Pandas', 'Scikit-Learn', 'Git',
       'Data Analysis','Web Development',
      'DSA', 'Data Structures', 'Algorithms', 'Problem Solving', 'Competitive Programming', 'MS Excel', 'MS Word',
      'MS PowerPoint', 'MS Access', 'MySQL', 'MongoDB', 'PostgreSQL', 'SQLite', 'Oracle', 'NoSQL', 
      'Linux', 'Windows', 'MacOS', 'Android', 'iOS', 'Arduino', 'Raspberry Pi', 'Embedded Systems', 'Solidworks', 'LT-Spice',
      'ReactJS', 'MATLAB', 'Backend', 'Frontend'
      // Add more keywords here
    ];
    
    // Extracting skills based on predefined keywords
    const skills = technicalSkillsKeywords.filter(keyword => {
      const lowercaseKeyword = keyword.toLowerCase();
      return resumeText.toLowerCase().includes(lowercaseKeyword);
    });
    
    details.skills = skills;


  return details;
}

// // Function to extract text from a PDF file
// function extractTextFromPDF(filePath) {
//   return new Promise((resolve, reject) => {
//     // Read the PDF file as a buffer
//     const dataBuffer = fs.readFileSync(filePath);

//     // Load the PDF document
//     PDFJS.getDocument(dataBuffer).promise.then((pdf) => {
//       const numPages = pdf.numPages;
//       const pagesText = [];

//       // Extract text from each page
//       for (let i = 1; i <= numPages; i++) {
//         pdf.getPage(i).then((page) => {
//           page.getTextContent().then((textContent) => {
//             const pageText = textContent.items.map((item) => item.str).join(' ');
//             pagesText.push(pageText);

//             // Check if text extraction is complete
//             if (pagesText.length === numPages) {
//               resolve(pagesText.join('\n'));
//             }
//           });
//         });
//       }
//     }).catch((error) => {
//       reject(error);
//     });
//   });
// }

// Function to convert PDF file to text using textract
function convertPDFToText(filePath) {
  return new Promise((resolve, reject) => {
    textract.fromFileWithPath(filePath, (error, text) => {
      if (error) {
        reject(error);
      } else {
        resolve(text);
      }
    });
  });
}

// Usage example
const pdfFilePath = './files/file-1687102067009.pdf';

// extractTextFromPDF(pdfFilePath)
//   .then((extractedText) => {
//     console.log('Extracted Text:');
//     console.log(extractedText);
//   })
//   .catch((error) => {
//     console.error('Error extracting text:', error);
//   });
let text = ''
convertPDFToText(pdfFilePath)
  .then((convertedText) => {
    console.log('Converted Text:');
    const resumeText = convertedText;
    console.log(resumeText);
    const parsedResume = extractResumeDetails(resumeText);
    console.log(parsedResume);

// Print extracted information

  })
  .catch((error) => {
    console.error('Error converting PDF to text:', error);
  });
