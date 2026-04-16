import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Activity,
  Plus,
  X,
  Eye,
  Download,
  Zap,
  User,
  Upload
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data
const qualityTrend = [
  { id: 'q1', month: 'يناير', acceptance: 96 },
  { id: 'q2', month: 'فبراير', acceptance: 97 },
  { id: 'q3', month: 'مارس', acceptance: 94 },
  { id: 'q4', month: 'أبريل', acceptance: 98 },
  { id: 'q5', month: 'مايو', acceptance: 97 },
  { id: 'q6', month: 'يونيو', acceptance: 99 },
];

const defectTypes = [
  { id: 'd1', name: 'تشققات', value: 12, color: '#ef4444' },
  { id: 'd2', name: 'مسامية', value: 8, color: '#f59e0b' },
  { id: 'd3', name: 'انصهار غير كامل', value: 5, color: '#eab308' },
  { id: 'd4', name: 'اختراق زائد', value: 3, color: '#84cc16' },
  { id: 'd5', name: 'قبول', value: 172, color: '#22c55e' },
];

const ndtResults = [
  { id: 'n1', method: 'VT', passed: 198, failed: 2 },
  { id: 'n2', method: 'RT', passed: 185, failed: 8 },
  { id: 'n3', method: 'UT', passed: 192, failed: 5 },
  { id: 'n4', method: 'MT', passed: 196, failed: 3 },
  { id: 'n5', method: 'PT', passed: 194, failed: 4 },
];

interface WeldReport {
  id: string;
  jointNumber: string;
  lineNumber: string;
  location: string;
  welderName: string;
  welderId: string;
  welderPhoto?: string;
  wpsNumber: string;
  pipeSize: string;
  wallThickness: string;
  weldingProcess: string;
  ndtMethod: string;
  visualInspection: string;
  rtResult: string;
  utResult: string;
  finalResult: string;
  defects: string;
  repairRequired: string;
  date: string;
  notes: string;
}

interface ReportDetailsProps {
  report: WeldReport;
  onClose: () => void;
}

