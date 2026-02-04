import { useState } from "react";
import { useLocation } from "wouter";

// Arabic to English letter mapping for plate
const letterOptions = [
  { value: "-", ar: "-", en: "-" },
  { value: "أ - A", ar: "أ", en: "A" },
  { value: "ب - B", ar: "ب", en: "B" },
  { value: "ح - J", ar: "ح", en: "J" },
  { value: "د - D", ar: "د", en: "D" },
  { value: "ر - R", ar: "ر", en: "R" },
  { value: "س - S", ar: "س", en: "S" },
  { value: "ص - X", ar: "ص", en: "X" },
  { value: "ط - T", ar: "ط", en: "T" },
  { value: "ع - E", ar: "ع", en: "E" },
  { value: "ق - G", ar: "ق", en: "G" },
  { value: "ك - K", ar: "ك", en: "K" },
  { value: "ل - L", ar: "ل", en: "L" },
  { value: "م - Z", ar: "م", en: "Z" },
  { value: "ن - N", ar: "ن", en: "N" },
  { value: "ه - H", ar: "ه", en: "H" },
  { value: "و - U", ar: "و", en: "U" },
  { value: "ي - V", ar: "ي", en: "V" },
];

const regions = [
  "اختر منطقة",
  "أبها - المحالة أبها",
  "الباحة - طريق الملك عبدالعزيز",
  "الجبيل الجبيل35762",
  "الخرج حي الراشدية",
  "الخرمة حي المحمدية",
  "الخفجي الخرفة المنطقة الصناعية الثانية",
  "الدمام حي المنار",
  "الرس - طريق الملك فهد",
  "الرياض القيروان الرياض",
  "الرياض حي الفيصلية الرياض",
  "الرياض حي المونسية",
  "الرياض طريق دايراب عكاض الرياض",
  "الطائف حي القديرة",
  "القريات - حي الفرسان القريات",
  "القويعية حي الزهور القويعية",
  "المجمعة المنطقة الصناعية",
  "المدينة المنورة طريق المدينة - تبوك السريع",
  "الهفوف الشارع الرابع حي الصناعية المبرز",
  "بيشة - 1432, 7372, بيشة 67912",
  "تبوك المنطقة الزراعية",
  "جازان - الكرامة العسيلة",
  "جدة - الأمير عبدالمجيد جدة",
  "جدة - شارع عبدالجليل ياسين حي المروة",
  "جدة - طريق عسفان جدة",
  "حائل طريق المدينة - منطقة الوادي",
  "حفر الباطن طريق الملك عبدالعزيز الاسكان",
  "سكاكا - سلمان الفارسي محطة الفحص الدوري للمركبات",
  "عرعر - معارض سيارات",
  "محايل عسير - الخالدية محايل عسير",
  "مكة المكرمة - العمرة الجديدة مكة",
  "نجران - طريق الملك عبدالعزيز نجران",
  "وادي الدواسر طريق خميس - السليل السريع",
  "ينبع لمبارك ينبع",
];

const timeSlots = [
  "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 AM", "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
  "06:00 PM",
];

