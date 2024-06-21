document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('prediction-form');
    const resultDiv = document.getElementById('results');
    const diagnosisP = document.getElementById('diagnosis');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObject)
            });

            const data = await response.json();
            diagnosisP.textContent = `The predicted diagnosis is: ${data.diagnosis}`;
            resultDiv.style.display = 'block';
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
