"use client"
import React, { useState } from 'react';
import { Camera, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const EditProfile = () => {
  const [imageHover, setImageHover] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      const data = new FormData();
      data.append('profileImage', file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }
  
    console.log('Form Data:', formData);
  
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "def@email.com", 
          newPassword: formData.newPassword,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to update password");
      }
  
      alert("Password updated successfully");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  
    // Simulate saving and trigger animation
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }, 1000);
  };  

  return (
    <form onSubmit={handleSubmit}>
      <div className={`min-h-full   w-full   `}>
        <motion.div
          className={`max-w-4xl mx-auto ${isSaved ? 'outline outline-4 outline-green-400 animate-pulse' : ''} bg-slate-800/50 rounded-2xl p-6 md:p-8 lg:p-10 backdrop-blur-sm`}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 text-center transition-all">
            CHANGE PASSWORD
          </h1>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="form-group relative">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Old Password
              </label>
              <input
                type={showOldPassword ? 'text' : 'password'}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-400 transition-all"
                placeholder="Enter old password"
              />
              <button type="button" onClick={() => setShowOldPassword(!showOldPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {showOldPassword ? <EyeOff className="text-gray-300" /> : <Eye className="text-gray-300 mt-5 " />}
              </button>
            </div>

            <div className="form-group relative">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                New Password
              </label>
              <input
                type={showNewPassword ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-400 transition-all"
                placeholder="Enter new password"
              />
              <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {showNewPassword ? <EyeOff className="text-gray-300" /> : <Eye className="text-gray-300 mt-5" />}
              </button>
            </div>

            <div className="form-group relative">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-400 transition-all"
                placeholder="Confirm new password"
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-9 transform -translate-y-1/2">
                {showConfirmPassword ? <EyeOff className="text-gray-300" /> : <Eye className="text-gray-300 mt-5" />}
              </button>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button type="submit" className="px-8 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-900">
              CHANGE PASSWORD
            </button>
          </div>
        </motion.div>
      </div>
    </form>
  );
};

export default EditProfile;