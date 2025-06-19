document.addEventListener('DOMContentLoaded', function() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        var map = L.map('map').setView([-33.9249, 18.4241], 13); // Approximate Cape Town coordinates
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        L.marker([-33.9249, 18.4241]).addTo(map)
            .bindPopup('Phomolong Secondary School')
            .openPopup();
    }
});

const newsArticles = [
    { title: 'Welcome Message', content: 'Introducing Intellectual Enrichment Centre’s mission.' },
    { title: 'Success Story', content: 'John improved his matric results with our help!' },
    { title: 'Exam Prep Classes', content: 'New sessions starting in July.' }
];

function displayNews(articles) {
    const newsList = document.getElementById('newsList');
    newsList.innerHTML = '';
    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `<h2>${article.title}</h2><p>${article.content}</p>`;
        newsList.appendChild(newsItem);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('newsList')) {
        displayNews(newsArticles);
        document.getElementById('searchNews').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filteredNews = newsArticles.filter(article =>
                article.title.toLowerCase().includes(searchTerm)
            );
            displayNews(filteredNews);
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Enquiry Form Validation
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const service = document.getElementById('service').value;
            const subjects = document.getElementById('subjects').value.trim();
            let errors = [];

            if (name.length < 4) errors.push('Name must be at least 4 characters.');
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Invalid email format.');
            if (!service) errors.push('Please select an enquiry type.');
            if (subjects.length < 5) errors.push('Please list at least one subject.');

            const responseDiv = document.getElementById('enquiryResponse');
            if (errors.length > 0) {
                responseDiv.innerHTML = `<p style="color: var(--accent);">${errors.join('<br>')}</p>`;
                return;
            }

            // AJAX Submission
            fetch('https://formsubmit.co/mphow-enquiry@site.com', {
                method: 'POST',
                headers: new Headers(),
                body: new FormData(enquiryForm)
            }).then(response => {
                responseDiv.innerHTML = `<p>Thank you, ${name}! Your enquiry about ${service} has been received.</p>`;
                enquiryForm.reset();
            }).catch(error => {
                responseDiv.innerHTML = '<p style="color: var(--accent);">Error submitting form.</p>';
            });
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value.trim();
            const surname = document.getElementById('surname').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const messageType = document.getElementById('messageType').value;
            const message = document.getElementById('message').value.trim();
            let errors = [];

            if (name.length < 4) errors.push('Name must be at least 4 characters.');
            if (surname.length < 4) errors.push('Surname must be at least 4 characters.');
            if (!/^[0-9]{10}$/.test(phone)) errors.push('Phone must be 10 digits.');
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Invalid email format.');
            if (!messageType) errors.push('Please select a message type.');
            if (message.length < 10) errors.push('Message must be at least 10 characters.');

            const responseDiv = document.getElementById('contactResponse');
            if (errors.length > 0) {
                e.preventDefault();
                responseDiv.innerHTML = `<p style="color: var(--accent);">${errors.join('<br>')}</p>`;
            }
        });
    }
});