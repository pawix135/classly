'use client';
import { CreateNewsAction } from '@/actions/Teacher/news';
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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';

interface Props {
  classes: {
    id: number;
    name: string;
  }[];
}

type CreateNewsError = {
  path: string[];
  message: string;
};

type FormState = {
  errors?: CreateNewsError[] | undefined;
  success: boolean;
  date?: Date;
} | null;

const AddClassNews: React.FC<Props> = ({ classes }) => {
  let [state, action] = useFormState<FormState, any>(CreateNewsAction, null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  let titleError = state?.errors?.find((x) => x.path.includes('title'));
  let contentError = state?.errors?.find((x) => x.path.includes('content'));

  let formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state) return;

    if (state && !state.success) {
      toast('Something went wrong!', { duration: 2000 });
    } else if (state && state.success) {
      formRef.current?.reset();
      setIsOpen(false);
      toast('News created successfully!', { duration: 2000 });
      state = null;
    }
  }, [state?.date]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="w-full mt-5">
        <Button>Add new news</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[1000px]">
        <DialogHeader>
          <DialogTitle>Create news</DialogTitle>
        </DialogHeader>
        <form action={action} className="flex flex-col gap-5" ref={formRef}>
          <InputGroup name="title" text="News title" type="text" error={titleError?.message} />
          <InputGroup
            name="content"
            type="textarea"
            text="News content"
            className={{ input: 'max-h-[500px]' }}
            error={contentError?.message}
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
          <Button type="submit">Create new news</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClassNews;
