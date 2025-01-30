import { IAvailability } from "@/types/availability.interface";

const daysOfWeek = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export default function AvailabilitySchedule({
  availability,
}: {
  availability: IAvailability[];
}) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {daysOfWeek.map((day) => (
        <div key={day} className="text-center">
          <div className="font-semibold mb-2">
            {day.charAt(0) + day.slice(1).toLowerCase()}
          </div>
          {availability
            .filter((a) => a.dayOfWeek === day)
            .map((a) => (
              <div
                key={a.id}
                className="bg-primary text-primary-foreground rounded-md p-2 text-sm"
              >
                {a.startTime} - {a.endTime}
              </div>
            ))}
          {availability.filter((a) => a.dayOfWeek === day).length === 0 && (
            <div className="text-muted-foreground text-sm">Not available</div>
          )}
        </div>
      ))}
    </div>
  );
}
