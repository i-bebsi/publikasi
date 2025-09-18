// Alpine.js from CDN will be loaded in the layout
// This file can contain any custom JavaScript functionality

// API client functionality
window.apiClient = {
    async fetchConnectors(source = 'production') {
        try {
            const response = await fetch('/api/connectors/fetch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ source })
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching connectors:', error);
            throw error;
        }
    },

    async restartConnector(connectorName, source = 'production') {
        try {
            const response = await fetch(`/api/connectors/${connectorName}/restart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ source })
            });
            return await response.json();
        } catch (error) {
            console.error('Error restarting connector:', error);
            throw error;
        }
    }
};

// Auto-refresh functionality
window.autoRefresh = {
    interval: null,
    isEnabled: false,

    start(intervalMs = 30000) {
        if (this.interval) {
            this.stop();
        }

        this.interval = setInterval(() => {
            if (typeof window.refreshData === 'function') {
                window.refreshData();
            }
        }, intervalMs);

        this.isEnabled = true;
    },

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.isEnabled = false;
    },

    toggle(intervalMs = 30000) {
        if (this.isEnabled) {
            this.stop();
        } else {
            this.start(intervalMs);
        }
        return this.isEnabled;
    }
};

// Loading state management
window.loadingState = {
    show() {
        document.body.classList.add('loading');
        const loadingEl = document.getElementById('loadingIndicator');
        if (loadingEl) {
            loadingEl.classList.remove('d-none');
        }
    },

    hide() {
        document.body.classList.remove('loading');
        const loadingEl = document.getElementById('loadingIndicator');
        if (loadingEl) {
            loadingEl.classList.add('d-none');
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any custom functionality here
    console.log('Kafka Monitor UI initialized');
});