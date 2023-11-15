document.addEventListener('DOMContentLoaded', function() {
    fetchEquipmentData();
    initializeFeatureModals();
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

function initializeFeatureModals() {
    const featuresInfo = {
        'always-open': {
            title: 'Always Open',
            description: 'We are open 24/7 to fit your busy schedule.'
        },
        'equipment-training': {
            title: 'Equipment Training',
            description: 'Our gym is equipped with a wide variety of machines to cover all your needs.'
        },
        'cardio-training': {
            title: 'Cardio Training',
            description: 'State-of-the-art treadmills, bikes, and ellipticals await you.'
        },
        'free-weight-area': {
            title: 'Free Weight Area',
            description: 'Our free weights range allows for a complete strength workout.'
        },
        'functional-training': {
            title: 'Functional Training',
            description: 'Functional training area for exercises that translate into real-world activities.'
        },
        'trx-training': {
            title: 'TRX Training',
            description: 'Suspension training to develop strength, balance, and flexibility.'
        },
        'stretching-point': {
            title: 'Stretching Point',
            description: 'Dedicated area for stretching and improving your flexibility.'
        },
        'box-workout': {
            title: 'Box Workout',
            description: 'Get your heart pumping with our boxing workouts.'
        },
        'personal-training': {
            title: 'Personal Training',
            description: 'One-on-one sessions with certified trainers to meet your goals.'
        },
        'inbody-analysis': {
            title: 'InBody Analysis',
            description: 'Precise body composition analysis to track your progress.'
        },
        'solarium': {
            title: 'Solarium',
            description: 'Enjoy our solarium facilities for a healthy glow.'
        },
        'refreshments': {
            title: 'Refreshments',
            description: 'Stay hydrated and energized with our selection of drinks.'
        },
        'showers': {
            title: 'Showers',
            description: 'Clean and well-maintained showers for your comfort.'
        },
        'training-plan': {
            title: 'Training Plan',
            description: 'Custom training plans tailored to your fitness level.'
        },
        'wifi': {
            title: 'WiFi',
            description: 'Free WiFi across the gym so you can stay connected.'
        },
        'parking': {
            title: 'Parking',
            description: 'Ample parking space for all our gym visitors.'
        }
    };

    document.querySelectorAll('.gym-picture').forEach(function(element) {
        element.addEventListener('click', function() {
            const featureKey = this.getAttribute('data-feature');
            const featureData = featuresInfo[featureKey];
            
            if (featureData) {
                updateModalContent(featureData.title, featureData.description);
            } else {
                console.error('Feature data not found for:', featureKey);
            }
        });
    });
}

function updateModalContent(title, description) {
    const modalTitle = document.getElementById('infoModalLabel');
    const modalBody = document.querySelector('#infoModal .modal-body');

    modalTitle.textContent = title;
    modalBody.textContent = description;

    var infoModal = new bootstrap.Modal(document.getElementById('infoModal'));
    infoModal.show();
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