function ReportDetails({ report, onClose }: ReportDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">تفاصيل تقرير اللحام</h2>
            <p className="text-sm text-neutral-600">Joint: {report.jointNumber}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Project Info */}
          <div>
            <h3 className="font-semibold mb-3 text-neutral-900">معلومات المشروع</h3>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                {report.welderPhoto ? (
                  <img
                    src={report.welderPhoto}
                    alt={report.welderName}
                    className="w-32 h-32 object-cover rounded-lg border-2 border-neutral-200"
                  />
                ) : (
                  <div className="w-32 h-32 bg-neutral-100 rounded-lg border-2 border-neutral-200 flex items-center justify-center">
                    <User className="w-16 h-16 text-neutral-400" />
                  </div>
                )}
                <p className="text-xs text-neutral-600 text-center mt-1">صورة العامل</p>
              </div>
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 bg-neutral-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-neutral-600">رقم الوصلة</p>
                  <p className="font-medium">{report.jointNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">رقم الخط</p>
                  <p className="font-medium">{report.lineNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">الموقع</p>
                  <p className="font-medium">{report.location}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">اسم اللحام</p>
                  <p className="font-medium">{report.welderName}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">رقم اللحام</p>
                  <p className="font-medium">{report.welderId}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">التاريخ</p>
                  <p className="font-medium">{report.date}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Welding Specs */}
          <div>
            <h3 className="font-semibold mb-3 text-neutral-900">مواصفات اللحام</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700 mb-1">WPS Number</p>
                <p className="text-lg font-bold text-blue-900">{report.wpsNumber}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-700 mb-1">قطر الأنبوب</p>
                <p className="text-lg font-bold text-purple-900">{report.pipeSize}</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <p className="text-sm text-indigo-700 mb-1">سمك الجدار</p>
                <p className="text-lg font-bold text-indigo-900">{report.wallThickness}</p>
              </div>
              <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                <p className="text-sm text-cyan-700 mb-1">طريقة اللحام</p>
                <p className="text-lg font-bold text-cyan-900">{report.weldingProcess}</p>
              </div>
            </div>
          </div>

          {/* NDT Results */}
          <div>
            <h3 className="font-semibold mb-3 text-neutral-900">نتائج الفحوصات</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">الفحص البصري (VT)</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    report.visualInspection === 'قبول' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {report.visualInspection}
                  </span>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">الأشعة السينية (RT)</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    report.rtResult === 'قبول' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {report.rtResult}
                  </span>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">الموجات فوق الصوتية (UT)</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    report.utResult === 'قبول' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {report.utResult}
                  </span>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">طريقة الفحص المستخدمة</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {report.ndtMethod}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Final Result */}
          <div>
            <h3 className="font-semibold mb-3 text-neutral-900">النتيجة النهائية</h3>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {report.finalResult === 'قبول' ? (
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  ) : (
                    <XCircle className="w-12 h-12 text-red-600" />
                  )}
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">{report.finalResult}</p>
                    <p className="text-sm text-neutral-600">
                      {report.repairRequired === 'نعم' ? 'يتطلب إصلاح' : 'لا يتطلب إصلاح'}
                    </p>
                  </div>
                </div>
              </div>
              {report.defects && (
                <div className="bg-white p-4 rounded border">
                  <p className="text-sm font-medium text-neutral-700 mb-1">العيوب المكتشفة:</p>
                  <p className="text-neutral-900">{report.defects}</p>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {report.notes && (
            <div>
              <h3 className="font-semibold mb-3 text-neutral-900">الملاحظات</h3>
              <div className="bg-neutral-50 p-4 rounded-lg">
                <p className="text-neutral-700">{report.notes}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              تحميل تقرير PDF
            </button>
            <button onClick={onClose} className="px-6 py-2 border rounded-lg hover:bg-neutral-50">
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeldingForm({ onClose, onSave }: { onClose: () => void; onSave: (report: WeldReport) => void }) {
  const [formData, setFormData] = useState({
    jointNumber: '',
    lineNumber: '',
    location: '',
    welderName: '',
    welderId: '',
    welderPhoto: '',
    wpsNumber: '',
    pipeSize: '',
    wallThickness: '',
    weldingProcess: '',
    ndtMethod: '',
    visualInspection: '',
    rtResult: '',
    utResult: '',
    defects: '',
    repairRequired: 'لا',
    notes: ''
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, welderPhoto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Determine final result
    const allPassed =
      formData.visualInspection === 'قبول' &&
      (!formData.rtResult || formData.rtResult === 'قبول') &&
      (!formData.utResult || formData.utResult === 'قبول');

    const newReport: WeldReport = {
      id: formData.jointNumber,
      ...formData,
      finalResult: allPassed ? 'قبول' : 'رفض',
      date: new Date().toLocaleString('ar-SA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    onSave(newReport);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">تقرير فحص اللحام</h2>
            <p className="text-sm text-neutral-600">Welding Inspection Report - EPC Project</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Project Info */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-lg">معلومات المشروع</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">رقم الوصلة (Joint Number) *</label>
                <input
                  required
                  type="text"
                  placeholder="J-001"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.jointNumber}
                  onChange={(e) => setFormData({...formData, jointNumber: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">رقم الخط (Line Number) *</label>
                <input
                  required
                  type="text"
                  placeholder="LINE-24-001"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.lineNumber}
                  onChange={(e) => setFormData({...formData, lineNumber: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">الموقع *</label>
                <input
                  required
                  type="text"
                  placeholder="مثال: KM 0+500 أو محطة الضخ A"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Welder Info */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-lg">معلومات اللحام</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">اسم اللحام *</label>
                <input
                  required
                  type="text"
                  placeholder="أحمد محمد"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.welderName}
                  onChange={(e) => setFormData({...formData, welderName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">رقم اللحام (Welder ID) *</label>
                <input
                  required
                  type="text"
                  placeholder="W-245"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.welderId}
                  onChange={(e) => setFormData({...formData, welderId: e.target.value})}
                />
              </div>
            </div>

            {/* Welder Photo Upload */}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-blue-600" />
                  <span>صورة العامل (اختياري)</span>
                </div>
              </label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-xs text-neutral-500 mt-1">اختر صورة العامل (JPG, PNG, max 5MB)</p>
                </div>
                {formData.welderPhoto ? (
                  <div className="flex-shrink-0">
                    <img
                      src={formData.welderPhoto}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-lg border-2 border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, welderPhoto: ''})}
                      className="mt-1 w-full text-xs text-red-600 hover:text-red-700"
                    >
                      إزالة الصورة
                    </button>
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-24 h-24 bg-neutral-100 rounded-lg border-2 border-dashed border-neutral-300 flex items-center justify-center">
                    <User className="w-12 h-12 text-neutral-400" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Welding Specifications */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-lg">مواصفات اللحام</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">WPS Number *</label>
                <input
                  required
                  type="text"
                  placeholder="WPS-001"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.wpsNumber}
                  onChange={(e) => setFormData({...formData, wpsNumber: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">قطر الأنبوب (Pipe Size) *</label>
                <input
                  required
                  type="text"
                  placeholder='مثال: 24" أو 12"'
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.pipeSize}
                  onChange={(e) => setFormData({...formData, pipeSize: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">سمك الجدار (mm) *</label>
                <input
                  required
                  type="number"
                  step="0.1"
                  placeholder="12.7"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.wallThickness}
                  onChange={(e) => setFormData({...formData, wallThickness: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">طريقة اللحام *</label>
                <select
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.weldingProcess}
                  onChange={(e) => setFormData({...formData, weldingProcess: e.target.value})}
                >
                  <option value="">اختر الطريقة</option>
                  <option value="SMAW">SMAW</option>
                  <option value="GTAW">GTAW (TIG)</option>
                  <option value="GMAW">GMAW (MIG)</option>
                  <option value="FCAW">FCAW</option>
                  <option value="SAW">SAW</option>
                </select>
              </div>
            </div>
          </div>

          {/* NDT Method */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-lg">طريقة الفحص (NDT Method)</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">طريقة الفحص المستخدمة *</label>
                <select
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.ndtMethod}
                  onChange={(e) => setFormData({...formData, ndtMethod: e.target.value})}
                >
                  <option value="">اختر طريقة الفحص</option>
                  <option value="VT Only">VT (Visual Testing) فقط</option>
                  <option value="VT + RT">VT + RT (Radiographic Testing)</option>
                  <option value="VT + UT">VT + UT (Ultrasonic Testing)</option>
                  <option value="VT + MT">VT + MT (Magnetic Particle Testing)</option>
                  <option value="VT + PT">VT + PT (Penetrant Testing)</option>
                  <option value="VT + RT + UT">VT + RT + UT</option>
                </select>
              </div>
            </div>
          </div>

          {/* Inspection Results */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-lg">نتائج الفحوصات</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">الفحص البصري (VT) *</label>
                <select
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.visualInspection}
                  onChange={(e) => setFormData({...formData, visualInspection: e.target.value})}
                >
                  <option value="">اختر النتيجة</option>
                  <option value="قبول">قبول (Accept)</option>
                  <option value="رفض">رفض (Reject)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">نتيجة RT (إن وجد)</label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.rtResult}
                  onChange={(e) => setFormData({...formData, rtResult: e.target.value})}
                >
                  <option value="">غير مطبق</option>
                  <option value="قبول">قبول (Accept)</option>
                  <option value="رفض">رفض (Reject)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">نتيجة UT (إن وجد)</label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.utResult}
                  onChange={(e) => setFormData({...formData, utResult: e.target.value})}
                >
                  <option value="">غير مطبق</option>
                  <option value="قبول">قبول (Accept)</option>
                  <option value="رفض">رفض (Reject)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Defects & Repair */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-lg">العيوب والإصلاح</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">يتطلب إصلاح؟</label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.repairRequired}
                  onChange={(e) => setFormData({...formData, repairRequired: e.target.value})}
                >
                  <option value="لا">لا</option>
                  <option value="نعم">نعم</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">وصف العيوب (إن وجدت)</label>
              <textarea
                rows={3}
                placeholder="مثال: تشققات سطحية - مسامية - انصهار غير كامل..."
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                value={formData.defects}
                onChange={(e) => setFormData({...formData, defects: e.target.value})}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1.5">ملاحظات إضافية</label>
            <textarea
              rows={3}
              placeholder="أضف أي ملاحظات أو تفاصيل إضافية..."
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-lg hover:bg-neutral-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              حفظ التقرير
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [selectedReport, setSelectedReport] = useState<WeldReport | null>(null);

  // Load saved reports from localStorage on mount
  const [savedReports, setSavedReports] = useState<WeldReport[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('weldReports');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return [
    {
      id: 'J-001',
      jointNumber: 'J-001',
      lineNumber: 'LINE-24-001',
      location: 'KM 0+500',
      welderName: 'أحمد محمد',
      welderId: 'W-245',
      wpsNumber: 'WPS-001',
      pipeSize: '24"',
      wallThickness: '12.7',
      weldingProcess: 'GTAW',
      ndtMethod: 'VT + RT',
      visualInspection: 'قبول',
      rtResult: 'قبول',
      utResult: '',
      finalResult: 'قبول',
      defects: '',
      repairRequired: 'لا',
      date: '2026-04-11 14:30',
      notes: 'جميع الفحوصات ضمن المعايير المقبولة'
    },
    {
      id: 'J-002',
      jointNumber: 'J-002',
      lineNumber: 'LINE-24-001',
      location: 'KM 0+750',
      welderName: 'محمد علي',
      welderId: 'W-138',
      wpsNumber: 'WPS-001',
      pipeSize: '24"',
      wallThickness: '12.7',
      weldingProcess: 'SMAW',
      ndtMethod: 'VT + RT + UT',
      visualInspection: 'قبول',
      rtResult: 'قبول',
      utResult: 'قبول',
      finalResult: 'قبول',
      defects: '',
      repairRequired: 'لا',
      date: '2026-04-11 12:15',
      notes: 'لحام ممتاز'
    },
    {
      id: 'J-003',
      jointNumber: 'J-003',
      lineNumber: 'LINE-24-002',
      location: 'KM 1+200',
      welderName: 'خالد سعيد',
      welderId: 'W-089',
      wpsNumber: 'WPS-002',
      pipeSize: '20"',
      wallThickness: '10.5',
      weldingProcess: 'GTAW',
      ndtMethod: 'VT + RT',
      visualInspection: 'رفض',
      rtResult: 'رفض',
      utResult: '',
      finalResult: 'رفض',
      defects: 'تشققات سطحية في منطقة HAZ',
      repairRequired: 'نعم',
      date: '2026-04-11 10:45',
      notes: 'يتطلب إعادة لحام كاملة'
    },
    {
      id: 'J-004',
      jointNumber: 'J-004',
      lineNumber: 'LINE-24-002',
      location: 'KM 1+450',
      welderName: 'عمر حسن',
      welderId: 'W-245',
      wpsNumber: 'WPS-002',
      pipeSize: '20"',
      wallThickness: '10.5',
      weldingProcess: 'FCAW',
      ndtMethod: 'VT + UT',
      visualInspection: 'قبول',
      rtResult: '',
      utResult: 'قبول',
      finalResult: 'قبول',
      defects: '',
      repairRequired: 'لا',
      date: '2026-04-10 16:20',
      notes: 'نتائج جيدة'
    }
  ];
  });

  // Save to localStorage whenever reports change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('weldReports', JSON.stringify(savedReports));
    }
  }, [savedReports]);

  const handleSaveReport = (newReport: WeldReport) => {
    setSavedReports([newReport, ...savedReports]);
  };

  const acceptedWelds = savedReports.filter(r => r.finalResult === 'قبول').length;
  const rejectedWelds = savedReports.filter(r => r.finalResult === 'رفض').length;
  const acceptanceRate = savedReports.length > 0 ? Math.round((acceptedWelds / savedReports.length) * 100) : 0;

  const exportData = () => {
    const dataStr = JSON.stringify(savedReports, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `weld-reports-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">نظام فحص جودة اللحام</h1>
            <p className="text-sm text-neutral-600">Pipeline Welding Quality Control - EPC Projects</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportData}
              className="px-4 py-2.5 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              تصدير البيانات
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              تقرير فحص جديد
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Supabase Connection Notice */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-blue-700" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-blue-900 mb-1">البيانات محفوظة محلياً</h4>
              <p className="text-sm text-blue-800 mb-2">
                حالياً يتم حفظ التقارير في المتصفح فقط. لحفظ البيانات بشكل دائم ومشاركتها بين الأجهزة:
              </p>
              <ol className="text-sm text-blue-800 list-decimal list-inside space-y-1">
                <li>افتح <strong>صفحة إعدادات Make</strong></li>
                <li>اتصل بمشروع Supabase الخاص بك</li>
                <li>سيتم تلقائياً ترحيل جميع البيانات إلى قاعدة البيانات</li>
              </ol>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-600">معدل القبول</span>
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold">{acceptanceRate}%</span>
              <div className="flex items-center gap-1 text-green-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+3.2%</span>
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-1">إجمالي {savedReports.length} لحامات</p>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-600">اللحامات المقبولة</span>
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-green-600">{acceptedWelds}</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">هذا الأسبوع</p>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-600">اللحامات المرفوضة</span>
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-red-600">{rejectedWelds}</span>
              <div className="flex items-center gap-1 text-green-600 mb-1">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-medium">-25%</span>
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-1">مقارنة بالأسبوع الماضي</p>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-600">عمليات الإصلاح</span>
              <Zap className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-amber-600">2</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">قيد التنفيذ</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-semibold mb-4">معدل القبول الشهري</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={qualityTrend}>
                <CartesianGrid key="grid-1" strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis key="xaxis-1" dataKey="month" stroke="#737373" style={{ fontSize: '12px' }} />
                <YAxis key="yaxis-1" stroke="#737373" style={{ fontSize: '12px' }} domain={[90, 100]} />
                <Tooltip key="tooltip-1" />
                <Line key="line-1" type="monotone" dataKey="acceptance" stroke="#22c55e" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-semibold mb-4">نتائج فحوصات NDT</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ndtResults}>
                <CartesianGrid key="grid-2" strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis key="xaxis-2" dataKey="method" stroke="#737373" style={{ fontSize: '12px' }} />
                <YAxis key="yaxis-2" stroke="#737373" style={{ fontSize: '12px' }} />
                <Tooltip key="tooltip-2" />
                <Bar key="bar-passed" dataKey="passed" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar key="bar-failed" dataKey="failed" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Saved Reports Table */}
        <div className="bg-white rounded-lg border">
          <div className="px-6 py-4 border-b">
            <h3 className="font-semibold">سجلات الفحص المحفوظة</h3>
            <p className="text-sm text-neutral-600">جميع تقارير فحص اللحام ({savedReports.length} تقرير)</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-700">رقم الوصلة</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-700">رقم الخط</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-700">الموقع</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-700">اللحام</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-700">طريقة NDT</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-700">النتيجة</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-700">التاريخ</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {savedReports.map((record) => (
                  <tr key={record.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 font-medium">{record.jointNumber}</td>
                    <td className="px-6 py-4 text-sm text-neutral-700">{record.lineNumber}</td>
                    <td className="px-6 py-4 text-sm text-neutral-700">{record.location}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {record.welderPhoto ? (
                          <img
                            src={record.welderPhoto}
                            alt={record.welderName}
                            className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-neutral-400" />
                          </div>
                        )}
                        <div className="text-sm">
                          <div className="font-medium text-neutral-900">{record.welderName}</div>
                          <div className="text-xs text-neutral-500">{record.welderId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700">{record.ndtMethod}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1 ${
                        record.finalResult === 'قبول' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {record.finalResult === 'قبول' ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {record.finalResult}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">{record.date}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedReport(record)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                      >
                        <Eye className="w-4 h-4 text-neutral-500 group-hover:text-blue-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showForm && <WeldingForm onClose={() => setShowForm(false)} onSave={handleSaveReport} />}
      {selectedReport && <ReportDetails report={selectedReport} onClose={() => setSelectedReport(null)} />}
    </div>
  );
}
