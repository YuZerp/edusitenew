import { Course } from '@/types';

interface CourseCardProps {
    course: Course;
    // onRequest больше не нужен на главной
}

export default function CourseCard({ course }: CourseCardProps) {
    return (
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
            {/* Кнопка УДАЛЕНА */}
        </div>
    );
}