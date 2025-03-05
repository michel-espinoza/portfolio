import {VITE_PUBLIC_KEY_GIPHY} from 'astro:env/client' 

interface Gif {
  id: string;
  title: string;
  url: string;
}

export const getGifs = async (category: string): Promise<Gif[]> => {
  const apiKey = VITE_PUBLIC_KEY_GIPHY;
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=12&q=${encodeURIComponent(category)}`;

  const resp = await fetch(url);
  const { data } = await resp.json();

  const gifs: Gif[] = data.map((img: any) => ({
    id: img.id,
    title: img.title,
    url: img.images.downsized_medium.url,
  }));
  return gifs;
};
