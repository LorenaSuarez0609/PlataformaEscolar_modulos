document.addEventListener("DOMContentLoaded", function() {
    let selectedDay; // Almacena el día seleccionado


    function updateCalendar() {
        const monthSelect = document.getElementById("calendar__month");
        const yearSelect = document.getElementById("calendar__year");
        const datesContainer = document.querySelector(".calendar__dates");

        const month = monthSelect.selectedIndex;
        const year = parseInt(yearSelect.value, 10);

        // Obtiene la fecha actual para marcar el día
        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        datesContainer.innerHTML = ''; // Limpia los días previos

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Ajusta el inicio según el primer día del mes
        for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
            const emptyCell = document.createElement("div");
            emptyCell.className = "calendar__date calendar__date--grey";
            datesContainer.appendChild(emptyCell);
        }

        // Llena los días del mes y marca el día actual si corresponde
        for (let day = 1; day <= daysInMonth; day++) {
            const dateCell = document.createElement("div");
            dateCell.className = "calendar__date";
            dateCell.innerHTML = `<span>${day}</span>`;
            if (day === currentDay && month === currentMonth && year === currentYear) {
                dateCell.classList.add("calendar__date--range-start"); // Usando la clase indicada para marcar el día actual
            }
            datesContainer.appendChild(dateCell);
        }
    }

    document.getElementById("calendar__month").addEventListener("change", updateCalendar);
    document.getElementById("calendar__year").addEventListener("change", updateCalendar);
    updateCalendar(); // Actualiza el calendario inicialmente

    // Delegación de evento para abrir el modal
    document.querySelector(".calendar__dates").addEventListener("click", function(event) {
        if (event.target.closest(".calendar__date") && !event.target.closest(".calendar__date").classList.contains("calendar__date--grey")) {
            selectedDay = event.target.closest(".calendar__date");
            document.getElementById("eventModal").style.display = "block";

            if (selectedDay.getAttribute('data-event-name')) {
                document.getElementById("eventName").value = selectedDay.getAttribute('data-event-name');
                document.getElementById("saveEventButton").style.display = "none";
                document.getElementById("modifyEventButton").style.display = "inline";
                document.getElementById("cancelEventButton").style.display = "inline";
            } else {
                document.getElementById("eventName").value = '';
                document.getElementById("saveEventButton").style.display = "inline";
                document.getElementById("modifyEventButton").style.display = "none";
                document.getElementById("cancelEventButton").style.display = "none";
            }
        }
    });

    // Cierra el modal
    document.querySelector(".close-button").addEventListener("click", function() {
        document.getElementById("eventModal").style.display = "none";
    });

    // Guarda el nuevo evento
    document.getElementById("saveEventButton").addEventListener("click", function() {
        const eventName = document.getElementById("eventName").value;
        if (eventName) {
            selectedDay.classList.add("calendar__date--range-end");
            selectedDay.setAttribute('data-event-name', eventName);
            document.getElementById("eventModal").style.display = "none";
            updateEventList();
            showNotification();
        }
    });

    // Modifica el evento existente
    document.getElementById("modifyEventButton").addEventListener("click", function() {
        const eventName = document.getElementById("eventName").value;
        if (eventName) {
            selectedDay.setAttribute('data-event-name', eventName);
            document.getElementById("eventModal").style.display = "none";
            updateEventList();
        }
    });

    // Cancela (elimina) el evento existente
    document.getElementById("cancelEventButton").addEventListener("click", function() {
        selectedDay.classList.remove("calendar__date--range-end");
        selectedDay.removeAttribute('data-event-name');
        document.getElementById("eventModal").style.display = "none";
        updateEventList();
    });

    
});
// Este código va integrado al final del script que ya tienes

// Función para actualizar la lista de eventos
function updateEventList() {
    const eventList = document.getElementById("eventList");
    eventList.innerHTML = ''; // Limpia la lista existente

    // Encuentra todos los días con eventos y los añade a la lista
    document.querySelectorAll(".calendar__date[data-event-name]").forEach(function(day) {
        const eventName = day.getAttribute('data-event-name');
        const eventDate = day.querySelector('span').textContent;
        const monthYear = document.getElementById("calendar__month").value + " " + document.getElementById("calendar__year").value;
        const eventItem = document.createElement("li");
        eventItem.textContent = `${eventName} - ${eventDate} ${monthYear}`;
        eventList.appendChild(eventItem);
    });
}

function showNotification() {
    const notificationContainer = document.getElementById("notificationContainer");
    notificationContainer.style.display = "block"; // Muestra la tarjeta

    // Oculta la tarjeta después de 3 segundos
    setTimeout(() => {
        notificationContainer.style.display = "none";
    }, 3000);
}
