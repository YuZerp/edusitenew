export interface Course {
    id: number;
    title: string;
    subject: string;
    examType: "ЕГЭ" | "ОГЭ";
    price4: number;
    price8: number;
    price16: number;
    description: string;
    icon: string;
}

export interface Teacher {
    id: number;
    name: string;
    subjects: string[];
    experience: string;
    bio: string;
}

export interface RequestFormData {
    name: string;
    phone: string;
    subject: string;
    grade: string;
}