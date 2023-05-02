import faviconApple from '/src/assets/favicon/apple-touch-icon.png';
import favicon32 from '/src/assets/favicon/favicon-32x32.png';
import favicon16 from '/src/assets/favicon/favicon-16x16.png';

// Add logo favicon
document.querySelector('link[sizes="180x180"]').href = faviconApple;
document.querySelector('link[sizes="32x32"]').href = favicon32;
document.querySelector('link[sizes="16x16"]').href = favicon16;
