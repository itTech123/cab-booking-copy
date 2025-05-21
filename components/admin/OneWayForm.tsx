"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const Form = () => {
    const [formData, setFormData] = useState({
        title: '',
        cityName: '',
        price: '',
        zone: 'east', // Default zone value
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleZoneChange = (value: string) => {
        setFormData((prev) => ({ ...prev, zone: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/oneWayCabs/add-city`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Form Data Submitted:');
                alert('Form submitted successfully!');
            } else {
                console.error('Error:', data.message);
                alert('Failed to submit form');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error occurred while submitting form');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* City Name Input */}
            <div>
                <Label htmlFor="cityName">City Name</Label>
                <Input
                    type="text"
                    id="cityName"
                    name="cityName"
                    value={formData.cityName}
                    onChange={handleInputChange}
                    placeholder="Enter city name"
                    className={cn("mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-400 shadow-sm")}
                    required
                />
            </div>


            {/* Title Input */}
            <div>
                <Label htmlFor="title">Title</Label>
                <Input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter title"
                    className={cn("mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-400 shadow-sm")}
                    required
                />
            </div>

            {/* Price Input */}
            <div>
                <Label htmlFor="price">Price</Label>
                <Input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                    className={cn("mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-400 shadow-sm")}
                    required
                />
            </div>

            {/* Zone Select */}
            <div>
                <Label htmlFor="zone">Zone</Label>
                <Select onValueChange={handleZoneChange} value={formData.zone}>
                    <SelectTrigger className={cn("mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-400 shadow-sm")}>
                        <SelectValue placeholder="Select a zone" />
                    </SelectTrigger>
                    <SelectContent className="mt-1 bg-white dark:bg-gray-800 border rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {['east', 'west', 'south', 'north', 'central'].map((zone) => (
                            <SelectItem
                                key={zone}
                                value={zone}
                                className={cn("py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 rounded-md")}
                            >
                                {zone}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Submit Button */}
            <div>
                <Button
                    type="submit"
                    className={cn("w-full px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800 shadow-md")}
                >
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default Form;
