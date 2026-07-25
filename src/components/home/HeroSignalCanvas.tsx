'use client';

import { useEffect, useRef, useState } from 'react';

type NetworkInformation = {
  saveData?: boolean;
};

function shouldKeepStatic() {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches || connection?.saveData === true;
}

export function HeroSignalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (shouldKeepStatic()) return;

    const schedule = window.requestIdleCallback?.(() => setEnabled(true), { timeout: 700 });
    const timeout = schedule === undefined ? window.setTimeout(() => setEnabled(true), 350) : undefined;

    return () => {
      if (schedule !== undefined) window.cancelIdleCallback?.(schedule);
      if (timeout !== undefined) window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!enabled || !canvasRef.current || !wrapperRef.current) return;

    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const points = Array.from({ length: 28 }, (_, index) => ({
      seedX: ((index * 47) % 101) / 100,
      seedY: ((index * 71) % 97) / 96,
      phase: index * 0.71,
    }));
    const pointer = { x: 0.66, y: 0.42 };
    let frame = 0;
    let visible = true;
    let animationFrame = 0;

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const width = wrapper.clientWidth;
      const height = wrapper.clientHeight;
      context.clearRect(0, 0, width, height);
      const computed = getComputedStyle(wrapper);
      const accent = computed.getPropertyValue('--accent').trim() || '#007f9e';
      const border = computed.getPropertyValue('--border').trim() || '#c9d5da';
      const time = frame * 0.008;

      context.lineWidth = 0.8;
      context.strokeStyle = border;
      context.globalAlpha = 0.32;
      for (let column = 0; column < 13; column += 1) {
        const x = (column / 12) * width;
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      for (let row = 0; row < 8; row += 1) {
        const y = (row / 7) * height;
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      const positions = points.map((point) => {
        const pull = Math.max(0, 1 - Math.hypot(point.seedX - pointer.x, point.seedY - pointer.y) * 2.1);
        return {
          x: (point.seedX + Math.sin(time + point.phase) * 0.008 + (pointer.x - point.seedX) * pull * 0.055) * width,
          y: (point.seedY + Math.cos(time * 0.8 + point.phase) * 0.012 + (pointer.y - point.seedY) * pull * 0.055) * height,
        };
      });

      context.globalAlpha = 0.42;
      context.strokeStyle = accent;
      positions.forEach((point, index) => {
        positions.slice(index + 1).forEach((other) => {
          const distance = Math.hypot(point.x - other.x, point.y - other.y);
          if (distance > Math.min(width, height) * 0.26) return;
          context.globalAlpha = Math.max(0.05, 0.34 - distance / Math.min(width, height));
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        });
      });

      context.fillStyle = accent;
      positions.forEach((point, index) => {
        context.globalAlpha = index % 5 === 0 ? 0.85 : 0.48;
        context.beginPath();
        context.arc(point.x, point.y, index % 5 === 0 ? 2.8 : 1.6, 0, Math.PI * 2);
        context.fill();
      });

      frame += 1;
      if (visible && document.visibilityState === 'visible') animationFrame = requestAnimationFrame(draw);
    };

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(animationFrame);
      if (visible && document.visibilityState === 'visible') animationFrame = requestAnimationFrame(draw);
    });
    const resizeObserver = new ResizeObserver(resize);
    const onPointerMove = (event: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
    };
    const onVisibilityChange = () => {
      cancelAnimationFrame(animationFrame);
      if (visible && document.visibilityState === 'visible') animationFrame = requestAnimationFrame(draw);
    };

    resize();
    intersection.observe(wrapper);
    resizeObserver.observe(wrapper);
    wrapper.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrame);
      intersection.disconnect();
      resizeObserver.disconnect();
      wrapper.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [enabled]);

  return (
    <div ref={wrapperRef} className="hero-signal" data-rendering={enabled ? 'canvas' : 'static'} aria-hidden="true">
      {enabled ? <canvas ref={canvasRef} /> : null}
    </div>
  );
}
