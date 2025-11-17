export default function Hero() {
  return (
    <section className='relative h-screen flex items-center justify-center'>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className='absolute top-0 left-0 w-full h-full object-cover z-0'
      >
        {/* 1. Create a 'videos' folder inside your 'public' folder.
          2. Add your video file there (e.g., 'public/videos/scrub-video.mp4')
          3. Update the src path below.
        */}
        <source src='/videos/ValeMakingBodyScrubs.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>

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