export default function NewAppointment() {
  const [, setLocation] = useLocation();
  
  // Form state
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [countryCode, setCountryCode] = useState("966");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [delegateEnabled, setDelegateEnabled] = useState(false);
  
  // Vehicle state
  const [vehicleType, setVehicleType] = useState<"license" | "customs">("license");
  const [countryReg, setCountryReg] = useState("السعودية");
  const [plateLetter1, setPlateLetter1] = useState("-");
  const [plateLetter2, setPlateLetter2] = useState("-");
  const [plateLetter3, setPlateLetter3] = useState("-");
  const [plateNumber, setPlateNumber] = useState("");
  const [customsId, setCustomsId] = useState("");
  
  // Service state
  const [vehicleWheels, setVehicleWheels] = useState("رباعية العجلات");
  const [region, setRegion] = useState("");
  const [serviceType, setServiceType] = useState("الفحص الدوري");
  const [dangerousMaterials, setDangerousMaterials] = useState(true);
  
  // Appointment state
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("08:00 AM");

  // Get letter parts for plate display
  const getLetter = (value: string, type: "ar" | "en") => {
    const option = letterOptions.find(o => o.value === value);
    return option ? option[type] : "-";
  };

  // Format plate number with leading zeros
  const formatPlateNumber = (num: string) => {
    if (!num) return "--";
    return num.padStart(4, "0");
  };

  const handleSubmit = () => {
    // Navigate to nafath or next step
    setLocation("/summary-payment");
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/images/login-logo.png" 
                alt="مركز سلامة المركبات" 
                className="h-10 object-contain"
              />
              <p className="text-gray-500 text-sm mt-2">مركز سلامة المركبات</p>
            </div>
          </div>
        </div>
      </header>

      {/* Title Section */}
      <section className="pt-3 container mx-auto px-4" style={{ color: '#027d95', fontSize: '22px' }}>
        <p className="mb-0">خدمة الفحص</p>
        <p className="mt-[-13px] mb-0"><span>الفني</span> الدوري</p>
        <p className="pt-2">حجز موعد</p>
      </section>

      {/* Form Section */}
      <section className="pt-3 pb-8 container mx-auto px-4">
        <form>
          {/* Personal Information */}
          <h5 className="font-semibold mb-4" style={{ color: '#233f48' }}>المعلومات الشخصية</h5>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 text-sm">الإسم<span className="text-red-500">*</span></label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="إدخل الإسم"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">رقم الهوية / الإقامة<span className="text-red-500">*</span></label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="رقم الهوية / الإقامة"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm">رقم الجوال<span className="text-red-500">*</span></label>
            <div className="flex gap-2" style={{ direction: 'ltr' }}>
              <select 
                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 max-w-[150px]"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="966">966</option>
                <option value="964">964</option>
                <option value="961">961</option>
              </select>
              <input 
                type="text" 
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="رقم الجوال"
                style={{ direction: 'rtl' }}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm">البريد الإلكتروني</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="البريد الإلكتروني"
              style={{ direction: 'ltr' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-start gap-4 mb-6">
            <input 
              type="checkbox" 
              className="w-[50px] h-[25px] min-w-[50px] mt-1"
              checked={delegateEnabled}
              onChange={(e) => setDelegateEnabled(e.target.checked)}
            />
            <label className="text-[#516669] text-[17px] font-medium">
              هل تريد تفويض شخص اخر بفحص المركبة؟<span className="text-red-500">*</span>
            </label>
          </div>

          {/* Vehicle Information */}
          <h5 className="font-semibold mb-4 mt-8" style={{ color: '#233f48' }}>معلومات المركبة</h5>
          
          <label className="block mb-2" style={{ color: '#3d3e3e', textShadow: '#000000 1px 0 1px' }}>
            اختر حالة المركبة<span className="text-red-500">*</span>
          </label>
          
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <button 
              type="button"
              className={`px-4 py-2 min-w-[200px] rounded-full border transition-all ${
                vehicleType === "license" 
                  ? "bg-white border-[#1e9b3b] shadow-[0px_1px_5px_#1e9b3b]" 
                  : "bg-gray-100 border-gray-300"
              }`}
              onClick={() => setVehicleType("license")}
            >
              تحمل رخصة سير
            </button>
            <button 
              type="button"
              className={`px-4 py-2 min-w-[200px] rounded-full border transition-all ${
                vehicleType === "customs" 
                  ? "bg-white border-[#1e9b3b] shadow-[0px_1px_5px_#1e9b3b]" 
                  : "bg-gray-100 border-gray-300"
              }`}
              onClick={() => setVehicleType("customs")}
            >
              تحمل بطاقة جمركية
            </button>
          </div>

          {vehicleType === "license" && (
            <div className="mb-6">
              <div className="mb-4">
                <label className="block mb-1 text-sm">بلد التسجيل<span className="text-red-500">*</span></label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  value={countryReg}
                  onChange={(e) => setCountryReg(e.target.value)}
                >
                  <option value="السعودية">السعودية</option>
                  <option value="البحرين">البحرين</option>
                  <option value="مصر">مصر</option>
                </select>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="w-full md:w-1/2">
                  <label className="block mb-1 text-sm">رقم اللوحة<span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-2">
                    <select 
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      value={plateLetter1}
                      onChange={(e) => setPlateLetter1(e.target.value)}
                    >
                      {letterOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.value === "-" ? "- اختر -" : opt.value}</option>
                      ))}
                    </select>
                    <select 
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      value={plateLetter2}
                      onChange={(e) => setPlateLetter2(e.target.value)}
                    >
                      {letterOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.value === "-" ? "- اختر -" : opt.value}</option>
                      ))}
                    </select>
                    <select 
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      value={plateLetter3}
                      onChange={(e) => setPlateLetter3(e.target.value)}
                    >
                      {letterOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.value === "-" ? "- اختر -" : opt.value}</option>
                      ))}
                    </select>
                    <input 
                      type="text" 
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-24"
                      placeholder="أدخل الأرقام"
                      maxLength={4}
                      value={plateNumber}
                      onChange={(e) => setPlateNumber(e.target.value.replace(/\D/g, ""))}
                    />
                  </div>
                </div>

                {/* Plate Preview */}
                <div className="flex justify-center items-center">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ 
                      width: '200px', 
                      height: '80px',
                      boxShadow: '0px 2px 14px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <div 
                      className="h-full w-full rounded-lg flex"
                      style={{ 
                        backgroundColor: '#f1f1f1',
                        border: '1px solid black',
                        paddingRight: '17px',
                      }}
                    >
                      <div className="flex flex-row-reverse h-full w-full" style={{ borderRight: '1px solid black' }}>
                        {/* Numbers */}
                        <div className="w-1/2 flex flex-col h-full" style={{ borderRight: '1px solid black', direction: 'ltr' }}>
                          <div className="h-1/2 flex justify-center items-center gap-1 font-bold text-lg" style={{ borderBottom: '1px solid black' }}>
                            {formatPlateNumber(plateNumber).split("").map((n, i) => <span key={i}>{n}</span>)}
                          </div>
                          <div className="h-1/2 flex justify-center items-center gap-1 font-bold text-lg">
                            {formatPlateNumber(plateNumber).split("").map((n, i) => <span key={i}>{n}</span>)}
                          </div>
                        </div>
                        {/* Letters */}
                        <div className="w-1/2 flex flex-col h-full">
                          <div className="h-1/2 flex justify-center items-center gap-2 font-bold text-lg" style={{ borderBottom: '1px solid black' }}>
                            <span>{getLetter(plateLetter1, "ar")}</span>
                            <span>{getLetter(plateLetter2, "ar")}</span>
                            <span>{getLetter(plateLetter3, "ar")}</span>
                          </div>
                          <div className="h-1/2 flex justify-center items-center gap-2 font-bold text-lg">
                            <span>{getLetter(plateLetter1, "en")}</span>
                            <span>{getLetter(plateLetter2, "en")}</span>
                            <span>{getLetter(plateLetter3, "en")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {vehicleType === "customs" && (
            <div className="mb-6">
              <label className="block mb-1 text-sm">رقم البطاقة الجمركية<span className="text-red-500">*</span></label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={customsId}
                onChange={(e) => setCustomsId(e.target.value)}
              />
            </div>
          )}

          {/* Service Center */}
          <h5 className="font-semibold mb-4 mt-8" style={{ color: '#233f48' }}>مركز الخدمة</h5>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 text-sm">نوع المركبة<span className="text-red-500">*</span></label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={vehicleWheels}
                onChange={(e) => setVehicleWheels(e.target.value)}
              >
                <option value="ثنائية العجلات">ثنائية العجلات</option>
                <option value="رباعية العجلات">رباعية العجلات</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm">المنطقة<span className="text-red-500">*</span></label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                {regions.map((r, i) => (
                  <option key={i} value={i === 0 ? "" : r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm">نوع خدمة الفحص<span className="text-red-500">*</span></label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            >
              <option value="الفحص الدوري">الفحص الدوري</option>
              <option value="اعادة الفحص الدوري">اعادة الفحص الدوري</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              هذه الخدمة مخصصة لمن قام بإجراء فحص مسبق خلال 14 يوم عمل الماضية ولم يستنفد جميع محاولات إعادة الفحص
            </p>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <input 
              type="checkbox" 
              className="w-[50px] h-[25px] min-w-[50px] mt-1"
              checked={dangerousMaterials}
              onChange={(e) => setDangerousMaterials(e.target.checked)}
            />
            <label className="text-[#516669] text-[17px] font-medium">
              المركبة تحمل مواد خطرة<span className="text-red-500">*</span>
            </label>
          </div>

          {/* Appointment */}
          <h5 className="font-semibold mb-4 mt-8" style={{ color: '#233f48' }}>موعد الخدمة</h5>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 text-sm">تاريخ الفحص<span className="text-red-500">*</span></label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">وقت الفحص<span className="text-red-500">*</span></label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
              >
                {timeSlots.map((t, i) => (
                  <option key={i} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            الحضور على الموعد يسهم في سرعة وجودة الخدمة وفي حالة عدم الحضور، لن يسمح بحجز اخر إلا بعد 48 ساعة وحسب الإوقات المحددة
          </p>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button 
              type="button"
              className="px-8 py-2 text-white rounded-full min-w-[150px]"
              style={{ backgroundColor: '#1e9b3b' }}
              onClick={handleSubmit}
            >
              التالي
            </button>
          </div>

        </form>
      </section>
    </div>
  );
}
