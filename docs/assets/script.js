let all_paragraphs =
	'h1, h2, h3, h4, h5, h6, p, .md-typeset';

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
			if (
				!paragraph.classList.contains('md-footer-meta') &&
				(rect.bottom < 100 || rect.top > window.innerHeight - 100)
			) {
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
