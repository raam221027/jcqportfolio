import hrmisImg from "@/assets/HRMIS.png";
import healthySelfImg from "@/assets/Healthyself.png";
import videokehanImg from "@/assets/videokehan.png";
export type ProjectStatus = "Shipped" | "Featured" | "Available" | "Live" | "Capstone Project" | "Internship Project";

export interface Project {
  title: string;
  desc: string;
  tags: string[];
  status: ProjectStatus;
  image?: string;
  imageAlign?: "top";
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Videokehan",
    desc: "Videokehan is a multi-device karaoke web app that lets you create a karaoke room and invite friends to join using a QR code or room code—without requiring guests to download an app or create an account. Use a TV, laptop, tablet, or spare phone as your karaoke display while everyone joins from their own devices. Enjoy a convenient, interactive karaoke experience anytime, anywhere!",
    tags: ["React", "TypeScript", "Vite", "Laravel", "MySQL"],
    status: "Live",
    liveUrl: "https://videokehan.com",
    image: videokehanImg,
    imageAlign: "top",
  },
  {
    title: "HRMIS",
    desc: "A Human Resource Management Information System (HRMIS) featuring face recognition for attendance tracking, employee records management, and payroll processing. Developed collaboratively with another developer during my internship at the Department of Information and Communications Technology (DICT).",
    tags: ["Laravel", "MS SQL Server", "Bootstrap", "REST API"],
    status: "Internship Project",
    image: hrmisImg,
  },
  {
    title: "Food Kiosk Self-Ordering System",
    desc: "A Food Kiosk Self-Ordering System with real-time order processing and centralized menu management, designed to improve ordering efficiency and enhance the customer experience.",
    tags: ["Laravel", "HTML5", "CSS3", "JavaScript", "Bootstrap", "MySQL"],
    status: "Capstone Project",
    image: healthySelfImg,
  },

];
