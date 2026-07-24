import { ImageResponse } from "next/og";

export const alt = "Saqib Sohail — Senior Full-Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        color: "#f0efe9",
        backgroundColor: "#151817",
        backgroundImage:
          "linear-gradient(rgba(240,239,233,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(240,239,233,.06) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#aab1ad",
        }}
      >
        <span>Saqib Sohail</span>
        <span>Systems notebook / 2026</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
        <div
          style={{
            color: "#b9d56a",
            fontSize: 23,
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Senior Full-Stack Engineer · Berlin
        </div>
        <div
          style={{
            fontFamily: "serif",
            fontSize: 72,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
          }}
        >
          Interfaces, services and practical AI workflows.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 22,
          color: "#aab1ad",
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#b9d56a",
          }}
        />
        ssohail.com
      </div>
    </div>,
    size,
  );
}

