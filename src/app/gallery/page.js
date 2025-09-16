"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { X, ArrowLeft, ArrowRight, Download, Share2, Printer } from "lucide-react";
import Loader from "../components/Loader";

const defaultImages = [
  "/gp.jpg",  "/i1.JPG", "/i3.JPG", "/i4.JPG", "/i5.JPG", "/i6.JPG", "/ai1.webp", "/ai2.webp", "/a3.webp", "/ai4.webp"
];

const aiImages = [
  "/ai1.webp", "/ai2.webp", "/a3.webp", "/ai4.webp"
];

// 🔹 Hook to track window width
function useWindowWidth() {
  const [width, setWidth] = useState(0);
  

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default function GalleryPage() {
  const [selected, setSelected] = useState(null);
  const [direction, setDirection] = useState(0);
  const width = useWindowWidth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(defaultImages);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setImages((prev) => (prev === defaultImages ? aiImages : defaultImages));
      setLoading(false);
    }, 1000); // 👈 ensures loader shows at least 1s
  };


    useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/"); // redirect if not logged in
    }
  }, [router]);


  // 🔹 Responsive windowSize for thumbnails
  const windowSize = width < 640 ? 2 : width < 1024 ? 4 : 5;

  const nextImage = () => {
    setDirection(1);
    setSelected((prev) =>
      prev !== null && prev < images.length - 1 ? prev + 1 : 0
    );
  };

  const prevImage = () => {
    setDirection(-1);
    setSelected((prev) =>
      prev !== null && prev > 0 ? prev - 1 : images.length - 1
    );
  };

  // 🔹 helper: centered thumbnails with placeholders
  const getVisibleThumbnails = () => {
    if (selected === null) return [];

    const start = selected - windowSize;
    const end = selected + windowSize;
    const slots = [];

    for (let i = start; i <= end; i++) {
      if (i < 0 || i >= images.length) {
        slots.push(null); // placeholder
      } else {
        slots.push(images[i]);
      }
    }

    return slots.map((src, idx) => ({
      src,
      index: start + idx,
    }));
  };

    // 🔹 Download selected image
  const handleDownload = () => {
    if (selected === null) return;
    const link = document.createElement("a");
    link.href = images[selected];
    link.download = `image-${selected + 1}.jpg`; // you can change extension
    link.click();
  };

  // 🔹 Share selected image (uses Web Share API if available)
  // 🔹 Share selected image (share actual file if supported)
