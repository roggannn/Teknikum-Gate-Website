document.addEventListener('DOMContentLoaded', () => {
    const payButton = document.getElementById('payButton');
    const modalOverlay = document.getElementById('modalOverlay');
    const swishModal = document.getElementById('swishModal');
    const agreementModal = document.getElementById('agreementModal');
    const acceptAgreementButton = document.getElementById('acceptAgreement');
    const closeButtons = document.querySelectorAll('.close-modal');

    let agreementAccepted = false;

    // Show Agreement Modal
    function showAgreementModal() {
        modalOverlay.style.display = 'flex';
        agreementModal.style.display = 'flex';
        swishModal.style.display = 'none';
    }

    // Accept the Agreement and Proceed to Swish Modal
    function acceptAgreement() {
        agreementAccepted = true;
        agreementModal.style.display = 'none';
        swishModal.style.display = 'flex';
    }

    // Show Swish Modal (after agreement is accepted)
    function showSwishModal() {
        if (!agreementAccepted) {
            showAgreementModal();
        } else {
            modalOverlay.style.display = 'flex';
            swishModal.style.display = 'flex';
        }
    }

    // Close the Modal
    function closeModal() {
        modalOverlay.style.display = 'none';
        swishModal.style.display = 'none';
        agreementModal.style.display = 'none';
    }

    // Attach Handlers
    payButton.addEventListener('click', showSwishModal);
    acceptAgreementButton.addEventListener('click', acceptAgreement);
    closeButtons.forEach(button => button.addEventListener('click', closeModal));
});
