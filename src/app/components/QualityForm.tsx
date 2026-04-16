import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Droplet, Thermometer, Gauge, FlaskConical, X, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface QualityFormProps {
  onClose: () => void;
}

interface FormData {
  sampleId: string;
  location: string;
  operatorName: string;
  testType: string;
  viscosity: string;
  density: string;
  temperature: string;
  flashPoint: string;
  sulfurContent: string;
  waterContent: string;
  notes: string;
}

export function QualityForm({ onClose }: QualityFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Quality Report Submitted:', data);
    toast.success('Quality report submitted successfully');

    reset();
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200 shadow-sm">
      <div className="border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900">Quality Test Report</h2>
          <p className="text-sm text-neutral-600">Enter test results and measurements</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-neutral-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        {/* Basic Information */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-neutral-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Sample ID *
              </label>
              <input
                {...register('sampleId', { required: 'Sample ID is required' })}
                type="text"
                placeholder="e.g., SMP-2026-001"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              {errors.sampleId && (
                <p className="text-xs text-red-600 mt-1">{errors.sampleId.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Location *
              </label>
              <select
                {...register('location', { required: 'Location is required' })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Select location</option>
                <option value="Well A-1">Well A-1</option>
                <option value="Well A-2">Well A-2</option>
                <option value="Well B-1">Well B-1</option>
                <option value="Separator Unit 1">Separator Unit 1</option>
                <option value="Storage Tank 1">Storage Tank 1</option>
                <option value="Storage Tank 2">Storage Tank 2</option>
              </select>
              {errors.location && (
                <p className="text-xs text-red-600 mt-1">{errors.location.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Operator Name *
              </label>
              <input
                {...register('operatorName', { required: 'Operator name is required' })}
                type="text"
                placeholder="Full name"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              {errors.operatorName && (
                <p className="text-xs text-red-600 mt-1">{errors.operatorName.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Test Type */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            Test Type *
          </label>
          <select
            {...register('testType', { required: 'Test type is required' })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Select test type</option>
            <option value="Routine">Routine Quality Check</option>
            <option value="Post-Maintenance">Post-Maintenance Verification</option>
            <option value="Incident">Incident Investigation</option>
            <option value="Compliance">Regulatory Compliance</option>
          </select>
          {errors.testType && (
            <p className="text-xs text-red-600 mt-1">{errors.testType.message}</p>
          )}
        </div>

        {/* Test Parameters */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-neutral-900 mb-4">Test Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Viscosity */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                <div className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-blue-600" />
                  <span>Viscosity (cSt)</span>
                </div>
              </label>
              <input
                {...register('viscosity')}
                type="number"
                step="0.01"
                placeholder="e.g., 35.5"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Density */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-purple-600" />
                  <span>Density (kg/m³)</span>
                </div>
              </label>
              <input
                {...register('density')}
                type="number"
                step="0.01"
                placeholder="e.g., 850.5"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Temperature */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-red-600" />
                  <span>Temperature (°C)</span>
                </div>
              </label>
              <input
                {...register('temperature')}
                type="number"
                step="0.1"
                placeholder="e.g., 25.0"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Flash Point */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-orange-600" />
                  <span>Flash Point (°C)</span>
                </div>
              </label>
              <input
                {...register('flashPoint')}
                type="number"
                step="0.1"
                placeholder="e.g., 55.0"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Sulfur Content */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Sulfur Content (%)
              </label>
              <input
                {...register('sulfurContent')}
                type="number"
                step="0.001"
                placeholder="e.g., 0.15"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Water Content */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Water Content (%)
              </label>
              <input
                {...register('waterContent')}
                type="number"
                step="0.01"
                placeholder="e.g., 0.05"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            Notes & Observations
          </label>
          <textarea
            {...register('notes')}
            rows={4}
            placeholder="Add any observations, anomalies, or additional comments..."
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Submit Report</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
