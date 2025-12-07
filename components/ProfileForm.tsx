"use client";

import { useState } from "react";

export default function ProfileForm() {
  const [form, setForm] = useState({
    name: "John Doe",
    email: "john@email.com",
    phone: "",
    bio: "",
  });

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function saveProfile() {
    console.log("Saving profile:", form);
    alert("Profile saved!");
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-5">
      <h2 className="text-xl font-bold">Edit Profile</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        placeholder="Full Name"
      />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        placeholder="Email"
      />

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        placeholder="Phone"
      />

      <textarea
        name="bio"
        value={form.bio}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        placeholder="Short Bio"
      />

      <button
        onClick={saveProfile}
        className="w-full bg-black text-white py-3 rounded hover:opacity-80"
      >
        Save Profile
      </button>
    </div>
  );
}
