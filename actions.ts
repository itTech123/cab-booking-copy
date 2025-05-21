import { toast } from "react-hot-toast";

export const fetchHeading = async (headingType: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/heading/get-heading/${headingType}`);
    if (!res.ok) throw new Error("Failed to fetch heading");
    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    toast.error("Failed to load heading");
    return null;
  }
};

export const updateHeading = async (headingType: string, data: { title: string; description: string }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/heading/update-heading/${headingType}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) throw new Error("Failed to update heading");
    
    const result = await res.json();
    toast.success("Heading updated successfully!");
    return result;
  } catch (err) {
    console.error("Update error:", err);
    toast.error("Failed to update heading");
    throw err;
  }
};