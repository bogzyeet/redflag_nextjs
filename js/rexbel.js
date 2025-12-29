

$(function() {
    "use strict";
	
	
    $(window).on("load", function() {
        // 1. preloader
        $("#preloader").fadeOut(600);
        $(".preloader-bg").delay(400).fadeOut(600);
		
        // 2. fadeIn.element
        setTimeout(function() {
            $(".fadeIn-element").delay(600).css({
                display: "none"
            }).fadeIn(800);
        }, 0);
    });
	
    // 3. slick slider
    // 3.1. slick services slider
    $(".slick-services").slick({
        arrows: true,
        initialSlide: 0,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: "<i class='slick-prev icon ion-chevron-left'></i>",
        nextArrow: "<i class='slick-next icon ion-chevron-right'></i>",
        fade: false,
        autoplay: false,
        autoplaySpeed: 4000,
        cssEase: "ease",
        speed: 500
    });
    
    // Auto-advance timer for image slides
    var servicesAutoAdvanceTimer = null;
    
    // Play video on active slide and setup auto-advance (only if in services section)
    $(".slick-services").on('afterChange', function(event, slick, currentSlide){
        // Clear any existing timer
        if (servicesAutoAdvanceTimer) {
            clearTimeout(servicesAutoAdvanceTimer);
            servicesAutoAdvanceTimer = null;
        }
        
        // Check if we're in the services section
        var currentSection = $('.fp-section.active').index();
        if (currentSection === 2) { // services section is index 2
            // Pause all videos first
            $('.services-video').each(function() {
                this.pause();
                this.currentTime = 0; // Reset video to beginning
            });
            
            var $currentSlide = $(slick.$slides.get(currentSlide));
            var $video = $currentSlide.find('.services-video');
            
            // If current slide has a video, play it
            if ($video.length > 0) {
                $video[0].play();
            } else {
                // If it's an image slide, set timer to advance after 5 seconds
                servicesAutoAdvanceTimer = setTimeout(function() {
                    $('.slick-services').slick('slickNext');
                }, 5000);
            }
        }
    });
    
    // Listen for video ended events and advance to next slide
    $('.services-video').on('ended', function() {
        var currentSection = $('.fp-section.active').index();
        if (currentSection === 2) { // only auto-advance if in services section
            $('.slick-services').slick('slickNext');
        }
    });
    // 3.2. slick fullscreen slideshow
    $(".slick-fullscreen-slideshow").slick({
        arrows: false,
        initialSlide: 0,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease",
        speed: 1600,
        draggable: true,
        dots: false,
        pauseOnDotsHover: false,
        pauseOnFocus: false,
        pauseOnHover: false
    });
	// 3.3. slick fullscreen slideshow ZOOM/FADE
    $(".slick-fullscreen-slideshow-zoom-fade").slick({
        arrows: false,
        initialSlide: 0,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: "<i class='slick-prev icon ion-chevron-left'></i>",
        nextArrow: "<i class='slick-next icon ion-chevron-right'></i>",
        fade: true,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
        speed: 1600,
        draggable: true,
        dots: false,
        pauseOnDotsHover: true,
        pauseOnFocus: false,
        pauseOnHover: false
    });
	
    // 4. owl carousel
    // 4.1. owl testimonials carousel
    $("#testimonials-carousel").owlCarousel({
        loop: true,
        center: true,
        items: 1,
        margin: 0,
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 4000,
        smartSpeed: 450,
        nav: false
    });
	// 4.2. owl works carousel - initialized after drives load
	
    // 5. magnificPopup
	$(".popup-photo").magnificPopup({
        type: "image",
        gallery: {
            enabled: true,
            tPrev: "",
            tNext: "",
            tCounter: "%curr% / %total%"
        },
        removalDelay: 300,
        mainClass: "mfp-fade"
    });
	
    // 6. navigation
    // 6.1. close navigation
    $(".menu-state, .c-btn-services, .c-btn-about, .social-icons-launcher").on("click", function() {
        $("#menu-mobile").removeClass("activated");
        $("#menu-mobile-caller").removeClass("lines-close");
    });
    // 6.2. navigation active state
    $("a.menu-state").on("click", function() {
        $("a.menu-state").removeClass("active");
        $(this).addClass("active");
    });
	
    // 7. fullPage
    $("#fullpage").fullpage({
        anchors: ["home", "about", "services", "works", "contact"],
        navigation: true,
        navigationPosition: "right",
        navigationTooltips: ["Home", "About", "Services", "Works", "Contact"],
        responsiveWidth: 1024,
        autoScrolling: true,
        scrollBar: false,
        scrollOverflow: false,
        normalScrollElements: '.drive-modal',
        afterResponsive: function(isResponsive) {},
        afterLoad: function(anchorLink, index) {
            // Play video/start timer in active slide when entering services section
            if (anchorLink == 'services') {
                var $activeSlide = $('.slick-services .slick-active');
                var $video = $activeSlide.find('.services-video');
                
                if ($video.length > 0) {
                    $video[0].currentTime = 0; // Reset to beginning
                    $video[0].play();
                } else {
                    // If it's an image slide, start the auto-advance timer
                    if (servicesAutoAdvanceTimer) {
                        clearTimeout(servicesAutoAdvanceTimer);
                    }
                    servicesAutoAdvanceTimer = setTimeout(function() {
                        $('.slick-services').slick('slickNext');
                    }, 5000);
                }
            }
        },
        onLeave: function(index, nextIndex, direction) {
            // Pause all videos and clear timer when leaving services section
            if (index == 3) { // services is the 3rd section (index 3)
                $('.services-video').each(function() {
                    this.pause();
                });
                if (servicesAutoAdvanceTimer) {
                    clearTimeout(servicesAutoAdvanceTimer);
                    servicesAutoAdvanceTimer = null;
                }
            }
            // Play active slide video/start timer when entering services section
            if (nextIndex == 3) {
                var $activeSlide = $('.slick-services .slick-active');
                var $video = $activeSlide.find('.services-video');
                
                if ($video.length > 0) {
                    $video[0].currentTime = 0; // Reset to beginning
                    $video[0].play();
                } else {
                    // If it's an image slide, start the auto-advance timer
                    servicesAutoAdvanceTimer = setTimeout(function() {
                        $('.slick-services').slick('slickNext');
                    }, 5000);
                }
            }
        }
    });
	
    // 8. YouTube player
    $("#bgndVideo").YTPlayer();
	
    // 9. toggle panels
    $(".c-btn-services, .c-btn-about").on("click", function() {
        var divClass = $(this).attr("data-id");
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
            $("." + divClass).addClass("open");
        } else {
            $(this).addClass("open");
            $("." + divClass).addClass("open");
        }
    });
    $(".services-more-launch, .navigation-icon").on("click", function() {
        $(".panel-from-left, .panel-from-right, .panel-overlay-from-left, .panel-overlay-from-right").removeClass("open");
    });
    $(".about-more-launch, .navigation-icon").on("click", function() {
        $(".panel-from-left-about, .panel-from-right-about, .panel-overlay-from-left-about, .panel-overlay-from-right-about").removeClass("open");
    });
	
    // 10. forms
    // 10.1. contact form
    $("form#form").on("submit", function() {
        $("form#form .error").remove();
        var s = !1;
        if ($(".requiredField").each(function() {
                if ("" === jQuery.trim($(this).val())) $(this).prev("label").text(), $(this).parent().append('<span class="error">This field is required</span>'), $(this).addClass(
                    "inputError"), s = !0;
                else if ($(this).hasClass("email")) {
                    var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    r.test(jQuery.trim($(this).val())) || ($(this).prev("label").text(), $(this).parent().append('<span class="error">Invalid email address</span>'), $(this).addClass(
                        "inputError"), s = !0);
                }
            }), !s) {
            $("form#form input.submit").fadeOut("normal", function() {
                $(this).parent().append("");
            });
            var r = $(this).serialize();
            $.post($(this).attr("action"), r, function() {
                $("form#form").slideUp("fast", function() {
                    $(this).before('<div class="success">Your email was sent successfully.</div>');
                });
            });
        }
        return !1;
    });
	
    // 11. clone function
    $.fn.duplicate = function(count, cloneEvents, callback) {
        var stack = [],
            el;
        while (count--) {
            el = this.clone(cloneEvents);
            callback && callback.call(el);
            stack.push(el.get()[0]);
        }
        return this.pushStack(stack);
    };
    // 11.1. horizontal stripes HOME
    $("<div class='upper-page'></div>").appendTo(".horizontal-stripes");
    $("<div class='running-teardrop'></div>").duplicate(4).appendTo(".upper-page");
    // 11.2. horizontal stripes SECTIONS
    $("<div class='all-bg-wapper'></div>").appendTo(".horizontal-stripes-sections");
    $("<div class='running-teardrop'></div>").duplicate(4).appendTo(".horizontal-stripes-sections .all-bg-wapper");
	
    // 12. social icons launcher
    $(".social-icons-launcher").on("click", function() {
        if ($(".social-icons-wrapper").hasClass("social-icons-wrapper-reveal-show")) {
            $(".social-icons-wrapper").removeClass("social-icons-wrapper-reveal-show").addClass("social-icons-wrapper-reveal-hide");
			$(".welcome-message").removeClass("welcome-message-reveal-hide").addClass("welcome-message-reveal-show");
        } else {
            $(".social-icons-wrapper").removeClass("social-icons-wrapper-reveal-hide").addClass("social-icons-wrapper-reveal-show");
			$(".welcome-message").addClass("welcome-message-reveal-hide").removeClass("welcome-message-reveal-show");
        }
    });
    // 12.1. social icons launcher additional CLOSER
    $(".navigation-icon, .logo").on("click", function() {
        $(".social-icons-wrapper").removeClass("social-icons-wrapper-reveal-show").addClass("social-icons-wrapper-reveal-hide");
		$(".welcome-message").removeClass("welcome-message-reveal-hide").addClass("welcome-message-reveal-show");
    });
	
    // 13. skills bar
    $(".show-skillbar").appear(function() {
        $(".skillbar").skillBars({
            from: 0,
            speed: 4000,
            interval: 100,
            decimals: 0
        });
    });
	
	// 14. swiper slider
	// 14.1. swiper thumbnail slider horizontal thumbs
    var swipersliderTop = new Swiper(".swiper-slider-top", {
        direction: "vertical",
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        autoplay: 4000,
        speed: 1600,
        spaceBetween: 0,
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 1,
        loop: true,
        slideToClickedSlide: true,
        mousewheelControl: false,
        keyboardControl: false
    });
    var swipersliderBottom = new Swiper(".swiper-slider-bottom", {
        direction: "horizontal",
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 1,
        loop: true,
        slideToClickedSlide: true,
        mousewheelControl: false,
        keyboardControl: false
    });
    swipersliderTop.params.control = swipersliderBottom;
    swipersliderBottom.params.control = swipersliderTop;

    // 15. WhatsApp Join Form
    $("#join-whatsapp-form").on("submit", function(e) {
        e.preventDefault();
        
        const name = $("#join-name").val().trim();
        const car = $("#join-car").val().trim();
        const ownerPhone = $(this).attr("data-owner-phone");
        
        if (!name || !car) {
            $("#join-feedback").removeClass("success").addClass("error").text("Please fill in all required fields");
            return false;
        }
        
        // Create WhatsApp message
        let message = `Hi! I'd like to join Red Flag Club\n\n`;
        message += `Name: ${name}\n`;
        message += `Car: ${car}\n`;
        message += `\n(I'll attach a photo of my car)`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${ownerPhone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
        
        // Show success message
        $("#join-feedback").removeClass("error").addClass("success").text("Opening WhatsApp...");
        
        // Open WhatsApp
        setTimeout(function() {
            window.open(whatsappUrl, '_blank');
        }, 500);
        
        return false;
    });

    // 16. Drive Gallery System
    let drivesData = null;
    let currentDrive = null;
    let currentImageIndex = 0;
    
    // Load drives from JSON
    function loadDrives() {
        $.getJSON('drives.json', function(data) {
            drivesData = data;
            renderDriveCarousel();
        }).fail(function() {
            console.error('Failed to load drives.json');
            // Load default if JSON fails
            loadDefaultDrives();
        });
    }
    
    // Load default drives
    function loadDefaultDrives() {
        drivesData = {
            drives: [
                {
                    id: "drive-1",
                    title: "Mountain Run",
                    date: "Dec 15, 2024",
                    location: "Hatta Mountains",
                    coverImage: "img/drives/drive-1/pic1.jpg",
                    description: "Epic mountain drive",
                    images: [
                        {src: "img/drives/drive-1/pic1.jpg", caption: "Starting point", type: "image"},
                        {src: "img/drives/drive-1/pic2.jpg", caption: "Mountain roads", type: "image"},
                        {src: "img/drives/drive-1/pic3.jpg", caption: "Group photo", type: "image"}
                    ]
                },
                {
                    id: "drive-2",
                    title: "Coastal Cruise",
                    date: "Nov 28, 2024",
                    location: "Jumeirah Beach Road",
                    coverImage: "img/drives/drive-2/pic1.jpg",
                    description: "Relaxing coastal drive",
                    images: [
                        {src: "img/drives/drive-2/pic1.jpg", caption: "Beach views", type: "image"},
                        {src: "img/drives/drive-2/pic2.jpg", caption: "Coastal roads", type: "image"},
                        {src: "img/drives/drive-2/video1.mp4", caption: "Night cruise", type: "video"}
                    ]
                }
            ]
        };
        renderDriveCarousel();
    }
    
    // Render drive carousel
    function renderDriveCarousel() {
        const carousel = $('#works-page-img-carousel');
        
        if (carousel.length === 0) {
            console.error('Carousel container not found');
            return;
        }
        
        carousel.empty();
        
        if (!drivesData || !drivesData.drives || drivesData.drives.length === 0) {
            loadDefaultDrives();
            return;
        }
        
        drivesData.drives.forEach(function(drive) {
            const slide = $(`
                <div class="drive-slide">
                    <div class="drive-thumb drive-trigger" style="background-image:url('${drive.coverImage}')" data-drive-id="${drive.id}"></div>
                    <div class="drive-details">
                        <h3 class="drive-title">${drive.title}</h3>
                        <div class="drive-meta"><i class="ion-calendar"></i> ${drive.date}</div>
                        <div class="drive-meta"><i class="ion-location"></i> ${drive.location}</div>
                        <div class="drive-meta"><i class="ion-images"></i> ${drive.images.length} items</div>
                        <div class="drive-cta">
                            <div class="the-button-wrapper">
                                <div class="the-button drive-trigger" data-drive-id="${drive.id}">View Gallery</div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            carousel.append(slide);
        });
        
        // Initialize owl carousel
        setTimeout(function() {
            if (carousel.hasClass('owl-loaded')) {
                carousel.trigger('destroy.owl.carousel');
                carousel.removeClass('owl-loaded owl-drag');
            }
            
            carousel.owlCarousel({
                loop: false,
                center: false,
                items: 3,
                margin: 20,
                autoplay: false,
                nav: true,
                navText: ["<i class='owl-custom ion-chevron-left'></i>", "<i class='owl-custom ion-chevron-right'></i>"],
                responsive: {
                    0: { items: 1, margin: 10 },
                    768: { items: 2, margin: 20 },
                    1170: { items: 3, margin: 30 }
                }
            });
            
            // Attach click handlers
            $('.drive-trigger').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const driveId = $(this).attr('data-drive-id');
                const drive = drivesData.drives.find(d => d.id === driveId);
                
                if (drive) {
                    // Disable fullpage scrolling
                    if ($.fn.fullpage && $.fn.fullpage.setAllowScrolling) {
                        $.fn.fullpage.setAllowScrolling(false);
                        $.fn.fullpage.setKeyboardScrolling(false);
                    }
                    openDriveModal(drive);
                }
            });
        }, 300);
    }
    
    // Open drive modal
    function openDriveModal(drive) {
        currentDrive = drive;
        currentImageIndex = 0;
        
        // Set header info
        $('#drive-modal-title').text(drive.title);
        $('#drive-modal-date').text(drive.date);
        $('#drive-modal-location').text(drive.location);
        
        // Render thumbnails
        const thumbsContainer = $('#drive-modal-thumbs');
        thumbsContainer.empty();
        
        drive.images.forEach(function(img, index) {
            const thumb = $(`<img src="${img.src}" alt="${img.caption}" class="drive-thumb-modal" data-index="${index}">`);
            if (index === 0) thumb.addClass('active');
            
            thumb.on('click', function() {
                currentImageIndex = index;
                updateModalImage();
            });
            
            thumbsContainer.append(thumb);
        });
        
        // Show first image
        updateModalImage();
        
        // Show modal
        $('#drive-modal').attr('aria-hidden', 'false');
        $('body').css('overflow', 'hidden');
    }
    
    // Update modal media (supports image & video)
    function updateModalImage() {
        if (!currentDrive || !currentDrive.images[currentImageIndex]) return;
        
        const media = currentDrive.images[currentImageIndex];
        const $img = $('#drive-modal-image');
        const $video = $('#drive-modal-video');
        
        $img.removeClass('active');
        $video.removeClass('active').get(0).pause();
        $video.attr('src', '');
        
        if (media.type === 'video') {
            $video.attr('src', media.src).addClass('active');
        } else {
            $img.attr('src', media.src).attr('alt', media.caption || '').addClass('active');
        }
        
        $('#drive-modal-caption').text(media.caption || '');
        
        // Update active thumb
        $('.drive-thumb-modal').removeClass('active');
        $(`.drive-thumb-modal[data-index="${currentImageIndex}"]`).addClass('active');
    }
    
    // Close drive modal
    function closeDriveModal() {
        $('#drive-modal').attr('aria-hidden', 'true');
        $('body').removeAttr('style');
        $('#drive-modal-video').get(0).pause();
        
        // Re-enable fullpage scrolling
        if ($.fn.fullpage && $.fn.fullpage.setAllowScrolling) {
            $.fn.fullpage.setAllowScrolling(true);
            $.fn.fullpage.setKeyboardScrolling(true);
        }
        
        $('body').css('overflow', '');
        currentDrive = null;
        currentImageIndex = 0;
    }
    
    // Modal navigation
    $('.drive-modal-close').on('click', closeDriveModal);
    
    $('.drive-nav-prev').on('click', function() {
        if (!currentDrive) return;
        currentImageIndex = (currentImageIndex - 1 + currentDrive.images.length) % currentDrive.images.length;
        updateModalImage();
    });
    
    $('.drive-nav-next').on('click', function() {
        if (!currentDrive) return;
        currentImageIndex = (currentImageIndex + 1) % currentDrive.images.length;
        updateModalImage();
    });
    
    // Keyboard navigation
    $(document).on('keydown', function(e) {
        if ($('#drive-modal').attr('aria-hidden') === 'false') {
            if (e.key === 'Escape') {
                closeDriveModal();
            } else if (e.key === 'ArrowLeft') {
                $('.drive-nav-prev').click();
            } else if (e.key === 'ArrowRight') {
                $('.drive-nav-next').click();
            }
        }
    });
    
    // Drive system moved to drives-system.js
    // Drives will load automatically from drives-system.js

});