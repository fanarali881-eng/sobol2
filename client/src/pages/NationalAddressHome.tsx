import { useState } from "react";
import { Link } from "wouter";


export default function NationalAddressHome() {
  const [activeTab, setActiveTab] = useState("individual");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white" dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif" }}>
      {/* Top Header Bar - الشريط الأخضر العلوي */}
      <div className="bg-[#143c3c] text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 md:h-12">
            {/* Right Side - Tabs */}
            <div className="hidden md:flex items-center gap-0">
              <button 
                onClick={() => setActiveTab("individual")}
                className={`px-4 md:px-6 py-2 md:py-3 font-medium text-xs md:text-sm ${activeTab === "individual" ? "bg-[#f7e733] text-[#143c3c]" : "text-white hover:bg-[#0f2e2e]"}`}
              >
                الأفراد
              </button>
              <button 
                onClick={() => setActiveTab("enterprise")}
                className={`px-4 md:px-6 py-2 md:py-3 font-medium text-xs md:text-sm ${activeTab === "enterprise" ? "bg-[#f7e733] text-[#143c3c]" : "text-white hover:bg-[#0f2e2e]"}`}
              >
                الأعمال
              </button>
              <button 
                onClick={() => setActiveTab("government")}
                className={`px-4 md:px-6 py-2 md:py-3 font-medium text-xs md:text-sm ${activeTab === "government" ? "bg-[#f7e733] text-[#143c3c]" : "text-white hover:bg-[#0f2e2e]"}`}
              >
                الخدمات الحكومية
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Left Side - Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <a href="#" className="hidden md:block text-white text-sm hover:underline">مساعدة</a>
              <button className="text-white">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button className="text-white">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <a href="#" className="text-white text-xs md:text-sm hover:underline">English</a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#143c3c] text-white py-4 px-4">
          <div className="flex flex-col gap-2">
            <button className="px-4 py-2 bg-[#f7e733] text-[#143c3c] font-medium text-sm rounded">الأفراد</button>
            <button className="px-4 py-2 text-white font-medium text-sm">الأعمال</button>
            <button className="px-4 py-2 text-white font-medium text-sm">الخدمات الحكومية</button>
            <a href="#" className="px-4 py-2 text-white text-sm">مساعدة</a>
          </div>
        </div>
      )}

      {/* Main Navigation - الهيدر الأبيض */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <img src="/images/spl-logo.png" alt="سبل" className="h-10 md:h-12 w-auto" />
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#143c3c]">إرسال</a>
              <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#143c3c]">استلام</a>
              <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#143c3c]">عالمي</a>
              <a href="#" className="px-4 py-2 text-[#143c3c] text-sm font-bold border-b-2 border-[#00c8e6]">العنوان الوطني</a>
              <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#143c3c]">خدمات التجزئة</a>
              <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#143c3c]">خدمات التمويل</a>
              <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#143c3c]">الطوابع</a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-4 md:px-6 py-1.5 md:py-2 border border-[#143c3c] text-[#143c3c] text-xs md:text-sm font-medium rounded hover:bg-[#143c3c] hover:text-white transition-colors">
                دخول
              </Link>
              <Link to="/register" className="px-4 md:px-6 py-1.5 md:py-2 text-gray-600 text-xs md:text-sm font-medium hover:text-[#143c3c]">
                تسجيل
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - القسم الرئيسي */}
      <section className="relative">
        <img 
          src="/images/na-banner-v2.jpeg" 
          alt="العنوان الوطني" 
          className="w-full h-auto"
        />
        {/* زر سجّل الآن - يغطي الزر في الصورة */}
        <Link 
          to="/register" 
          className="absolute cursor-pointer"
          style={{
            bottom: '7%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '16%',
            height: '8%'
          }}
        >
          <span className="sr-only">سجّل الآن</span>
        </Link>
      </section>

      {/* Short Address Section - من عنوان مفصل إلى عنوان مختصر */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-3xl font-bold text-center mb-6 md:mb-12">
            <span className="text-gray-800">من عنوان مفصل إلى:</span>
            <span className="text-[#00c8e6]"> عنوان مختصر</span>
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {/* Description - في اليمين */}
            <div className="text-center md:text-right order-2 md:order-1">
              <p className="text-black text-xs md:text-base leading-relaxed">
                عنوان بسيط سهل الحفظ يحتوي على أربعة حروف وأربعة أرقام فقط هذا الرمز<br className="hidden md:block"/>
                القصير كفيل بأن يجعل حياتك أسهل
              </p>
            </div>
            {/* صورة RRRD2929 - على يسار العبارة */}
            <div className="flex-shrink-0 order-1 md:order-2">
              <img src="/images/rrrd2929.png" alt="RRRD2929" className="w-32 md:w-64 h-auto" />
            </div>
          </div>

          {/* أزرار سجل الآن ودخول - يظهر فقط على الجوال */}
          <div className="md:hidden flex justify-center gap-3 mt-4">
            <Link 
              to="/login" 
              className="py-2 bg-[#146c84] text-white font-bold rounded-lg hover:bg-[#0f5a6e] transition-colors text-xs text-center w-[100px]"
            >
              دخول
            </Link>
            <Link 
              to="/register" 
              className="py-2 bg-white text-[#146c84] border-2 border-[#146c84] font-bold rounded-lg hover:bg-[#146c84] hover:text-white transition-colors text-xs text-center w-[100px]"
            >
              سجّل الآن
            </Link>
          </div>
        </div>
      </section>

      {/* National Address Registration Section - صورة بعرض الشاشة الكامل */}
      <section className="w-full relative">
        <img 
          src="/images/national-address-section.png" 
          alt="تسجيل عنوانك الوطني" 
          className="w-full h-auto"
        />
        {/* زر العنوان الوطني للأفراد - المربع الأبيض كامل */}
        <Link 
          to="/register" 
          className="absolute cursor-pointer"
          style={{
            top: '22%',
            right: '59%',
            width: '12%',
            height: '24%'
          }}
        >
          <span className="sr-only">العنوان الوطني للأفراد</span>
        </Link>
        {/* زر العنوان الوطني للأعمال - المربع الأبيض كامل */}
        <Link 
          to="/register" 
          className="absolute cursor-pointer"
          style={{
            top: '22%',
            right: '45%',
            width: '12%',
            height: '24%'
          }}
        >
          <span className="sr-only">العنوان الوطني للأعمال</span>
        </Link>
      </section>

      {/* National Address Components Section - مكونات العنوان الوطني */}
      <section className="w-full relative">
        <img 
          src="/images/national-address-components.png" 
          alt="مكونات العنوان الوطني" 
          className="w-full h-auto"
        />
        {/* زر واحد يغطي كل المربعات الأربعة */}
        <Link 
          to="/register" 
          className="absolute cursor-pointer"
          style={{
            top: '62%',
            right: '12%',
            width: '76%',
            height: '18%'
          }}
        >
          <span className="sr-only">خدمات العنوان الوطني</span>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[#143c3c] text-white py-10 md:py-16 mt-8">
        <div className="container mx-auto px-4">
          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 mb-8 md:mb-12">
            {/* Column 1 - سبل */}
            <div>
              <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">سبل</h4>
              <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-white/80">
                <li><a href="#" className="hover:text-white">عن المؤسسة</a></li>
                <li><a href="#" className="hover:text-white">كلمة معالي الرئيس</a></li>
                <li><a href="#" className="hover:text-white">مجلس الإدارة</a></li>
                <li><a href="#" className="hover:text-white">القادة</a></li>
                <li><a href="#" className="hover:text-white">الهيكل التنظيمي</a></li>
                <li><a href="#" className="hover:text-white">استراتيجية البريد السعودي</a></li>
                <li><a href="#" className="hover:text-white">المسؤولية الاجتماعية</a></li>
                <li><a href="#" className="hover:text-white">محفظة الاستثمارات</a></li>
                <li><a href="#" className="hover:text-white">فروعنا</a></li>
              </ul>
            </div>

            {/* Column 2 - المركز الإعلامي */}
            <div>
              <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">المركز الإعلامي</h4>
              <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-white/80">
                <li><a href="#" className="hover:text-white">الأخبار</a></li>
                <li><a href="#" className="hover:text-white">الفعاليات</a></li>
                <li><a href="#" className="hover:text-white">الجوائز والإنجازات</a></li>
                <li><a href="#" className="hover:text-white">هوية البريد السعودي</a></li>
                <li><a href="#" className="hover:text-white">التقارير السنوية</a></li>
              </ul>
            </div>

            {/* Column 3 - أخرى */}
            <div>
              <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">أخرى</h4>
              <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-white/80">
                <li><a href="#" className="hover:text-white">التوظيف</a></li>
                <li><a href="#" className="hover:text-white">المنافسات والمناقصات</a></li>
                <li><a href="#" className="hover:text-white">التوعية بالاحتيال</a></li>
                <li><a href="#" className="hover:text-white">البيانات المفتوحة</a></li>
                <li><a href="#" className="hover:text-white">مشاركة البيانات</a></li>
              </ul>
            </div>

            {/* Column 4 - مواقع ذات علاقة */}
            <div>
              <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">مواقع ذات علاقة</h4>
              <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-white/80">
                <li><a href="#" className="hover:text-white">وزارة النقل والخدمات اللوجستية</a></li>
                <li><a href="#" className="hover:text-white">الهيئة العامة للنقل</a></li>
                <li><a href="#" className="hover:text-white">أبشر</a></li>
                <li><a href="#" className="hover:text-white">إرسال</a></li>
                <li><a href="#" className="hover:text-white">ناقل</a></li>
                <li><a href="#" className="hover:text-white">المركز السعودي للأعمال</a></li>
              </ul>
            </div>

            {/* Column 5 - Social Media + App Download */}
            <div className="col-span-2 flex flex-col items-center">
              {/* Social Media Icons */}
              <div className="flex gap-2 md:gap-3 mb-6 justify-center">
                <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
              {/* App Download */}
              <div className="flex gap-2 md:gap-3 justify-center">
                <a href="#">
                  <img src="/images/app-store.png" alt="App Store" className="h-8 md:h-10" />
                </a>
                <a href="#">
                  <img src="/images/google-play.png" alt="Google Play" className="h-8 md:h-10" />
                </a>
              </div>
              {/* Digital Stamp and VAT */}
              <div className="flex gap-3 md:gap-4 mt-4 items-center justify-center">
                <img src="/images/vat-logo.png" alt="ضريبة القيمة المضافة" className="h-12 md:h-14" />
                <img src="/images/digital-stamp.png" alt="هيئة الحكومة الرقمية" className="h-12 md:h-14 brightness-0 invert" />
              </div>
              {/* Great Place To Work */}
              <div className="mt-4 flex justify-center">
                <img src="/images/great-place-to-work.png" alt="Great Place To Work" className="h-20 md:h-24" />
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 pt-6 md:pt-8 border-t border-white/20 text-xs md:text-sm">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <a href="#" className="hover:underline">شروط الخدمة</a>
              <a href="#" className="hover:underline">سياسة الخصوصية</a>
              <a href="#" className="hover:underline">إشعار الخصوصية</a>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-white/60 text-[10px] md:text-sm">© 2026 جميع الحقوق محفوظة البريد السعودي | سبل</p>
              <img src="/images/vision-2030.png" alt="رؤية 2030" className="h-10 md:h-12" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
