import hrmisImg from "@/assets/HRMIS.png";
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
    title: "Healthy Self Kiosk",
    desc: "Self-ordering food kiosk with touch-first UX, real-time orders, and a Laravel-backed admin panel.",
    tags: ["Laravel", "MySQL"],
    status: "Capstone Project",
  },
  {
    title: "HRMIS - DTR System",
    desc: "A Human Resource Management Information System with face recognition for attendance tracking, employee records management, and payroll processing. Developed during my internship at Department of Information and Communications Technology in collaboration with another developer.",
    tags: ["Laravel", "MS SQL Server"],
    status: "Internship Project",
    image: hrmisImg,
  },

];
