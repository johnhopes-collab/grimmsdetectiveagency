// Shield Spin Animation Trigger
(function() {
    const shield = document.getElementById('shield-logo');
    const hitbox = document.getElementById('shield-hitbox');
    
    if (!shield || !hitbox) return; // Safety check

    // Preload the animated WebP
    const spinWebP = shield.getAttribute('data-spin');
    const preloadImg = new Image();
    preloadImg.src = spinWebP;

    // Configuration
    const NUM_ZONES = 5; // Number of vertical hitbox zones
    const TIME_WINDOW = 1200; // Milliseconds to complete swipe
    const MIN_ZONES = 2; // Minimum zones to cross for trigger
    const COOLDOWN_TIME = 1100; // Minimum time between animations (slightly longer than WebP)
    
    // State tracking
    let zonesHit = [];
    let isSpinning = false;
    let lastSpinTime = 0;
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
    function triggerSpin() {
        const currentTime = Date.now();
        
        // Enforce cooldown to prevent interrupting animations
        if (isSpinning || (currentTime - lastSpinTime < COOLDOWN_TIME)) {
            console.log('🛡️ SPIN BLOCKED (cooldown)');
            return;
        }
        
        isSpinning = true;
        lastSpinTime = currentTime;
        
        console.log('🛡️ SPIN TRIGGERED');
        
        // Swap to animated WebP
        const spinWebP = shield.getAttribute('data-spin');
        const staticPng = shield.getAttribute('data-static');
        
        // Force reload to ensure animation plays from start
        shield.src = spinWebP + '?t=' + currentTime;
        
        // Listen for when the image finishes loading and playing
        const handleAnimationEnd = () => {
            // Wait for the WebP to complete its single loop
            setTimeout(() => {
                console.log('🛡️ REVERTING TO STATIC');
                shield.src = staticPng;
                isSpinning = false;
            }, 1000); // Slightly longer than your 980ms to ensure completion
        };
        
        // If image is already cached, it won't fire 'load', so we need both handlers
        if (shield.complete) {
            handleAnimationEnd();
        } else {
            shield.addEventListener('load', handleAnimationEnd, { once: true });
        }
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
