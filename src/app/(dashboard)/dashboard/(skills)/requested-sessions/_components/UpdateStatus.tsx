"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateSessionMutation } from "@/redux/api/modules/sessionApi";

const UpdateStatus = ({
  id,
  status: initialStatus,
}: {
  id: string;
  status: string;
}) => {
  const [updateStatus] = useUpdateSessionMutation();

  const handleStatusChange = async (value: string) => {
    try {
      const res = await updateStatus({
        id,
        payload: { status: value },
      }).unwrap();
      console.log("Status updated successfully", res);
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <Select
      disabled={initialStatus === "COMPLETED" || initialStatus === "REJECTED"}
      onValueChange={handleStatusChange}
      value={initialStatus}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PENDING">Pending</SelectItem>
        <SelectItem value="ACCEPTED">Accepted</SelectItem>
        <SelectItem value="REJECTED">Rejected</SelectItem>
        <SelectItem value="COMPLETED">Completed</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UpdateStatus;
