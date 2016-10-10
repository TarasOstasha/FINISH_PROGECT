$(document).ready(function() {
	$('#form-site').submit(function() {
		$.ajax({
			type: "GET",
			url: "",
			data: $(this).serialize()
		}).done(function() {
			// alert('Thanks for your email. \n We well contact you as soon as possible');
			toastr.success('Thanks for your email. \n We well contact you as soon as possible');
			$("#form-site").get(0).reset();
		});
		return false;
	});

});

//data: $(this).serialize() - це метод, який збирає значення всіх елементів форми!






