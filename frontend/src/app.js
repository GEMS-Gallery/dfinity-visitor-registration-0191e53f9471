import { backend } from 'declarations/backend';

const form = document.getElementById('visitorForm');
const confirmation = document.getElementById('confirmation');
const hostSelect = document.getElementById('host');

// Populate host dropdown
async function populateHosts() {
    try {
        const hosts = await backend.getHosts();
        hosts.forEach(host => {
            const option = document.createElement('option');
            option.value = host;
            option.textContent = host;
            hostSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching hosts:', error);
    }
}

populateHosts();

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const reason = document.getElementById('reason').value;
    const host = document.getElementById('host').value;

    try {
        await backend.addVisitor(name, reason, host);
        form.style.display = 'none';
        confirmation.style.display = 'block';
    } catch (error) {
        console.error('Error adding visitor:', error);
        alert('An error occurred. Please try again.');
    }
});
