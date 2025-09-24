import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Get the first (and should be only) row
  const row = block.firstElementChild;
  if (!row) return;

  // Get the image from the row
  const picture = row.querySelector('picture');
  const img = row.querySelector('img');
  
  if (img && picture) {
    // Create optimized picture with multiple breakpoints for responsive design
    const optimizedPicture = createOptimizedPicture(
      img.src, 
      img.alt, 
      false, 
      [
        { media: '(min-width: 1200px)', width: '1200' },
        { media: '(min-width: 900px)', width: '900' },
        { media: '(min-width: 600px)', width: '600' },
        { width: '400' }
      ]
    );
    
    // Replace the original picture with the optimized one
    picture.replaceWith(optimizedPicture);
  }

  // Clean up the structure - remove the row wrapper
  while (row.firstElementChild) {
    block.appendChild(row.firstElementChild);
  }
  row.remove();
}
