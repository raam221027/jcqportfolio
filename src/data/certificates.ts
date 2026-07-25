import internshipImg from "@/assets/DICT Internship Certificate.jpg";
import qaSoftwareTestingImg from "@/assets/QA Software Testing.jpg";
import capacityBuildingImg from "@/assets/Capacity Building Training.jpg";
import digitalDefenseImg from "@/assets/Digital Defense.jpg";
import systemTestingImg from "@/assets/System Testing and Evaluation.jpg";
import ICTSummitImg from "@/assets/ICT Summit Schools.jpg";
import webDesigningImg from "@/assets/Introduction to Web Designing using HTML 5 and Bootstrap.jpg";
import webDevelopmentImg from "@/assets/Basic Web Development using CodeIgniter and ReactJS.jpg";
import digitalCommunicationImg from "@/assets/Digital Communication Netiquette.jpg";
import pythonDjangoImg from "@/assets/Python + Django Framework.jpg";
import pythonBasicsImg from "@/assets/Python Basics.jpg";
import serverConfigImg from "@/assets/Introduction to Server Configuration and Management.jpg";
export interface Certificate {
  name: string;
  year: string;
  image?: string;
}

export const recognition = {
  name: "Programmer of the Year",
  year: "2024",
  eyebrow: "Recognition",
};

export const certificates: Certificate[] = [
  {
    name: "Department of Information and Communication Technology (Internship)",
    year: "2024",
    image: internshipImg,
  },
  { name: "Capacity Building Training", year: "2024", image: capacityBuildingImg },
  { name: "Digital Defense: Secure your accounts & safeguard your privacy", year: "2024", image: digitalDefenseImg },
  { name: "System Testing and Evaluation", year: "2023", image: systemTestingImg },
  {name: "Digital Communication Netiquette", year: "2023", image: digitalCommunicationImg },
  { name: "Introduction to QA Software Testing", year: "2023", image: qaSoftwareTestingImg },

  { name: "ICT Summit Schools", year: "2023", image: ICTSummitImg },
  { name: "Introduction to Web Designing using HTML 5 and Bootstrap", year: "2023", image: webDesigningImg },
  { name: "Basic Web Development using CodeIgniter and ReactJS", year: "2023", image: webDevelopmentImg },
  { name: "Python + Django Framework", year: "2021", image: pythonDjangoImg },
  { name: "Python Basics", year: "2021", image: pythonBasicsImg },
  { name: "Introduction to Server Configuration and Management", year: "2021", image: serverConfigImg },
];
