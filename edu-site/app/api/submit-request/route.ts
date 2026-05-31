import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, subject, grade } = body;
        
        // Логирование заявки (brief не передаётся на сервер, только подсказка на фронте)
        console.log('📋 Новая заявка:', { name, phone, subject, grade });
        
        // Здесь можно отправить данные в Telegram, на email или в базу данных
        // Для MVP просто возвращаем успешный ответ
        
        return NextResponse.json({ success: true, message: 'Заявка отправлена' });
    } catch (error) {
        console.error('Ошибка при обработке заявки:', error);
        return NextResponse.json(
            { success: false, message: 'Ошибка при отправке' },
            { status: 500 }
        );
    }
}