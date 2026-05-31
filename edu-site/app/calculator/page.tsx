import PriceCalculator from '@/components/PriceCalculator';
import Link from 'next/link';

export const metadata = {
    title: 'Калькулятор стоимости - Центр подготовки к ЕГЭ и ОГЭ',
    description: 'Рассчитайте стоимость обучения по выбранному предмету',
};

export default function CalculatorPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                ← На главную
            </Link>
            <PriceCalculator />
        </div>
    );
}