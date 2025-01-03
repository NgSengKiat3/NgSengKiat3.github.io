let modalfeedback = undefined;

// Load feedback data into the table
function loadFeedback() {
    const Feedback = getLocalStorage(localStorageKeys.feedback);
    /**
     *  @type {HTMLTableSectionElement}
     */
    const tableBody = document.querySelector('#feedback-table tbody');
    tableBody.innerHTML = '';

    Feedback.forEach((feedback) => {
        const newRow = tableBody.insertRow();

        //Feedback One(dropdown)
        const feedbackONECell = newRow.insertCell();
        const feedbackONEDropdown = document.createElement('select');
        feedbackONEDropdown.className = 'form-select';
        ['1', '2', '3', '4', '5'].forEach((q1) => {
            const option = document.createElement('option');
            option.value = q1;
            option.textContent = q1;
            if (q1 === feedback.q1) option.selected = true;
            feedbackONEDropdown.appendChild(option);
        });

        feedbackONEDropdown.addEventListener('change', (event) => {
            feedback.q1 = event.target.value;
            modalfeedback = feedback;
            onSaveFeedback();
        });
        feedbackONECell.appendChild(feedbackONEDropdown);

        //Feedback Two(dropdown)
        const feedbackTWOCell = newRow.insertCell();
        const feedbackTWODropdown = document.createElement('select');
        feedbackTWODropdown.className = 'form-select';
        ['1', '2', '3', '4', '5'].forEach((q2) => {
            const option = document.createElement('option');
            option.value = q2;
            option.textContent = q2;
            if (q2 === feedback.q2) option.selected = true;
            feedbackTWODropdown.appendChild(option);
        });

        feedbackTWODropdown.addEventListener('change', (event) => {
            feedback.q2 = event.target.value;
            modalfeedback = feedback;
            onSaveFeedback();
        });
        feedbackTWOCell.appendChild(feedbackTWODropdown);

        //Feedback Three(dropdown)
        const feedbackTHREECell = newRow.insertCell();
        const feedbackTHREEDropdown = document.createElement('select');
        feedbackTHREEDropdown.className = 'form-select';
        ['Yes', 'No'].forEach((q3) => {
            const option = document.createElement('option');
            option.value = q3;
            option.textContent = q3;
            if (q3 === feedback.q3) option.selected = true;
            feedbackTHREEDropdown.appendChild(option);
        });

        feedbackTHREEDropdown.addEventListener('change', (event) => {
            feedback.q3 = event.target.value;
            modalfeedback = feedback;
            onSaveFeedback();
        });
        feedbackTHREECell.appendChild(feedbackTHREEDropdown);

        // Feedback Four
        const feedbackFOURCell = newRow.insertCell();
        const feedbackFOURInput = document.createElement('input');
        feedbackFOURInput.type = 'text';
        feedbackFOURInput.value = feedback.q4 || '';
        feedbackFOURInput.addEventListener('change', (event) => {
            feedback.q4 = event.target.value;
            modalfeedback = feedback;
            onSaveFeedback();
        });
        feedbackFOURCell.appendChild(feedbackFOURInput);

        //Delete button
        const deleteFeedbackCell = newRow.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.addEventListener('click', () => {
            deleteFeedback(feedback.id, Feedback);
        });
        deleteFeedbackCell.appendChild(deleteButton);
    });
}

//Add a new feedback(reset modal fields)
function onAddFeedback() {
    modalfeedback = undefined;
    document.querySelector('#feedbackONE').value = '';
    document.querySelector('#feedbackTWO').value = '';
    document.querySelector('#feedbackTHREE').value = '';
    document.querySelector('#feedbackFOUR').value = '';


    // The feedback ID will be automatically assigned once the feedback is saved
    const Feedback = getLocalStorage(localStorageKeys.feedback);
    let id = 1;
    if (Feedback.length > 0) {
        id = Math.max(...Feedback.map(feedback => feedback.id)) + 1; // Auto-increment ID
    }
}

function onSaveFeedback() {
    const Feedback = getLocalStorage(localStorageKeys.feedback);

    if (!modalfeedback) {
        // Add new feedback
        const feedbackQ1 = document.querySelector('#feedbackONE').value;
        const feedbackQ2 = document.querySelector('#feedbackTWO').value;
        const feedbackQ3 = document.querySelector('#feedbackTHREE').value;
        const feedbackQ4 = document.querySelector('#feedbackFOUR').value

        let id = 1;
        Feedback.forEach(feedback => {
            if (feedback.id >= id) {
                id = feedback.id + 1;
            }
        });
        Feedback.push({
            id: id,
            q1: feedbackQ1,
            q2: feedbackQ2,
            q3: feedbackQ3,
            q4: feedbackQ4
        });
    } else {
        // Editing an existing feedback
        const feedbackUpdate = Feedback.find(feedback => feedback.id === modalfeedback.id);
        if (feedbackUpdate) {
            feedbackUpdate.q1 = modalfeedback.q1; // Update the room q1
            feedbackUpdate.q2 = modalfeedback.q2; // Update the room type
            feedbackUpdate.q3 = modalfeedback.q3; // Update the room location
            feedbackUpdate.q4 = modalfeedback.q4; // Update the feedback restock
        }
    }

    setLocalStorage(localStorageKeys.feedback, Feedback); // Save updated feedback to localStorage
    loadFeedback(); // Reload table
}

// Delete feedback
function deleteFeedback(feedbackID, Feedback) {
    const updatedFeedback = Feedback.filter((feedback) => feedback.id !== feedbackID);
    setLocalStorage(localStorageKeys.feedback, updatedFeedback); // Save updated feedback
    loadFeedback(); // Reload table
}

document.addEventListener('DOMContentLoaded', () => {
    loadFeedback()
});