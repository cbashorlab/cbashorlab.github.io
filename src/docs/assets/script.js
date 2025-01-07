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
			if (rect.bottom < 75 || rect.top > window.innerHeight - 75) {
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
