$(function() {
	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 500);
				return false;
			}
		}
	});
});

$(function() {
	$('#contact-form').submit(function(e) { 
		e.preventDefault() 
		var btn = $('#contact-form .blu-btn');
		var th = $(this);
		var wrapMsg = $('.form_msg');

		btn.attr('disabled','disabled');

		$.ajax({
			type: "POST",
			url: "/main/form/sendEmail", //Change
			data: th.serialize(),
			success : function(data){
				$('.modal>*').fadeIn();
				console.log('нормич');
				th.trigger("reset");
				btn.prop("disabled", false);
			},
			error:function(data){
				console.log('срань');
			}
		});

		$('.modal-close').on('click', function(){
			$('.modal>*').fadeOut();
		})

		return false;
	});
});