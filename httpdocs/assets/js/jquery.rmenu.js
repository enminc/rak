;(function($) {

$.fn.rmenu = function(options) {
	return this.each(function() {
		var $this = $(this),
			config = $.extend({
				throttle: 1,
				threshold: 480,
				mainClass: 'r-menu',
				moreReveal: 'r-menu-more-reveal',
				selected: 'selected'
			}, options),
			$cloned,
			$origUl = $('ul', $this),
			$origLi,
			$clonedUl,
			$clonedLi,
			$moreReveal;
			
		$this.css({position: 'relative'}).addClass('r-menu-container');
			
		// Append 'more' li
		$origUl.append('<li class="' + config.moreReveal + '"><a href="javascript://" class="more">More</a><div/></li>');

		$origUl.addClass(config.mainClass);
		$cloned = $this.clone();
		$origLi = $origUl.children('li').not('li li'),
		$clonedUl = $('ul', $cloned),
		$clonedLi = null,
		$moreReveal = $('.' + config.moreReveal);

/*
		console.log('this', $this);
		console.log('cloned', $cloned);
		console.log('origUl', $origUl);
		console.log('origLi', $origLi);
		console.log('clonedUl', $clonedUl);
*/


		// Need to make clone so can perform calculations, cloned copy kept offscreen
		$this.parent().append($cloned.css({
			position: 'absolute',
			top: '-999em',
			left: '999em',
			width: '999em'
		}));

		$moreReveal.hide();

		$clonedLi = $clonedUl.children();
		$clonedLi.find('.' + config.moreReveal).hide();
		
		$(window).on('resize', function() {
			var last,
				ow = $origUl.width(),
				aggw = 0,
				liWidth = 0;

			$clonedLi.not('.' + config.moreReveal).each(function(i, j) {
				liWidth += $(j).outerWidth();
			});

/*
			console.log(liWidth);
			console.log(ow);
*/

			if(liWidth > ow) {
				// Menu won't fit
/* 				console.log($clonedLi.filter('.' + config.moreReveal)); */
				aggw += $clonedLi.filter('.' + config.moreReveal).show().outerWidth();
				var t = aggw,
					toReveal;

				$clonedLi.find('.' + config.moreReveal).hide();

				toReveal = $clonedLi.not('.' + config.moreReveal).map(function(i, j) {
					aggw += $(j).outerWidth();
					if(aggw > ow) {
						return $($origLi[i]).hide().clone();
					}
					else {
						$($origLi[i]).show();
					}
				});

				$origLi.filter('.' + config.moreReveal).show();
				
				var frag = $('<ul/>');
				$.each(toReveal, function(i, j) {
					frag.append($(j).show());
				});
				
				$moreReveal.show().find('>div').html(frag);
			}
			else {
				$origLi.show().filter('.' + config.moreReveal).hide();
				$moreReveal.find('>div').html('');
			}
		}).resize();
		
		$this.find('.' + config.moreReveal + ' .more').on('click', function(ev) {
			ev.preventDefault();
			toggleMenu();
		});
		
		$origLi.not('.' + config.moreReveal).hover(function() {
			var $t = $(this).children('a:first-child').addClass(config.selected).end();
			$t.find('.rmenu-mega').fadeIn(200);
		}, function() {
			var $t = $(this).children('a:first-child').removeClass(config.selected).end();
			$t.find('.rmenu-mega').fadeOut(200);
		});
		
		function toggleMenu() {
			var t = $moreReveal.find('>div');

			t.animate({
				opacity: 'toggle',
				height: 'toggle',
				queue: false
			}, 300);
		}
	});
}

})(jQuery);
