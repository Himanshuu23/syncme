"use client"
import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';

const EditProfile = () => {
  const [imageHover, setImageHover] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    displayName: '',
    fullName: '',
    secondaryEmail: '',
    username: '',
    email: '',
    phoneNumber: '',
    country: 'India',
    state: '',
    zipCode: ''
  });
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    console.log('Form Data:', Object.fromEntries(data.entries()));

    if (profileImage) {
      console.log('Profile Image:', profileImage);
    }

    setTimeout(() => {
      setIsSaving(false);
    }, 2000);

    // Call your API here with the FormData object
    // Example: axios.post('/api/endpoint', data)
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen bg-transparent mx-auto w-full p-4 md:p-8 lg:p-12">
        <motion.div
          className={`max-w-4xl mx-auto bg-slate-800/50 rounded-2xl p-6 md:p-8 lg:p-10 backdrop-blur-sm ${isSaving ? 'outline outline-4 outline-green-400 animate-pulse' : ''}`}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 text-center transition-all">
            EDIT PROFILE
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="profileImageInput"
              />
              <label htmlFor="profileImageInput" className="cursor-pointer">
                <div className="relative group">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-orange-400 transition-transform duration-300 ease-in-out transform hover:scale-105">
                    <img
                      src={profileImage || "/api/placeholder/400/400"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 m-auto ${profileImage ? 'hidden' : 'flex'} items-center justify-center`}>
                      <Camera className="w-5 h-5 text-orange-400 mr-1" />
                      <span className="text-orange-400"> Upload Image</span>
                    </div>
                  </div>
                  <div className={`absolute inset-0 bg-black/50  rounded-full flex items-center justify-center transition-opacity duration-300 ${imageHover ? 'opacity-100' : 'opacity-0'}`}>
                    <Camera className="w-12 h-12 text-white" />
                  </div>
                </div>
                
              </label>
            </div>

            {/* Form Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Display name
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-400 transition-all"
                    placeholder="Enter display name"
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-400 transition-all"
                    placeholder="Enter full name"
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Secondary Email
                  </label>
                  <input
                    type="email"
                    name="secondaryEmail"
                    value={formData.secondaryEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-400 transition-all"
                    placeholder="Enter secondary email"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="form-group">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-400 transition-all"
                    placeholder="Enter username"
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-400 transition-all"
                    placeholder="Enter email"
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-400 transition-all"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-group">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Country/Region
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-400 transition-all"
                    placeholder="Enter country"
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    States
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-400 transition-all"
                    placeholder="Enter state"
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-400 transition-all"
                    placeholder="Enter zip code"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button type="submit" className="px-8 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-900">
              SAVE CHANGES
            </button>
          </div>
        </motion.div>
      </div>
    </form>
  );
};

export default EditProfile;