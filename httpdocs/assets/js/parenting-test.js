
function toConsole(msg){
    var debug = true;
    if(debug){
		console.info(msg);
    }
}

$(document).ready(function(){

	$('.section button.next,.section button.prev').each(function(){
		var elBtn = $(this);
		elBtn.on('click',function(){
			var e,id,sId,pass,next,prev;
			e    = false;
			id   = $(this).attr('id');
			sId  = id.split('-').pop();
			pass = elBtn.hasClass('no-validate');
			next = elBtn.hasClass('next');
			prev = elBtn.hasClass('prev');

			if(!pass && !prev){ // no validation on "pass" or prev button
				if(!$('input[name="'+sId+'"]:checked').length) {
					e = 'You must answer the questions';
				}
			}

			if(!e || pass){
				elBtn.closest('li').fadeOut(400,function(){
					if(next){
						$(this).next().fadeIn();
					}
					else{
						$(this).prev().fadeIn();
					}
				});
			}
			else{
				alert(e);
			}
		});
	});

});