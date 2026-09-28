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

        // Create main entry item
        const mainEntryItem = document.createElement('div');
        mainEntryItem.className = 'entry-item';
        mainEntryItem.textContent = entry.displayText;
        
        mainEntryItem.addEventListener('click', () => {
            this.displayEncyclopediaEntry(entry);
        });

        entryTab.appendChild(mainEntryItem);

        // If there are subentries, display them (always visible)
        if (entry.subentries && entry.subentries.length > 0) {
            const subentryList = document.createElement('div');
            subentryList.className = 'subentry-list';

            entry.subentries.forEach(subentry => {
                const subentryItem = document.createElement('div');
                subentryItem.className = 'subentry-item';
                subentryItem.textContent = subentry.displayText;
                
                subentryItem.addEventListener('click', () => {
                    this.displayEncyclopediaEntry(subentry);
                });

                subentryList.appendChild(subentryItem);
            });

            entryTab.appendChild(subentryList);
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
    
        // Create subspecies (if exists) - italicized, right-aligned, no label
        if (entry.subspecies) {
            const subspeciesDiv = document.createElement('div');
            subspeciesDiv.className = 'entry-subspecies';
            subspeciesDiv.textContent = entry.subspecies;
            encyclopediaContent.appendChild(subspeciesDiv);
        } else {
            // Add divider if no subspecies
            const divider = document.createElement('div');
            divider.style.borderBottom = '2px solid #333';
            divider.style.marginBottom = '8px';
            encyclopediaContent.appendChild(divider);
        }
    
        // Create subtype and size on same line
        const subtypeSizeLine = document.createElement('div');
        subtypeSizeLine.className = 'entry-field-inline';
        
        if (entry.subtype) {
            const subtypeLabel = document.createElement('span');
            subtypeLabel.className = 'entry-field-label';
            subtypeLabel.textContent = 'Subtype: ';
            
            const subtypeContent = document.createElement('span');
            subtypeContent.className = 'entry-field-content';
            subtypeContent.textContent = entry.subtype;
            
            subtypeSizeLine.appendChild(subtypeLabel);
            subtypeSizeLine.appendChild(subtypeContent);
        }
        
        if (entry.size) {
            if (entry.subtype) {
                // Add spacing between subtype and size
                const spacer = document.createTextNode('   ');
                subtypeSizeLine.appendChild(spacer);
            }
            
            const sizeLabel = document.createElement('span');
            sizeLabel.className = 'entry-field-label';
            sizeLabel.textContent = 'Size: ';
            
            const sizeContent = document.createElement('span');
            sizeContent.className = 'entry-field-content';
            sizeContent.textContent = entry.size;
            
            subtypeSizeLine.appendChild(sizeLabel);
            subtypeSizeLine.appendChild(sizeContent);
        }
        
        encyclopediaContent.appendChild(subtypeSizeLine);
    
        // Create distribution section (inline)
        const distributionDiv = document.createElement('div');
        distributionDiv.className = 'entry-field-inline';
        
        const distributionLabel = document.createElement('span');
        distributionLabel.className = 'entry-field-label';
        distributionLabel.textContent = 'Distribution: ';
        
        const distributionContent = document.createElement('span');
        distributionContent.className = 'entry-field-content';
        distributionContent.textContent = entry.distribution;
        
        distributionDiv.appendChild(distributionLabel);
        distributionDiv.appendChild(distributionContent);
        encyclopediaContent.appendChild(distributionDiv);
    
        // Create description section (inline)
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'entry-field-inline';
        
        const descriptionLabel = document.createElement('span');
        descriptionLabel.className = 'entry-field-label';
        descriptionLabel.textContent = 'Description: ';
        
        const descriptionContent = document.createElement('span');
        descriptionContent.className = 'entry-field-content';
        descriptionContent.textContent = entry.description;
        
        descriptionDiv.appendChild(descriptionLabel);
        descriptionDiv.appendChild(descriptionContent);
        encyclopediaContent.appendChild(descriptionDiv);
    
        // Create weaknesses section (if exists, inline)
        if (entry.weaknesses) {
            const weaknessesDiv = document.createElement('div');
            weaknessesDiv.className = 'entry-field-inline';
            
            const weaknessesLabel = document.createElement('span');
            weaknessesLabel.className = 'entry-field-label';
            weaknessesLabel.textContent = 'Weaknesses: ';
            
            const weaknessesContent = document.createElement('span');
            weaknessesContent.className = 'entry-field-content';
            weaknessesContent.textContent = entry.weaknesses;
            
            weaknessesDiv.appendChild(weaknessesLabel);
            weaknessesDiv.appendChild(weaknessesContent);
            encyclopediaContent.appendChild(weaknessesDiv);
        }
    
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
    
    // Set up collapsible toggle
    const toggle = document.getElementById('enc-toggle');
    const content = document.getElementById('enc-content');
    
    if (toggle && content) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            content.classList.toggle('active');
        });
    }
});
