const lazyImages = document.querySelectorAll('.lazy');

function changeSrc(img) {
  img.src = img.dataset.src;
  img.classList.remove('lazy');
  img.removeAttribute('data-src');
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(images => {
    images.forEach(imgEntry => {
      if (imgEntry.isIntersecting) {
        const img = imgEntry.target;
        changeSrc(img);
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => {
    observer.observe(img)
  });
} else {
  lazyImages.forEach(changeSrc);
}
