"use client";

import { useState } from 'react';
import { RequestFormData } from '@/types';

interface RequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    preselectedSubject?: string;
}

export default function RequestModal({ isOpen, onClose, preselectedSubject = '' }: RequestModalProps) {
    const [formData, setFormData] = useState<RequestFormData>({
        name: '',
        phone: '',
        subject: preselectedSubject,
        grade: '11'
    });
    const [brief, setBrief] = useState('');
    const [errors, setErrors] = useState<Partial<RequestFormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const validate = (): boolean => {
        const newErrors: Partial<RequestFormData> = {};
        if (!formData.name.trim()) newErrors.name = 'Введите имя';
        if (!formData.phone.trim()) newErrors.phone = 'Введите телефон';
        else if (formData.phone.length < 10) newErrors.phone = 'Введите корректный телефон';
        if (!formData.subject) newErrors.subject = 'Выберите предмет';
        if (!formData.grade) newErrors.grade = 'Выберите класс';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:8000/api/applications/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    onClose();
                    setFormData({ name: '', phone: '', subject: '', grade: '11' });
                    setBrief('');
                }, 2000);
            } else {
                alert('Ошибка при отправке. Попробуйте позже.');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка отправки. Проверьте подключение к интернету.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Оставить заявку</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        &times;
                    </button>
                </div>

                {submitted ? (
                    <div className="text-center py-8">
                        <div className="text-green-500 text-5xl mb-4">✓</div>
                        <h3 className="text-xl font-bold">Заявка отправлена!</h3>
                        <p className="text-gray-600 mt-2">Мы свяжемся с вами в ближайшее время.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Ваше имя *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={`w-full p-2 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Телефон *</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+7 (999) 123-45-67"
                                className={`w-full p-2 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Что нужно? (пожелания, предмет, цели)</label>
                            <textarea
                                value={brief}
                                onChange={(e) => setBrief(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                rows={3}
                                placeholder="Например: нужна подготовка к профильной математике, сложно даётся геометрия"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Предмет *</label>
                            <select
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className={`w-full p-2 border rounded-lg ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="">Выберите предмет</option>
                                <option value="Математика">Математика</option>
                                <option value="Русский язык">Русский язык</option>
                                <option value="Обществознание">Обществознание</option>
                                <option value="Физика">Физика</option>
                                <option value="Информатика">Информатика</option>
                                <option value="Английский язык">Английский язык</option>
                                <option value="Химия">Химия</option>
                                <option value="Биология">Биология</option>
                                <option value="История">История</option>
                                <option value="Литература">Литература</option>
                            </select>
                            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Класс *</label>
                            <select
                                value={formData.grade}
                                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            >
                                <option value="9">9 класс (ОГЭ)</option>
                                <option value="10">10 класс (ЕГЭ)</option>
                                <option value="11">11 класс (ЕГЭ)</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
                        >
                            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}