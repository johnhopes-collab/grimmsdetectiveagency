// Shield Spin Animation Trigger
(function() {
    const shield = document.getElementById('shield-logo');
    const hitbox = document.getElementById('shield-hitbox');
    
    if (!shield || !hitbox) return; // Safety check
    
    // Configuration
    const NUM_ZONES = 5; // Number of vertical hitbox zones
    const TIME_WINDOW = 1200; // Milliseconds to complete swipe
    const MIN_ZONES = 2; // Minimum zones to cross for trigger
    const SPIN_DURATION = 980; // WebP duration in milliseconds
    
    // State tracking
    let zonesHit = [];
    let isSpinning = false;
    let firstHitTime = 0;
    
    // Calculate which zone the mouse is in (0 to NUM_ZONES-1)
    function getZone(event) {
        const rect = hitbox.getBoundingClientRect();
        const relativeX = event.clientX - rect.left;
        const zoneWidth = rect.width / NUM_ZONES;
        return Math.floor(relativeX / zoneWidth);
    }
    
    // Check if user swiped across enough zones
    function checkSwipe() {
        if (zonesHit.length < MIN_ZONES) return false;
        
        // Check for consecutive zone progression (left-to-right or right-to-left)
        const uniqueZones = [...new Set(zonesHit)];
        const sorted = uniqueZones.sort((a, b) => a - b);
        
        // Check if zones are consecutive
        let consecutive = true;
        for (let i = 1; i < sorted.length; i++) {
            if (sorted[i] - sorted[i-1] > 1) {
                consecutive = false;
                break;
            }
        }
        
        return consecutive && uniqueZones.length >= MIN_ZONES;
    }
    
    // Trigger the spin animation
    // Trigger the spin animation
    function triggerSpin() {
        if (isSpinning) return;
        
        isSpinning = true;
        
        console.log('🛡️ SPIN TRIGGERED'); // DEBUG
        console.log('🛡️ Time:', Date.now()); // DEBUG
        
        // Swap to animated WebP
        const spinWebP = shield.getAttribute('data-spin');
        console.log('🛡️ WebP URL:', spinWebP); // DEBUG
        shield.src = spinWebP + '?t=' + Date.now();
        
        console.log('🛡️ Image swapped, waiting', SPIN_DURATION, 'ms'); // DEBUG
        
        // Revert to static PNG after animation
        setTimeout(() => {
            console.log('🛡️ REVERTING TO STATIC'); // DEBUG
            const staticPng = shield.getAttribute('data-static');
            shield.src = staticPng;
            isSpinning = false;
        }, SPIN_DURATION); 
    }
    
    // Reset tracking
    function resetTracking() {
        zonesHit = [];
        firstHitTime = 0;
    }
    
    // Mouse move handler
    hitbox.addEventListener('mousemove', function(event) {
        if (isSpinning) return;
        
        const currentTime = Date.now();
        const zone = getZone(event);
        
        // Start new tracking sequence
        if (zonesHit.length === 0) {
            firstHitTime = currentTime;
            zonesHit.push(zone);
            return;
        }
        
        // Check if still within time window
        if (currentTime - firstHitTime > TIME_WINDOW) {
            resetTracking();
            firstHitTime = currentTime;
            zonesHit.push(zone);
            return;
        }
        
        // Add zone if it's different from the last one
        if (zone !== zonesHit[zonesHit.length - 1]) {
            zonesHit.push(zone);
            
            // Check if swipe is complete
            if (checkSwipe()) {
                triggerSpin();
                resetTracking();
            }
        }
    });
    
    // Reset when mouse leaves
    hitbox.addEventListener('mouseleave', function() {
        if (!isSpinning) {
            resetTracking();
        }
    });
    
})();
