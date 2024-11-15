const toggleButton = document.getElementById('StandardKnapp');
const toggleElement = document.getElementById('standardPlatser');

document.addEventListener("DOMContentLoaded", function(){
    toggleButton.addEventListener('click', function() {
        if (toggleElement.style.visibility === 'hidden')
        {
            toggleElement.style.visibility = 'visible';
        }
        else
        {
            toggleElement.style.visibility = 'hidden';
        }
    });
});