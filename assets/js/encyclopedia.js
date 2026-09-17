// Encyclopedia Viewer JavaScript

class EncyclopediaViewer {
    constructor() {
        this.encyclopediaData = null;
        this.init();
    }

    init() {
        // Load the encyclopedia data
        this.loadEncyclopediaData();
    }

    async loadEncyclopediaData() {
        try {
            const response = await fetch('/assets/data/encyclopedia.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.encyclopediaData = await response.json();
            this.populateEntries();
        } catch (error) {
            console.error('Error loading encyclopedia data:', error);
            this.showError();
        }
    }

    populateEntries() {
        if (!this.encyclopediaData) return;

        const accordion = document.getElementById('entry-accordion');
        accordion.innerHTML = '';

        this.encyclopediaData.entries.forEach(entry => {
            const entryTab = document.createElement('div');
            entryTab.className = 'entry-tab';

            // Create header for main entry
            const entryHeader = document.createElement('div');
            entryHeader.className = 'entry-header';
            if (entry.subentries && entry.subentries.length > 0) {
                entryHeader.classList.add('has-subentries');
            }
            entryHeader.textContent = entry.displayText;
            
            // Main entry is clickable
            entryHeader.addEventListener('click', (e) => {
                if (entry.subentries && entry.subentries.length > 0) {
                    // Toggle subentries
                    e.stopPropagation();
                    const subentryContent = entryTab.querySelector('.subentry-content');
                    subentryContent.classList.toggle('active');
                    entryHeader.classList.toggle('expanded');
                } else {
                    // Display the entry itself
                    this.displayEncyclopediaEntry(entry);
                }
            });

            entryTab.appendChild(entryHeader);

            // If there are subentries, create them
            if (entry.subentries && entry.subentries.length > 0) {
                const subentryContent = document.createElement('div');
                subentryContent.className = 'subentry-content';

                const subentryList = document.createElement('div');
                subentryList.className = 'subentry-list';

                // Add the parent entry as clickable
                const parentItem = document.createElement('div');
                parentItem.className = 'subentry-item';
                parentItem.textContent = `→ ${entry.displayText} (General)`;
                parentItem.addEventListener('click', () => {
                    this.displayEncyclopediaEntry(entry);
                });
                subentryList.appendChild(parentItem);

                // Add subentries
                entry.subentries.forEach(subentry => {
                    const subentryItem = document.createElement('div');
                    subentryItem.className = 'subentry-item';
                    subentryItem.textContent = subentry.displayText;
                    
                    subentryItem.addEventListener('click', () => {
                        this.displayEncyclopediaEntry(subentry);
                    });

                    subentryList.appendChild(subentryItem);
                });

                subentryContent.appendChild(subentryList);
                entryTab.appendChild(subentryContent);
            }

            accordion.appendChild(entryTab);
        });
    }

    displayEncyclopediaEntry(entry) {
        const rightPanel = document.getElementById('encyclopedia-display');

        // Reset scroll position to top
        rightPanel.scrollTop = 0;
        
        // Create the encyclopedia content
        const encyclopediaContent = document.createElement('div');
        encyclopediaContent.className = 'encyclopedia-content';

        // Create entry name (right-aligned header)
        const nameDiv = document.createElement('div');
        nameDiv.className = 'entry-name';
        nameDiv.textContent = entry.name;
        encyclopediaContent.appendChild(nameDiv);

        // Create subtype section (if exists)
        if (entry.subtype) {
            const subtypeSection = document.createElement('div');
            subtypeSection.className = 'entry-section';

            const subtypeLabel = document.createElement('div');
            subtypeLabel.className = 'entry-field-label';
            subtypeLabel.textContent = 'Subtype:';

            const subtypeContent = document.createElement('div');
            subtypeContent.className = 'entry-field-content';
            subtypeContent.textContent = entry.subtype;

            subtypeSection.appendChild(subtypeLabel);
            subtypeSection.appendChild(subtypeContent);
            encyclopediaContent.appendChild(subtypeSection);
        }

        // Create distribution section
        const distributionSection = document.createElement('div');
        distributionSection.className = 'entry-section';

        const distributionLabel = document.createElement('div');
        distributionLabel.className = 'entry-field-label';
        distributionLabel.textContent = 'Distribution:';

        const distributionContent = document.createElement('div');
        distributionContent.className = 'entry-field-content';
        distributionContent.textContent = entry.distribution;

        distributionSection.appendChild(distributionLabel);
        distributionSection.appendChild(distributionContent);
        encyclopediaContent.appendChild(distributionSection);

        // Create description section
        const descriptionSection = document.createElement('div');
        descriptionSection.className = 'entry-section';

        const descriptionLabel = document.createElement('div');
        descriptionLabel.className = 'entry-field-label';
        descriptionLabel.textContent = 'Description:';

        const descriptionContent = document.createElement('div');
        descriptionContent.className = 'entry-field-content';
        descriptionContent.textContent = entry.description;

        descriptionSection.appendChild(descriptionLabel);
        descriptionSection.appendChild(descriptionContent);
        encyclopediaContent.appendChild(descriptionSection);

        // Clear right panel and add new content
        rightPanel.innerHTML = '';
        rightPanel.appendChild(encyclopediaContent);
    }

    showError() {
        const rightPanel = document.getElementById('encyclopedia-display');
        rightPanel.innerHTML = '<div class="encyclopedia-content"><div class="entry-name">Error</div><div class="entry-field-content">Unable to load encyclopedia data.</div></div>';
    }
}

// Initialize the encyclopedia when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new EncyclopediaViewer();
});
