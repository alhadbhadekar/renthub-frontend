"use client";

import { useState } from "react";

export default function AddListingPage() {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-8 pt-2">Add New Listing</h1>
      {/* ⭐ MAIN CONTAINER (same style as Blog Page) */}

      <div
        className="
          bg-white/10 
          backdrop-blur-md 
          border border-white/20 
          rounded-2xl 
          p-10 
          shadow-2xl
          text-white
        "
      >

        {/* FORM */}
        <form className="flex flex-col gap-6">
          
          {/* Title */}
          <input
            className="
              border border-white/30 
              bg-white/10 
              backdrop-blur-sm 
              p-3 rounded-lg 
              text-white 
              placeholder-white/60
            "
            placeholder="Title"
          />

          {/* Description */}
          <textarea
            className="
              border border-white/30 
              bg-white/10 
              backdrop-blur-sm 
              p-3 rounded-lg 
              text-white 
              placeholder-white/60
            "
            rows={4}
            placeholder="Description"
          />

          {/* Price */}
          <input
            type="number"
            className="
              border border-white/30 
              bg-white/10 
              backdrop-blur-sm 
              p-3 rounded-lg 
              text-white 
              placeholder-white/60
            "
            placeholder="Price per day ($)"
          />

          {/* Location */}
          <input
            className="
              border border-white/30 
              bg-white/10 
              backdrop-blur-sm 
              p-3 rounded-lg 
              text-white 
              placeholder-white/60
            "
            placeholder="Location"
          />

          {/* File Input */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-2">Upload Image</label>
            <input
              type="file"
              className="text-white"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setPreview(URL.createObjectURL(f));
              }}
            />

            {/* Preview */}
            {preview && (
              <img
                src={preview}
                className="w-full h-48 object-cover rounded-xl mt-4 border border-white/30"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              bg-white text-black 
              rounded-full py-3 mt-4 
              font-semibold 
              hover:bg-gray-200 
              transition
            "
          >
            Publish Listing
          </button>
        </form>
      </div>
    </div>
  );
}
