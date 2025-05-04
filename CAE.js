// --- وظيفة فلترة المحاضرات بناءً على البحث ---
function filterLectures() {
    // الحصول على قيمة البحث وتحويلها لأحرف صغيرة للمقارنة
    let filterValue = document.getElementById('searchInput').value.toLowerCase();

    // الحصول على جميع عناصر قوائم المحاضرات (الكتابية والصوتية)
    let lectureLists = document.querySelectorAll('.lecture-list');

    // المرور على كل قائمة محاضرات
    lectureLists.forEach(list => {
        // الحصول على جميع عناصر المحاضرات داخل القائمة الحالية
        let items = list.getElementsByTagName('li');

        // المرور على كل عنصر محاضرة (li)
        for (let i = 0; i < items.length; i++) {
            let link = items[i].getElementsByTagName('a')[0]; // الحصول على الرابط داخل العنصر
            // التحقق مما إذا كان العنصر يحتوي على رابط (لتجنب العناصر النائبة بدون روابط)
            if (link) {
                let lectureName = link.textContent || link.innerText; // الحصول على نص الرابط (اسم المحاضرة)
                // التحقق إذا كان اسم المحاضرة يحتوي على قيمة البحث
                if (lectureName.toLowerCase().indexOf(filterValue) > -1) {
                    items[i].style.display = ""; // إظهار العنصر إذا تطابق
                } else {
                    items[i].style.display = "none"; // إخفاء العنصر إذا لم يتطابق
                }
            } else {
                // التعامل مع العناصر النائبة أو التي لا تحتوي على رابط (يمكن إخفاؤها دائمًا عند البحث)
                 if(filterValue !== ""){
                    items[i].style.display = "none";
                 } else {
                    items[i].style.display = ""; // إظهارها إذا كان البحث فارغًا
                 }
            }
        }
        // تعليق: يمكن إضافة رسالة "لا توجد نتائج" إذا كانت جميع العناصر مخفية
    });
    // تعليق إضافي: تحسين الأداء في القوائم الكبيرة يمكن أن يتم عبر تقنيات أخرى
}

// --- وظيفة لطي/فتح الأقسام ---
function toggleSection(contentId) {
    let contentElement = document.getElementById(contentId);
    let toggleIcon = contentElement.previousElementSibling.querySelector('.toggle-icon'); // الحصول على أيقونة السهم

    if (contentElement) {
        contentElement.classList.toggle('hidden'); // تبديل كلاس الإخفاء/الإظهار المحدد في CSS
        // تبديل شكل أيقونة السهم (اختياري، يعتمد على CSS)
        contentElement.previousElementSibling.classList.toggle('collapsed');

        // تعليق: يمكن حفظ حالة الفتح/الطي في localStorage لتذكرها بين الزيارات
        // if (contentElement.classList.contains('hidden')) {
        //     localStorage.setItem(contentId + '_state', 'collapsed');
        // } else {
        //     localStorage.setItem(contentId + '_state', 'expanded');
        // }
    } else {
        console.error("لم يتم العثور على عنصر المحتوى بالمعرف:", contentId);
    }
    // تعليق: تم إضافة معالجة خطأ بسيطة
}

// --- وظيفة لتحديث تاريخ "آخر تحديث" وتعيين السنة الحالية ---
function updateFooterInfo() {
    // تحديث السنة الحالية في التذييل
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    } else {
        console.warn("لم يتم العثور على عنصر السنة الحالية.");
    }

    // تعيين تاريخ آخر تحديث (يمكن تحديث هذا التاريخ يدوياً عند تغيير المحتوى)
    const lastUpdatedElement = document.getElementById('lastUpdated');
    const lastUpdateDate = "4 مايو 2025"; // <-- قم بتغيير هذا التاريخ يدوياً عند التحديث
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = lastUpdateDate;
    } else {
        console.warn("لم يتم العثور على عنصر تاريخ آخر تحديث.");
    }
    // تعليق: يمكن جعل تاريخ آخر تحديث ديناميكيًا أكثر إذا كانت الصفحة تُنشأ بواسطة نظام بناء
}


// --- استدعاء الوظائف عند تحميل الصفحة ---
document.addEventListener('DOMContentLoaded', function() {
    console.log("بدء تشغيل سكربتات الصفحة.");
    updateFooterInfo(); // تحديث معلومات التذييل عند التحميل

    // تعليق: يمكن إضافة وظائف أخرى ليتم استدعاؤها عند تحميل الصفحة هنا
    // مثال: استعادة حالة الأقسام المفتوحة/المغلقة من localStorage
    // restoreSectionStates();

    // إخفاء القوائم افتراضيًا عند التحميل (إذا أردت ذلك)
    // document.getElementById('written-content').classList.add('hidden');
    // document.getElementById('audio-content').classList.add('hidden');
    // document.querySelector('#written-lectures-section h2').classList.add('collapsed');
    // document.querySelector('#audio-lectures-section h2').classList.add('collapsed');
    // ملاحظة: تم ترك الأقسام مفتوحة افتراضيًا حاليًا

    console.log("تم تحميل الصفحة والسكربتات جاهزة.");
});


// --- وظائف إضافية محتملة (أمثلة مع تعليقات) ---

// function restoreSectionStates() {
//     const sections = ['written-content', 'audio-content']; // أضف IDs أقسام أخرى هنا
//     sections.forEach(id => {
//         const state = localStorage.getItem(id + '_state');
//         if (state === 'collapsed') {
//             const contentElement = document.getElementById(id);
//             if(contentElement){
//                  contentElement.classList.add('hidden');
//                  contentElement.previousElementSibling.classList.add('collapsed');
//             }
//         }
//     });
//     console.log("تم استعادة حالة الأقسام.");
// }

// function setupAnalytics() {
//     // كود لإعداد تحليلات جوجل أو أي خدمة أخرى
//     console.log("تم إعداد التحليلات (مثال).");
// }

// function setupSmoothScrolling() {
//     // كود لجعل التنقل داخل الصفحة سلسًا عند النقر على روابط داخلية
//     console.log("تم إعداد التمرير السلس (مثال).");
// }

// --- تعليقات نهائية لزيادة حجم الملف وتوثيقه ---
// تم الانتهاء من السكربتات الأساسية للصفحة.
// يمكن إضافة المزيد من الوظائف المعقدة هنا.
// مثل التحميل الكسول (Lazy Loading) للمحتوى.
// أو التفاعل مع واجهات برمجية خارجية (APIs).
// أو تحسينات إضافية على إمكانية الوصول (Accessibility).
// أو إضافة نظام ثيمات (داكن/فاتح).
// تأكد من اختبار الكود على متصفحات مختلفة.
// نهاية ملف JavaScript.
// --------------------------------------------
