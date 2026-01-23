import React, { useMemo } from 'react';
import { cn } from '../../utils/cn';
import { Check } from 'lucide-react';

interface PasswordStrengthMeterProps {
  password: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const requirements = useMemo(() => [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ], [password]);

  const strength = requirements.filter(r => r.met).length;

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-slate-200";
    if (score <= 2) return "bg-red-500";
    if (score === 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthLabel = (score: number) => {
    if (score === 0) return "Enter password";
    if (score <= 2) return "Weak";
    if (score === 3) return "Medium";
    return "Strong";
  };

  return (
    <div className="space-y-3 mt-3 animate-fade-in">
      {/* Visual Bars */}
      <div className="flex gap-1 h-1.5">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={cn(
              "h-full flex-1 rounded-full transition-all duration-300",
              strength >= level ? getStrengthColor(strength) : "bg-slate-100"
            )}
          />
        ))}
      </div>

      {/* Label */}
      <p className={cn("text-xs font-bold text-right",
        strength <= 2 ? "text-red-500" : strength === 3 ? "text-yellow-600" : "text-green-600"
      )}>
        {getStrengthLabel(strength)}
      </p>

      {/* Requirement List */}
      <div className="grid grid-cols-2 gap-2">
        {requirements.map((req, i) => (
          <div key={i} className="flex items-center gap-2">
            {req.met ? (
              <Check size={12} className="text-green-500 font-bold" />
            ) : (
              <div className="w-3 h-3 rounded-full border border-slate-300"></div>
            )}
            <span className={cn("text-xs transition-colors", req.met ? "text-slate-700 font-medium" : "text-slate-400")}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};