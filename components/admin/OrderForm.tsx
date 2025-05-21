'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface OrderFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  isEditMode?: boolean;
}

export default function OrderForm({ initialData, onSubmit, isEditMode = false }: OrderFormProps) {
  // Helper function to safely handle null/undefined values
  const safeValue = (value: any, defaultValue = '') => {
    return value === null || value === undefined ? defaultValue : value;
  };
 
  const [formData, setFormData] = useState({
    name: safeValue(initialData?.name),
    phone: safeValue(initialData?.phone),
    email: safeValue(initialData?.email),
    pickup: safeValue(initialData?.pickup),
    drop: safeValue(initialData?.drop),
    pickupDate: initialData?.pickupDate
      ? new Date(initialData.pickupDate).toISOString().split("T")[0]
      : "",
    returnDate: initialData?.returnDate
      ? new Date(initialData.returnDate).toISOString().split("T")[0]
      : "",
      
    pickupTime: safeValue(initialData?.pickupTime, ""),
    ridefare: safeValue(initialData?.ridefare, ""),
    orderType: safeValue(initialData?.orderType, ''),
    advancePayment: safeValue(initialData?.advancePayment, ""),
    distance: safeValue(initialData?.distance),
    nightAllowence: safeValue(initialData?.nightAllowence, "0"),
    extraHr: safeValue(initialData?.extraHr, "0"),
    extraKm: safeValue(initialData?.extraKm, "0"),
    waitingCharge: safeValue(initialData?.waitingCharge, "0"),
    pinCode : safeValue(initialData?.pinCode, "")
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="orderType">Booking Type</Label>
          <Select
            value={formData.orderType}
            onValueChange={(value) => setFormData({ ...formData, orderType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select booking type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="One-Way">One Way</SelectItem>
              <SelectItem value="Round-Trip">Round Trip</SelectItem>
              <SelectItem value="Rental">Rental</SelectItem>
              <SelectItem value="Airport">Airport</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pickup">Pickup Location</Label>
          <Input
            id="pickup"
            name="pickup"
            value={formData.pickup}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="drop">Drop Location</Label>
          <Input
            id="drop"
            name="drop"
            value={formData.drop}
            onChange={handleChange}
          />
        </div>
         <div className="space-y-2">
          <Label htmlFor="pinCode">Pin Code</Label>
          <Input
            id="pinCode"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pickupDate">Pickup Date</Label>
          <Input
            id="pickupDate"
            name="pickupDate"
            type="date"
            value={formData.pickupDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pickupTime">Pickup Time</Label>
          <Input
            id="pickupTime"
            name="pickupTime"
            type="time"
            value={formData.pickupTime}
            onChange={handleChange}
            required
          />
        </div>
        {formData.orderType === 'Round-Trip' && (
          <div className="space-y-2">
            <Label htmlFor="returnDate">Return Date</Label>
            <Input
              id="returnDate"
              name="returnDate"
              type="date"
              value={formData.returnDate}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="ridefare">Total Fare (₹)</Label>
          <Input
            id="ridefare"
            name="ridefare"
            type="number"
            value={formData.ridefare}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="advancePayment">Advance Payment (₹)</Label>
          <Input
            id="advancePayment"
            name="advancePayment"
            type="number"
            value={formData.advancePayment}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="distance">Distance (km)</Label>
          <Input
            id="distance"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nightAllowence">Night Allowance (₹)</Label>
          <Input
            id="nightAllowence"
            name="nightAllowence"
            type="number"
            value={formData.nightAllowence}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="extraHr">Extra Hours</Label>
          <Input
            id="extraHr"
            name="extraHr"
            type="number"
            value={formData.extraHr}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="extraKm">Extra KM</Label>
          <Input
            id="extraKm"
            name="extraKm"
            type="number"
            value={formData.extraKm}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="waitingCharge">Waiting Charge (₹)</Label>
          <Input
            id="waitingCharge"
            name="waitingCharge"
            type="number"
            value={formData.waitingCharge}
            onChange={handleChange}
          />
        </div>
      </div>
      <Button type="submit" className="w-full md:w-auto">
        {isEditMode ? 'Update Order' : 'Create Order'}
      </Button>
    </form>
  );
}