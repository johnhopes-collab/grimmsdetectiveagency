/**
 * Calculate how long ago a date was, using retro-style categories
 * @param {string} isoDateString - Date in ISO format (YYYY-MM-DD)
 * @returns {string} - Human-readable time ago string
 */
function getTimeAgo(isoDateString) {
  const postDate = new Date(isoDateString);
  const today = new Date();
  
  // Reset times to midnight for accurate day calculations
  postDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffTime = today - postDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Days categories
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays === 2) return "2 Days Ago";
  if (diffDays === 3) return "3 Days Ago";
  if (diffDays === 4) return "4 Days Ago";
  if (diffDays === 5) return "5 Days Ago";
  if (diffDays >= 6 && diffDays <= 13) return "Last Week";
  if (diffDays >= 14 && diffDays <= 20) return "2 Weeks Ago";
  if (diffDays >= 21 && diffDays <= 29) return "3 Weeks Ago";
  
  // Month calculations
  const diffMonths = (today.getFullYear() - postDate.getFullYear()) * 12 
                     + (today.getMonth() - postDate.getMonth());
  
  if (diffMonths === 1) return "1 Month Ago";
  if (diffMonths === 2) return "2 Months Ago";
  if (diffMonths === 3) return "3 Months Ago";
  if (diffMonths === 4) return "4 Months Ago";
  if (diffMonths === 5) return "5 Months Ago";
  if (diffMonths === 6) return "6 Months Ago";
  if (diffMonths === 7) return "7 Months Ago";
  if (diffMonths === 8) return "8 Months Ago";
  if (diffMonths === 9) return "9 Months Ago";
  if (diffMonths === 10) return "10 Months Ago";
  if (diffMonths === 11) return "11 Months Ago";
  
  // Year calculations
  const diffYears = today.getFullYear() - postDate.getFullYear();
  
  if (diffYears === 1) return "Last Year";
  if (diffYears === 2) return "2 Years Ago";
  if (diffYears === 3) return "3 Years Ago";
  if (diffYears > 3) return "3+ Years Ago";
  
  return "Recently"; // Fallback
}

/**
 * Render updates with time ago feature
 * @param {Array} updates - Array of update objects from JSON
 */
function renderUpdates(updates) {
  const feedContainer = document.getElementById('updates-feed');
  
  if (!updates || updates.length === 0) {
    feedContainer.innerHTML = '<div class="loading">No updates yet!</div>';
    return;
  }
  
  feedContainer.innerHTML = updates.map(update => {
    const timeAgo = update.isoDate ? getTimeAgo(update.isoDate) : '';
    const imageHTML = update.image 
      ? `<img src="${update.image}" alt="Update image" class="update-image">` 
      : '';
    
    return `
      <div class="update-entry">
        <div class="update-date-header">
          <span class="update-date">${update.date}</span>
          ${timeAgo ? `<span class="update-time-ago">${timeAgo}</span>` : ''}
        </div>
        <div class="update-content">
          <div class="update-text">${update.text}</div>
          ${imageHTML}
        </div>
      </div>
    `;
  }).join('');
}

// Example: Fetch and render updates
async function loadUpdates() {
  try {
    const response = await fetch('updates.json');
    const updates = await response.json();
    renderUpdates(updates);
  } catch (error) {
    console.error('Error loading updates:', error);
    document.getElementById('updates-feed').innerHTML = 
      '<div class="loading">Error loading updates :(</div>';
  }
}

// Load updates when page loads
document.addEventListener('DOMContentLoaded', loadUpdates);
