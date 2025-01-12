document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('turneringmodal');
    const openModalBtn = document.getElementById('CS2-FiveTid');
    const closeModalBtn = document.querySelector('.close-btn');

    function showcs2modal(){
      modal.style.display = 'flex';
      console.log("Tryckt.");
    }
    
    function closecs2modal(){
      modal.style.display = 'none';
      console.log("Stängt.");
    }
    
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        closecs2modal();
        console.log("Stängt genom att klicka utanför");
      }
    });


  // Show modal when div is clicked
  openModalBtn.addEventListener('click', showcs2modal);
  console.log("Lagt till handler på openModalBtn");

  // Close modal when close button is clicked
  closeModalBtn.addEventListener('click', closecs2modal);
  console.log("Lagt till handler på closeModalBtn");

  });
  