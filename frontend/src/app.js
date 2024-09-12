import { backend } from 'declarations/backend';
import { AuthClient } from '@dfinity/auth-client';

const visitorSection = document.getElementById('visitorSection');
const managerSection = document.getElementById('managerSection');
const dashboard = document.getElementById('dashboard');
const visitorForm = document.getElementById('visitorForm');
const loginForm = document.getElementById('loginForm');
const confirmation = document.getElementById('confirmation');
const hostSelect = document.getElementById('host');
const visitorBtn = document.getElementById('visitorBtn');
const managerBtn = document.getElementById('managerBtn');
const refreshBtn = document.getElementById('refreshBtn');

let authClient;
let refreshInterval;

async function initAuth() {
    authClient = await AuthClient.create();
}

initAuth();

// Navigation
visitorBtn.addEventListener('click', () => {
    visitorSection.style.display = 'block';
    managerSection.style.display = 'none';
    dashboard.style.display = 'none';
    clearInterval(refreshInterval);
});

managerBtn.addEventListener('click', () => {
    visitorSection.style.display = 'none';
    managerSection.style.display = 'block';
    dashboard.style.display = 'none';
    clearInterval(refreshInterval);
});

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

// Visitor form submission
visitorForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const reason = document.getElementById('reason').value;
    const host = document.getElementById('host').value;

    try {
        await backend.addVisitor(name, reason, host);
        visitorForm.style.display = 'none';
        confirmation.style.display = 'block';
    } catch (error) {
        console.error('Error adding visitor:', error);
        alert('An error occurred. Please try again.');
    }
});

// Manager login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const isLoggedIn = await backend.login(username, password);
        if (isLoggedIn) {
            managerSection.style.display = 'none';
            dashboard.style.display = 'block';
            loadVisitorLogs();
            startAutoRefresh();
        } else {
            alert('Invalid credentials');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred. Please try again.');
    }
});

// Load visitor logs
async function loadVisitorLogs() {
    try {
        const visitors = await backend.getVisitors();
        const tableBody = document.querySelector('#visitorTable tbody');
        tableBody.innerHTML = '';
        visitors.forEach(visitor => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = visitor.name;
            row.insertCell().textContent = visitor.reason;
            row.insertCell().textContent = visitor.host;
            row.insertCell().textContent = new Date(visitor.timestamp / 1000000).toLocaleString();
        });
    } catch (error) {
        console.error('Error fetching visitor logs:', error);
        alert('An error occurred while loading visitor logs.');
    }
}

// Start auto-refresh
function startAutoRefresh() {
    refreshInterval = setInterval(loadVisitorLogs, 30000); // Refresh every 30 seconds
}

// Manual refresh
refreshBtn.addEventListener('click', loadVisitorLogs);