const handleShare = async () => {
  if (selected === null) return;

  const imageUrl = images[selected];
  const absoluteUrl = imageUrl.startsWith("http")
    ? imageUrl
    : window.location.origin + imageUrl;

  try {
    const response = await fetch(absoluteUrl);
    const blob = await response.blob();
    const file = new File([blob], `image-${selected + 1}.jpg`, {
      type: blob.type,
    });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "Check out this image",
        text: "Sharing from gallery",
      });
    } else {
      // fallback: copy link
      await navigator.clipboard.writeText(absoluteUrl);
      alert("Your device does not support sharing files. Link copied instead!");
    }
  } catch (err) {
    console.error("Share failed:", err);
  }
};



  return (
   <div className="relative min-h-screen w-full overflow-hidden">
        <Navbar />
  {loading && <Loader />}
      {/* Main Content */}
      <main className="flex-grow relative min-h-screen w-full overflow-hidden pt-24">
  {/* 🔹 Background Image */}
  <Image
    src="/navratri (1).png"   // same background as ProfilePage
    alt="Background"
    fill
    className="blur-lg scale-110 opacity-70 object-cover"
    priority
  />

  {/* 🔹 Frosted Glass Overlay */}
  <div className="absolute inset-0 backdrop-blur-md bg-white/20 z-10"></div>

  {/* 🔹 Content Wrapper */}
  <div className="relative z-20 p-6">

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
<div className="relative flex flex-col justify-between items-center backdrop-blur-xl bg-gradient-to-l from-[#9333ea1a] via-[#e9d5ff]/40 to-[#93c5fd]/40 border border-white/30 rounded-xl p-6 text-black row-span-2 h-full shadow-lg">
  {/* 🔹 Heading */}
  <h2 className="text-2xl font-bold text-center mb-6">
    Get Your Personalized Gallery
  </h2>

 <p className="text-lg text-gray-600 text-center mt-4">
    AI Powered Search for Face Recognition
  </p>

  {/* 🔹 Push content down so video + button stay at bottom */}
  <div className="flex flex-col items-center mt-auto w-full">
    <video
      src="/Face lock.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="w-full rounded-lg border-0 outline-none"
    />

    <button
    onClick={handleSearch}
  className="mt-3 px-4 py-2 w-full bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
>
  {images === defaultImages ? "Search Image using AI" : "Back to Gallery"}
</button>

  </div>
</div>

  {/* 🔹 Existing Images */}
  {images.map((src, i) => (
    <div
      key={i}
      className="relative h-68 cursor-pointer overflow-hidden rounded-xl"
      onClick={() => {
        setSelected(i);
        setDirection(0);
      }}
    >
      <Image
        src={src}
        alt={`Gallery image ${i + 1}`}
        fill
        className="object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>
  ))}
</div>

      {/* Modal Preview */}
      {selected !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          {/* Close Button (Top Left) */}
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 left-4 bg-black/60 p-2 rounded-full text-white hover:bg-black/80 z-50"
          >
            <X size={22} />
          </button>

          
          {/* Action Buttons (Top Right) */}
<div className="absolute top-4 right-4 flex gap-3 z-50">
  <button
    onClick={handleDownload}   // 👈 added
    className="bg-black/60 p-2 rounded-full text-white hover:bg-black/80"
  >
    <Download size={20} />
  </button>
  <button
    onClick={handleShare}      // 👈 added
    className="bg-black/60 p-2 rounded-full text-white hover:bg-black/80"
  >
    <Share2 size={20} />
  </button>
  <button className="bg-black/60 p-2 rounded-full text-white hover:bg-black/80">
    <Printer size={20} />
  </button>
</div>


          {/* Prev Button */}
          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/60 p-3 rounded-full text-white hover:bg-black/80 z-50"
          >
            <ArrowLeft size={28} />
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/60 p-3 rounded-full text-white hover:bg-black/80 z-50"
          >
            <ArrowRight size={28} />
          </button>

          {/* Main Image with Slide Animation */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={selected}
                custom={direction}
                initial={{ x: direction === 1 ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction === 1 ? -300 : 300, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute w-full h-full flex items-center justify-center"
              >
                <Image
                  src={images[selected]}
                  alt="Selected"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thumbnails Overlay */}
          {/* Thumbnails Overlay */}
<div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 px-4 py-4">
  <AnimatePresence initial={false}>
    {getVisibleThumbnails().map(({ src, index }, i) =>
      src ? (
        <motion.div
          key={index}
          layout
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: selected === index ? 1 : 0.6, scale: selected === index ? 1.15 : 1 }}
          exit={{ opacity: 0, scale: 0.8 }}   // 👈 fade/scale out
          transition={{ duration: 0.4, ease: "easeInOut" }}
          onClick={() => {
            setDirection(index > selected ? 1 : -1);
            setSelected(index);
          }}
          className="relative w-20 h-16 md:w-24 md:h-20 lg:w-28 lg:h-24 rounded-lg overflow-hidden cursor-pointer"
        >
          <Image
            src={src}
            alt={`Thumbnail ${index + 1}`}
            fill
            className="object-cover rounded-lg"
          />
        </motion.div>
      ) : (
        <motion.div
          key={`empty-${i}`}
          exit={{ opacity: 0, scale: 0.8 }}  // 👈 smooth remove for placeholders too
          className="w-20 h-16 md:w-24 md:h-20 lg:w-28 lg:h-24 rounded-lg opacity-0"
        />
      )
    )}
  </AnimatePresence>
</div>
        </div>
      )}
    </div>
    </main>
<Footer/>    
     </div> 
  );
}
