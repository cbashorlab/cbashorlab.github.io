let all_paragraphs =
	'h1, h2, h3, h4, h5, h6, p, .md-typeset blockquote, .md-typeset dl, .md-typeset figure, .md-typeset ol, .md-typeset pre, .md-typeset ul, scroll-down-indicator';

// Function to fade in paragraphs
function fadeInParagraphs() {
	const paragraphs = document.querySelectorAll(all_paragraphs);
	paragraphs.forEach((paragraph) => {
		paragraph.classList.add('fade-in');
	});
}

// Add event listeners for fade-out effect on scroll
function addFadeOutOnScroll() {
	const paragraphs = document.querySelectorAll(all_paragraphs);
	window.addEventListener('scroll', () => {
		paragraphs.forEach((paragraph) => {
			const rect = paragraph.getBoundingClientRect();
			if (rect.bottom < 100 || rect.top > window.innerHeight - 100) {
				paragraph.classList.add('fade-out');
			} else {
				paragraph.classList.remove('fade-out');
			}
		});
	});
}

// Initialize animations when the page loads
document.addEventListener('DOMContentLoaded', () => {
	fadeInParagraphs();
	addFadeOutOnScroll();
});

// Function to display GIF when the website is within the top 200vh
function displayGifOnTop200vh() {
	const gifElement = document.getElementsByClassName('flicker-gif');
	if (gifElement.length === 0) return;
	window.addEventListener('scroll', () => {
		const scrollPosition = window.scrollY;
		if (scrollPosition < window.innerHeight * 1.2) {
			gifElement[0].style.display = 'block';
		} else {
			gifElement[0].style.display = 'none';
		}
	});
}

// Initialize GIF display when the page loads
document.addEventListener('DOMContentLoaded', () => {
	displayGifOnTop200vh();
});
