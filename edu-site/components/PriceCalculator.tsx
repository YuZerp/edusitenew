"use client";

import { useState } from 'react';
import { courses } from '@/data';

interface CalculatorResult {
    courseTitle: string;
    subject: string;
    examType: string;
    lessonsPerMonth: number;
    totalPrice: number;
}

export default function PriceCalculator() {
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [lessonsPerMonth, setLessonsPerMonth] = useState<4 | 8 | 16>(8);
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const selectedCourse = selectedCourseId 
        ? courses.find(c => c.id === selectedCourseId) 
        : null;

    const getPriceForLessons = (courseId: number, lessons: number): number => {
        const course = courses.find(c => c.id === courseId);
        if (!course) return 0;
        if (lessons === 4) return course.price4;
        if (lessons === 8) return course.price8;
        if (lessons === 16) return course.price16;
        return 0;
    };

    const handleCalculate = () => {
        if (!selectedCourseId || !selectedCourse) return;

        const totalPrice = getPriceForLessons(selectedCourseId, lessonsPerMonth);
        
        setResult({
            courseTitle: selectedCourse.title,
            subject: selectedCourse.subject,
            examType: selectedCourse.examType,
            lessonsPerMonth: lessonsPerMonth,
            totalPrice: totalPrice
        });
    };

    const handleReset = () => {
        setSelectedCourseId(null);
        setLessonsPerMonth(8);
        setResult(null);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Калькулятор стоимости</h2>
            <p className="text-gray-600 text-center mb-6">
                Рассчитайте стоимость обучения за месяц
            </p>

            <div className="space-y-4">
                {/* Выбор курса */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Выберите курс *
                    </label>
                    <select
                        value={selectedCourseId || ''}
                        onChange={(e) => setSelectedCourseId(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">-- Выберите курс --</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.title} — {course.examType}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Выбор количества занятий */}
                {selectedCourse && (
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Количество занятий в месяц *
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                type="button"
                                onClick={() => setLessonsPerMonth(4)}
                                className={`p-2 rounded-lg border transition ${
                                    lessonsPerMonth === 4
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                                }`}
                            >
                                4 занятия<br/>
                                <span className="text-sm">{selectedCourse.price4} ₽</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setLessonsPerMonth(8)}
                                className={`p-2 rounded-lg border transition ${
                                    lessonsPerMonth === 8
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                                }`}
                            >
                                8 занятий<br/>
                                <span className="text-sm">{selectedCourse.price8} ₽</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setLessonsPerMonth(16)}
                                className={`p-2 rounded-lg border transition ${
                                    lessonsPerMonth === 16
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                                }`}
                            >
                                16 занятий<br/>
                                <span className="text-sm">{selectedCourse.price16} ₽</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Кнопки */}
                <div className="flex gap-3 pt-4">
                    <button
                        onClick={handleCalculate}
                        disabled={!selectedCourseId}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        Рассчитать стоимость
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-4 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                        Сбросить
                    </button>
                </div>

                {/* Результат */}
                {result && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                        <h3 className="font-semibold text-green-800 mb-2">Результат:</h3>
                        <div className="space-y-1 text-sm">
                            <p><span className="text-gray-600">Курс:</span> <strong>{result.courseTitle}</strong></p>
                            <p><span className="text-gray-600">Предмет:</span> {result.subject}</p>
                            <p><span className="text-gray-600">Экзамен:</span> {result.examType}</p>
                            <p><span className="text-gray-600">Занятий в месяц:</span> {result.lessonsPerMonth}</p>
                            <p className="text-xl font-bold text-green-700 pt-2">
                                Итого: {result.totalPrice} ₽ / месяц
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}