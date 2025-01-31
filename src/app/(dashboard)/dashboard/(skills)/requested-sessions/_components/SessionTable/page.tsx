import FixMeetingModal from "@/components/shared/modal/FixMeetingModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ISession } from "@/types/session.interface";
import { Presentation } from "lucide-react";

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
              <TableCell>{session.status}</TableCell>
              <TableCell>
                <FixMeetingModal sessionId={session.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
