import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const SearchSchema = z.object({
  link: z.string().url(),
});

type SearchSchemaType = z.infer<typeof SearchSchema>;

export const useSearch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchSchemaType>({
    resolver: zodResolver(SearchSchema),
  });

  const handleSubmitClick = async (data: SearchSchemaType) => {
    setIsLoading(true);
    window.electron.send('fetch-url', data.link);
  };

  useEffect(() => {    
    window.electron.receive('page-load', (result: string) => {
      const { isLoaded } = JSON.parse(result);      
      setIsLoading(!isLoaded);
    });
  }, []);

  return {
    isLoading,
    handleSubmitClick,
    register,
    handleSubmit,
    errors,
  };
};
