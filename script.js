// Отримання елементів DOM
const form = document.getElementById('certificate-form');
const canvas = document.getElementById('certificate-canvas');
const ctx = canvas.getContext('2d');
const downloadImgBtn = document.getElementById('download-img-btn');
const downloadPdfBtn = document.getElementById('download-pdf-btn');

// Додавання обробників подій

// Обробник події відправки форми
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Отримання даних з форми
    const name = document.getElementById('name-input').value;
    const surname = document.getElementById('surname-input').value;
    const course = document.getElementById('course-input').value;
    const date = document.getElementById('date-input').value;
    const instructor = document.getElementById('instructor-input').value;

    // Очищення полотна
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рендер сертифікату на полотні
    ctx.fillStyle = 'black';
    ctx.font = '40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Сертифікат`, canvas.width / 2, 100);
    ctx.fillText(`інформації`, canvas.width / 2, 150);
    ctx.fillText(`Про успішне`, canvas.width / 2, 200);
    ctx.fillText(`завершення курсу`, canvas.width / 2, 250);
    ctx.fillText(`"${course}"`, canvas.width / 2, 300);
    ctx.fillText(`Ім'я: ${name} ${surname}`, canvas.width / 2, 350);
    ctx.fillText(`Дата: ${date}`, canvas.width / 2, 400);
    ctx.fillText(`Викладач: ${instructor}`, canvas.width / 2, 450);

    // Активуємо кнопки завантаження
    downloadImgBtn.disabled = false;
    downloadPdfBtn.disabled = false;
});

// Обробник події натискання кнопки завантаження зображення
downloadImgBtn.addEventListener('click', () => {
    const imgDataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imgDataUrl;
    link.download = 'certificate.png';
    link.click();
});

// Обробник події натискання кнопки завантаження PDF
downloadPdfBtn.addEventListener('click', () => {
    const imgDataUrl = canvas.toDataURL('image/png');

    // Створюємо новий елемент Image
    const img = new Image();
    img.src = imgDataUrl;

    // Очікуємо завантаження зображення
    img.onload = () => {
        // Створюємо новий елемент Canvas для зображення
        const pdfCanvas = document.createElement('canvas');
        const pdfContext = pdfCanvas.getContext('2d');
        // Встановлюємо розміри Canvas відповідні до розмірів зображення
        pdfCanvas.width = img.width;
        pdfCanvas.height = img.height;

        // Малюємо зображення на Canvas
        pdfContext.drawImage(img, 0, 0, img.width, img.height);

        // Створюємо об'єкт для генерації PDF
        const pdfDoc = new jsPDF();
        const imgData = pdfCanvas.toDataURL('image/png');

        // Додаємо зображення до PDF
        pdfDoc.addImage(imgData, 'PNG', 0, 0, img.width, img.height);

        // Завантажуємо PDF
        pdfDoc.save('certificate.pdf');
    };
});
