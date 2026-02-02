export type Stage = 'Applied' | 'Screening' | 'Technical' | 'HR Round' | 'Offer' | 'Hired' | 'Rejected';

export interface Application {
  id: string;
  name: string;
  avatar: string;
  role: string;
  university: string;
  degree: string;
  appliedDate: string;
  stage: Stage;
  matchScore: number;
  status: 'Active' | 'On Hold' | 'Rejected';
  rating: number; // 1-5 stars
}

export const STAGES: Stage[] = ['Applied', 'Screening', 'Technical', 'HR Round', 'Offer', 'Hired'];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    avatar: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=0D8ABC&color=fff",
    role: "Senior Frontend Developer",
    university: "IISc Bangalore",
    degree: "Computer Science",
    appliedDate: "29 Jan",
    stage: "Applied",
    matchScore: 90,
    status: "Active",
    rating: 4
  },
  {
    id: "2",
    name: "Neha Gupta",
    avatar: "https://ui-avatars.com/api/?name=Neha+Gupta&background=6D28D9&color=fff",
    role: "Data Scientist",
    university: "IIM Ahmedabad",
    degree: "Data Science",
    appliedDate: "28 Jan",
    stage: "Screening",
    matchScore: 87,
    status: "Active",
    rating: 5
  },
  {
    id: "3",
    name: "Sarah Johnson",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=EA580C&color=fff",
    role: "Senior Frontend Developer",
    university: "IIT Bombay",
    degree: "Computer Science",
    appliedDate: "26 Jan",
    stage: "Technical",
    matchScore: 95,
    status: "Active",
    rating: 5
  },
  {
    id: "4",
    name: "Priya Patel",
    avatar: "https://ui-avatars.com/api/?name=Priya+Patel&background=DB2777&color=fff",
    role: "Senior Frontend Developer",
    university: "NIT Trichy",
    degree: "Information Tech",
    appliedDate: "24 Jan",
    stage: "HR Round",
    matchScore: 88,
    status: "Active",
    rating: 4
  },
  {
    id: "5",
    name: "Arjun Menon",
    avatar: "https://ui-avatars.com/api/?name=Arjun+Menon&background=4F46E5&color=fff",
    role: "Data Scientist",
    university: "IIT Kharagpur",
    degree: "Statistics",
    appliedDate: "20 Jan",
    stage: "Offer",
    matchScore: 94,
    status: "Active",
    rating: 5
  },
  {
    id: "6",
    name: "Vikram Singh",
    avatar: "https://ui-avatars.com/api/?name=Vikram+Singh&background=333&color=fff",
    role: "Backend Engineer Intern",
    university: "DTU Delhi",
    degree: "Software Eng",
    appliedDate: "30 Jan",
    stage: "Applied",
    matchScore: 85,
    status: "Active",
    rating: 3
  },
  {
    id: "7",
    name: "Rohan Desai",
    avatar: "https://ui-avatars.com/api/?name=Rohan+Desai&background=10B981&color=fff",
    role: "Product Designer",
    university: "NID Ahmedabad",
    degree: "Design",
    appliedDate: "29 Jan",
    stage: "Screening",
    matchScore: 89,
    status: "Active",
    rating: 5
  },
  {
    id: "8",
    name: "Ananya Reddy",
    avatar: "https://ui-avatars.com/api/?name=Ananya+Reddy&background=6366f1&color=fff",
    role: "Product Designer",
    university: "IDC IIT Bombay",
    degree: "Interaction Design",
    appliedDate: "25 Jan",
    stage: "Technical",
    matchScore: 92,
    status: "Active",
    rating: 4
  },
  {
    id: "9",
    name: "Meera Krishnan",
    avatar: "https://ui-avatars.com/api/?name=Meera+Krishnan&background=f59e0b&color=fff",
    role: "Backend Engineer Intern",
    university: "IIT Madras",
    degree: "Computer Science",
    appliedDate: "27 Jan",
    stage: "Technical",
    matchScore: 91,
    status: "Active",
    rating: 5
  },
  {
    id: "10",
    name: "Aditya Joshi",
    avatar: "https://ui-avatars.com/api/?name=Aditya+Joshi&background=3b82f6&color=fff",
    role: "Backend Engineer Intern",
    university: "VNIT Nagpur",
    degree: "Information Tech",
    appliedDate: "31 Jan",
    stage: "Applied",
    matchScore: 76,
    status: "Active",
    rating: 3
  }
];