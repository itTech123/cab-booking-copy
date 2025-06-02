"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from "date-fns";
import toast from 'react-hot-toast';

type OrderType = 'one-way' | 'round-trip' | 'rental' | 'airport';
type BookingStatus = 'pending' | 'booked' | 'cancelled';

interface OrderFormData {
  name: string;
  phone: string;
  email: string;
  pickup: string;
  drop: string;
  pickupDate: Date;
  pickupTime: string;
  returnDate: Date | null;
  ridefare: string;
  orderType: OrderType;
  advancePayment: string;
  distance: string;
  nightAllowence: string;
  extraHr: string;
  extraKm: string;
  waitingCharge: string;
  pinCode: string;
  bookingStatus: BookingStatus;
  carType: string;
  packages: string;
  advanacePaymentConfirmation: boolean;
  dueAmount: string;
  luggage?: string;
  carModel?: string;
  petAllowance?: string;
  refundable?: string;
  chauffeurs?: string
}

export default function CreateOrder() {
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    phone: '',
    email: '',
    pickup: '',
    drop: '',
    pickupDate: new Date(),
    pickupTime: '',
    returnDate: null,
    ridefare: '',
    orderType: 'one-way',
    advancePayment: '',
    distance: '',
    nightAllowence: '',
    extraHr: '',
    extraKm: '',
    waitingCharge: '',
    pinCode: '',
    bookingStatus: 'pending',
    carType: "",
    packages: "",
    advanacePaymentConfirmation: false,
    dueAmount: "",
    luggage: "",
    carModel: "",
    petAllowance: "",
    refundable: "",
    chauffeurs: ""
  });

  const [airportCategory, setAirportCategory] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date: Date | undefined, field: keyof OrderFormData) => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        [field]: date
      }));
    }
  };

  const handleSelectChange = <T extends keyof OrderFormData>(field: T, value: OrderFormData[T]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.phone || !formData.email || !formData.pickup ||
      !formData.pickupDate || !formData.pickupTime || !formData.ridefare || !formData.orderType) {
      toast.error('Please fill all required fields');
      return;
    }

    const loadingToast = toast.loading('Creating order...');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/orders/createOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          pickupDate: formData.pickupDate.toISOString(),
          returnDate: formData.returnDate ? formData.returnDate.toISOString() : null
        }),
      });

      if (response.ok) {
        toast.dismiss(loadingToast);
        toast.success('Order created successfully');

        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          pickup: '',
          drop: '',
          pickupDate: new Date(),
          pickupTime: '',
          returnDate: null,
          ridefare: '',
          orderType: 'one-way',
          advancePayment: '',
          distance: '',
          nightAllowence: '',
          extraHr: '',
          extraKm: '',
          waitingCharge: '',
          pinCode: '',
          bookingStatus: 'pending',
          carType: "",
          packages: "",
          advanacePaymentConfirmation: false,
          dueAmount: "",
          luggage: "",
          carModel: "",
          petAllowance: "",
          refundable: "",
          chauffeurs: ""
        });
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to create order. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Order</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Customer name"
              required
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone number"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
            />
          </div>

          {/* Airport Category */}
          {formData.orderType === 'airport' &&
            <>
              <div className="space-y-2">
                <Label htmlFor="AirportType">Select Airpot Type *</Label>
                <Select
                  value={airportCategory}
                  onValueChange={(value) => setAirportCategory(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="drop">Drop to Airport</SelectItem>
                    <SelectItem value="pickup">Pickup from Airport</SelectItem>
                  </SelectContent>
                </Select>
              </div>


              {airportCategory === "pickup" ? <div className="space-y-2">
                <Label htmlFor="pickup">Pickup Airport *</Label>
                <Input
                  id="pickup"
                  name="pickup"
                  value={formData.pickup}
                  onChange={handleChange}
                  placeholder="Pickup Airport"
                  required
                />
              </div> :
                <div className="space-y-2">
                  <Label htmlFor="pickup">Pickup Address *</Label>
                  <Input
                    id="pickup"
                    name="pickup"
                    value={formData.pickup}
                    onChange={handleChange}
                    placeholder="Pickup Address"
                    required
                  />
                </div>
              }

              {
                airportCategory === "drop" ?
                  <div className="space-y-2">
                    <Label htmlFor="drop">Drop Airport</Label>
                    <Input
                      id="drop"
                      name="drop"
                      value={formData.drop}
                      onChange={handleChange}
                      placeholder="Drop address"
                    />
                  </div> :
                  <div className="space-y-2">
                    <Label htmlFor="drop">Drop Location</Label>
                    <Input
                      id="drop"
                      name="drop"
                      value={formData.drop}
                      onChange={handleChange}
                      placeholder="Drop address"
                    />
                  </div>
              }
            </>
          }
          {/* Pickup Location */}
          {formData.orderType !== "airport" && <div className="space-y-2">
            <Label htmlFor="pickup">Pickup Location *</Label>
            <Input
              id="pickup"
              name="pickup"
              value={formData.pickup}
              onChange={handleChange}
              placeholder="Pickup address"
              required
            />
          </div>}

          {/* Drop Location */}
          {(formData.orderType !== "rental" && formData.orderType !== "airport") && (
            <div className="space-y-2">
              <Label htmlFor="drop">Drop Location</Label>
              <Input
                id="drop"
                name="drop"
                value={formData.drop}
                onChange={handleChange}
                placeholder="Drop address"
              />
            </div>
          )}

          {
            formData.orderType === "rental" &&
            <div className="space-y-2">
              <Label htmlFor="packages">Packages *</Label>
              <Select
                value={formData.packages}
                onValueChange={(value) => handleSelectChange('packages', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Package" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1HR 15KM">1HR 15KM</SelectItem>
                  <SelectItem value="3HR 15KM">3HR 15KM</SelectItem>
                  <SelectItem value="5HR 50KM">5HR 50KM</SelectItem>
                  <SelectItem value="8HR 80KM">8HR 80KM</SelectItem>
                  <SelectItem value="10HR 100KM">10HR 100KM</SelectItem>
                  <SelectItem value="12HR 120KM">12HR 120KM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          }

          {/* Booking Status */}
          <div className="space-y-2">
            <Label htmlFor="bookingStatus">Booking Status *</Label>
            <Select
              value={formData.bookingStatus}
              onValueChange={(value) => handleSelectChange('bookingStatus', value as BookingStatus)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select booking status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="booked">Booked</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* car Type */}
          <div className="space-y-2">
            <Label htmlFor="carType">Car Type*</Label>
            <Select
              value={formData.carType}
              onValueChange={(value) => handleSelectChange('carType', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Car Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MINI/HATCHBACK">MINI/HATCHBACK</SelectItem>
                <SelectItem value="SEDAN">SEDAN</SelectItem>
                <SelectItem value="SUV">SUV</SelectItem>
                <SelectItem value="SUV+">SUV+</SelectItem>
                <SelectItem value="13 SEATER TRAVELLER">13 SEATER TRAVELLER</SelectItem>
                <SelectItem value="17 SEATER TRAVELLER">17 SEATER TRAVELLER</SelectItem>
                <SelectItem value="24 SEATER TRAVELLER">24 SEATER TRAVELLER</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pickup Date */}
          <div className="space-y-2">
            <Label>Pickup Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.pickupDate ? format(formData.pickupDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.pickupDate}
                  onSelect={(date) => handleDateChange(date, 'pickupDate')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Pickup Time */}
          <div className="space-y-2">
            <Label htmlFor="pickupTime">Pickup Time *</Label>
            <Input
              id="pickupTime"
              name="pickupTime"
              type="time"
              value={formData.pickupTime}
              onChange={handleChange}
              required
            />
          </div>

          {/* Return Date */}
          {formData.orderType === "round-trip" &&
            <div className="space-y-2">
              <Label>Return Date (for round trips)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.returnDate ? format(formData.returnDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.returnDate || undefined}
                    onSelect={(date) => handleDateChange(date, 'returnDate')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>}

          {/* Order Type */}
          <div className="space-y-2">
            <Label htmlFor="orderType">Order Type *</Label>
            <Select
              value={formData.orderType}
              onValueChange={(value) => handleSelectChange('orderType', value as OrderType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select order type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one-way">One Way</SelectItem>
                <SelectItem value="round-trip">Round Trip</SelectItem>
                <SelectItem value="rental">Rental</SelectItem>
                <SelectItem value="airport">Aiport</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ride Fare */}
          <div className="space-y-2">
            <Label htmlFor="ridefare">Ride Fare *</Label>
            <Input
              id="ridefare"
              name="ridefare"
              type="number"
              value={formData.ridefare}
              onChange={handleChange}
              placeholder="Amount in ₹"
              required
            />
          </div>

          {/*  luggage */}
          <div className="space-y-2">
            <Label htmlFor="luggage">Luggage Amount*</Label>
            <Input
              id="luggage"
              name="luggage"
              type="number"
              value={formData.luggage}
              onChange={handleChange}
              placeholder="Amount in ₹"
              required
            />
          </div>
          {/*  carModel */}
          <div className="space-y-2">
            <Label htmlFor="carModel"> New Car Model Amount*</Label>
            <Input
              id="carModel"
              name="carModel"
              type="number"
              value={formData.carModel}
              onChange={handleChange}
              placeholder="Amount in ₹"
              required
            />
          </div>
          {/* petAllowance  */}
          <div className="space-y-2">
            <Label htmlFor="petAllowance"> Pet Allowance Amount*</Label>
            <Input
              id="petAllowance"
              name="petAllowance"
              type="number"
              value={formData.petAllowance}
              onChange={handleChange}
              placeholder="Amount in ₹"
              required
            />
          </div>
          {/* refundable  */}
          <div className="space-y-2">
            <Label htmlFor="refundable"> Refundable Amount Charge*</Label>
            <Input
              id="refundable"
              name="refundable"
              type="number"
              value={formData.refundable}
              onChange={handleChange}
              placeholder="Amount in ₹"
              required
            />
          </div>
          {/* chauffeurs   */}
          <div className="space-y-2">
            <Label htmlFor="chauffeurs"> Chauffeurs  Charge*</Label>
            <Input
              id="chauffeurs"
              name="chauffeurs"
              type="number"
              value={formData.chauffeurs}
              onChange={handleChange}
              placeholder="Amount in ₹"
              required
            />
          </div>
          {/* Advance Payment */}
          <div className="space-y-2">
            <Label htmlFor="advancePaymentConfirmation">Advance Payment</Label>
            <select
              id="advancePaymentConfirmation"
              name="advancePaymentConfirmation"
              value={formData.advanacePaymentConfirmation.toString()}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  advanacePaymentConfirmation: e.target.value === "true"
                }))
              }
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select an option</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>



          {/* Advance Payment */}
          <div className="space-y-2">
            <Label htmlFor="advancePayment">Advance Payment</Label>
            <Input
              id="advancePayment"
              name="advancePayment"
              type="number"
              value={formData.advancePayment}
              onChange={handleChange}
              placeholder="Amount in ₹"
            />
          </div>
          {/* due Amount */}
          <div className="space-y-2">
            <Label htmlFor="duePayment">Due Amount</Label>
            <Input
              id="dueAmount"
              name="dueAmount"
              type="number"
              value={formData.dueAmount}
              onChange={handleChange}
              placeholder="Amount in ₹"
            />
          </div>

          {/* Distance */}
          <div className="space-y-2">
            <Label htmlFor="distance">Distance (km)</Label>
            <Input
              id="distance"
              name="distance"
              type="number"
              value={formData.distance}
              onChange={handleChange}
              placeholder="Distance in kilometers"
            />
          </div>

          {/* Night Allowance */}
          <div className="space-y-2">
            <Label htmlFor="nightAllowence">Night Allowance</Label>
            <Input
              id="nightAllowence"
              name="nightAllowence"
              type="number"
              value={formData.nightAllowence}
              onChange={handleChange}
              placeholder="Amount in ₹"
            />
          </div>

          {/* Extra Hours */}
          <div className="space-y-2">
            <Label htmlFor="extraHr">Extra Hours</Label>
            <Input
              id="extraHr"
              name="extraHr"
              type="number"
              value={formData.extraHr}
              onChange={handleChange}
              placeholder="Number of hours"
            />
          </div>

          {/* Extra KM */}
          <div className="space-y-2">
            <Label htmlFor="extraKm">Extra Kilometers</Label>
            <Input
              id="extraKm"
              name="extraKm"
              type="number"
              value={formData.extraKm}
              onChange={handleChange}
              placeholder="Distance in kilometers"
            />
          </div>

          {/* Waiting Charge */}
          <div className="space-y-2">
            <Label htmlFor="waitingCharge">Waiting Charge</Label>
            <Input
              id="waitingCharge"
              name="waitingCharge"
              type="number"
              value={formData.waitingCharge}
              onChange={handleChange}
              placeholder="Amount in ₹"
            />
          </div>

          {/* Pin Code */}
          <div className="space-y-2">
            <Label htmlFor="pinCode">Pin Code</Label>
            <Input
              id="pinCode"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              placeholder="Area pin code"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Create Order</Button>
        </div>
      </form>
    </div>
  );
}