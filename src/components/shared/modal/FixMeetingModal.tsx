"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Presentation } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { showToast } from "../Toast/CustomTost";
import { useUpdateSessionMutation } from "@/redux/api/modules/sessionApi";

const FixMeetingModal = ({ sessionId }: { sessionId: string }) => {
  const [open, setOpen] = useState(false);
  const [meetingLink, setMeetingLink] = useState("");

  const [updateSession, { isLoading }] = useUpdateSessionMutation();

  const handleSubmitMeetingLink = async () => {
    console.log(meetingLink, sessionId);
    showToast("success", meetingLink);

    const updateInfo = {
      id: sessionId,
      payload: {
        meetingLink,
        status: "ACCEPTED",
      },
    };

    const res = await updateSession(updateInfo).unwrap();

    if (res.success) {
      showToast("success", res.message);
      setOpen(false);
    } else {
      showToast("error", res.message);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button className="flex items-center gpa-1">
            <Presentation />
            Fix Meeting
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Provide Google Meet Link</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="meetingLink" className="text-right">
                Meeting Link
              </Label>
              <Input
                id="meetingLink"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                className="col-span-3"
                placeholder="https://meet.google.com/abc-xyz"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmitMeetingLink}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FixMeetingModal;
