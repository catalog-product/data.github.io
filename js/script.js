// Scroll.js

$(window).on('popstate',function(e){
	e.preventDefault();
	var target = window.location.href.split("#")[1];
	if(target != "" && target!=undefined){
		$('html, body').stop().animate({'scrollTop': $("#"+target).offset().top}, 500, 'swing', function () {
			window.location.hash = target;
		});
	}
});

$(document).ready(function(){

	if(typeof(AOS) !== 'undefined'){
		AOS.init({
			easing: 'ease-out-cubic',
			offset: 50
		});
		setTimeout(function(){
			if($(".slick-initialized").length>0){
				AOS.refreshHard();
			}
		},200);
	}

	AOS.init();

	$('.nav-link').on('click', function (e) {
		e.preventDefault();

		$('.nav-link').removeClass('active');
		$(this).addClass('active');

		$('[id^="image-container"]').hide();

		const target = $(this).attr('href');
		$(target).show();

		const view = $(target).attr("data-view");
		if (view === "grid") {
			$("#gridView").removeClass("btn-outline-secondary").addClass("btn-outline-primary");
			$("#listView").addClass("btn-outline-secondary").removeClass("btn-outline-primary");
		} else {
			$("#listView").removeClass("btn-outline-secondary").addClass("btn-outline-primary");
			$("#gridView").addClass("btn-outline-secondary").removeClass("btn-outline-primary");
		}
	});

	$('[id^="image-container"]').hide();
	$('#image-container-new').show();

	function renderImages(containerId, totalImages, imagePath, altPrefix) {
		const container = document.getElementById(containerId);
		if (!container) return;

		const fragment = document.createDocumentFragment();
		const prefix = altPrefix === "Produk Baru" ? "product-new-" : "";

		let margin = "";
		for (let i = 1; i <= totalImages; i++) {
			const col = document.createElement('div');
			col.className = 'col-12 col-md-4 col-sm-6';
			col.setAttribute('data-aos-duration', '600');
			col.setAttribute('data-aos', 'fade-down');
			col.setAttribute('data-aos-delay', '0');
			margin = (i === 1 && $(window).width() < 576) ? 'mt-10' : 'mt-50';

			col.innerHTML = `
					<a href="${imagePath}${prefix}${i}.jpg"
						class="glightbox link color-main"
						data-gallery="${altPrefix}"
						data-title=""
						data-description="">
					<img src="${imagePath}${prefix}${i}.jpg"
						class="${margin} radius10 img-fluid"
						alt="${altPrefix} ${i}">
					</a>
				`;

			fragment.appendChild(col);
		}

		container.appendChild(fragment);
	}

	renderImages('image-container-new', 90, 'img/New/', 'Produk Baru');
	renderImages('image-container-frozen-food', 174, 'img/Frozenfood/', 'Produk Frozen Food');
	renderImages('image-container-snack', 50, 'img/Snack/', 'Produk Snack');
	renderImages('image-container-bumbu-dapur', 21, 'img/Bumbu/', 'Produk Bumbu Dapur');
	renderImages('image-container-barang', 28, 'img/Barang/', 'Produk Barang');
	const glightbox = GLightbox({
		selector: '.glightbox'
	});

	$('#gridView').on('click', function () {
		const activeNavLink = $('.nav-link.active').attr('href');
		$(this).removeClass("btn-outline-secondary").addClass("btn-outline-primary");
		$("#listView").addClass("btn-outline-secondary").removeClass("btn-outline-primary");
		$(`${activeNavLink} > div`).each(function () {
			$(this).attr('class', 'col-6 col-md-4 col-sm-6');
		});
		$(`${activeNavLink} > div > a > img`).slice(0, 2).addClass('mt-10').removeClass('mt-50');
		$(`${activeNavLink}`).attr("data-view", "grid");
		AOS.refreshHard();
	});

	$('#listView').on('click', function () {
		const activeNavLink = $('.nav-link.active').attr('href');
		$(this).removeClass("btn-outline-secondary").addClass("btn-outline-primary");
		$("#gridView").addClass("btn-outline-secondary").removeClass("btn-outline-primary");
		$(`${activeNavLink} > div`).each(function () {
			$(this).attr('class', 'col-12 col-md-4 col-sm-6');
		});
		$(`${activeNavLink} > div > a > img`).slice(0, 1).addClass('mt-10').removeClass('mt-50');
		$(`${activeNavLink} > div > a > img`).slice(1, 2).addClass('mt-50').removeClass('mt-10');
		$(`${activeNavLink}`).attr("data-view", "list");
		AOS.refreshHard();
	});
}); // document.ready end
