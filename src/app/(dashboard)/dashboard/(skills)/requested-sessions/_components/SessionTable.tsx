/* eslint-disable @typescript-eslint/no-explicit-any */
import FixMeetingModal from "@/components/shared/modal/FixMeetingModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UpdateStatus from "./UpdateStatus";
import Image from "next/image";

export default function SessionsTable({ sessions }: { sessions: any[] }) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Requestor</TableHead>
            <TableHead>Skill</TableHead>
            <TableHead>Day</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell>
                <div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 relative mr-4">
                      <Image
                        src={session.requestor.profilePhoto}
                        className="rounded-full w-10 h-10 object-center"
                        alt={session.requestor.name}
                        width={50}
                        height={50}
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{session.requestor.name}</p>
                      <p className="text-gray-500">{session.requestor.email}</p>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{session.skill.name}</TableCell>
              <TableCell>{session.availability.dayOfWeek}</TableCell>
              <TableCell>{`${session.availability.startTime} - ${session.availability.endTime}`}</TableCell>
              <TableCell>
                <UpdateStatus status={session.status} id={session.id} />
              </TableCell>
              <TableCell>
                <FixMeetingModal
                  meetingLink={session.meetingLink}
                  sessionId={session.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
