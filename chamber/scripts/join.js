document.addEventListener('DOMContentLoaded', function () {
    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        timestampInput.value = new Date().toLocaleString();
    }
});

document.querySelectorAll('.info-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const dialogId = this.getAttribute('data-modal');
        const dialog = document.getElementById(dialogId);
        if (dialog) {
            dialog.showModal();
            dialog.setAttribute('aria-hidden', 'false');
        }
    });
});

document.querySelectorAll('dialog .close-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const dialog = this.closest('dialog');
        dialog.close();
        dialog.setAttribute('aria-hidden', 'true');
    });

    btn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const dialog = this.closest('dialog');
            dialog.close();
            dialog.setAttribute('aria-hidden', 'true');
        }
    });
});

