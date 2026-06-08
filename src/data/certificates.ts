import qaSoftwareTestingImg from "@/assets/QA Software Testing.jpg";
import capacityBuildingImg from "@/assets/Capacity Building Training.jpg";

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
  { name: "Department of Information and Communication Technology (Internship)", year: "2024" },
  { name: "Capacity Building Training", year: "2024", image: capacityBuildingImg },
  { name: "Introduction to QA Software Testing", year: "2023", image: qaSoftwareTestingImg },
  { name: "System Testing and Evaluation", year: "2023" },
  { name: "Introduction to Web Designing using HTML 5 and Bootstrap", year: "2023" },
  { name: "Basic Web Development using CodeIgniter and ReactJS", year: "2022" },
  { name: "Python + Django Framework", year: "2022" },
  { name: "Python Basics", year: "2021" },
  { name: "Introduction to Server Configuration and Management", year: "2021" },
];
