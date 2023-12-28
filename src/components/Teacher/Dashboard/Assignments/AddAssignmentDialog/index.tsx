'use client';
import { createAssignment } from '@/actions/Teacher/assignments';
import ButtonWithStatus from '@/components/Forms/ButtonWithStatus';
import InputGroup from '@/components/Forms/InputGroup';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';

type CreateAssignmentError = {
  path: string[];
  message: string;
};

type FormState = {
  errors?: CreateAssignmentError[] | undefined;
  success: boolean;
} | null;

interface Props {
  classes: {
    id: number;
    name: string;
  }[];
  teacherId: number;
}

const TeacherAddAssignmentDialog: React.FC<Props> = ({ classes, teacherId }) => {
  const [state, action] = useFormState<FormState, any>(createAssignment, null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  let formRef = useRef<HTMLFormElement>(null);

  let nameError = state?.errors?.find((error) => error.path.includes('name'));
  let descriptionError = state?.errors?.find((error) => error.path.includes('description'));

  useEffect(() => {
    if (!state?.success) return;

    formRef.current?.reset();
    setIsOpen(false);
  }, [state?.success]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full mt-5" asChild>
        <Button className="w-full">Add new assignment</Button>
      </DialogTrigger>
      <DialogContent className="w-5/6 md:max-w-screen-md lg:max-w-screen-lg ">
        <DialogHeader>
          <DialogTitle>Add new assignment</DialogTitle>
        </DialogHeader>
        <form action={action} className="flex flex-col gap-5" ref={formRef}>
          <input name="teacherId" type="number" value={teacherId} className="hidden" />
          <InputGroup name="name" text="Assignment name" type="text" error={nameError?.message} />
          <InputGroup
            name="description"
            text="Description"
            type="textarea"
            error={descriptionError?.message}
          />
          <Select name="classId">
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Classes</SelectLabel>
                {classes.map((x) => (
                  <SelectItem key={x.id} value={`${x.id}`}>
                    {x.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <ButtonWithStatus>Create new assignment</ButtonWithStatus>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherAddAssignmentDialog;
