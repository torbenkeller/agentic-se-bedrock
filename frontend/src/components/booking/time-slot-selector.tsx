import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import type { BookingTimeSlot } from '@/types/booking';

export type QuickTimeRange = 'morning' | 'afternoon' | 'fullday';

const DEFAULT_PRESETS: Record<QuickTimeRange, BookingTimeSlot> = {
  morning: { start: '09:00', end: '12:00' },
  afternoon: { start: '13:00', end: '18:00' },
  fullday: { start: '09:00', end: '18:00' },
};

function isValidTime(value: string) {
  return /^\d{2}:\d{2}$/.test(value);
}

function isEndAfterStart(start: string, end: string) {
  return isValidTime(start) && isValidTime(end) && end > start;
}

function equalSlot(a: BookingTimeSlot | undefined, b: BookingTimeSlot | undefined) {
  if (!a || !b) return false;
  return a.start === b.start && a.end === b.end;
}

export interface TimeSlotSelectorProps {
  value?: BookingTimeSlot;
  onChange: (slot: BookingTimeSlot) => void;
  disabled?: boolean;
  className?: string;

  // Show preset buttons
  showPresets?: boolean;

  // Override default preset ranges
  presets?: Partial<Record<QuickTimeRange, BookingTimeSlot>>;

  // Optional label text
  label?: string;

  // Optional helper text below inputs
  helperText?: string;
}

/**
 * Reusable time slot selector with presets (morning/afternoon/full day) and custom time inputs.
 * - Controlled via `value` and `onChange`
 * - Emits onChange immediately on any change (including invalid ranges)
 * - Shows simple validation hint when end <= start
 */
export function TimeSlotSelector({
  value,
  onChange,
  disabled,
  className,
  showPresets = true,
  presets,
  label = 'Zeitraum',
  helperText,
}: TimeSlotSelectorProps) {
  const mergedPresets = useMemo(
    () => ({ ...DEFAULT_PRESETS, ...(presets ?? {}) }),
    [presets]
  );

  const [start, setStart] = useState<string>(value?.start ?? mergedPresets.fullday.start);
  const [end, setEnd] = useState<string>(value?.end ?? mergedPresets.fullday.end);

  // Keep internal state in sync with external value changes
  useEffect(() => {
    if (value) {
      setStart(value.start);
      setEnd(value.end);
    }
    // Only react to value changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.start, value?.end]);

  const activePreset: QuickTimeRange | null = useMemo(() => {
    if (equalSlot({ start, end }, mergedPresets.morning)) return 'morning';
    if (equalSlot({ start, end }, mergedPresets.afternoon)) return 'afternoon';
    if (equalSlot({ start, end }, mergedPresets.fullday)) return 'fullday';
    return null;
  }, [start, end, mergedPresets]);

  const invalid = useMemo(() => !isEndAfterStart(start, end), [start, end]);

  const applyPreset = (key: QuickTimeRange) => {
    const slot = mergedPresets[key];
    setStart(slot.start);
    setEnd(slot.end);
    onChange(slot);
  };

  const handleStartChange = (v: string) => {
    setStart(v);
    const next = { start: v, end };
    onChange(next);
  };

  const handleEndChange = (v: string) => {
    setEnd(v);
    const next = { start, end: v };
    onChange(next);
  };

  return (
    <div className={['flex flex-col gap-3', className].filter(Boolean).join(' ')}>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium">{label}</span>
        {invalid && (
          <span className="text-xs text-destructive">Ende muss nach Start liegen</span>
        )}
      </div>

      {showPresets && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Voreinstellungen">
          <Button
            type="button"
            size="sm"
            variant={activePreset === 'morning' ? 'default' : 'outline'}
            onClick={() => applyPreset('morning')}
            disabled={disabled}
          >
            Vormittag
          </Button>
          <Button
            type="button"
            size="sm"
            variant={activePreset === 'afternoon' ? 'default' : 'outline'}
            onClick={() => applyPreset('afternoon')}
            disabled={disabled}
          >
            Nachmittag
          </Button>
          <Button
            type="button"
            size="sm"
            variant={activePreset === 'fullday' ? 'default' : 'outline'}
            onClick={() => applyPreset('fullday')}
            disabled={disabled}
          >
            Ganztägig
          </Button>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="timeslot-start" className="text-sm text-muted-foreground">
            Start
          </label>
          <input
            id="timeslot-start"
            type="time"
            className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={start}
            onChange={(e) => handleStartChange(e.target.value)}
            disabled={disabled}
          />
        </div>

        <span className="text-muted-foreground">–</span>

        <div className="flex items-center gap-2">
          <label htmlFor="timeslot-end" className="text-sm text-muted-foreground">
            Ende
          </label>
          <input
            id="timeslot-end"
            type="time"
            className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={end}
            onChange={(e) => handleEndChange(e.target.value)}
            disabled={disabled}
            min={start}
          />
        </div>
      </div>

      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}