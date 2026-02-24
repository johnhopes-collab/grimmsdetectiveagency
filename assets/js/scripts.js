document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileDropdown = document.querySelector('.mobile-dropdown');
    
    if (menuToggle && mobileDropdown) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            mobileDropdown.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (mobileDropdown.classList.contains('active') &&
                !mobileDropdown.contains(event.target) && 
                !menuToggle.contains(event.target)) {
                mobileDropdown.classList.remove('active');
            }
        });
    }
});
