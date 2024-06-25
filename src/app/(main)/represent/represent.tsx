import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from "@clerk/nextjs";
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
}

const Represent: React.FC<{ brandId: string, onClose: () => void }> = ({ brandId, onClose }) => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({ fullName: '', email: '', phone: '' });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/representation-requests', {
        userId,
        brandId,
        contactInfo
      });
      if (response.status === 200) {
        setStep(4);
        toast({
          title: "Request submitted",
          description: "We're reviewing your request and will follow up soon.",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Benefits</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
              <li>Full brand research and outreach</li>
              <li>Professional representation</li>
              <li>Expert negotiation on your behalf</li>
            </ul>
            <p className="text-sm font-semibold text-white">Our commission: 8%</p>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={() => setStep(2)}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Contact Info</h2>
            <Input
              placeholder="Full Name"
              value={contactInfo.fullName}
              onChange={(e) => setContactInfo({ ...contactInfo, fullName: e.target.value })}
              className="w-full bg-gray-700 text-white border-gray-600"
            />
            <Input
              placeholder="Email"
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              className="w-full bg-gray-700 text-white border-gray-600"
            />
            <Input
              placeholder="Phone"
              type="tel"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              className="w-full bg-gray-700 text-white border-gray-600"
            />
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)} className="text-white border-gray-600">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={() => setStep(3)} className="bg-indigo-600 hover:bg-indigo-700">
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Terms</h2>
            <div className="h-40 overflow-y-auto border border-gray-600 p-2 text-sm text-gray-300">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm text-white">I agree to the terms and conditions</label>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)} className="text-white border-gray-600">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleSubmit} disabled={!agreedToTerms} className="bg-indigo-600 hover:bg-indigo-700">
                Submit
              </Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-bold text-white">Request Submitted</h2>
            <p className="text-sm text-gray-300">We're reviewing your request and will follow up soon.</p>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={onClose}>Close</Button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-gray-800 p-6 rounded-lg w-full max-w-sm">
        {renderStep()}
      </div>
    </div>
  );
};

export default Represent;