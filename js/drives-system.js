// Red Flag Drives System - PS5 Dashboard Style
(function() {
    'use strict';
    
    let drivesData = null;
    let currentDrive = null;
    let currentMediaIndex = 0;
    
    // Initialize on page load
    $(document).ready(function() {
        setTimeout(function() {
            loadDrivesData();
        }, 300);
    });
    
    // Load drives from embedded data or JSON
    function loadDrivesData() {
        // Check if DRIVES_DATA is available (from drives-data.js)
        if (typeof DRIVES_DATA !== 'undefined') {
            console.log('✅ Drives loaded from drives-data.js (no CORS issues)');
            console.log('Number of drives:', DRIVES_DATA.drives ? DRIVES_DATA.drives.length : 0);
            if (DRIVES_DATA.drives && DRIVES_DATA.drives.length > 0) {
                DRIVES_DATA.drives.forEach(function(drive) {
                    const count = drive.media ? drive.media.length : (drive.images ? drive.images.length : 0);
                    console.log(`  - ${drive.title}: ${count} items`);
                });
            }
            drivesData = DRIVES_DATA;
            renderPS5Drives();
            return;
        }
        
        // Fallback: Try to load from JSON (may have CORS issues)
        const cacheBuster = '?v=' + new Date().getTime();
        $.getJSON('drives.json' + cacheBuster, function(data) {
            console.log('✅ Drives loaded successfully from drives.json');
            console.log('Number of drives:', data.drives ? data.drives.length : 0);
            if (data.drives && data.drives.length > 0) {
                data.drives.forEach(function(drive) {
                    const count = drive.media ? drive.media.length : (drive.images ? drive.images.length : 0);
                    console.log(`  - ${drive.title}: ${count} items`);
                });
            }
            drivesData = data;
            renderPS5Drives();
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error('❌ Failed to load drives.json:', textStatus, errorThrown);
            console.warn('⚠️ Loading sample data instead');
            loadSampleData();
        });
    }
    
    // Load sample drives if JSON fails
    function loadSampleData() {
        console.warn('Using sample data - drives.json not found or failed to load');
        drivesData = {
            drives: [
                {
                    id: "drive-1",
                    title: "Mountain Run",
                    date: "Dec 15, 2024",
                    location: "Hatta Mountains",
                    coverImage: "img/drives/drive-1/pic1.jpg",
                    media: [
                        { src: "img/drives/drive-1/pic1.jpg", type: "image" },
                        { src: "img/drives/drive-1/pic2.jpg", type: "image" },
                        { src: "img/drives/drive-1/pic3.jpg", type: "image" },
                        { src: "img/drives/drive-1/pic4.jpg", type: "image" },
                        { src: "img/drives/drive-1/pic5.jpg", type: "image" },
                        { src: "img/drives/drive-1/pic6.jpg", type: "image" },
                        { src: "img/drives/drive-1/pic7.jpg", type: "image" },
                        { src: "img/drives/drive-1/pic8.jpg", type: "image" },
                        { src: "img/drives/drive-1/pic9.jpg", type: "image" },
                        { src: "img/drives/drive-1/pic10.jpg", type: "image" },
                        { src: "img/drives/drive-1/vid1.mp4", type: "video" }
                    ]
                },
                {
                    id: "drive-2",
                    title: "Coastal Cruise",
                    date: "Nov 28, 2024",
                    location: "Jumeirah Beach Road",
                    coverImage: "img/drives/drive-2/pic1.jpg",
                    media: [
                        { src: "img/drives/drive-2/pic1.jpg", type: "image" },
                        { src: "img/drives/drive-2/pic2.jpg", type: "image" },
                        { src: "img/drives/drive-2/pic3.jpg", type: "image" },
                        { src: "img/drives/drive-2/pic4.jpg", type: "image" },
                        { src: "img/drives/drive-2/vid1.mp4", type: "video" }
                    ]
                }
            ]
        };
        renderPS5Drives();
    }
    
    // Render PS5-style drives
    function renderPS5Drives() {
        if (!drivesData || !drivesData.drives || drivesData.drives.length === 0) {
            return;
        }
        
        const container = $('#ps5-slider');
        container.empty();
        
        // Render each drive card
        drivesData.drives.forEach(function(drive) {
            const mediaCount = drive.media ? drive.media.length : (drive.images ? drive.images.length : 0);
            const isVideoCover = drive.coverImage && drive.coverImage.toLowerCase().endsWith('.mp4');
            
            // Build cover media HTML
            let coverHTML = '';
            if (isVideoCover) {
                coverHTML = `
                    <div class="ps5-card-image">
                        <video class="ps5-card-video" 
                               autoplay 
                               muted 
                               loop 
                               playsinline 
                               preload="auto" 
                               webkit-playsinline
                               data-src="${drive.coverImage}">
                            <source src="${drive.coverImage}" type="video/mp4">
                        </video>
                    </div>
                `;
            } else {
                coverHTML = `<div class="ps5-card-image" style="background-image:url('${drive.coverImage}')"></div>`;
            }
            
            const card = $(`
                <div class="ps5-drive-card" data-drive-id="${drive.id}">
                    ${coverHTML}
                    <div class="ps5-card-info">
                        <div>
                            <h3 class="ps5-card-title">${drive.title}</h3>
                            <div class="ps5-card-meta">
                                <div class="ps5-meta-item">
                                    <i class="ion-calendar"></i>
                                    <span>${drive.date}</span>
                                </div>
                                <div class="ps5-meta-item">
                                    <i class="ion-images"></i>
                                    <span>${mediaCount} items</span>
                                </div>
                            </div>
                        </div>
                        <button class="ps5-card-btn open-gallery" data-drive-id="${drive.id}">
                            View Gallery
                        </button>
                    </div>
                </div>
            `);
            
            container.append(card);
        });
        
        // Setup scroll navigation
        setupNavigation();
        
        // Attach gallery handlers
        attachGalleryHandlers();
        
        // Ensure cover videos start playing
        startCoverVideos();
    }
    
    // Setup arrow navigation
    function setupNavigation() {
        const slider = document.getElementById('ps5-slider');
        const prevBtn = document.getElementById('ps5-prev');
        const nextBtn = document.getElementById('ps5-next');
        
        if (!slider) return;
        
        const cardWidth = 450;
        const gap = 40;
        const scrollAmount = cardWidth + gap;
        
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            slider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            slider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Keyboard navigation
        $(document).on('keydown', function(e) {
            if ($('#drive-modal').attr('aria-hidden') !== 'false') {
                if (e.key === 'ArrowLeft') {
                    slider.scrollBy({
                        left: -scrollAmount,
                        behavior: 'smooth'
                    });
                } else if (e.key === 'ArrowRight') {
                    slider.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
    
    // Attach gallery handlers
    function attachGalleryHandlers() {
        $('.ps5-drive-card, .open-gallery').off('click').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const driveId = $(this).data('drive-id') || $(this).closest('.ps5-drive-card').data('drive-id');
            const drive = drivesData.drives.find(d => d.id === driveId);
            
            if (drive) {
                openGalleryModal(drive);
            }
        });
    }
    
    // Start playing cover videos - aggressive approach
    function startCoverVideos() {
        const videos = $('.ps5-card-video');
        
        // Function to force play all videos
        function forcePlayAllVideos() {
            videos.each(function() {
                const video = this;
                if (video.paused) {
                    video.play().catch(function(error) {
                        console.log('Video play failed:', error);
                    });
                }
            });
        }
        
        // Try 1: Immediate play attempt
        setTimeout(forcePlayAllVideos, 100);
        
        // Try 2: After a delay
        setTimeout(forcePlayAllVideos, 500);
        
        // Try 3: After another delay
        setTimeout(forcePlayAllVideos, 1000);
        
        // Try 4: On any user interaction (click, scroll, touch, key press)
        const userInteractionEvents = ['click', 'touchstart', 'scroll', 'keydown', 'mousemove'];
        let interactionHandled = false;
        
        userInteractionEvents.forEach(function(eventType) {
            $(document).one(eventType, function() {
                if (!interactionHandled) {
                    interactionHandled = true;
                    forcePlayAllVideos();
                }
            });
        });
        
        // Try 5: Intersection Observer for viewport detection
        if ('IntersectionObserver' in window) {
            const videoObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const video = entry.target;
                        if (video.paused) {
                            video.play().catch(function(error) {
                                console.log('Video play on scroll failed:', error);
                            });
                        }
                    }
                });
            }, {
                threshold: 0.25
            });
            
            videos.each(function() {
                videoObserver.observe(this);
            });
        }
        
        // Try 6: Individual hover fallback
        videos.each(function() {
            const video = this;
            $(video).closest('.ps5-drive-card').on('mouseenter touchstart', function() {
                if (video.paused) {
                    video.play().catch(function(error) {
                        console.log('Video play on hover failed:', error);
                    });
                }
            });
        });
        
        // Try 7: Monitor and auto-restart if paused
        setInterval(function() {
            videos.each(function() {
                if (this.paused && $(this).is(':visible')) {
                    this.play().catch(function() {});
                }
            });
        }, 2000);
    }
    
    // Open gallery modal
    function openGalleryModal(drive) {
        currentDrive = drive;
        currentMediaIndex = 0;
        
        // Support both 'media' and 'images' field names (backward compatibility)
        if (!drive.media && drive.images) {
            console.log('Converting old images format to media format');
            drive.media = drive.images.map(img => ({
                src: img.src,
                type: img.type || 'image'
            }));
        }
        
        console.log('Opening gallery for:', drive.title);
        console.log('Total media items:', drive.media ? drive.media.length : 0);
        
        if (!drive.media || drive.media.length === 0) {
            console.error('No media found for this drive!');
            alert('No media found for this drive');
            return;
        }
        
        // Disable fullpage scrolling and mouse wheel
        if (typeof $.fn.fullpage !== 'undefined') {
            if ($.fn.fullpage.setAllowScrolling) {
                $.fn.fullpage.setAllowScrolling(false);
            }
            if ($.fn.fullpage.setKeyboardScrolling) {
                $.fn.fullpage.setKeyboardScrolling(false);
            }
            if ($.fn.fullpage.setMouseWheelScrolling) {
                $.fn.fullpage.setMouseWheelScrolling(false);
            }
        }
        
        // Render thumbnails
        const thumbsContainer = $('#drive-modal-thumbs');
        thumbsContainer.empty();
        
        drive.media.forEach(function(item, index) {
            // For videos, show first frame or a placeholder
            const thumbSrc = item.type === 'video' ? item.src.replace('.mp4', '.jpg') : item.src;
            const thumb = $(`<div class="drive-thumb-modal ${index === 0 ? 'active' : ''}" data-index="${index}">
                <img src="${item.src}" onerror="this.src='${item.src}'">
                ${item.type === 'video' ? '<div class="video-indicator">▶</div>' : ''}
            </div>`);
            thumb.on('click', function() {
                currentMediaIndex = index;
                updateModalMedia();
            });
            thumbsContainer.append(thumb);
        });
        
        // Show first media
        updateModalMedia();
        
        // Show modal
        $('#drive-modal').attr('aria-hidden', 'false').fadeIn(300);
        $('body').addClass('modal-open');
        
        // If first media is a video, ensure it starts playing
        if (drive.media[0] && drive.media[0].type === 'video') {
            setTimeout(function() {
                const videoElement = $('#drive-modal-video').get(0);
                if (videoElement) {
                    videoElement.play().catch(function(error) {
                        console.log('Video autoplay prevented on open:', error);
                    });
                }
            }, 400);
        }
        
        // Prevent body scroll
        $(document).on('touchmove.modal mousewheel.modal DOMMouseScroll.modal', function(e) {
            if (!$(e.target).closest('.drive-modal-dialog').length) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });
    }
    
    // Update modal media with smooth fade transition
    function updateModalMedia() {
        if (!currentDrive || !currentDrive.media || !currentDrive.media[currentMediaIndex]) return;
        
        const media = currentDrive.media[currentMediaIndex];
        const $img = $('#drive-modal-image');
        const $video = $('#drive-modal-video');
        const videoElement = $video.get(0);
        
        // Fade out current media
        $img.fadeOut(300);
        $video.fadeOut(300);
        
        if (videoElement) {
            videoElement.pause();
        }
        
        // Wait for fade out, then switch media
        setTimeout(function() {
            // Show appropriate media with fade in
            if (media.type === 'video') {
                $video.attr('src', media.src);
                // Ensure video loads and plays
                if (videoElement) {
                    videoElement.load();
                    // Show video and auto-play
                    $video.fadeIn(300, function() {
                        videoElement.play().catch(function(error) {
                            console.log('Video autoplay prevented:', error);
                        });
                    });
                }
            } else {
                $img.attr('src', media.src).fadeIn(300);
            }
        }, 300);
        
        // Update thumbnails
        $('.drive-thumb-modal').removeClass('active');
        $(`.drive-thumb-modal[data-index="${currentMediaIndex}"]`).addClass('active');
    }
    
    // Close modal
    function closeGalleryModal() {
        $('#drive-modal').fadeOut(300, function() {
            $(this).attr('aria-hidden', 'true');
        });
        
        // Pause any playing video
        const $video = $('#drive-modal-video');
        if ($video.length) {
            $video.get(0).pause();
        }
        
        $('body').removeClass('modal-open');
        
        // Remove event handlers
        $(document).off('touchmove.modal mousewheel.modal DOMMouseScroll.modal');
        
        // Re-enable fullpage scrolling and mouse wheel
        setTimeout(function() {
            if (typeof $.fn.fullpage !== 'undefined') {
                if ($.fn.fullpage.setAllowScrolling) {
                    $.fn.fullpage.setAllowScrolling(true);
                }
                if ($.fn.fullpage.setKeyboardScrolling) {
                    $.fn.fullpage.setKeyboardScrolling(true);
                }
                if ($.fn.fullpage.setMouseWheelScrolling) {
                    $.fn.fullpage.setMouseWheelScrolling(true);
                }
            }
        }, 350);
        
        currentDrive = null;
        currentMediaIndex = 0;
    }
    
    // Modal navigation
    $('.drive-modal-close').on('click', closeGalleryModal);
    
    $('.drive-nav-prev').on('click', function() {
        if (!currentDrive || !currentDrive.media) return;
        currentMediaIndex = (currentMediaIndex - 1 + currentDrive.media.length) % currentDrive.media.length;
        updateModalMedia();
    });
    
    $('.drive-nav-next').on('click', function() {
        if (!currentDrive || !currentDrive.media) return;
        currentMediaIndex = (currentMediaIndex + 1) % currentDrive.media.length;
        updateModalMedia();
    });
    
    // Keyboard navigation for modal
    $(document).on('keydown', function(e) {
        if ($('#drive-modal').attr('aria-hidden') === 'false') {
            if (e.key === 'Escape') {
                closeGalleryModal();
            } else if (e.key === 'ArrowLeft') {
                $('.drive-nav-prev').click();
            } else if (e.key === 'ArrowRight') {
                $('.drive-nav-next').click();
            }
        }
    });
    
})();
