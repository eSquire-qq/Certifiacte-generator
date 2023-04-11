function createCertificate() {
  var fullname = document.getElementById('fullname').value;
  var date = document.getElementById('date').value;
  var teacher = document.getElementById('teacher').value;
  var course = document.getElementById('course').value;

  const regexForName = /^([А-ЯЇІЄ]{1,1})([а-яїіє]{2,15})+\s([А-ЯЇІЄ]{1,1})([а-яїіє]{2,15})+\s([А-ЯЇІЄ]{1,1})([а-яїіє]{2,15})+$/;
  if (regexForName.test(fullname)) {
    console.log("ПІБ введено правильно");
  } else {
    alert("ПІБ введено неправильно")
    return;
  }

  const regexForTeacher = /^([А-ЯЇІЄ]{1,1})([а-яїіє]{2,15})+\s([А-ЯЇІЄ]{1,1}\.)+\s([А-ЯЇІЄ]{1,1}\.)+$/;
  if (regexForTeacher.test(teacher)) {
    console.log("Прізвище та ініціали викладача введено правильно");
  } else {
    alert("Прізвище та ініціали викладача введено неправильно")
    return;
  }

  const canvasContainer = document.createElement('div');
  canvasContainer.classList.add('canvas-container');
  document.body.appendChild(canvasContainer);
  const canvas = new fabric.Canvas('canvas', {
    width: canvasContainer.clientWidth,
    height: canvasContainer.clientHeight,
  });

  canvas.setWidth(1000);
  canvas.setHeight(707);

  canvasContainer.appendChild(canvas.lowerCanvasEl);
  
  const maxWidth = canvas.width;
  const maxHeight = canvas.height;

  // Создаем объект изображения
  fabric.Image.fromURL('images/White Green Elegant Certificate Of Appreciation.png', function (img) {
    var scaleFactor = Math.min(maxWidth / img.width, maxHeight / img.height);
    img.scaleToWidth(img.width * scaleFactor);
    img.scaleToHeight(img.height * scaleFactor);
    canvas.add(img);

    canvas.sendToBack(img)


    // Создаем объект текста
    var courseText = new fabric.Text(course, {
      left: 500,
      top: 500,
      fontSize: 30,
      fill: 'black'
    });
    canvas.add(courseText);

    var fullnameText = new fabric.Text(fullname, {
      left: 400,
      top: 350,
      fontSize: 30,
      fill: 'black'
    });
    canvas.add(fullnameText);

    var teacherText = new fabric.Text(teacher, {
      left: 430,
      top: 560,
      fontSize: 30,
      fill: 'black'
    });
    canvas.add(teacherText);

    var dateText = new fabric.Text(date, {
      left: 715,
      top: 560,
      fontSize: 30,
      fill: 'black'
    });
    canvas.add(dateText);
    canvas.renderAll();

    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Завантажити';
    downloadBtn.addEventListener('click', () => {
      // Получаем URL-адрес канваса в формате PNG
      const url = canvas.toDataURL('image/png');

      // Создаем ссылку для скачивания
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = 'myCanvas.png';

      // Добавляем ссылку на страницу и эмулируем ее нажатие для скачивания
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });

    // Добавляем кнопку на страницу
    document.body.appendChild(downloadBtn);    
  });

}