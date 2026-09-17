// Encyclopedia Viewer JavaScript

class EncyclopediaViewer {
    constructor() {
        this.encyclopediaData = null;
        this.init();
    }

    async init() {
        await this.loadEncyclopediaData();
        this.populateEntries();
    }

    async loadEncyclopediaData() {
        try {
            const response = await fetch('/assets/data/encyclopedia.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.encyclopediaData = await response.json();
        } catch (error) {
            console.error('Error loading encyclopedia data:', error);
            this.showError();
        }
    }

    populateEntries() {
        if (!this.encyclopediaData || !this.encyclopediaData.entries) return;

        const entriesList = document.getElementById('encyclopedia-entries');
        entriesList.innerHTML = '';

        this.encyclopediaData.entries.forEach(entry => {
            const entryItem = document.createElement('div');
            entryItem.className = 'entry-item';
            entryItem.textContent = entry.displayText;
            entryItem.dataset.entryId = entry.id;

            entryItem.addEventListener('click', () => {
                this.displayEntry(entry);
                this.setActiveEntry(entryItem);
            });

            entriesList.appendChild(entryItem);
        });

        // Display first entry by default
        if (this.encyclopediaData.entries.length > 0) {
            this.displayEntry(this.encyclopediaData.entries[0]);
            entriesList.firstChild.classList.add('active');
        }
    }

    setActiveEntry(selectedItem) {
        // Remove active class from all entries
        document.querySelectorAll('.entry-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to selected entry
        selectedItem.classList.add('active');
    }

    displayEntry(entry) {
        const rightPanel = document.getElementById('encyclopedia-display');

        // Create the encyclopedia content
        const encyclopediaContent = document.createElement('div');
        encyclopediaContent.className = 'encyclopedia-content';

        // Create entry name (right-aligned headline)
        const nameDiv = document.createElement('div');
        nameDiv.className = 'entry-name';
        nameDiv.textContent = entry.name;
        encyclopediaContent.appendChild(nameDiv);

        // Create subtype field
        const subtypeField = this.createField('Subtype', entry.subtype);
        encyclopediaContent.appendChild(subtypeField);

        // Create distribution field
        const distributionField = this.createField('Distribution', entry.distribution);
        encyclopediaContent.appendChild(distributionField);

        // Create description field
        const descriptionField = this.createField('Description', entry.description);
        encyclopediaContent.appendChild(descriptionField);

        // Clear right panel and add new content
        rightPanel.innerHTML = '';
        rightPanel.appendChild(encyclopediaContent);
    }

    createField(label, content) {
        const fieldDiv = document.createElement('div');
        fieldDiv.className = 'entry-field';

        const labelDiv = document.createElement('div');
        labelDiv.className = 'field-label';
        labelDiv.textContent = label;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'field-content';
        contentDiv.textContent = content;

        fieldDiv.appendChild(labelDiv);
        fieldDiv.appendChild(contentDiv);

        return fieldDiv;
    }

    showError() {
        const rightPanel = document.getElementById('encyclopedia-display');
        rightPanel.innerHTML = '<div style="padding: 20px; color: #8b0000;">Error loading encyclopedia data. Please try again later.</div>';
    }
}

// Initialize the encyclopedia when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new EncyclopediaViewer();
});
