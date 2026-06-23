async function checkStatus(url, btnId, labelId) {
    const btn = document.getElementById(btnId);
    const label = document.getElementById(labelId);

    // REPLACE THIS with your actual Worker URL from the Cloudflare Dashboard
    const workerUrl = 'https://service-checker.joao-lucas-k.workers.dev/';

    try {
        // We call the worker, and pass the service URL as a parameter
        const response = await fetch(`${workerUrl}?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.online) {
            btn.classList.add('is-online');
            label.innerText = 'Online';
        } else {
            throw new Error('Service reported offline');
        }
    } catch (error) {
        btn.classList.add('is-offline');
        label.innerText = 'Offline';
    }
}

// Check service statuses on page load
window.addEventListener('DOMContentLoaded', () => {
    checkStatus('https://jlbkunzel.com/srch/', 'btn-searx', 'label-searx');
    checkStatus('https://gpt.jlbkunzel.com/', 'btn-gpt', 'label-gpt');
});
