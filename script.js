document.addEventListener('DOMContentLoaded', () => {
	// Tu código JavaScript aquí



// Obtenemos el formulario y la tabla
const form = document.querySelector('form');
const table = document.querySelector('table tbody');

// Agregamos un event listener al formulario para escuchar el evento submit
form.addEventListener('submit', (event) => {
	// Prevenimos que el formulario se envíe
	event.preventDefault();

	// Obtenemos los valores del formulario
	const title = form.title.value;
	const date = form.date.value;
	const content = form.content.value;

	// Creamos una nueva fila para la tabla
	const row = document.createElement('tr');
	row.innerHTML = `
		<td>${title}</td>
		<td>${date}</td>
		<td>${content}</td>
	`;

	// Agregamos la fila a la tabla
	table.appendChild(row);

	// Limpiamos el formulario
	form.reset();
});


// Obtén el botón de descarga de Excel
const downloadExcelButton = document.querySelector('#download-excel');

// Agrega un event listener al botón de descarga de Excel para escuchar el evento click
downloadExcelButton.addEventListener('click', () => {
  // Obtiene los datos de la tabla
  const rows = Array.from(document.querySelectorAll('table tbody tr'));
  const data = rows.map(row => {
    return [
      row.querySelector('td:nth-child(1)').textContent,
      row.querySelector('td:nth-child(2)').textContent,
      row.querySelector('td:nth-child(3)').textContent,
    ];
  });

  // Crea un libro de trabajo (workbook) de Excel y agrega una hoja (worksheet)
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(data);

  // Agrega la hoja al libro de trabajo
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Agenda');

  // Convierte el libro de trabajo a un archivo de Excel
  const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Descarga el archivo de Excel
  const blob = new Blob([excelFile], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'agenda.xlsx';
  link.click();
});



});