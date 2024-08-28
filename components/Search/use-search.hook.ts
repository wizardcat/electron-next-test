import { useEffect, useState } from 'react';

export const useSearch = () => {
  const [link, setLink] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleSubmitClick = async () => {
    setIsLoading(true);
    window.electron.send('fetch-url', link);
  };

  useEffect(() => {
    window.electron.receive('page-load', (result: string) => {
      const { isLoaded } = JSON.parse(result);
      setIsLoading(!isLoaded);
    });
  }, []);

  return {
    link,
    isLoading,
    handleLinkChange,
    handleSubmitClick,
  };
}