'use client';

import { useRouter } from 'next/navigation';
import type { MouseEventHandler } from 'react';
import { useCallback, useRef, useEffect } from 'react';

import { Modal } from '@/components';

export const LocalModal = ({ children }: { children: React.ReactNode }) => {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <Modal
      ref={overlay}
      centered
      opened
      className='fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60'
      onClose={onDismiss}
    >
      <div
        ref={wrapper}
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-6'
      >
        {children}
      </div>
    </Modal>
  );
};
