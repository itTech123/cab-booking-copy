"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fetchHeading, updateHeading } from "@/actions";
import { toast } from "react-hot-toast";

type HeadingData = {
  title: string;
  description: string;
};

type Headings = {
  texiService1: HeadingData;
  texiService2: HeadingData;
  texiService3: HeadingData;
};

export default function TexiServiceComponent() {
  const [headings, setHeadings] = useState<Headings>({
    texiService1: { title: "", description: "" },
    texiService2: { title: "", description: "" },
    texiService3: { title: "", description: "" },
  });
  const [loadingStates, setLoadingStates] = useState({
    initialLoad: true,
    texiService1: false,
    texiService2: false,
    texiService3: false,
  });

  useEffect(() => {
    const loadHeadings = async () => {
      try {
        const [heading1, heading2, heading3] = await Promise.all([
          fetchHeading("texiService1"),
          fetchHeading("texiService2"),
          fetchHeading("texiService3"),
        ]);

        setHeadings({
          texiService1: heading1 || { title: "", description: "" },
          texiService2: heading2 || { title: "", description: "" },
          texiService3: heading3 || { title: "", description: "" },
        });
      } catch (error) {
        console.error("Error loading headings:", error);
        toast.error("Failed to load headings");
      } finally {
        setLoadingStates(prev => ({ ...prev, initialLoad: false }));
      }
    };

    loadHeadings();
  }, []);

  const handleChange = (headingType: keyof Headings, field: keyof HeadingData, value: string) => {
    setHeadings(prev => ({
      ...prev,
      [headingType]: {
        ...prev[headingType],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (headingType: keyof Headings) => {
    try {
      setLoadingStates(prev => ({ ...prev, [headingType]: true }));
      await updateHeading(headingType, headings[headingType]);
      toast.success(`${formatHeadingName(headingType)} updated successfully!`);
    } catch (error) {
      console.error(`Error updating ${headingType}:`, error);
      toast.error(`Failed to update ${formatHeadingName(headingType)}`);
    } finally {
      setLoadingStates(prev => ({ ...prev, [headingType]: false }));
    }
  };

  const formatHeadingName = (headingType: string) => {
    return headingType
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  if (loadingStates.initialLoad) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Taxi Service Headings</h1>

      {(['texiService1', 'texiService2', 'texiService3'] as const).map((headingType) => (
        <section key={headingType} className="space-y-4 p-6 border rounded-lg bg-card">
          <h2 className="text-xl font-semibold">
            {formatHeadingName(headingType)}
          </h2>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor={`${headingType}-title`}>Title</Label>
              <Input
                id={`${headingType}-title`}
                value={headings[headingType].title}
                onChange={(e) =>
                  handleChange(headingType, "title", e.target.value)
                }
                placeholder="Enter title"
                disabled={loadingStates[headingType]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${headingType}-description`}>Description</Label>
              <Textarea
                id={`${headingType}-description`}
                value={headings[headingType].description}
                onChange={(e) =>
                  handleChange(headingType, "description", e.target.value)
                }
                placeholder="Enter description"
                disabled={loadingStates[headingType]}
                rows={3}
              />
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => handleSubmit(headingType)}
                disabled={loadingStates[headingType]}
              >
                {loadingStates[headingType] ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  `Update ${formatHeadingName(headingType)}`
                )}
              </Button>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}