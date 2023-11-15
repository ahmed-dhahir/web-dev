document.addEventListener('DOMContentLoaded', function() {
    fetchEquipmentData();
});

function fetchEquipmentData() {
    const apiUrl = 'https://api.api-ninjas.com/v1/exercises';
    const apiKey = '0+Y1g8zB4wh5mcLtpSqUQg==LkFyrFyEjDUXIZTb'; // API key

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        displayEquipment(data);
    })
    .catch(error => {
        console.error('Error fetching equipment data:', error);
        document.getElementById('equipment-list').innerHTML = '<p>Error loading equipment data.</p>';
    });
}

function displayEquipment(equipmentArray) {
    const equipmentList = document.getElementById('equipment-list');
    equipmentList.innerHTML = ''; // Clear the equipment list

    equipmentArray.forEach(exercise => {
        // Create card for each piece of equipment
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <img src="${exercise.image_url || 'path/to/default/image.jpg'}" class="card-img-top" alt="${exercise.name}">
                <div class="card-body">
                    <h5 class="card-title">${exercise.name}</h5>
                    <p class="card-text"><strong>Type:</strong> ${exercise.type}</p>
                    <p class="card-text"><strong>Muscle:</strong> ${exercise.muscle}</p>
                    <p class="card-text"><strong>Equipment:</strong> ${exercise.equipment}</p>
                    <p class="card-text"><strong>Difficulty:</strong> ${exercise.difficulty}</p>
                    <p class="card-text description">${exercise.instructions.slice(0, 100)}...</p>
                    <button class="btn btn-link p-0 text-left toggle-description" data-toggle="modal" data-target="#descriptionModal" data-description="${exercise.instructions}">Read more</button>
                </div>
            </div>
        `;

        // Append the card to the equipment list
        equipmentList.appendChild(card);
    });
}

// Use jQuery to handle the modal related events
$(document).ready(function(){
    $('#descriptionModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var description = button.data('description'); // Extract info from data-* attributes
        var modal = $(this);
        modal.find('.modal-body').text(description); // Update the modal's content.
    });
});







