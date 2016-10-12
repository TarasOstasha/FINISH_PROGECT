$('body').prepend('<a href="#" class="back-to-top">Back to Top</a>');

	$(window).scroll(function() {
		if ( $(window).scrollTop() > 300 ) {
			$('a.back-to-top').fadeIn('slow');
		} else {
			$('a.back-to-top').fadeOut('slow');
		}
	})

	$('a.back-to-top').click(function() {
	$('body').animate({
		scrollTop: 0
	}, 1000);
	return false;
});