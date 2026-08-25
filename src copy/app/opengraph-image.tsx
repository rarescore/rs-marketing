import { ImageResponse } from "next/og";

export const alt = "ONLEV — client-winning digital systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "56px",
          background: "#0d0f12",
          color: "#f3f0e9",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            border: "1px solid rgba(243,240,233,.28)",
            padding: "46px",
            flexDirection: "column",
            justifyContent: "space-between",
            background:
              "radial-gradient(circle at 78% 20%, rgba(73,105,255,.22), transparent 32%), radial-gradient(circle at 18% 88%, rgba(202,165,107,.16), transparent 28%), #111318",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
            <div
              style={{
                display: "flex",
                width: "72px",
                height: "72px",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                border: "2px solid #caa56b",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "-1px",
                lineHeight: .82,
              }}
            >
              <span>ON</span>
              <span>LEV</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "3px" }}>ONLEV</span>
              <span style={{ color: "rgba(243,240,233,.58)", fontSize: "16px", letterSpacing: "3px" }}>DIGITAL SYSTEMS</span>
            </div>
          </div>
          <div style={{ display: "flex", maxWidth: "940px", flexDirection: "column" }}>
            <div style={{ color: "#caa56b", fontSize: "17px", letterSpacing: "4px" }}>BUILT FOR THE MOMENT OF DECISION</div>
            <div style={{ marginTop: "18px", fontSize: "66px", fontWeight: 500, lineHeight: .98, letterSpacing: "-4px" }}>
              Complete systems that turn local searches into qualified conversations.
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(243,240,233,.62)", fontSize: "16px", letterSpacing: "2px" }}>
            <span>REAL ESTATE · HOME SERVICES · INJURY LAW</span>
            <span>ONLEV.SITE</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
