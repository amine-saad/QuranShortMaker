// Pexels Video Search Service (Mocked)
export interface PexelsVideo {
  id: number;
  url: string;
  image: string;
  duration: number;
  user: {
    name: string;
    url: string;
  };
  videoFiles: Array<{
    quality: string;
    width: number;
    height: number;
    link: string;
  }>;
}

export async function searchPexelsVideos(
  query: string,
  apiKey: string
): Promise<PexelsVideo[]> {
  // Mock search results
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: 1001,
      url: 'https://www.pexels.com/video/1001/',
      image: 'https://images.pexels.com/videos/1001/free-video-1001.jpg',
      duration: 15,
      user: { name: 'Taryn Elliott', url: 'https://www.pexels.com/@taryn-elliott' },
      videoFiles: [
        { quality: 'hd', width: 1920, height: 1080, link: 'https://example.com/video-hd.mp4' },
      ],
    },
    {
      id: 1002,
      url: 'https://www.pexels.com/video/1002/',
      image: 'https://images.pexels.com/videos/1002/free-video-1002.jpg',
      duration: 20,
      user: { name: 'Engin Akyurt', url: 'https://www.pexels.com/@enginakyurt' },
      videoFiles: [
        { quality: 'hd', width: 1920, height: 1080, link: 'https://example.com/video2-hd.mp4' },
      ],
    },
  ];
}
