;(function($) {

$.fn.rmenu = function(options) {
	return this.each(function() {
		var $this = $(this),
			config = $.extend({
				throttle: 1,
				threshold: 480,
				moreReveal: '.r-menu-more-reveal',
				selected: 'selected'
			}, options),
			$cloned = $this.clone();
			$origUl = $('ul', $this),
			$origLi = $origUl.children('li').not('li li'),
			$clonedUl = $('ul', $cloned),
			$clonedLi = null,
			$moreReveal = $(config.moreReveal);

		// Meh, need to make clone so can perform calculations, cloned copy kept offscreen
		$this.parent().append($cloned.css({
			position: 'absolute',
			top: '-9999em',
			left: '-9999em'
		}));

		$moreReveal.hide();

		$clonedLi = $clonedUl.children();
		$clonedLi.find('.more').hide();
		
		$(window).on('resize', function() {
			var last,
				ow = $origUl.width(),
				aggw = 0,
				liWidth = 0;

			$clonedLi.not('.more').each(function(i, j) {
				liWidth += $(j).outerWidth();
			});

			if(liWidth > ow) {
				// Menu won't fit
				aggw += $clonedLi.filter('.more').outerWidth();
				var t = aggw,
					toReveal;
					
				$clonedLi.find('.more').hide();

				toReveal = $clonedLi.not('.more').map(function(i, j) {
					aggw += $(j).outerWidth();
					if(aggw > ow) {
						return $($origLi[i]).hide().clone();
					}
					else {
						$($origLi[i]).show();
					}
				});

				$origLi.filter('.more').show();
				
				var frag = $('<ul/>');
				$.each(toReveal, function(i, j) {
					frag.append($(j).show());
				});
				
				$moreReveal.empty().append(frag);
			}
			else {
				$origLi.show().filter('.more').hide();
				$moreReveal.empty();
			}
		}).resize();
		
		$this.find('.more').on('click', function() {
			$moreReveal.slideToggle();
		});
		
		$origLi.not('.more').hover(function() {
			var $t = $(this).children('a:first-child').addClass(config.selected).end();
			$t.find('.rmenu-mega').fadeIn(200);
		}, function() {
			var $t = $(this).children('a:first-child').removeClass(config.selected).end();
			$t.find('.rmenu-mega').fadeOut(200);
		});
	});
}

})(jQuery);
