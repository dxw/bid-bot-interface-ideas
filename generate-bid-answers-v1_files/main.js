(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
document.addEventListener('DOMContentLoaded', function () {
	const dropdownContent = document.querySelector('.dropdown-content')

	if (!dropdownContent) {
		return
	}

	setupDropdown(dropdownContent)
	const h2s = document.querySelectorAll('main h2')
	if (h2s.length) {
		h2s.forEach(createLink)
		observeHeadings(h2s)
	}
})

function setupDropdown (dropdownContent) {
	const currentOption = document.querySelector('.current-option')

	currentOption.addEventListener('click', toggleDropdown)
	document.addEventListener('click', function (event) {
		const isClickInsideDropdown = dropdownContent.contains(event.target) || currentOption.contains(event.target)
		if (!isClickInsideDropdown) {
			collapseDropdown()
		}
	})
}

function toggleDropdown (event) {
	event.stopPropagation()

	const currentOption = event.target
	const dropdownContent = document.querySelector('.dropdown-content')

	dropdownContent.classList.toggle('hide')
	currentOption.setAttribute('aria-expanded', dropdownContent.classList.contains('hide') ? 'false' : 'true')
}

function selectOption (event) {
	event.preventDefault()

	const currentOption = document.querySelector('.current-option')
	const selectedOption = event.target

	currentOption.childNodes[0].nodeValue = selectedOption.textContent

	collapseDropdown()

	smoothScrollToElement(document.querySelector(selectedOption.getAttribute('href')), 30)
}

function collapseDropdown () {
	const dropdownContent = document.querySelector('.dropdown-content')
	const currentOption = document.querySelector('.current-option')

	dropdownContent.classList.add('hide')
	currentOption.setAttribute('aria-expanded', 'false')
}

function createLink (h2, index) {
	if (!h2.id) {
		h2.id = 'heading-' + index
	}

	const link = document.createElement('a')
	link.href = '#' + h2.id
	link.textContent = h2.textContent
	link.addEventListener('click', selectOption)

	document.querySelector('.dropdown-content').appendChild(link)
}

function smoothScrollToElement (element, offsetInPixels) {
	const rect = element.getBoundingClientRect()
	const scrollTop = window.scrollY
	const scrollTargetPosition = rect.top + scrollTop - offsetInPixels

	window.scrollTo({
		top: scrollTargetPosition,
		behavior: 'smooth'
	})
}

function observeHeadings (headings) {
	/* global IntersectionObserver */
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const currentOption = document.querySelector('.current-option')
				currentOption.childNodes[0].nodeValue = entry.target.textContent
			}
		})
	}, {
		rootMargin: '0px 0px -70% 0px'
	})

	headings.forEach((heading) => {
		observer.observe(heading)
	})
}

},{}],2:[function(require,module,exports){
(function () {
	/**
	* Impact Timeline Toggle Behaviors
	*
	*/
	const timelineToggle = () => {
		const timelineButton = document.querySelector('.impact-timeline__toggle a')
		if (timelineButton) {
			const timelineContainer = document.querySelector('.impact-timeline__container')
			const timelineButtonBoundingRect = timelineButton.getBoundingClientRect()
			const timelinePositionFromTop = window.scrollY + timelineButtonBoundingRect.top
			if (timelineButton && timelineContainer) {
				const hiddenItems = timelineContainer.querySelectorAll('.impact-timeline__row:nth-of-type(n+6)')
				timelineContainer.setAttribute('id', 'impact-timeline-container')
				timelineButton.setAttribute('aria-controls', 'impact-timeline-container')
				timelineButton.setAttribute('aria-expanded', 'false')
				hiddenItems.forEach(item => {
					item.setAttribute('aria-hidden', 'true')
				})
				timelineButton.addEventListener('click', () => {
					timelineButton.classList.toggle('active')
					timelineContainer.classList.toggle('active')
					timelineButton.innerHTML === 'Less' && window.scrollTo(0, timelinePositionFromTop - 100)
					timelineButton.getAttribute('aria-expanded') === 'false' ? timelineButton.setAttribute('aria-expanded', 'true') : timelineButton.setAttribute('aria-expanded', 'false')
					timelineButton.innerHTML === 'More' ? timelineButton.innerHTML = 'Less' : timelineButton.innerHTML = 'More'
					hiddenItems.forEach(item => {
						item.getAttribute('aria-hidden') === 'true' ? item.setAttribute('aria-hidden', 'false') : item.setAttribute('aria-hidden', 'true')
					})
				})
			}
		}
	}
	window.addEventListener('DOMContentLoaded', timelineToggle)
})()

},{}],3:[function(require,module,exports){
const showBtn = document.getElementById('showBtn')
const hideBtn = document.getElementById('hideBtn')
const moreList = document.getElementById('more')
if (showBtn && hideBtn && moreList) {
	showBtn.addEventListener('click', showMore)
	hideBtn.addEventListener('click', showMore)
}

function showMore () {
	if (moreList.style.display === 'none') {
		moreList.style.display = 'block'
		hideBtn.style.display = 'inline'
		showBtn.style.display = 'none'
	} else {
		moreList.style.display = 'none'
		hideBtn.style.display = 'none'
		showBtn.style.display = 'inline'
	}
}

},{}],4:[function(require,module,exports){
require('./components/impact-timeline.js')
require('./components/content-navigation.js')
require('./components/show-more.js')

},{"./components/content-navigation.js":1,"./components/impact-timeline.js":2,"./components/show-more.js":3}]},{},[4]);
