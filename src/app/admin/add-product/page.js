"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
    stock: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("✅ Product added successfully");
      // Reset form after submit
      setFormData({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        category: "",
        stock: ""
      });
    }
  };

  return (
    <Card className="max-w-lg mx-auto shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Product Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Cotton T-Shirt" required />
          </div>

          <div>
            <Label>Description</Label>
            <Input name="description" value={formData.description} onChange={handleChange} placeholder="Short product details" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Price ($)</Label>
              <Input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="49.99" required />
            </div>

            <div>
              <Label>Stock</Label>
              <Input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="100" />
            </div>
          </div>

          <div>
            <Label>Image URL</Label>
            <Input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" />
          </div>

          <div>
            <Label>Category</Label>
            <Input name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Men's Wear" />
          </div>

          <Button type="submit" className="w-full cursor-pointer">Add Product</Button>
        </form>
      </CardContent>
    </Card>
  );
}
