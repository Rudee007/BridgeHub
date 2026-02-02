// data/talentData.ts
import type { TalentProfile } from "@/types/talent.types";

export const mockTalent: TalentProfile[] = [
  {
    id: "t1",
    name: "Riya Mehta",
    university: "IIT Kanpur",
    avatar: "https://ui-avatars.com/api/?name=Riya+Mehta&background=0D8ABC&color=fff",
    degree: "B.Tech Computer Science",
    graduationYear: 2025,
    cgpa: 9.2,
    skills: ["React", "Python", "Node.js", "TypeScript", "Solidity", "Web3"],
    primaryRole: "Full Stack Developer",
    experienceLevel: "junior",
    status: "open_to_offers",
    isVerified: true,
    projectsCompleted: 12,
    rating: 5.0,
    successRate: 100,
    bio: "Passionate about building scalable web applications. Web3 enthusiast and hackathon winner. I love solving complex problems using decentralized technologies.",
    availability: "Immediate",
    location: "Remote",
    languages: ["English", "Hindi", "Gujarati"],
    socials: { 
      github: "https://github.com", 
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com" 
    },
    projects: [
      {
        id: "p1",
        title: "DeFi Exchange Platform",
        description: "A decentralized exchange built on Ethereum allowing users to swap tokens with low gas fees. Implemented automated market maker logic.",
        techStack: ["React", "Solidity", "Web3.js", "Tailwind"],
        github: "#",
        link: "#"
      },
      {
        id: "p2",
        title: "TaskMaster AI",
        description: "Productivity app that uses NLP to categorize and prioritize tasks automatically based on urgency and context.",
        techStack: ["Python", "Django", "React", "OpenAI API"],
        github: "#"
      }
    ],
    experience: [
      {
        id: "e1",
        role: "SDE Intern",
        company: "Microsoft",
        duration: "May 2024 - Jul 2024",
        description: "Optimized Azure cloud functions reducing latency by 15%. Collaborated with the core team to migrate legacy services.",
        type: "internship"
      },
      {
        id: "e2",
        role: "Frontend Developer",
        company: "TechStart (Startup)",
        duration: "Jan 2023 - Apr 2023",
        description: "Built the MVP for a logistics management dashboard using React and Redux.",
        type: "freelance"
      }
    ]
  },

  {
    id: "t3",
    name: "Rahul Verma",
    university: "BITS Pilani",
    avatar: "https://ui-avatars.com/api/?name=Rahul+Verma&background=EA580C&color=fff",
    degree: "B.E. Electronics",
    graduationYear: 2025,
    cgpa: 8.5,
    skills: ["Figma", "React", "Tailwind CSS", "UI/UX", "Next.js"],
    primaryRole: "Frontend Developer",
    experienceLevel: "fresher",
    status: "busy",
    isVerified: false,
    projectsCompleted: 5,
    rating: 4.7,
    successRate: 95,
    bio: "Design-minded developer. I bridge the gap between design and engineering, ensuring pixel-perfect implementations.",
    availability: "1 month",
    location: "Bangalore",
    languages: ["English", "Hindi", "Marathi"],
    socials: { linkedin: "#", behance: "#" },
    projects: [
      {
        id: "p4",
        title: "E-Commerce Dashboard",
        description: "A highly responsive analytics dashboard for shop owners with dark mode support and data visualization.",
        techStack: ["Next.js", "Tremor", "Tailwind"],
        link: "#"
      }
    ],
    experience: []
  },
  {
    id: "t4",
    name: "Arjun Reddy",
    university: "IIIT Hyderabad",
    avatar: "https://ui-avatars.com/api/?name=Arjun+Reddy&background=10B981&color=fff",
    degree: "M.Tech AI/ML",
    graduationYear: 2024,
    cgpa: 9.5,
    skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision", "FastAPI"],
    primaryRole: "AI/ML Engineer",
    experienceLevel: "mid",
    status: "open_to_offers",
    isVerified: true,
    projectsCompleted: 15,
    rating: 5.0,
    successRate: 100,
    bio: "Researcher and developer focusing on Large Language Models and Generative AI. Published 2 papers in international conferences.",
    availability: "2 weeks",
    location: "Hyderabad",
    languages: ["English", "Telugu"],
    socials: { github: "#", linkedin: "#", twitter: "#" },
    projects: [
      {
        id: "p5",
        title: "Medical Image Diagnosis",
        description: "Deep learning model to detect anomalies in X-Ray scans with 98% accuracy using ResNet50.",
        techStack: ["PyTorch", "OpenCV", "Flask"],
        github: "#"
      },
      {
        id: "p6",
        title: "Local LLM Chatbot",
        description: "Fine-tuned Llama-2 model for specific legal document analysis running on local consumer hardware.",
        techStack: ["Python", "HuggingFace", "LangChain"],
        github: "#"
      }
    ],
    experience: [
      {
        id: "e4",
        role: "AI Research Intern",
        company: "Google Research India",
        duration: "May 2023 - Aug 2023",
        description: "Contributed to research on multi-modal learning models.",
        type: "internship"
      }
    ]
  },
  {
    id: "t5",
    name: "Saanvi Patel",
    university: "NIT Trichy",
    avatar: "https://ui-avatars.com/api/?name=Saanvi+Patel&background=DB2777&color=fff",
    degree: "B.Tech IT",
    graduationYear: 2026,
    cgpa: 9.0,
    skills: ["Flutter", "Dart", "Firebase", "Kotlin", "Swift"],
    primaryRole: "Mobile App Developer",
    experienceLevel: "fresher",
    status: "available",
    isVerified: true,
    projectsCompleted: 7,
    rating: 4.8,
    successRate: 96,
    bio: "Cross-platform mobile wizard. I build beautiful, buttery smooth apps for both iOS and Android.",
    availability: "Immediate",
    location: "Remote",
    languages: ["English", "Gujarati", "Tamil"],
    socials: { github: "#", linkedin: "#" },
    projects: [
      {
        id: "p7",
        title: "FitTrack Pro",
        description: "A fitness tracking app with social features, real-time GPS tracking, and health metrics visualization.",
        techStack: ["Flutter", "Firebase", "Google Maps API"],
        link: "#"
      }
    ],
    experience: [
      {
        id: "e5",
        role: "App Dev Intern",
        company: "Zomato",
        duration: "Dec 2023 - Feb 2024",
        description: "Assisted in revamping the delivery partner app UI for better accessibility.",
        type: "internship"
      }
    ]
  },
  {
    id: "t6",
    name: "Vikram Singh",
    university: "VIT Vellore",
    avatar: "https://ui-avatars.com/api/?name=Vikram+Singh&background=4F46E5&color=fff",
    degree: "B.Tech CSE",
    graduationYear: 2024,
    cgpa: 8.2,
    skills: ["DevOps", "AWS", "Terraform", "Jenkins", "Linux", "Go"],
    primaryRole: "DevOps Engineer",
    experienceLevel: "junior",
    status: "hired",
    isVerified: false,
    projectsCompleted: 10,
    rating: 4.6,
    successRate: 92,
    bio: "Infrastructure as Code enthusiast. I automate everything and ensure 99.9% uptime for applications.",
    availability: "Not Available",
    location: "Pune",
    languages: ["English", "Hindi", "Punjabi"],
    socials: { github: "#", linkedin: "#" },
    projects: [
      {
        id: "p8",
        title: "AutoScale Infra",
        description: "Terraform scripts to provision a highly available AWS architecture with auto-scaling groups and load balancers.",
        techStack: ["Terraform", "AWS", "Bash"],
        github: "#"
      }
    ],
    experience: [
      {
        id: "e6",
        role: "Cloud Intern",
        company: "Infosys",
        duration: "Jan 2024 - Present",
        description: "Managing CI/CD pipelines for internal tools.",
        type: "full-time"
      }
    ]
  }
];