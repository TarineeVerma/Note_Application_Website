function openModal(noteTitle) {
    const modalContent = `${noteTitle}`;
    document.getElementById('noteTitle').innerHTML = modalContent;
    document.getElementById('deleteModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('deleteModal').style.display = 'none';
}

function deleteNote() {
    // Add your delete note logic here
    console.log('Note deleted.');
    closeModal();
}

// Example usage to open the modal
document.addEventListener('DOMContentLoaded', () => {
    const deleteButton = document.getElementById('deleteButton');
    if (deleteButton) {
        deleteButton.addEventListener('click', () => {
            const noteTitle = document.getElementById('noteTitle').innerText;
            openModal(noteTitle);
        });
    }
});

