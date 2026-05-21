import hrmisImg from "@/assets/HRMIS.png";
import healthySelfImg from "@/assets/HealthySelf.png";
export type ProjectStatus = "Shipped" | "Featured" | "Available" | "Capstone Project" | "Internship Project";

export interface Project {
  title: string;
  desc: string;
  tags: string[];
  status: ProjectStatus;
  image?: string;
}

export const projects: Project[] = [
  {
    title: "Food Kiosk Self-Ordering System",
    desc: "A self-ordering system with real-time order processing and centralized menu management, designed to improve ordering efficiency and enhance the customer experience.",
    tags: ["Laravel", "MySQL"],
    status: "Capstone Project",
    image: healthySelfImg,
  },
  {
    title: "HRMIS",
    desc: "A Human Resource Management Information System with face recognition for attendance tracking, employee records management, and payroll processing. Developed during my internship at Department of Information and Communications Technology in collaboration with another developer.",
    tags: ["Laravel", "MS SQL Server"],
    status: "Internship Project",
    image: hrmisImg,
  },

];
