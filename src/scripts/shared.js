const DEFAULT_LANGUAGE = 'en';

export function getLanguage() {
	let result = new Set(navigator.languages).union(
		new Set(
			navigator
				? [
						navigator.language,
						navigator.browserLanguage,
						navigator.userLanguage,
						navigator.systemLanguage,
					]
				: []
		)
	);

	result.delete(undefined);

	if (result.size == 0) {
		result.add(DEFAULT_LANGUAGE);
	}

	return result;
}

function findFirstNext(element, tagName) {
	if (!tagName) {
		tagName = element.tagName.toUpperCase();
	}

	let next = element.nextElementSibling;

	while (next) {
		if (next.tagName === tagName) {
			return next;
		}

		next = next.nextElementSibling;
	}

	return null;
}

function findFirstPrevious(element, tagName) {
	if (!tagName) {
		tagName = element.tagName.toUpperCase();
	}

	let previous = element.previousElementSibling;

	while (previous) {
		if (previous.tagName === tagName) {
			return previous;
		}

		previous = previous.previousElementSibling;
	}

	return null;
}

function findElement(event) {
	switch (event.key) {
		case 'ArrowRight':
		case 'ArrowDown':
			return findFirstNext(event.target);
		case 'ArrowLeft':
		case 'ArrowUp':
			return findFirstPrevious(event.target);
	}

	return null;
}

export function navigateInput(event) {
	const target = findElement(event);

	if (target) {
		event.preventDefault();
		target.focus();
	}
}

export const bubbleEvent = (emit) => (name, ...payload) => emit(name, ...payload);
