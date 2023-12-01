export function rating() {
    const ratings = document.querySelectorAll('.rating');
	if (ratings.length > 0) {
		initRatings();
	}
	function initRatings() {
		let ratingActive, ratingValue;
		for (let index = 0; index < ratings.length; index++) {
			const rating = ratings[index];
			initRating(rating);
		}
		function initRating(rating) {
			initRatingVars(rating);

			setRatingActiveWidth();

			if (rating.classList.contains('rating--set')) {
				setRating(rating);
			}
		}
		function initRatingVars(rating) {
			ratingActive = rating.querySelector('.rating__active');
			ratingValue = rating.querySelector('.rating__value');
		}
		function setRatingActiveWidth(index = ratingValue.innerHTML) {
			const ratingActiveWidth = index / 0.05;
			ratingActive.style.width = `${ratingActiveWidth}%`;
		}
		function setRating(rating) {
			const ratingItems = rating.querySelectorAll('.rating__item');
			for (let index = 0; index < ratingItems.length; index++) {
				const ratingItem = ratingItems[index];
				ratingItem.addEventListener('mouseenter', function () {
					initRatingVars(rating);
					setRatingActiveWidth(ratingItem.value);
				});
				ratingItem.addEventListener('mouseleave', function () {
					setRatingActiveWidth();
				});
				ratingItem.addEventListener('click', function () {
					initRatingVars(rating);

					if (rating.dataset.ajax) {
						setRatingValue(ratingItem.value, rating);
					} else {
						ratingValue.innerHTML = index + 1;
						setRatingActiveWidth();
					}
				});
			}
		}
		async function setRatingValue(value, rating) {
			if (!rating.classList.contains('rating--sending')) {
				rating.classList.add('rating--sending');
				let response = await fetch('rating.json', {
					method: 'GET',

					//body: JSON.stringify({
					//	userRating: value
					//}),
					//headers: {
					//	'content-type': 'application/json'
					//}

				});
				if (response.ok) {
					const result = await response.json();
					const newRating = result.newRating;
					ratingValue.innerHTML = newRating;
					setRatingActiveWidth();
					rating.classList.remove('rating--sending');
				} else {
					alert('Ошибка');
					rating.classList.remove('rating--sending');
				}
			}
		}
	}
}