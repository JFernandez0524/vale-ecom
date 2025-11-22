export default function Hero() {
  // The unique video ID is what you need: YTzRXoKlc1Q
  const VIDEO_ID = 'YTzRXoKlc1Q';

  // Update this line 👇
  const embedUrl = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&disablekb=1&rel=0&modestbranding=1&showinfo=0`;
  // Original embed URL was missing showinfo=0 (now deprecated, but still sometimes helpful)
  // and relies on a clean combination.

  return (
    <section className='relative h-screen flex items-center justify-center'>
      {/* Background Video using iFrame */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden z-0'>
        <iframe
          src={embedUrl}
          // The frameBorder is set to 0 to remove the YouTube border
          allow='autoplay; loop; encrypted-media; fullscreen'
          // We use absolute positioning and transform to ensure the video covers the entire viewport
          className='absolute top-1/2 left-1/2 w-full h-full min-w-screen min-h-screen object-cover'
          style={{ transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}
        />
      </div>

      {/* Overlay */}
      <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10'></div>

      {/* Content */}
      <div className='relative z-20 text-center text-white px-4'>
        <h1 className='text-5xl md:text-7xl font-bold mb-4'>
          Handmade Body Scrubs
        </h1>
        <p className='text-xl md:text-2xl font-light'>
          Made with ❤️ by Valentina.
        </p>
      </div>
    </section>
  );
}
