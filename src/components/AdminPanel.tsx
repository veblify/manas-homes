import React, { useState } from "react";

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
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 10) {
      setErrorMsg("You can upload a maximum of 10 images.");
      return;
    }
    setImages(files);
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!title || !location || !price) {
      setErrorMsg("Title, location, and price are required.");
      return;
    }

    try {
      setLoading(true);

      // Convert images to base64
      const base64Images: string[] = [];
      for (let i = 0; i < images.length; i++) {
        const base64 = await toBase64(images[i]);
        base64Images.push(base64);
      }

      // Build WhatsApp message
      let message = `New Property Submission:

Title: ${title}
Location: ${location}
Price: ${price}
Beds: ${beds}
Baths: ${baths}
Area: ${area}
Status: ${status}
Type: ${type}
Description: ${description}

Images (base64):
`;

      base64Images.forEach((img, index) => {
        message += `Image ${index + 1}: ${img}\n\n`;
      });

      const encoded = encodeURIComponent(message);

      // YOUR WhatsApp number
      const phone = "+919691151915";

      // Send to your WhatsApp
      fetch(`https://wa.me/${phone}?text=${encoded}`);

      setSuccessMsg("Your property will be added within 24 hours.");
      setLoading(false);

      // Reset form
      setTitle("");
      setLocation("");
      setPrice("");
      setBeds("");
      setBaths("");
      setArea("");
      setStatus("For Sale");
      setType("Apartment");
      setDescription("");
      setImages([]);

    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto my-10">
      <h2 className="text-3xl font-bold mb-4 font-teko">Admin – Add Property</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="border p-2 rounded" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Beds" value={beds} onChange={(e) => setBeds(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Baths" value={baths} onChange={(e) => setBaths(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Area (sqft)" value={area} onChange={(e) => setArea(e.target.value)} />

        <select className="border p-2 rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>For Sale</option>
          <option>For Rent</option>
          <option>Sold</option>
        </select>

        <select className="border p-2 rounded" value={type} onChange={(e) => setType(e.target.value)}>
          <option>Apartment</option>
          <option>Villa</option>
          <option>Plot</option>
          <option>Commercial</option>
        </select>
      </div>

      <textarea
        className="border p-2 rounded w-full min-h-[100px] mt-4"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        multiple
        className="mt-4"
        onChange={handleImageUpload}
      />

      {errorMsg && <p className="text-red-500 mt-2 text-sm">{errorMsg}</p>}
      {successMsg && <p className="text-green-600 mt-2 text-sm">{successMsg}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 bg-orange-600 text-white px-4 py-2 rounded font-semibold disabled:opacity-60"
      >
        {loading ? "Sending..." : "Add Property"}
      </button>
    </div>
  );
};

export default AdminPanel;