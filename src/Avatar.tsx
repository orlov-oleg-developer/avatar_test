import { useEffect, useRef } from 'react';
import { TalkingHead } from '@met4citizen/talkinghead';

export default function Avatar() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const talkingHeadRef = useRef<TalkingHead | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const head = new TalkingHead(containerRef.current, {
      ttsLang: 'en-US',
      ttsVoice: 'en-US-Standard-A',
      lipsyncLang: 'en',
      lipsyncModules: ['en'],
    });

    talkingHeadRef.current = head;

    head.showAvatar(
      'https://models.readyplayer.me/64d6e6b58c3de6000cf93c02.glb?morphTargets=ARKit,Oculus+Visemes,RPM'
    );

    head.speakText('Hello! I am a talking avatar.');

    return () => {
      head.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '600px', height: '600px' }} />;
}
