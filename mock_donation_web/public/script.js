document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('donation-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/submit-donation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Donation submitted successfully!');
                form.reset();
            } else {
                alert('Failed to submit donation.');
                console.log(await response.json());
            }
        } catch (error) {
            console.error('Error submitting donation:', error);
            alert('An error occurred while submitting the donation.');
        }
    });
});