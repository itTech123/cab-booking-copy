"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import BlogEditorWithPreview from "@/components/admin/blogPreview";
import { fetchHeading, updateHeading } from "@/actions";

type Heading = {
  title: string;
  description: string;
  headingType: string;
};

const HomeAdmin = () => {
  const [heading, setHeading] = useState<Omit<Heading, "headingType">>({
    title: "",
    description: "",
  });

  const [blogHeading, setBlogHeading] = useState<Omit<Heading, "headingType">>({
    title: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
   const [isBlogLoading, setIsBlogLoading] = useState(false);
  useEffect(() => {
    const loadHeading = async () => {
      try {
        setIsLoading(true);
        const homeData = await fetchHeading("homeHeading");
        if (homeData) {
          setHeading({
            title: homeData.title,
            description: homeData.description,
          });
        }

        const blogData = await fetchHeading("blogHeading");
        if (blogData) {
          setBlogHeading({
            title: blogData.title,
            description: blogData.description,
          });
        }
      } catch (err) {
        console.error("Error loading headings:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadHeading();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeading((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBlogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogHeading((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      await updateHeading("homeHeading", heading);
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlogUpdate = async () => {
    try {
      setIsBlogLoading(true);
      await updateHeading("blogHeading", blogHeading);
    } catch (err) {
      console.error("Blog update failed:", err);
    } finally {
      setIsBlogLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Home Heading Editor */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Edit Home Heading</h2>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={heading.title}
            onChange={handleChange}
            placeholder="Enter heading title"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            value={heading.description}
            onChange={handleChange}
            placeholder="Enter heading description"
            disabled={isLoading}
          />
        </div>

        <Button onClick={handleUpdate} disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Heading"}
        </Button>
      </div>

      {/* Blog Heading Editor */}
      <div className="space-y-4 border-t pt-6">
        <h2 className="text-2xl font-bold">Edit Blog Heading</h2>

        <div className="space-y-2">
          <Label htmlFor="blogTitle">Title</Label>
          <Input
            id="blogTitle"
            name="title"
            value={blogHeading.title}
            onChange={handleBlogChange}
            placeholder="Enter blog heading title"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="blogDescription">Description</Label>
          <Input
            id="blogDescription"
            name="description"
            value={blogHeading.description}
            onChange={handleBlogChange}
            placeholder="Enter blog heading description"
            disabled={isLoading}
          />
        </div>

        <Button onClick={handleBlogUpdate} disabled={isBlogLoading}>
          {isLoading ? "Updating..." : "Update Blog Heading"}
        </Button>
      </div>

      {/* Blog Editor Preview */}
      <div className="border-t pt-6">
        <BlogEditorWithPreview />
      </div>
    </div>
  );
};

export default HomeAdmin;