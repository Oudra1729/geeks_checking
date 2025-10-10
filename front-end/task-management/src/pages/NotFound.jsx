import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, currentColor 20px, currentColor 21px),
                           repeating-linear-gradient(90deg, transparent, transparent 20px, currentColor 20px, currentColor 21px)`,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl text-center space-y-8">
        {/* Error badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10   ">
          {/* <AlertCircle className="w-5 h-5 text-primary" /> */}
          <span className="text-sm font-mono font-semibold text-stone-700">ERROR 404</span>
        </div>

        {/* Main heading */}
        <div className="space-y-4">
        <h1 className="text-6xl italic md:text-8xl font-black text-foreground tracking-tight text-balance text-blue-600">
  PAGE NOT
  <span className="block text-primary mt-2">FOUND</span>
</h1>

          <p className="text-lg md:text-xl  bg-gradient-to-r from-gray-500 to-blue-600 bg-clip-text text-transparent overflow-hidden max-w-xl mx-auto text-pretty text-gray-600">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        {/* Action button */}
        <div className="pt-4">
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border-2 border-blue-600/20 text-blue-600 hover:bg-blue-600/20 transition font-semibold">
        
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
