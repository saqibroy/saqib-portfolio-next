import { ImageResponse } from 'next/og';

export const alt = 'Saqib Sohail — Senior frontend-leaning full-stack engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '72px', background: '#081014', color: '#f3f7f8' }}>
      <div style={{ display: 'flex', color: '#46bdd0', fontSize: 28, letterSpacing: 5, textTransform: 'uppercase' }}>Saqib Sohail</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', maxWidth: 930, fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -4 }}>Senior frontend-leaning full-stack engineer</div>
        <div style={{ display: 'flex', maxWidth: 880, color: '#bed0d5', fontSize: 32, lineHeight: 1.35 }}>Accessible product systems across React interfaces, Python services, and applied AI.</div>
      </div>
      <div style={{ display: 'flex', color: '#bed0d5', fontSize: 24 }}>ssohail.com · Berlin, Germany</div>
    </div>,
    { ...size },
  );
}
