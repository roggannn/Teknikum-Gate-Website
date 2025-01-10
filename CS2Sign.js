document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('turneringmodal');
    const openModalBtn = document.getElementsByClassName('turneringarMain');
    const closeModalBtn = document.querySelector('.close-btn');
  
    // Show modal when div is clicked
    openModalBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  
    // Close modal when close button is clicked
    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
  