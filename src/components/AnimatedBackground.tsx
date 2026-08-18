"use client";

import { useEffect, useRef } from "react";

function getDnaPaths(xCenter: number, yStart: number, yEnd: number, r: number, wavelength: number, theta: number) {
  const steps = 44;
  const dy = (yEnd - yStart) / steps;
  let path1 = "";
  let path2 = "";
  const rungs: { x1: number; x2: number; y: number; z1: number }[] = [];

  for (let i = 0; i <= steps; i++) {
    const y = yStart + i * dy;
    const phi = (y / wavelength) * Math.PI * 2;
    const a1 = phi + theta;
    const x1 = xCenter + Math.sin(a1) * r;
    const x2 = xCenter - Math.sin(a1) * r;
    const z1 = Math.cos(a1);

    if (i === 0) {
      path1 += `M ${x1.toFixed(1)} ${y.toFixed(1)} `;
      path2 += `M ${x2.toFixed(1)} ${y.toFixed(1)} `;
    } else {
      path1 += `L ${x1.toFixed(1)} ${y.toFixed(1)} `;
      path2 += `L ${x2.toFixed(1)} ${y.toFixed(1)} `;
    }

    if (i % 2 === 0) {
      rungs.push({ x1, x2, y, z1 });
    }
  }

  return { path1, path2, rungs };
}

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animFrameId: number;
    let lastProgress = -1;

    const updateVisuals = () => {
      if (!containerRef.current) return;

      // Universal cross-browser scroll measurement (Firefox Mobile APZ, Safari iOS, Chrome Android, Desktop)
      const visualPageTop =
        typeof window !== "undefined" && window.visualViewport
          ? window.visualViewport.pageTop
          : 0;

      const currentScroll = Math.max(
        visualPageTop || 0,
        (typeof window !== "undefined" ? window.scrollY || window.pageYOffset : 0) || 0,
        (document.scrollingElement ? document.scrollingElement.scrollTop : 0) || 0,
        (document.documentElement ? document.documentElement.scrollTop : 0) || 0,
        (document.body ? document.body.scrollTop : 0) || 0
      );

      const docHeight = Math.max(
        document.scrollingElement ? document.scrollingElement.scrollHeight : 0,
        document.documentElement ? document.documentElement.scrollHeight : 0,
        document.body ? document.body.scrollHeight : 0,
        1
      );

      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      const maxScroll = Math.max(docHeight - viewportHeight, 1);
      const progress = Math.min(Math.max(currentScroll / maxScroll, 0), 1);

      // Only update DOM when progress changes
      if (Math.abs(progress - lastProgress) > 0.0001) {
        lastProgress = progress;

        // 1. TRUE 3D ROTATING DNA HELIX
        const theta = progress * Math.PI * 8; // 4 full 360-degree rotations

        // Desktop DNA
        const dDna = getDnaPaths(380, -50, 1150, 85, 260, theta);
        const dStrand1 = containerRef.current.querySelector(".dna-strand-1-d") as SVGPathElement;
        const dStrand2 = containerRef.current.querySelector(".dna-strand-2-d") as SVGPathElement;
        const dRungLines = containerRef.current.querySelectorAll(".dna-rung-d");

        if (dStrand1 && dStrand2) {
          dStrand1.setAttribute("d", dDna.path1);
          dStrand2.setAttribute("d", dDna.path2);
        }

        if (dRungLines.length > 0) {
          dRungLines.forEach((rungEl, idx) => {
            if (idx < dDna.rungs.length) {
              const data = dDna.rungs[idx];
              const line = rungEl.querySelector("line");
              const c1 = rungEl.querySelector(".rung-node-1");
              const c2 = rungEl.querySelector(".rung-node-2");

              if (line) {
                line.setAttribute("x1", `${data.x1.toFixed(1)}`);
                line.setAttribute("x2", `${data.x2.toFixed(1)}`);
              }
              if (c1) c1.setAttribute("cx", `${data.x1.toFixed(1)}`);
              if (c2) c2.setAttribute("cx", `${data.x2.toFixed(1)}`);
            }
          });
        }

        // Mobile DNA
        const mDna = getDnaPaths(320, -50, 950, 70, 230, theta);
        const mStrand1 = containerRef.current.querySelector(".dna-strand-1-m") as SVGPathElement;
        const mStrand2 = containerRef.current.querySelector(".dna-strand-2-m") as SVGPathElement;
        const mRungLines = containerRef.current.querySelectorAll(".dna-rung-m");

        if (mStrand1 && mStrand2) {
          mStrand1.setAttribute("d", mDna.path1);
          mStrand2.setAttribute("d", mDna.path2);
        }

        if (mRungLines.length > 0) {
          mRungLines.forEach((rungEl, idx) => {
            if (idx < mDna.rungs.length) {
              const data = mDna.rungs[idx];
              const line = rungEl.querySelector("line");
              const c1 = rungEl.querySelector(".rung-node-1");
              const c2 = rungEl.querySelector(".rung-node-2");

              if (line) {
                line.setAttribute("x1", `${data.x1.toFixed(1)}`);
                line.setAttribute("x2", `${data.x2.toFixed(1)}`);
              }
              if (c1) c1.setAttribute("cx", `${data.x1.toFixed(1)}`);
              if (c2) c2.setAttribute("cx", `${data.x2.toFixed(1)}`);
            }
          });
        }

        // 2. RAPID DYNAMIC KNIFE SLICE (Initial Position & Motion)
        const desktopKnives = containerRef.current.querySelectorAll(".knife-group-desktop");
        const mobileKnives = containerRef.current.querySelectorAll(".knife-group-mobile");

        const dSlicePhase = Math.max(0, Math.sin(progress * Math.PI * 16));
        const dSliceDistance = dSlicePhase * 36;
        desktopKnives.forEach((k) => {
          (k as SVGElement).style.transform = `translate(${-dSliceDistance}px, ${dSliceDistance * 0.7}px) rotate(${-dSliceDistance * 0.12}deg)`;
        });

        const mSlicePhase = Math.max(0, Math.sin(progress * Math.PI * 16));
        const mSliceDistance = mSlicePhase * 58;
        mobileKnives.forEach((k) => {
          (k as SVGElement).style.transform = `translate(${-mSliceDistance}px, ${mSliceDistance * 0.78}px) rotate(${-mSliceDistance * 0.16}deg)`;
        });

        // 3. GEARS ROTATION (Mathematically Interlocking Synchronized Ratios)
        const gearMainD = containerRef.current.querySelector(".gear-main-desktop");
        const gearLeftD = containerRef.current.querySelector(".gear-left-desktop");
        const gearLowerD = containerRef.current.querySelector(".gear-lower-desktop");

        if (gearMainD) (gearMainD as SVGElement).style.transform = `rotate(${progress * 720}deg)`;
        if (gearLeftD) (gearLeftD as SVGElement).style.transform = `rotate(${-progress * 960}deg)`;
        if (gearLowerD) (gearLowerD as SVGElement).style.transform = `rotate(${progress * 720}deg)`;

        const gearMainM = containerRef.current.querySelector(".gear-main-mobile");
        const gearLeftM = containerRef.current.querySelector(".gear-left-mobile");
        const gearLowerM = containerRef.current.querySelector(".gear-lower-mobile");

        if (gearMainM) (gearMainM as SVGElement).style.transform = `rotate(${progress * 720}deg)`;
        if (gearLeftM) (gearLeftM as SVGElement).style.transform = `rotate(${-progress * 1008}deg)`;
        if (gearLowerM) (gearLowerM as SVGElement).style.transform = `rotate(${-progress * 1008}deg)`;

        // 4. MOLECULES ROTATION
        const molHex1 = containerRef.current.querySelectorAll(".mol-hex-1");
        const molHex2 = containerRef.current.querySelectorAll(".mol-hex-2");
        molHex1.forEach((m) => {
          (m as SVGElement).style.transform = `rotate(${progress * 360}deg)`;
        });
        molHex2.forEach((m) => {
          (m as SVGElement).style.transform = `rotate(${-progress * 480}deg)`;
        });

        // 5. FOOD PARTICLES DYNAMIC DRIFT
        const foodItems = containerRef.current.querySelectorAll(".food-interactive");
        foodItems.forEach((f, idx) => {
          const shift = Math.sin(progress * Math.PI * 16 + idx * 0.9) * 14;
          (f as SVGElement).style.transform = `translate(${shift * 0.7}px, ${-shift * 0.5}px) rotate(${shift * 0.6}deg)`;
        });

        // 6. CIRCUIT TRACES & VIAS
        const circuitTraces = containerRef.current.querySelectorAll(".circuit-bus-trace");
        circuitTraces.forEach((trace) => {
          const el = trace as SVGPathElement;
          const total = 900;
          el.style.strokeDashoffset = `${total * (1 - progress)}`;
          el.style.opacity = `${0.45 + progress * 0.4}`;
        });

        const glowNodes = containerRef.current.querySelectorAll(".glowing-via");
        glowNodes.forEach((node, i) => {
          const el = node as SVGCircleElement;
          const pulse = 0.35 + Math.sin(progress * 24 + i * 1.5) * 0.5;
          el.style.opacity = `${Math.max(0.15, Math.min(0.85, pulse))}`;
        });
      }
    };

    const loop = () => {
      updateVisuals();
      animFrameId = window.requestAnimationFrame(loop);
    };

    // Start continuous RAF loop
    animFrameId = window.requestAnimationFrame(loop);

    const vv = typeof window !== "undefined" ? window.visualViewport : null;
    if (vv) {
      vv.addEventListener("scroll", updateVisuals, { passive: true });
      vv.addEventListener("resize", updateVisuals, { passive: true });
    }

    window.addEventListener("scroll", updateVisuals, { passive: true });
    document.addEventListener("scroll", updateVisuals, { passive: true });
    window.addEventListener("resize", updateVisuals, { passive: true });
    window.addEventListener("touchmove", updateVisuals, { passive: true });

    return () => {
      window.cancelAnimationFrame(animFrameId);
      if (vv) {
        vv.removeEventListener("scroll", updateVisuals);
        vv.removeEventListener("resize", updateVisuals);
      }
      window.removeEventListener("scroll", updateVisuals);
      document.removeEventListener("scroll", updateVisuals);
      window.removeEventListener("resize", updateVisuals);
      window.removeEventListener("touchmove", updateVisuals);
    };
  }, []);

  // Initial DNA paths calculated statically for SSR
  const initialDDna = getDnaPaths(380, -50, 1150, 85, 260, 0);
  const initialMDna = getDnaPaths(320, -50, 950, 70, 230, 0);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#090B0E]"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      {/* ============================================================= */}
      {/* DESKTOP WIDESCREEN BACKGROUND (viewBox 1920x1080, md:block)   */}
      {/* ============================================================= */}
      <svg
        className="hidden md:block w-full h-full object-cover pointer-events-none"
        style={{ pointerEvents: "none" }}
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bg-vignette-d" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#121419" stopOpacity="0.94" />
            <stop offset="60%" stopColor="#0B0D11" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#040507" stopOpacity="1" />
          </radialGradient>

          <radialGradient id="bloom-dna-d" cx="22%" cy="40%" r="30%">
            <stop offset="0%" stopColor="#B87333" stopOpacity="0.09" />
            <stop offset="60%" stopColor="#B87333" stopOpacity="0.015" />
            <stop offset="100%" stopColor="#090B0E" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="bloom-center-d" cx="50%" cy="48%" r="30%">
            <stop offset="0%" stopColor="#FBBC00" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#B87333" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#090B0E" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="bloom-knife-d" cx="78%" cy="42%" r="35%">
            <stop offset="0%" stopColor="#B87333" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#FFAE64" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#090B0E" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="node-glow-d" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFAE64" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#FBBC00" stopOpacity="0.6" />
            <stop offset="80%" stopColor="#B87333" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#B87333" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="copper-bus-d" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFAE64" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#B87333" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#8C5C38" stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id="citrus-pulp-d" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFAE64" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#B87333" stopOpacity="0.25" />
          </linearGradient>

          <filter id="point-glow-d" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1920" height="1080" fill="url(#bg-vignette-d)" />
        <rect width="1920" height="1080" fill="url(#bloom-dna-d)" />
        <rect width="1920" height="1080" fill="url(#bloom-center-d)" />
        <rect width="1920" height="1080" fill="url(#bloom-knife-d)" />

        {/* 1. MOLECULAR CHEMISTRY NETWORK */}
        <g id="molecular-network-d" opacity="0.36">
          <g className="mol-hex-1" style={{ transformBox: "view-box", transformOrigin: "230px 210px" }}>
            <polygon points="180,180 230,150 280,180 280,240 230,270 180,240" fill="none" stroke="#B87333" strokeWidth="1.5" />
            <polygon points="192,187 230,164 268,187 268,233 230,256 192,233" fill="none" stroke="#D3C5AD" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="230" y1="150" x2="230" y2="90" stroke="#B87333" strokeWidth="1.5" />
            <line x1="180" y1="180" x2="110" y2="140" stroke="#B87333" strokeWidth="1.5" />
            <circle cx="230" cy="90" r="14" fill="none" stroke="#B87333" strokeWidth="1.5" />
            <circle cx="110" cy="140" r="18" fill="none" stroke="#B87333" strokeWidth="1.5" />
            <circle cx="230" cy="90" r="5" fill="#FFAE64" opacity="0.8" filter="url(#point-glow-d)" />
          </g>

          <g className="mol-hex-2" style={{ transformBox: "view-box", transformOrigin: "180px 440px" }}>
            <polygon points="130,410 180,380 230,410 230,470 180,500 130,470" fill="none" stroke="#B87333" strokeWidth="1.5" />
            <line x1="130" y1="410" x2="60" y2="450" stroke="#B87333" strokeWidth="1.5" />
            <line x1="180" y1="500" x2="180" y2="570" stroke="#B87333" strokeWidth="1.5" />
            <line x1="230" y1="470" x2="300" y2="510" stroke="#B87333" strokeWidth="1.5" />
            <circle cx="60" cy="450" r="14" fill="none" stroke="#B87333" strokeWidth="1.5" />
            <circle cx="180" cy="570" r="20" fill="none" stroke="#B87333" strokeWidth="1.5" />
            <circle cx="300" cy="510" r="12" fill="none" stroke="#B87333" strokeWidth="1.5" />
            <circle cx="60" cy="450" r="4.5" fill="#FFAE64" opacity="0.8" filter="url(#point-glow-d)" />
            <circle cx="180" cy="570" r="6" fill="#FFAE64" opacity="0.8" filter="url(#point-glow-d)" />
          </g>

          <line x1="180" y1="270" x2="180" y2="380" stroke="#B87333" strokeWidth="1.5" />
          <line x1="280" y1="240" x2="350" y2="280" stroke="#B87333" strokeWidth="1.5" />
          <circle cx="350" cy="280" r="16" fill="none" stroke="#B87333" strokeWidth="1.5" />
          <circle cx="350" cy="280" r="5" fill="#FFAE64" opacity="0.8" filter="url(#point-glow-d)" />
        </g>

        {/* 2. TRUE 3D ROTATING DNA HELIX */}
        <g id="dna-container-d" opacity="0.52">
          {initialDDna.rungs.map((rung, i) => (
            <g key={`d-rung-${i}`} className="dna-rung-d">
              <line
                x1={rung.x1}
                y1={rung.y}
                x2={rung.x2}
                y2={rung.y}
                stroke="#B87333"
                strokeWidth="1.6"
                strokeOpacity="0.5"
              />
              <circle className="rung-node-1" cx={rung.x1} cy={rung.y} r="2.5" fill="#FFAE64" opacity="0.8" />
              <circle className="rung-node-2" cx={rung.x2} cy={rung.y} r="2" fill="#D3C5AD" opacity="0.6" />
            </g>
          ))}

          <path
            className="dna-strand-1-d"
            d={initialDDna.path1}
            fill="none"
            stroke="#B87333"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            className="dna-strand-2-d"
            d={initialDDna.path2}
            fill="none"
            stroke="#D3C5AD"
            strokeWidth="2.5"
            strokeOpacity="0.7"
            strokeLinecap="round"
          />
        </g>

        {/* 3. MATHEMATICALLY INTERLOCKING 1:1 SYMMETRIC TRAPEZOIDAL GEARS (Desktop) */}
        <g id="gear-assembly-d" opacity="0.52">
          {/* Left Gear: Center (708, 500), N=12, Rp=108 */}
          <g id="gear-left-d" className="gear-left-desktop" style={{ transformBox: "view-box", transformOrigin: "708px 500px" }}>
            <path
              d="M 798.8 524.3 L 796.6 531.4 L 818.1 552.5 L 808.5 569.1 L 779.5 561.0 L 774.5 566.5 L 774.5 566.5 L 769.0 571.5 L 777.1 600.5 L 760.5 610.1 L 739.4 588.6 L 732.3 590.8 L 732.3 590.8 L 725.1 592.4 L 717.6 621.6 L 698.4 621.6 L 690.9 592.4 L 683.7 590.8 L 683.7 590.8 L 676.6 588.6 L 655.5 610.1 L 638.9 600.5 L 647.0 571.5 L 641.5 566.5 L 641.5 566.5 L 636.5 561.0 L 607.5 569.1 L 597.9 552.5 L 619.4 531.4 L 617.2 524.3 L 617.2 524.3 L 615.6 517.1 L 586.4 509.6 L 586.4 490.4 L 615.6 482.9 L 617.2 475.7 L 617.2 475.7 L 619.4 468.6 L 597.9 447.5 L 607.5 430.9 L 636.5 439.0 L 641.5 433.5 L 641.5 433.5 L 647.0 428.5 L 638.9 399.5 L 655.5 389.9 L 676.6 411.4 L 683.7 409.2 L 683.7 409.2 L 690.9 407.6 L 698.4 378.4 L 717.6 378.4 L 725.1 407.6 L 732.3 409.2 L 732.3 409.2 L 739.4 411.4 L 760.5 389.9 L 777.1 399.5 L 769.0 428.5 L 774.5 433.5 L 774.5 433.5 L 779.5 439.0 L 808.5 430.9 L 818.1 447.5 L 796.6 468.6 L 798.8 475.7 L 798.8 475.7 L 800.4 482.9 L 829.6 490.4 L 829.6 509.6 L 800.4 517.1 L 798.8 524.3 Z"
              fill="none"
              stroke="#B87333"
              strokeWidth="1.8"
            />
            <circle cx="708" cy="500" r="65" fill="none" stroke="#B87333" strokeWidth="1.2" />
            <circle cx="708" cy="500" r="24" fill="#0E1015" stroke="#B87333" strokeWidth="2" />
            <circle cx="708" cy="500" r="10" fill="none" stroke="#FFAE64" strokeWidth="1.5" />
          </g>

          {/* Lower Gear: Center (708, 752), N=16, Rp=144 */}
          <g id="gear-lower-d" className="gear-lower-desktop" style={{ transformBox: "view-box", transformOrigin: "708px 752px" }}>
            <path
              d="M 838.0 752.0 L 837.8 759.7 L 864.5 773.6 L 860.9 791.9 L 830.8 794.6 L 828.1 801.7 L 828.1 801.7 L 825.0 808.7 L 844.3 831.9 L 834.0 847.4 L 805.2 838.4 L 799.9 843.9 L 799.9 843.9 L 794.4 849.2 L 803.4 878.0 L 787.9 888.3 L 764.7 869.0 L 757.7 872.1 L 757.7 872.1 L 750.6 874.8 L 747.9 904.9 L 729.6 908.5 L 715.7 881.8 L 708.0 882.0 L 708.0 882.0 L 700.3 881.8 L 686.4 908.5 L 668.1 904.9 L 665.4 874.8 L 658.3 872.1 L 658.3 872.1 L 651.3 869.0 L 628.1 888.3 L 612.6 878.0 L 621.6 849.2 L 616.1 843.9 L 616.1 843.9 L 610.8 838.4 L 582.0 847.4 L 571.7 831.9 L 591.0 808.7 L 587.9 801.7 L 587.9 801.7 L 585.2 794.6 L 555.1 791.9 L 551.5 773.6 L 578.2 759.7 L 578.0 752.0 L 578.0 752.0 L 578.2 744.3 L 551.5 730.4 L 555.1 712.1 L 585.2 709.4 L 587.9 702.3 L 587.9 702.3 L 591.0 695.3 L 571.7 672.1 L 582.0 656.6 L 610.8 665.6 L 616.1 660.1 L 616.1 660.1 L 621.6 654.8 L 612.6 626.0 L 628.1 615.7 L 651.3 635.0 L 658.3 631.9 L 658.3 631.9 L 665.4 629.2 L 668.1 599.1 L 686.4 595.5 L 700.3 622.2 L 708.0 622.0 L 708.0 622.0 L 715.7 622.2 L 729.6 595.5 L 747.9 599.1 L 750.6 629.2 L 757.7 631.9 L 757.7 631.9 L 764.7 635.0 L 787.9 615.7 L 803.4 626.0 L 794.4 654.8 L 799.9 660.1 L 799.9 660.1 L 805.2 665.6 L 834.0 656.6 L 844.3 672.1 L 825.0 695.3 L 828.1 702.3 L 828.1 702.3 L 830.8 709.4 L 860.9 712.1 L 864.5 730.4 L 837.8 744.3 L 838.0 752.0 Z"
              fill="none"
              stroke="#B87333"
              strokeWidth="1.8"
            />
            <circle cx="708" cy="752" r="85" fill="none" stroke="#B87333" strokeWidth="1.2" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <line key={`lspoke-d-${deg}`} x1="708" y1="752" x2={708 + Math.cos((deg * Math.PI) / 180) * 144} y2={752 + Math.sin((deg * Math.PI) / 180) * 144} stroke="#B87333" strokeWidth="1.5" />
            ))}
            <circle cx="708" cy="752" r="28" fill="#0E1015" stroke="#B87333" strokeWidth="2" />
          </g>

          {/* Main Center Gear: Center (960, 500), N=16, Rp=144 */}
          <g id="gear-main-d" className="gear-main-desktop" style={{ transformBox: "view-box", transformOrigin: "960px 500px" }}>
            <path
              d="M 1090.0 500.0 L 1089.8 507.7 L 1116.5 521.6 L 1112.9 539.9 L 1082.8 542.6 L 1080.1 549.7 L 1080.1 549.7 L 1077.0 556.7 L 1096.3 579.9 L 1086.0 595.4 L 1057.2 586.4 L 1051.9 591.9 L 1051.9 591.9 L 1046.4 597.2 L 1055.4 626.0 L 1039.9 636.3 L 1016.7 617.0 L 1009.7 620.1 L 1009.7 620.1 L 1002.6 622.8 L 999.9 652.9 L 981.6 656.5 L 967.7 629.8 L 960.0 630.0 L 960.0 630.0 L 952.3 629.8 L 938.4 656.5 L 920.1 652.9 L 917.4 622.8 L 910.3 620.1 L 910.3 620.1 L 903.3 617.0 L 880.1 636.3 L 864.6 626.0 L 873.6 597.2 L 868.1 591.9 L 868.1 591.9 L 862.8 586.4 L 834.0 595.4 L 823.7 579.9 L 843.0 556.7 L 839.9 549.7 L 839.9 549.7 L 837.2 542.6 L 807.1 539.9 L 803.5 521.6 L 830.2 507.7 L 830.0 500.0 L 830.0 500.0 L 830.2 492.3 L 803.5 478.4 L 807.1 460.1 L 837.2 457.4 L 839.9 450.3 L 839.9 450.3 L 843.0 443.3 L 823.7 420.1 L 834.0 404.6 L 862.8 413.6 L 868.1 408.1 L 868.1 408.1 L 873.6 402.8 L 864.6 374.0 L 880.1 363.7 L 903.3 383.0 L 910.3 379.9 L 910.3 379.9 L 917.4 377.2 L 920.1 347.1 L 938.4 343.5 L 952.3 370.2 L 960.0 370.0 L 960.0 370.0 L 967.7 370.2 L 981.6 343.5 L 999.9 347.1 L 1002.6 377.2 L 1009.7 379.9 L 1009.7 379.9 L 1016.7 383.0 L 1039.9 363.7 L 1055.4 374.0 L 1046.4 402.8 L 1051.9 408.1 L 1051.9 408.1 L 1057.2 413.6 L 1086.0 404.6 L 1096.3 420.1 L 1077.0 443.3 L 1080.1 450.3 L 1080.1 450.3 L 1082.8 457.4 L 1112.9 460.1 L 1116.5 478.4 L 1089.8 492.3 L 1090.0 500.0 Z"
              fill="none"
              stroke="#B87333"
              strokeWidth="2"
            />
            <circle cx="960" cy="500" r="85" fill="none" stroke="#B87333" strokeWidth="1" strokeDasharray="4 4" />

            <path d="M 960 415 A 85 85 0 0 1 1045 500" fill="none" stroke="#D3C5AD" strokeWidth="1.5" />
            <path d="M 1045 500 A 85 85 0 0 1 960 585" fill="none" stroke="#D3C5AD" strokeWidth="1.5" />
            <path d="M 960 585 A 85 85 0 0 1 875 500" fill="none" stroke="#D3C5AD" strokeWidth="1.5" />
            <path d="M 875 500 A 85 85 0 0 1 960 415" fill="none" stroke="#D3C5AD" strokeWidth="1.5" />

            <circle cx="960" cy="500" r="35" fill="#0E1015" stroke="#B87333" strokeWidth="2.5" />
            <circle cx="960" cy="500" r="14" fill="#FFAE64" opacity="0.8" filter="url(#point-glow-d)" />
          </g>
        </g>

        {/* 4. CULINARY CHEF'S KNIFE & FOOD INGREDIENTS */}
        <g id="culinary-scene-d" opacity="0.65">
          <g id="herb-sprig-d" opacity="0.4">
            <path d="M 1780 70 Q 1710 220, 1610 360" fill="none" stroke="#B87333" strokeWidth="1.6" strokeLinecap="round" />
            {[
              { x: 1755, y: 110, angle: -35 },
              { x: 1745, y: 130, angle: 45 },
              { x: 1720, y: 170, angle: -40 },
              { x: 1705, y: 190, angle: 50 },
              { x: 1675, y: 235, angle: -35 },
              { x: 1660, y: 255, angle: 45 },
              { x: 1630, y: 300, angle: -30 },
              { x: 1615, y: 320, angle: 50 },
            ].map((leaf, idx) => (
              <path
                key={`leaf-d-${idx}`}
                d="M 0 0 C 14 -7, 26 -4, 34 0 C 26 4, 14 7, 0 0 Z"
                fill="#101217"
                stroke="#B87333"
                strokeWidth="1.2"
                transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.angle})`}
              />
            ))}
          </g>

          <g id="fluid-wave-curves-d" opacity="0.45">
            <path
              d="M 1340 50 C 1390 180, 1310 320, 1220 440 C 1140 560, 1110 670, 1180 780 C 1240 880, 1380 930, 1540 900 C 1680 860, 1780 740, 1750 610 C 1720 490, 1580 430, 1500 490 C 1430 550, 1440 650, 1520 690 C 1580 720, 1660 690, 1670 610"
              fill="none"
              stroke="#B87333"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M 1380 90 C 1420 200, 1360 320, 1280 430 C 1210 530, 1180 630, 1240 730 C 1300 820, 1430 860, 1570 820 C 1680 780, 1780 670, 1740 560"
              fill="none"
              stroke="#D3C5AD"
              strokeWidth="1.2"
              strokeOpacity="0.55"
              strokeLinecap="round"
            />
            <circle cx="1470" cy="330" r="3.5" fill="#B87333" />
            <circle cx="1600" cy="440" r="3" fill="#FFAE64" />
            <circle cx="1440" cy="570" r="4" fill="#B87333" />
            <circle cx="1660" cy="730" r="3.5" fill="#FFAE64" />
          </g>

          {/* FOOD INGREDIENTS */}
          <g id="food-elements-d" opacity="0.65">
            <g className="food-interactive" transform="translate(1520, 480)">
              <circle cx="0" cy="0" r="36" fill="none" stroke="#B87333" strokeWidth="2" />
              <circle cx="0" cy="0" r="32" fill="none" stroke="#D3C5AD" strokeWidth="1" strokeDasharray="3 2" />
              <circle cx="0" cy="0" r="8" fill="#0E1015" stroke="#B87333" strokeWidth="1.5" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <path
                  key={`lemon-wedge-d-${deg}`}
                  d="M 6 0 L 26 0 A 26 26 0 0 1 18.4 18.4 L 4.2 4.2 Z"
                  fill="url(#citrus-pulp-d)"
                  stroke="#FFAE64"
                  strokeWidth="0.8"
                  transform={`rotate(${deg})`}
                />
              ))}
            </g>

            <g className="food-interactive" transform="translate(1660, 380) rotate(-25)">
              <ellipse cx="0" cy="0" rx="34" ry="20" fill="none" stroke="#D3C5AD" strokeWidth="1.5" />
              <ellipse cx="0" cy="0" rx="28" ry="16" fill="none" stroke="#B87333" strokeWidth="1.2" />
              <ellipse cx="0" cy="0" rx="20" ry="11" fill="none" stroke="#FFAE64" strokeWidth="1" />
              <ellipse cx="0" cy="0" rx="12" ry="6" fill="none" stroke="#D3C5AD" strokeWidth="0.8" />
            </g>

            <g className="food-interactive" transform="translate(1380, 680) rotate(35)">
              <path d="M -30 0 C -15 -18, 15 -18, 30 0 C 15 18, -15 18, -30 0 Z" fill="#101217" stroke="#B87333" strokeWidth="1.5" />
              <line x1="-24" y1="0" x2="24" y2="0" stroke="#FFAE64" strokeWidth="1" />
            </g>
          </g>

          {/* Knife Component */}
          <g id="knife-assembly-d" className="knife-group-desktop" style={{ transformBox: "view-box", transformOrigin: "1420px 420px" }} opacity="0.8">
            <path
              d="M 1720 60 L 1360 480 L 1370 510 L 1480 530 C 1580 420, 1670 260, 1720 60 Z"
              fill="#101217"
              fillOpacity="0.4"
              stroke="#D3C5AD"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <line x1="1720" y1="60" x2="1370" y2="510" stroke="#B87333" strokeWidth="1.2" strokeOpacity="0.65" />
            <path d="M 1360 480 L 1385 505 L 1370 520 L 1345 495 Z" fill="#14171E" stroke="#B87333" strokeWidth="1.8" />
            <path
              d="M 1345 495 L 1180 670 C 1150 705, 1125 745, 1145 770 C 1165 790, 1205 765, 1235 730 L 1370 520 Z"
              fill="#101217"
              fillOpacity="0.7"
              stroke="#B87333"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M 1335 505 L 1185 670 C 1165 695, 1150 725, 1160 745 C 1175 760, 1200 740, 1225 715 L 1355 525"
              fill="none"
              stroke="#D3C5AD"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
          </g>
        </g>

        {/* 5. ELECTRONIC MOTHERBOARD PCB TRACES */}
        <g id="circuit-system-d">
          <path className="circuit-bus-trace" d="M 960 0 L 960 500 L 960 690 L 925 735 L 925 910 L 870 975 L 870 1080" fill="none" stroke="url(#copper-bus-d)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          <path className="circuit-bus-trace" d="M 948 0 L 948 485 L 948 680 L 913 725 L 913 900 L 858 965 L 858 1080" fill="none" stroke="#B87333" strokeWidth="1.6" strokeOpacity="0.75" strokeLinecap="round" strokeLinejoin="round" />
          <path className="circuit-bus-trace" d="M 890 0 L 890 150 L 960 210 L 1040 210 L 1040 350" fill="none" stroke="#FFAE64" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <path className="circuit-bus-trace" d="M 1000 0 L 1000 110 L 1080 180 L 1080 280" fill="none" stroke="#B87333" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path className="circuit-bus-trace" d="M 960 690 L 1040 755 L 1200 755 L 1280 835 L 1430 835 L 1540 925 L 1750 925" fill="none" stroke="url(#copper-bus-d)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <path className="circuit-bus-trace" d="M 925 735 L 855 795 L 700 795 L 630 865 L 480 865 L 410 945 L 260 945" fill="none" stroke="url(#copper-bus-d)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <path className="circuit-bus-trace" d="M 925 910 L 990 960 L 1140 960 L 1220 1030 L 1380 1030" fill="none" stroke="#FFAE64" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path className="circuit-bus-trace" d="M 870 975 L 800 1035 L 640 1035 L 600 1080" fill="none" stroke="#D3C5AD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

          {/* Vias */}
          {[
            { cx: 890, cy: 150, r: 6 },
            { cx: 1040, cy: 210, r: 6 },
            { cx: 1040, cy: 350, r: 6.5 },
            { cx: 1080, cy: 280, r: 5.5 },
            { cx: 960, cy: 500, r: 10 },
            { cx: 1040, cy: 755, r: 6 },
            { cx: 1280, cy: 835, r: 6.5 },
            { cx: 1540, cy: 925, r: 7 },
            { cx: 1750, cy: 925, r: 5.5 },
            { cx: 855, cy: 795, r: 6 },
            { cx: 630, cy: 865, r: 6.5 },
            { cx: 410, cy: 945, r: 7 },
            { cx: 260, cy: 945, r: 5.5 },
            { cx: 990, cy: 960, r: 5.5 },
            { cx: 1220, cy: 1030, r: 6 },
            { cx: 800, cy: 1035, r: 5.5 },
          ].map((via, idx) => (
            <g key={`via-d-${idx}`}>
              <circle cx={via.cx} cy={via.cy} r={via.r * 2.4} fill="url(#node-glow-d)" className="glowing-via" />
              <circle cx={via.cx} cy={via.cy} r={via.r} fill="#FFAE64" stroke="#B87333" strokeWidth="1.8" filter="url(#point-glow-d)" />
              <circle cx={via.cx} cy={via.cy} r={via.r * 0.45} fill="#090B0E" stroke="#8C5C38" strokeWidth="1" />
            </g>
          ))}
        </g>
      </svg>

      {/* ============================================================= */}
      {/* MOBILE PORTRAIT BACKGROUND (viewBox 1080x1920, block md:hidden)*/}
      {/* ============================================================= */}
      <svg
        className="block md:hidden w-full h-full object-cover pointer-events-none"
        style={{ pointerEvents: "none" }}
        viewBox="0 0 1080 1920"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bg-vignette-m" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#121419" stopOpacity="0.94" />
            <stop offset="60%" stopColor="#0B0D11" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#040507" stopOpacity="1" />
          </radialGradient>

          <radialGradient id="bloom-top-m" cx="35%" cy="20%" r="35%">
            <stop offset="0%" stopColor="#B87333" stopOpacity="0.1" />
            <stop offset="60%" stopColor="#B87333" stopOpacity="0.015" />
            <stop offset="100%" stopColor="#090B0E" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="bloom-center-m" cx="50%" cy="50%" r="35%">
            <stop offset="0%" stopColor="#FBBC00" stopOpacity="0.09" />
            <stop offset="50%" stopColor="#B87333" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#090B0E" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="bloom-lower-m" cx="65%" cy="75%" r="35%">
            <stop offset="0%" stopColor="#B87333" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#D3C5AD" stopOpacity="0.015" />
            <stop offset="100%" stopColor="#090B0E" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="citrus-pulp-m" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFAE64" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#B87333" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        <rect width="1080" height="1920" fill="url(#bg-vignette-m)" />
        <rect width="1080" height="1920" fill="url(#bloom-top-m)" />
        <rect width="1080" height="1920" fill="url(#bloom-center-m)" />
        <rect width="1080" height="1920" fill="url(#bloom-lower-m)" />

        {/* 1. TOP: MOLECULAR CHEMISTRY NETWORK */}
        <g id="molecular-network-m" opacity="0.36">
          <g className="mol-hex-1" style={{ transformBox: "view-box", transformOrigin: "160px 165px" }}>
            <polygon points="120,140 160,115 200,140 200,190 160,215 120,190" fill="none" stroke="#B87333" strokeWidth="1.5" />
            <line x1="160" y1="115" x2="160" y2="60" stroke="#B87333" strokeWidth="1.5" />
            <line x1="120" y1="140" x2="60" y2="105" stroke="#B87333" strokeWidth="1.5" />
            <circle cx="160" cy="60" r="14" fill="none" stroke="#B87333" strokeWidth="1.5" />
            <circle cx="60" cy="105" r="16" fill="none" stroke="#B87333" strokeWidth="1.5" />
            <circle cx="160" cy="60" r="5" fill="#FFAE64" opacity="0.8" />
          </g>

          <g className="mol-hex-2" style={{ transformBox: "view-box", transformOrigin: "120px 325px" }}>
            <polygon points="80,300 120,275 160,300 160,350 120,375 80,350" fill="none" stroke="#B87333" strokeWidth="1.5" />
            <line x1="200" y1="190" x2="260" y2="225" stroke="#B87333" strokeWidth="1.5" />
            <circle cx="260" cy="225" r="15" fill="none" stroke="#B87333" strokeWidth="1.5" />
            <circle cx="260" cy="225" r="5" fill="#FFAE64" opacity="0.8" />
          </g>
          <line x1="160" y1="215" x2="120" y2="275" stroke="#B87333" strokeWidth="1.5" />
        </g>

        {/* 2. TOP: TRUE 3D ROTATING DNA HELIX */}
        <g id="dna-container-m" opacity="0.52">
          {initialMDna.rungs.map((rung, i) => (
            <g key={`m-rung-${i}`} className="dna-rung-m">
              <line
                x1={rung.x1}
                y1={rung.y}
                x2={rung.x2}
                y2={rung.y}
                stroke="#B87333"
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />
              <circle className="rung-node-1" cx={rung.x1} cy={rung.y} r="2.5" fill="#FFAE64" opacity="0.75" />
              <circle className="rung-node-2" cx={rung.x2} cy={rung.y} r="2" fill="#D3C5AD" opacity="0.55" />
            </g>
          ))}

          <path
            className="dna-strand-1-m"
            d={initialMDna.path1}
            fill="none"
            stroke="#B87333"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            className="dna-strand-2-m"
            d={initialMDna.path2}
            fill="none"
            stroke="#D3C5AD"
            strokeWidth="2.2"
            strokeOpacity="0.7"
            strokeLinecap="round"
          />
        </g>

        {/* 3. MATHEMATICALLY INTERLOCKING 1:1 SYMMETRIC TRAPEZOIDAL GEARS (Mobile) */}
        <g id="gear-assembly-m" opacity="0.52">
          {/* Left Gear: Center (324, 960), N=10, Rp=90 */}
          <g id="gear-left-m" className="gear-left-mobile" style={{ transformBox: "view-box", transformOrigin: "324px 960px" }}>
            <path
              d="M 397.2 983.8 L 394.7 990.6 L 412.7 1012.4 L 401.3 1028.1 L 374.9 1017.8 L 369.3 1022.3 L 369.3 1022.3 L 363.2 1026.3 L 364.9 1054.5 L 346.5 1060.5 L 331.2 1036.7 L 324.0 1037.0 L 324.0 1037.0 L 316.8 1036.7 L 301.5 1060.5 L 283.1 1054.5 L 284.8 1026.3 L 278.7 1022.3 L 278.7 1022.3 L 273.1 1017.8 L 246.7 1028.1 L 235.3 1012.4 L 253.3 990.6 L 250.8 983.8 L 250.8 983.8 L 248.9 976.8 L 221.5 969.7 L 221.5 950.3 L 248.9 943.2 L 250.8 936.2 L 250.8 936.2 L 253.3 929.4 L 235.3 907.6 L 246.7 891.9 L 273.1 902.2 L 278.7 897.7 L 278.7 897.7 L 284.8 893.7 L 283.1 865.5 L 301.5 859.5 L 316.8 883.3 L 324.0 883.0 L 324.0 883.0 L 331.2 883.3 L 346.5 859.5 L 364.9 865.5 L 363.2 893.7 L 369.3 897.7 L 369.3 897.7 L 374.9 902.2 L 401.3 891.9 L 412.7 907.6 L 394.7 929.4 L 397.2 936.2 L 397.2 936.2 L 399.1 943.2 L 426.5 950.3 L 426.5 969.7 L 399.1 976.8 L 397.2 983.8 Z"
              fill="none"
              stroke="#B87333"
              strokeWidth="1.8"
            />
            <circle cx="324" cy="960" r="24" fill="#0E1015" stroke="#B87333" strokeWidth="2" />
          </g>

          {/* Lower Gear: Center (540, 1176), N=10, Rp=90 */}
          <g id="gear-lower-m" className="gear-lower-mobile" style={{ transformBox: "view-box", transformOrigin: "540px 1176px" }}>
            <path
              d="M 613.2 1199.8 L 610.7 1206.6 L 628.7 1228.4 L 617.3 1244.1 L 590.9 1233.8 L 585.3 1238.3 L 585.3 1238.3 L 579.2 1242.3 L 580.9 1270.5 L 562.5 1276.5 L 547.2 1252.7 L 540.0 1253.0 L 540.0 1253.0 L 532.8 1252.7 L 517.5 1276.5 L 499.1 1270.5 L 500.8 1242.3 L 494.7 1238.3 L 494.7 1238.3 L 489.1 1233.8 L 462.7 1244.1 L 451.3 1228.4 L 469.3 1206.6 L 466.8 1199.8 L 466.8 1199.8 L 464.9 1192.8 L 437.5 1185.7 L 437.5 1166.3 L 464.9 1159.2 L 466.8 1152.2 L 466.8 1152.2 L 469.3 1145.4 L 451.3 1123.6 L 462.7 1107.9 L 489.1 1118.2 L 494.7 1113.7 L 494.7 1113.7 L 500.8 1109.7 L 499.1 1081.5 L 517.5 1075.5 L 532.8 1099.3 L 540.0 1099.0 L 540.0 1099.0 L 547.2 1099.3 L 562.5 1075.5 L 580.9 1081.5 L 579.2 1109.7 L 585.3 1113.7 L 585.3 1113.7 L 590.9 1118.2 L 617.3 1107.9 L 628.7 1123.6 L 610.7 1145.4 L 613.2 1152.2 L 613.2 1152.2 L 615.1 1159.2 L 642.5 1166.3 L 642.5 1185.7 L 615.1 1192.8 L 613.2 1199.8 Z"
              fill="none"
              stroke="#B87333"
              strokeWidth="1.8"
            />
            <circle cx="540" cy="1176" r="26" fill="#0E1015" stroke="#B87333" strokeWidth="2" />
          </g>

          {/* Main Gear: Center (540, 960), N=14, Rp=126 */}
          <g id="gear-main-m" className="gear-main-mobile" style={{ transformBox: "view-box", transformOrigin: "540px 960px" }}>
            <path
              d="M 653.0 960.0 L 652.7 967.6 L 677.3 981.7 L 673.1 1000.0 L 644.9 1002.1 L 641.8 1009.0 L 641.8 1009.0 L 638.3 1015.8 L 654.3 1039.2 L 642.6 1053.8 L 616.2 1043.4 L 610.5 1048.3 L 610.5 1048.3 L 604.4 1052.9 L 608.6 1080.9 L 591.7 1089.0 L 572.5 1068.2 L 565.1 1070.2 L 565.1 1070.2 L 557.7 1071.6 L 549.4 1098.7 L 530.6 1098.7 L 522.3 1071.6 L 514.9 1070.2 L 514.9 1070.2 L 507.5 1068.2 L 488.3 1089.0 L 471.4 1080.9 L 475.6 1052.9 L 469.5 1048.3 L 469.5 1048.3 L 463.8 1043.4 L 437.4 1053.8 L 425.7 1039.2 L 441.7 1015.8 L 438.2 1009.0 L 438.2 1009.0 L 435.1 1002.1 L 406.9 1000.0 L 402.7 981.7 L 427.3 967.6 L 427.0 960.0 L 427.0 960.0 L 427.3 952.4 L 402.7 938.3 L 406.9 920.0 L 435.1 917.9 L 438.2 911.0 L 438.2 911.0 L 441.7 904.2 L 425.7 880.8 L 437.4 866.2 L 463.8 876.6 L 469.5 871.7 L 469.5 871.7 L 475.6 867.1 L 471.4 839.1 L 488.3 831.0 L 507.5 851.8 L 514.9 849.8 L 514.9 849.8 L 522.3 848.4 L 530.6 821.3 L 549.4 821.3 L 557.7 848.4 L 565.1 849.8 L 565.1 849.8 L 572.5 851.8 L 591.7 831.0 L 608.6 839.1 L 604.4 867.1 L 610.5 871.7 L 610.5 871.7 L 616.2 876.6 L 642.6 866.2 L 654.3 880.8 L 638.3 904.2 L 641.8 911.0 L 641.8 911.0 L 644.9 917.9 L 673.1 920.0 L 677.3 938.3 L 652.7 952.4 L 653.0 960.0 Z"
              fill="none"
              stroke="#B87333"
              strokeWidth="2"
            />
            <circle cx="540" cy="960" r="70" fill="none" stroke="#B87333" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="540" cy="960" r="30" fill="#0E1015" stroke="#B87333" strokeWidth="2.5" />
            <circle cx="540" cy="960" r="12" fill="#FFAE64" opacity="0.8" />
          </g>
        </g>

        {/* 4. LOWER: CHEF'S KNIFE & FOOD */}
        <g id="culinary-scene-m" opacity="0.65">
          <g id="food-elements-m" opacity="0.65">
            <g className="food-interactive" transform="translate(860, 1420)">
              <circle cx="0" cy="0" r="28" fill="none" stroke="#B87333" strokeWidth="1.8" />
              <circle cx="0" cy="0" r="24" fill="none" stroke="#D3C5AD" strokeWidth="0.8" strokeDasharray="2 2" />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <path
                  key={`lemon-m-${deg}`}
                  d="M 4 0 L 20 0 A 20 20 0 0 1 14 14 L 3 3 Z"
                  fill="url(#citrus-pulp-m)"
                  stroke="#FFAE64"
                  strokeWidth="0.8"
                  transform={`rotate(${deg})`}
                />
              ))}
            </g>
            <g className="food-interactive" transform="translate(620, 1540) rotate(25)">
              <path d="M -22 0 C -10 -14, 10 -14, 22 0 C 10 14, -10 14, -22 0 Z" fill="#101217" stroke="#B87333" strokeWidth="1.4" />
              <line x1="-18" y1="0" x2="18" y2="0" stroke="#FFAE64" strokeWidth="0.8" />
            </g>
          </g>

          <g id="herb-sprig-m" opacity="0.4">
            <path d="M 980 1200 Q 920 1320, 830 1440" fill="none" stroke="#B87333" strokeWidth="1.6" strokeLinecap="round" />
            {[
              { x: 955, y: 1240, angle: -35 },
              { x: 945, y: 1260, angle: 45 },
              { x: 915, y: 1305, angle: -35 },
              { x: 900, y: 1325, angle: 45 },
              { x: 865, y: 1375, angle: -30 },
              { x: 850, y: 1395, angle: 50 },
            ].map((leaf, idx) => (
              <path
                key={`leaf-m-${idx}`}
                d="M 0 0 C 14 -7, 26 -4, 34 0 C 26 4, 14 7, 0 0 Z"
                fill="#101217"
                stroke="#B87333"
                strokeWidth="1.2"
                transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.angle})`}
              />
            ))}
          </g>

          {/* Knife with Fast Slicing Action */}
          <g id="knife-assembly-m" className="knife-group-mobile" style={{ transformBox: "view-box", transformOrigin: "780px 1420px" }} opacity="0.8">
            <path
              d="M 980 1160 L 710 1440 L 720 1465 L 810 1480 C 890 1400, 940 1280, 980 1160 Z"
              fill="#101217"
              fillOpacity="0.4"
              stroke="#D3C5AD"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <line x1="980" y1="1160" x2="720" y2="1465" stroke="#B87333" strokeWidth="1.2" strokeOpacity="0.65" />
            <path d="M 710 1440 L 730 1460 L 720 1475 L 700 1455 Z" fill="#14171E" stroke="#B87333" strokeWidth="1.8" />
            <path
              d="M 700 1455 L 560 1600 C 535 1630, 515 1665, 530 1685 C 545 1700, 580 1680, 605 1650 L 720 1475 Z"
              fill="#101217"
              fillOpacity="0.7"
              stroke="#B87333"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M 690 1465 L 565 1600 C 545 1625, 530 1655, 540 1675 C 555 1690, 580 1670, 605 1645 L 710 1485"
              fill="none"
              stroke="#D3C5AD"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
          </g>
        </g>

        {/* 5. ELECTRONIC MOTHERBOARD PCB TRACES */}
        <g id="circuit-system-m">
          <path className="circuit-bus-trace" d="M 540 0 L 540 960 L 540 1120 L 500 1160 L 500 1340 L 440 1400 L 440 1920" fill="none" stroke="url(#copper-bus-d)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path className="circuit-bus-trace" d="M 528 0 L 528 945 L 528 1110 L 488 1150 L 488 1330 L 428 1390 L 428 1920" fill="none" stroke="#B87333" strokeWidth="1.5" strokeOpacity="0.75" strokeLinecap="round" strokeLinejoin="round" />
          <path className="circuit-bus-trace" d="M 460 0 L 460 220 L 540 280 L 680 280 L 680 480" fill="none" stroke="#FFAE64" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path className="circuit-bus-trace" d="M 600 0 L 600 180 L 740 260 L 740 400" fill="none" stroke="#B87333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path className="circuit-bus-trace" d="M 540 1120 L 640 1190 L 800 1190 L 880 1280 L 980 1280 L 980 1560" fill="none" stroke="url(#copper-bus-d)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <path className="circuit-bus-trace" d="M 500 1160 L 400 1230 L 260 1230 L 180 1310 L 80 1310 L 80 1650" fill="none" stroke="url(#copper-bus-d)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />

          {/* Vias */}
          {[
            { cx: 460, cy: 220, r: 5.5 },
            { cx: 680, cy: 280, r: 5.5 },
            { cx: 680, cy: 480, r: 6 },
            { cx: 740, cy: 400, r: 5 },
            { cx: 540, cy: 960, r: 9 },
            { cx: 640, cy: 1190, r: 6 },
            { cx: 880, cy: 1280, r: 6.5 },
            { cx: 400, cy: 1230, r: 6 },
            { cx: 180, cy: 1310, r: 6.5 },
            { cx: 500, cy: 1340, r: 6 },
            { cx: 440, cy: 1400, r: 6 },
          ].map((via, idx) => (
            <g key={`via-m-${idx}`}>
              <circle cx={via.cx} cy={via.cy} r={via.r * 2.2} fill="url(#node-glow-d)" className="glowing-via" />
              <circle cx={via.cx} cy={via.cy} r={via.r} fill="#FFAE64" stroke="#B87333" strokeWidth="1.8" />
              <circle cx={via.cx} cy={via.cy} r={via.r * 0.45} fill="#090B0E" stroke="#8C5C38" strokeWidth="1" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
