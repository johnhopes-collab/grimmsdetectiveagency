document.addEventListener('DOMContentLoaded', function() {
    // Get site baseurl
    const baseurl = document.getElementById('site-baseurl').value;
    
    // List of promo images
    const promoImages = [
        {
            id: 'face',
            path: '/assets/images/sq/sq_c_face2.png',
            link: 'https://grimmsdetectiveagency.com/index.html', // Replace with actual link
            alt: 'Face Promo'
        },
        {
            id: 'metropolis',
            path: '/assets/images/sq/sq_c_metropolis3.png',
            link: 'https://grimmsdetectiveagency.com/index.html', // Replace with actual link
            alt: 'Metropolis Promo'
        },
        {
            id: 'grandball',
            path: '/assets/images/sq/sq_g_grandball2.png',
            link: 'https://grimmsdetectiveagency.com/index.html', // Replace with actual link
            alt: 'Grand Ball Promo'
        },
        {
            id: 'jazznights',
            path: '/assets/images/sq/sq_g_jazznights2.png',
            link: 'https://grimmsdetectiveagency.com/index.html', // Replace with actual link
            alt: 'Jazz Nights Promo'
        },
        {
            id: 'luxe',
            path: '/assets/images/sq/sq_g_luxe2.png',
            link: 'https://grimmsdetectiveagency.com/index.html', // Replace with actual link
            alt: 'Luxe Promo'
        },
        {
            id: 'speed',
            path: '/assets/images/sq/sq_g_speed2.png',
            link: 'https://grimmsdetectiveagency.com/index.html', // Replace with actual link
            alt: 'Speed Promo'
        },
        {
            id: 'news',
            path: '/assets/images/sq/sq_news1.png',
            link: 'https://grimmsdetectiveagency.com/index.html', // Replace with actual link
            alt: 'News Promo'
        }
    ];
    
    // Get previously displayed promos from localStorage
    const previousPromos = JSON.parse(localStorage.getItem('displayedPromos')) || [];
    
    // Function to get random unique items, excluding previous ones
    function getRandomUniqueItems(array, count, excludeIds) {
        // Create a filtered array that excludes previously shown promos
        const availablePromos = array.filter(promo => !excludeIds.includes(promo.id));
        
        // If we don't have enough available promos (unlikely but possible),
        // fall back to using all promos
        const poolToUse = availablePromos.length >= count ? availablePromos : array;
        
        // Shuffle and select
        const shuffled = [...poolToUse].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    
    // Get two random promos, excluding the previous ones
    const selectedPromos = getRandomUniqueItems(promoImages, 2, previousPromos);
    
    // Save current selection for next time
    localStorage.setItem('displayedPromos', JSON.stringify(selectedPromos.map(promo => promo.id)));
    
    // Set first promo
    const promoImg1 = document.getElementById('random-promo-img-1');
    const promoLink1 = document.getElementById('random-promo-link-1');
    if (promoImg1 && promoLink1) {
        promoImg1.src = baseurl + selectedPromos[0].path;
        promoImg1.alt = selectedPromos[0].alt;
        promoLink1.href = selectedPromos[0].link;
    }
    
    // Set second promo
    const promoImg2 = document.getElementById('random-promo-img-2');
    const promoLink2 = document.getElementById('random-promo-link-2');
    if (promoImg2 && promoLink2) {
        promoImg2.src = baseurl + selectedPromos[1].path;
        promoImg2.alt = selectedPromos[1].alt;
        promoLink2.href = selectedPromos[1].link;
    }
    
    // Log for debugging (you can remove this in production)
    console.log('Previous promos:', previousPromos);
    console.log('New promos:', selectedPromos.map(p => p.id));
});
