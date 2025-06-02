"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UploadCloud, X } from "lucide-react";
import { useState, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface FormData {
  fullName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  businessName: string;
  tradeLicense: string;
  gstNumber: string;
  panNumber: string;
  aadharNumber: string;
}


interface FileState {
  tradeLicenseFront: File | null;
  tradeLicenseBack: File | null;
  gstCertificateFront: File | null;
  gstCertificateBack: File | null;
  panCardFront: File | null;
  panCardBack: File | null;
  aadharCardFront: File | null;
  aadharCardBack: File | null;
}

interface FileInputRefs {
  tradeLicenseFront: React.RefObject<HTMLInputElement | null>;
  tradeLicenseBack: React.RefObject<HTMLInputElement | null>;
  gstCertificateFront: React.RefObject<HTMLInputElement | null>;
  gstCertificateBack: React.RefObject<HTMLInputElement | null>;
  panCardFront: React.RefObject<HTMLInputElement | null>;
  panCardBack: React.RefObject<HTMLInputElement | null>;
  aadharCardFront: React.RefObject<HTMLInputElement | null>;
  aadharCardBack: React.RefObject<HTMLInputElement | null>;
}

interface DocumentUploadBoxProps {
  file: File | null;
  onClick: () => void;
  onRemove: () => void;
  label: string;
}

export default function UploadVendorDetails() {
  const params = useSearchParams();
  console.log(params)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    businessName: "",
    tradeLicense: "",
    gstNumber: "",
    panNumber: "",
    aadharNumber: "",
  });


  const [files, setFiles] = useState<FileState>({
    tradeLicenseFront: null,
    tradeLicenseBack: null,
    gstCertificateFront: null,
    gstCertificateBack: null,
    panCardFront: null,
    panCardBack: null,
    aadharCardFront: null,
    aadharCardBack: null,
  });

  const fileInputRefs: FileInputRefs = {
    tradeLicenseFront: useRef<HTMLInputElement>(null),
    tradeLicenseBack: useRef<HTMLInputElement>(null),
    gstCertificateFront: useRef<HTMLInputElement>(null),
    gstCertificateBack: useRef<HTMLInputElement>(null),
    panCardFront: useRef<HTMLInputElement>(null),
    panCardBack: useRef<HTMLInputElement>(null),
    aadharCardFront: useRef<HTMLInputElement>(null),
    aadharCardBack: useRef<HTMLInputElement>(null),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: keyof FileState
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({ ...prev, [fileType]: e.target.files![0] }));
    }
  };

  const removeFile = (fileType: keyof FileState) => {
    setFiles(prev => ({ ...prev, [fileType]: null }));
    if (fileInputRefs[fileType].current) {
      fileInputRefs[fileType].current!.value = "";
    }
  };

  const triggerFileInput = (fileType: keyof FileState) => {
    fileInputRefs[fileType].current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
 
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/vendor/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Vendor details updated successfully!');
      console.log('Updated vendor:', result.vendor);
    } else {
      alert(result.message || 'Failed to update vendor details.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while updating vendor details.');
  }
};


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto"> {/* Increased max width */}
        <Card className="shadow-lg border border-gray-200 rounded-xl overflow-hidden">
          <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-800 p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <UploadCloud className="h-8 w-8 text-white" />
                <CardTitle className="text-2xl font-bold text-white">
                  Create Merchant Profile
                </CardTitle>
              </div>
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Image
                  src="/txigo-logo.jpg"
                  alt="Logo"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Input Fields Section */}
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 block">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="h-12 text-base px-4 py-3 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-sm font-medium text-gray-700 block">
                      Business Name
                    </Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      className="h-12 text-base px-4 py-3 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Address - Full width */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700 block">
                    Address Details
                  </Label>

                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Street Address"
                    className="text-lg px-4 py-3 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      className="text-lg px-4 py-3 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      required
                    />

                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      className="text-lg px-4 py-3 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      required
                    />

                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="text-lg px-4 py-3 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tradeLicense" className="text-sm font-medium text-gray-700 block">
                      Trade License No.
                    </Label>
                    <Input
                      id="tradeLicense"
                      name="tradeLicense"
                      value={formData.tradeLicense}
                      onChange={handleChange}
                      className="h-12 text-base px-4 py-3 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gstNumber" className="text-sm font-medium text-gray-700 block">
                      GST Number
                    </Label>
                    <Input
                      id="gstNumber"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleChange}
                      placeholder="22AAAAA0000A1Z5"
                      className="h-12 text-base px-4 py-3 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="panNumber" className="text-sm font-medium text-gray-700 block">
                      PAN Number
                    </Label>
                    <Input
                      id="panNumber"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                      placeholder="AAAAA0000A"
                      className="h-12 text-base px-4 py-3 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aadharNumber" className="text-sm font-medium text-gray-700 block">
                      Aadhar Number
                    </Label>
                    <Input
                      id="aadharNumber"
                      name="aadharNumber"
                      value={formData.aadharNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012"
                      className="h-12 text-base px-4 py-3 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Document Upload Sections */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                  Upload Documents
                </h3>

                {/* Trade License */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 block">Trade License</Label>
                  <div className="flex gap-4">
                    <DocumentUploadBox
                      file={files.tradeLicenseFront}
                      onClick={() => triggerFileInput('tradeLicenseFront')}
                      onRemove={() => removeFile('tradeLicenseFront')}
                      label="Front"

                    />
                    <input
                      type="file"
                      ref={fileInputRefs.tradeLicenseFront}
                      onChange={(e) => handleFileChange(e, 'tradeLicenseFront')}
                      className="hidden"
                      accept="image/*,.pdf"
                      required
                    />

                    <DocumentUploadBox
                      file={files.tradeLicenseBack}
                      onClick={() => triggerFileInput('tradeLicenseBack')}
                      onRemove={() => removeFile('tradeLicenseBack')}
                      label="Back"

                    />
                    <input
                      type="file"
                      ref={fileInputRefs.tradeLicenseBack}
                      onChange={(e) => handleFileChange(e, 'tradeLicenseBack')}
                      className="hidden"
                      accept="image/*,.pdf"
                    />
                  </div>
                </div>

                {/* Repeat similar styling for other document upload sections... */}
                {/* GST Certificate */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 block">GST Certificate</Label>
                  <div className="flex gap-4">
                    <DocumentUploadBox
                      file={files.gstCertificateFront}
                      onClick={() => triggerFileInput('gstCertificateFront')}
                      onRemove={() => removeFile('gstCertificateFront')}
                      label="Front"

                    />
                    <input
                      type="file"
                      ref={fileInputRefs.gstCertificateFront}
                      onChange={(e) => handleFileChange(e, 'gstCertificateFront')}
                      className="hidden"
                      accept="image/*,.pdf"
                      required
                    />

                    <DocumentUploadBox
                      file={files.gstCertificateBack}
                      onClick={() => triggerFileInput('gstCertificateBack')}
                      onRemove={() => removeFile('gstCertificateBack')}
                      label="Back"

                    />
                    <input
                      type="file"
                      ref={fileInputRefs.gstCertificateBack}
                      onChange={(e) => handleFileChange(e, 'gstCertificateBack')}
                      className="hidden"
                      accept="image/*,.pdf"
                    />
                  </div>
                </div>

                {/* PAN Card */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 block">PAN Card</Label>
                  <div className="flex gap-4">
                    <DocumentUploadBox
                      file={files.panCardFront}
                      onClick={() => triggerFileInput('panCardFront')}
                      onRemove={() => removeFile('panCardFront')}
                      label="Front"

                    />
                    <input
                      type="file"
                      ref={fileInputRefs.panCardFront}
                      onChange={(e) => handleFileChange(e, 'panCardFront')}
                      className="hidden"
                      accept="image/*,.pdf"
                      required
                    />

                    <DocumentUploadBox
                      file={files.panCardBack}
                      onClick={() => triggerFileInput('panCardBack')}
                      onRemove={() => removeFile('panCardBack')}
                      label="Back"

                    />
                    <input
                      type="file"
                      ref={fileInputRefs.panCardBack}
                      onChange={(e) => handleFileChange(e, 'panCardBack')}
                      className="hidden"
                      accept="image/*,.pdf"
                    />
                  </div>
                </div>

                {/* Aadhar Card */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 block">Aadhar Card</Label>
                  <div className="flex gap-4">
                    <DocumentUploadBox
                      file={files.aadharCardFront}
                      onClick={() => triggerFileInput('aadharCardFront')}
                      onRemove={() => removeFile('aadharCardFront')}
                      label="Front"

                    />
                    <input
                      type="file"
                      ref={fileInputRefs.aadharCardFront}
                      onChange={(e) => handleFileChange(e, 'aadharCardFront')}
                      className="hidden"
                      accept="image/*,.pdf"
                      required
                    />

                    <DocumentUploadBox
                      file={files.aadharCardBack}
                      onClick={() => triggerFileInput('aadharCardBack')}
                      onRemove={() => removeFile('aadharCardBack')}
                      label="Back"

                    />
                    <input
                      type="file"
                      ref={fileInputRefs.aadharCardBack}
                      onChange={(e) => handleFileChange(e, 'aadharCardBack')}
                      className="hidden"
                      accept="image/*,.pdf"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-lg shadow-md transition-all transform hover:scale-[1.01]"
                >
                  Submit Application
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DocumentUploadBox({ file, onClick, onRemove, label }: DocumentUploadBoxProps) {
  return (
    <div
      onClick={onClick}
      className="relative w-full h-24 border-2 border-dashed rounded-md cursor-pointer hover:border-blue-400 transition-colors overflow-hidden"
    >
      {file ? (
        <>
          <Image
            src={URL.createObjectURL(file)}
            alt="Document preview"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
          >
            <X className="h-3 w-3" />
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <UploadCloud className="h-5 w-5" />
          <span className="text-xs mt-1">{label}</span>
        </div>
      )}
    </div>
  );
}