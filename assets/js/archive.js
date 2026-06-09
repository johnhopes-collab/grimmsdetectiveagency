// Newspaper Archive JavaScript

class NewspaperArchive {
    constructor() {
        this.currentYear = null;
        this.archiveData = null;
        this.init();
    }

    init() {
        // Get year from URL parameter
        this.currentYear = this.getYearFromURL();
        
        // Display the year
        document.getElementById('year-text').textContent = this.currentYear;

        // Update the title bar
        this.updateTitleBar();
        
        // Load the data for this year
        this.loadArchiveData();
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    updateTitleBar() {
        const titleElement = document.querySelector('.page-title');
        if (titleElement) {
            titleElement.innerHTML = `<a href="/archives.html">Archives</a> / Newspaper Archives / ${this.currentYear}`;
        }
        
        // Also update the browser tab title (stripped of HTML)
        document.title = `Archives / Newspaper Archives / ${this.currentYear} - ${document.title.split(' - ').pop()}`;
    }
    
    getYearFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('year') || '1922'; // Default to 1922 if no year specified
    }

    async loadArchiveData() {
        try {
            const response = await fetch(`/assets/data/${this.currentYear}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.archiveData = await response.json();
            this.populateHeadlines();
        } catch (error) {
            console.error('Error loading archive data:', error);
            // You might want to show an error message to the user
        }
    }

    populateHeadlines() {
        if (!this.archiveData) return;

        Object.keys(this.archiveData.months).forEach(month => {
            const headlinesList = document.getElementById(`${month}-headlines`);
            const issues = this.archiveData.months[month];

            headlinesList.innerHTML = '';

            issues.forEach(issue => {
                const headlineItem = document.createElement('div');
                headlineItem.className = 'headline-item';
                headlineItem.textContent = issue.displayText;
                headlineItem.dataset.issueId = issue.id;
                
                headlineItem.addEventListener('click', () => {
                    this.displayNewspaperIssue(issue);
                });

                headlinesList.appendChild(headlineItem);
            });
        });
    }

    setupEventListeners() {
        // Set up accordion functionality
        document.querySelectorAll('.tab-header').forEach(header => {
            header.addEventListener('click', (e) => {
                const monthTab = e.target.closest('.month-tab');
                const tabContent = monthTab.querySelector('.tab-content');

                // Toggle the active class
                tabContent.classList.toggle('active');

            });
        });
    }


    displayNewspaperIssue(issue) {
        const rightPanel = document.getElementById('newspaper-display');
        
        // Create the newspaper content
        const newspaperContent = document.createElement('div');
        newspaperContent.className = 'newspaper-content';

        // Create newspaper header
        const headerDiv = document.createElement('div');
        headerDiv.className = 'newspaper-header';
        const headerImg = document.createElement('img');
        headerImg.src = `/archives/images/headers/${issue.newspaper}.png`;
        headerImg.alt = issue.newspaper;
        headerDiv.appendChild(headerImg);

        // Create date display
        const dateDiv = document.createElement('div');
        dateDiv.className = 'newspaper-date';
        dateDiv.textContent = this.formatDate(issue.date);

        // Add header and date to content
        newspaperContent.appendChild(headerDiv);
        newspaperContent.appendChild(dateDiv);

        // Add each story
        issue.stories.forEach(story => {
            const storyDiv = document.createElement('div');
            storyDiv.className = 'newspaper-story';

            const headlineDiv = document.createElement('div');
            headlineDiv.className = 'story-headline';
            headlineDiv.textContent = story.headline;

            const contentDiv = document.createElement('div');
            contentDiv.className = 'story-content';
            contentDiv.textContent = story.content;

            storyDiv.appendChild(headlineDiv);
            storyDiv.appendChild(contentDiv);
            newspaperContent.appendChild(storyDiv);
        });

        // Clear right panel and add new content
        rightPanel.innerHTML = '';
        rightPanel.appendChild(newspaperContent);
    }

    formatDate(dateString) {
        // Convert "1/15/22" to "January 15, 1922"
        const [month, day, year] = dateString.split('/');
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const fullYear = year.length === 2 ? `19${year}` : year;
        return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${fullYear}`;
    }
}

// Initialize the archive when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new NewspaperArchive();
});
