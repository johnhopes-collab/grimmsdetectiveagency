document.addEventListener('DOMContentLoaded', function() {
    // Get site baseurl
    const baseurl = document.getElementById('site-baseurl').value;
    
    // List of promo images
    const promoImages = [
        {
            path: '/assets/images/sq/sq_c_face2.png',
            link: 'https://grimmsdetectiveagency.com/index.html', // Replace with actual link
            alt: 'Face Promo'
        },
        {
            path: '/assets/images/sq/sq_c_metropolis3.png',
            link: 'https://grimmsdetectiveagency.com/index.html', // Replace with actual link
            alt: 'Metropolis Promo'
        },
        {
            path: '/assets/images/sq/sq_g_grandball.png',
            link: 'https://grimmsdetectiveagency.com/index.html', // Replace with actual link
            alt: 'Grand Ball Promo'
        },
        {
            path: '/assets/images/sq/sq_g_jazznights.png',
            link: 'https://grimmsdetectiveagency.com/index.html', // Replace with actual link
            alt: 'Jazz Nights Promo'
        },
        {
            path: '/assets/images/sq/sq_g_luxe1.png',
            link: 'https://grimmsdetectiveagency.com/index.html', // Replace with actual link
            alt: 'Luxe Promo'
        },
        {
            path: '/assets/images/sq/sq_g_speed.png',
            link: 'https://grimmsdetectiveagency.com/index.html', // Replace with actual link
            alt: 'Speed Promo'
        },
        {
            path: '/assets/images/sq_news1.png',
            link: 'https://grimmsdetectiveagency.com/index.html', // Replace with actual link
            alt: 'News Promo'
        }
    ];
    
    // Function to get random unique items
    function getRandomUniqueItems(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    
    // Get two random unique promo images
    const selectedPromos = getRandomUniqueItems(promoImages, 2);
    
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
});
