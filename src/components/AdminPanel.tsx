import React, { useState } from "react";
import { db, storage } from "../firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Property } from "../types";

interface AdminPanelProps {
  ownerEmail: string;
}

const AdminPanel: React.FC<AdminPanelProps> = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [beds, setBeds] = useState<number | string>("");
  const [baths, setBaths] = useState<number | string>("");
  const [area, setArea] = useState<number | string>("");
  const [status, setStatus] = useState("For Sale");
  const [type, setType] = useState("Apartment");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!imageFile) {
      setErrorMsg("Please select an image.");
      return;
    }

    if (!title || !location || !price) {
      setErrorMsg("Title, location, and price are required.");
      return;
    }

    try {
      setLoading(true);

      // 1. Upload image to Storage
      const imageRef = ref(
        storage,
        `properties/${Date.now()}-${imageFile.name}`
      );
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      // 2. Save document in Firestore
      await addDoc(collection(db, "properties"), {
        title,
        location,
        price,
        beds: Number(beds) || 0,
        baths: Number(baths) || 0,
        area: Number(area) || 0,
        status,
        type,
        description,
        imageUrl,
        createdAt: Timestamp.now(),
      });

      setSuccessMsg("Property added successfully!");
      setTitle("");
      setLocation("");
      setPrice("");
      setBeds("");
      setBaths("");
      setArea("");
      setStatus("For Sale");
      setType("Apartment");
      setDescription("");
      setImageFile(null);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to add property. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto my-10">
      <h2 className="text-3xl font-bold mb-4 font-teko">Admin – Add Property</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Beds"
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Baths"
          value={baths}
          onChange={(e) => setBaths(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Area (sqft)"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>For Sale</option>
          <option>For Rent</option>
          <option>Sold</option>
        </select>
        <select
          className="border p-2 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Apartment</option>
          <option>Villa</option>
          <option>Plot</option>
          <option>Commercial</option>
        </select>
      </div>

      <div className="mt-4">
        <textarea
          className="border p-2 rounded w-full min-h-[100px]"
          placeholder="Description (shown in detail modal)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImageFile(e.target.files ? e.target.files[0] : null)
          }
        />
      </div>

      {errorMsg && <p className="text-red-500 mt-2 text-sm">{errorMsg}</p>}
      {successMsg && <p className="text-green-600 mt-2 text-sm">{successMsg}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 bg-orange-600 text-white px-4 py-2 rounded font-semibold disabled:opacity-60"
      >
        {loading ? "Saving..." : "Add Property"}
      </button>
    </div>
  );
};

export default AdminPanel;