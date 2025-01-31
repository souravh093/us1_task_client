import FixMeetingModal from "@/components/shared/modal/FixMeetingModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ISession } from "@/types/session.interface";
import UpdateStatus from "../UpdateStatus";

export default function SessionsTable({ sessions }: { sessions: ISession[] }) {
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
              <TableCell>{session.requestor.name}</TableCell>
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
