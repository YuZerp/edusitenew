"use client";

import { useState } from "react";
import CourseCard from "@/components/CourseCard";
import RequestModal from "@/components/RequestModal";
import { courses } from "@/data";

export default function CoursesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState("");

    // Создаём отдельную карточку с кнопкой для страницы курсов
    const CourseCardWithButton = ({ course }: { course: any }) => (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{course.title}</h3>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {course.examType}
                </span>
            </div>
            <p className="text-gray-600 mb-4 text-sm">{course.description}</p>
            
            <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Абонементы:</p>
                <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                        <span>4 занятия в месяц</span>
                        <span className="font-semibold text-blue-600">{course.price4} ₽</span>
                    </div>
                    <div className="flex justify-between">
                        <span>8 занятий в месяц</span>
                        <span className="font-semibold text-blue-600">{course.price8} ₽</span>
                    </div>
                    <div className="flex justify-between">
                        <span>16 занятий в месяц</span>
                        <span className="font-semibold text-blue-600">{course.price16} ₽</span>
                    </div>
                </div>
            </div>
            
            <button
                onClick={() => {
                    setSelectedSubject(course.subject);
                    setIsModalOpen(true);
                }}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Оставить заявку
            </button>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-8">Наши курсы</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <CourseCardWithButton key={course.id} course={course} />
                ))}
            </div>
            <RequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                preselectedSubject={selectedSubject}
            />
        </div>
    );
}