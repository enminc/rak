	</section> <!-- /role=main -->
</div> <!-- / .page -->

<footer>
	<nav>
		<ul>
			<li>
				<a href="#">Home</a>
			</li>
			<li>
				<a href="#">Basics</a>
			</li>
			<li>
				<a href="#">Training</a>
			</li>
			<li>
				<a href="#">Products</a>
			</li>
			<li>
				<a href="#">Seminars</a>
			</li>
			<li>
				<a href="#">Articles</a>
			</li>
			<li>
				<a href="#">Reviews</a>
			</li>
			<li>
				<a href="#">Contact Us</a>
			</li>
		</ul>
	</nav>

	<p class="license">&copy; 2013 Raising Amazing Kids. All rights reserved.</p>
</footer>


<script>
$(function() {
	$('header nav').rmenu();
});
</script>


<!-- 	Gets removed for production -->
<div class="toggle-grid-container"><a title="Toggle Grid" class="toggle-grid"></a></div>
<script>
$(function() {
	$('.toggle-grid').on('click', function() {
		if($('.page').hasClass('show-grid')) {
			$('.page').removeClass('show-grid');
		}
		else {
			$('.page').addClass('show-grid');
		}
	});
});
</script>


</body>
</html>
