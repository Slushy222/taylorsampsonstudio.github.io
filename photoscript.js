document.addEventListener('DOMContentLoaded', function() {
  const overlays = document.querySelectorAll('.fieldWorkOverlay, .accordionOverlay, .photo2FieldOverlay, .studioOverlay, .collageOverlay, .selfOverlay');
  const mainContentArea = document.querySelector('.main-content');
  const body = document.querySelector('body');
  const navBar = document.getElementById('navBar'); // Get the nav element

  let scrollPosition = 0;

  // Object to map overlays to specific colors
  const overlayColors = {
    fieldWorkOverlay: 'rgb(255, 180, 0)',
    accordionOverlay: 'rgb(246,231,203)',
    photo2FieldOverlay: 'rgb(255, 0, 128)',
    studioOverlay: 'rgb(144,180,148)',
    collageOverlay: 'rgb(164, 74, 63)',
    selfOverlay: 'rgb(255, 128, 0)'
    // Add more overlays and colors as needed
  };

  overlays.forEach(function(overlay) {
    overlay.addEventListener('click', function(event) {
      if (!event.target.closest('.popup-content')) {
        closeOverlay(overlay);
        // Reset nav background color when popup closes
        navBar.style.backgroundColor = 'white';
      }
    });
  });

  mainContentArea.addEventListener('click', function(event) {
    const isMainContentImage = event.target.classList.contains('mainContentImages');
    if (isMainContentImage) {
      const popupId = event.target.getAttribute('data-popup');
      const overlay = document.getElementById(popupId);
      scrollPosition = window.scrollY;
      openOverlay(overlay);
      // Change body background color based on overlay type
      const overlayType = overlay.classList[0]; // Get the first class of the overlay
      body.style.backgroundColor = overlayColors[overlayType];
      // Change nav background color based on overlay type
      navBar.style.backgroundColor = overlayColors[overlayType];
    }
  });

  document.body.addEventListener('click', function(event) {
    const isOverlay = event.target.closest('.fieldWorkOverlay, .accordionOverlay, .photo2FieldOverlay, .studioOverlay, .collageOverlay, .selfOverlay');
    const isMainContentImage = event.target.classList.contains('mainContentImages');

    if (!isOverlay && !isMainContentImage) {
      const activeOverlay = document.querySelector('.active');
      if (activeOverlay) {
        closeOverlay(activeOverlay);
        // Reset body and nav background color when popup closes
        body.style.backgroundColor = 'white';
        navBar.style.backgroundColor = 'white';
      }
    }
  });

  function openOverlay(overlay) {
  overlay.classList.add('active');
  const scrollTop = window.scrollY;
  const overlayContent = overlay.querySelector('.popup-content');
  const viewportHeight = window.innerHeight;

  overlayContent.style.visibility = 'hidden'; // Hide the content to avoid flickering
  overlayContent.style.display = 'block'; // Ensure the content is displayed to get the correct height
  const contentHeight = overlayContent.offsetHeight; // Get the actual height of the content
  overlayContent.style.visibility = ''; // Restore visibility
  overlayContent.style.display = ''; // Restore display property

  const topSpace = Math.max(0, (viewportHeight - contentHeight) / 2) + scrollTop;

    mainContentArea.style.position = 'fixed';
    mainContentArea.style.width = '100%';
    mainContentArea.style.top = `-${scrollTop}px`; // Maintain the scroll position

    body.style.overflowX = 'hidden';
    overlay.style.overflowY = 'auto';
    body.classList.add('color-transition');
    body.style.backgroundColor = overlayColors[overlay.classList[0]]; // Apply the overlay color to the body background
    overlay.style.top = `${topSpace}px`; // Apply the calculated top space to the overlay
  }

  function closeOverlay(overlay) {
    overlay.classList.remove('active');
    mainContentArea.style.position = '';
    mainContentArea.style.width = '';
    mainContentArea.style.top = '';
    window.scrollTo(0, scrollPosition);
    body.style.overflowX = 'hidden';
    overlay.style.overflowY = '';
    body.classList.add('color-transition');
    body.style.backgroundColor = 'white';
  }
});
