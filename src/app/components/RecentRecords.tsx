import { CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';

interface QualityRecord {
  id: string;
  sampleId: string;
  location: string;
  testType: string;
  operator: string;
  score: number;
  status: 'passed' | 'failed' | 'warning';
  timestamp: string;
}

const mockRecords: QualityRecord[] = [
  {
    id: '1',
    sampleId: 'SMP-2026-142',
    location: 'Well A-1',
    testType: 'Routine',
    operator: 'Ahmed Hassan',
    score: 98,
    status: 'passed',
    timestamp: '2026-04-11 14:30'
  },
  {
    id: '2',
    sampleId: 'SMP-2026-141',
    location: 'Storage Tank 1',
    testType: 'Compliance',
    operator: 'Sarah Abdullah',
    score: 96,
    status: 'passed',
    timestamp: '2026-04-11 12:15'
  },
  {
    id: '3',
    sampleId: 'SMP-2026-140',
    location: 'Separator Unit 1',
    testType: 'Post-Maintenance',
    operator: 'Mohammed Ali',
    score: 87,
    status: 'warning',
    timestamp: '2026-04-11 10:45'
  },
  {
    id: '4',
    sampleId: 'SMP-2026-139',
    location: 'Well B-1',
    testType: 'Routine',
    operator: 'Fatima Ibrahim',
    score: 99,
    status: 'passed',
    timestamp: '2026-04-11 09:20'
  },
  {
    id: '5',
    sampleId: 'SMP-2026-138',
    location: 'Storage Tank 2',
    testType: 'Incident',
    operator: 'Omar Khalid',
    score: 72,
    status: 'failed',
    timestamp: '2026-04-10 16:50'
  },
  {
    id: '6',
    sampleId: 'SMP-2026-137',
    location: 'Well A-2',
    testType: 'Routine',
    operator: 'Ahmed Hassan',
    score: 97,
    status: 'passed',
    timestamp: '2026-04-10 14:30'
  }
];

export function RecentRecords() {
  const getStatusIcon = (status: QualityRecord['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
    }
  };

  const getStatusBadge = (status: QualityRecord['status']) => {
    const styles = {
      passed: 'bg-green-50 text-green-700 border-green-200',
      failed: 'bg-red-50 text-red-700 border-red-200',
      warning: 'bg-amber-50 text-amber-700 border-amber-200'
    };

    return (
      <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-600 font-semibold';
    if (score >= 85) return 'text-amber-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200">
      <div className="px-6 py-4 border-b border-neutral-200">
        <h3 className="font-semibold text-neutral-900">Recent Quality Records</h3>
        <p className="text-sm text-neutral-600">Latest test results and reports</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                Sample ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                Test Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                Operator
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {mockRecords.map((record) => (
              <tr key={record.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-neutral-900">{record.sampleId}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                  {record.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                  {record.testType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                  {record.operator}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm ${getScoreColor(record.score)}`}>
                    {record.score}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(record.status)}
                    {getStatusBadge(record.status)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                  {record.timestamp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors group">
                    <Eye className="w-4 h-4 text-neutral-500 group-hover:text-neutral-700" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-neutral-200 flex items-center justify-between">
        <p className="text-sm text-neutral-600">
          Showing 6 of 142 total records
        </p>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All Records
        </button>
      </div>
    </div>
  );
}
