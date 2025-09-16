// "use client";

// import { cn } from "../../../../lib/utils";
// import React, { useEffect, useRef } from "react";
// import { createNoise3D } from "simplex-noise";
// import { motion } from "motion/react";


// export const Vortex = (props) => {
//   const canvasRef = useRef(null);
//   const containerRef = useRef(null);
//   const animationFrameId = useRef();
//   const particleCount = props.particleCount || 700;
//   const particlePropCount = 9;
//   const particlePropsLength = particleCount * particlePropCount;
//   const rangeY = props.rangeY || 100;
//   const baseTTL = 50;
//   const rangeTTL = 150;
//   const baseSpeed = props.baseSpeed || 0.0;
//   const rangeSpeed = props.rangeSpeed || 1.5;
//   const baseRadius = props.baseRadius || 1;
//   const rangeRadius = props.rangeRadius || 2;
//   const baseHue = props.baseHue || 220;
//   const rangeHue = 100;
//   const noiseSteps = 3;
//   const xOff = 0.00125;
//   const yOff = 0.00125;
//   const zOff = 0.0005;
//   const backgroundColor = props.backgroundColor || "#000000";
//   let tick = 0;
//   const noise3D = createNoise3D();
//   let particleProps = new Float32Array(particlePropsLength);
//   let center = [0, 0];

//   const HALF_PI = 0.5 * Math.PI;
//   const TAU = 2 * Math.PI;
//   const TO_RAD = Math.PI / 180;
//   const rand = n => n * Math.random();
//   const randRange = n => n - rand(2 * n);
//   const fadeInOut = (t, m) => {
//     let hm = 0.5 * m;
//     return Math.abs(((t + hm) % m) - hm) / hm;
//   };
//   const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2;

//   const setup = () => {
//     const canvas = canvasRef.current;
//     const container = containerRef.current;
//     if (canvas && container) {
//       const ctx = canvas.getContext("2d");

//       if (ctx) {
//         resize(canvas, ctx);
//         initParticles();
//         draw(canvas, ctx);
//       }
//     }
//   };

//   const initParticles = () => {
//     tick = 0;
//     // simplex = new SimplexNoise();
//     particleProps = new Float32Array(particlePropsLength);

//     for (let i = 0; i < particlePropsLength; i += particlePropCount) {
//       initParticle(i);
//     }
//   };

//   const initParticle = (i) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     let x, y, vx, vy, life, ttl, speed, radius, hue;

//     x = rand(canvas.width);
//     y = center[1] + randRange(rangeY);
//     vx = 0;
//     vy = 0;
//     life = 0;
//     ttl = baseTTL + rand(rangeTTL);
//     speed = baseSpeed + rand(rangeSpeed);
//     radius = baseRadius + rand(rangeRadius);
//     hue = baseHue + rand(rangeHue);

//     particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
//   };

//   const draw = (canvas, ctx) => {
//     tick++;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     ctx.fillStyle = backgroundColor;
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     drawParticles(ctx);
//     renderGlow(canvas, ctx);
//     renderToScreen(canvas, ctx);

//     animationFrameId.current = window.requestAnimationFrame(() =>
//       draw(canvas, ctx));
//   };

//   const drawParticles = (ctx) => {
//     for (let i = 0; i < particlePropsLength; i += particlePropCount) {
//       updateParticle(i, ctx);
//     }
//   };

//   const updateParticle = (i, ctx) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     let i2 = 1 + i,
//       i3 = 2 + i,
//       i4 = 3 + i,
//       i5 = 4 + i,
//       i6 = 5 + i,
//       i7 = 6 + i,
//       i8 = 7 + i,
//       i9 = 8 + i;
//     let n, x, y, vx, vy, life, ttl, speed, x2, y2, radius, hue;

//     x = particleProps[i];
//     y = particleProps[i2];
//     n = noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU;
//     vx = lerp(particleProps[i3], Math.cos(n), 0.5);
//     vy = lerp(particleProps[i4], Math.sin(n), 0.5);
//     life = particleProps[i5];
//     ttl = particleProps[i6];
//     speed = particleProps[i7];
//     x2 = x + vx * speed;
//     y2 = y + vy * speed;
//     radius = particleProps[i8];
//     hue = particleProps[i9];

//     drawParticle(x, y, x2, y2, life, ttl, radius, hue, ctx);

//     life++;

//     particleProps[i] = x2;
//     particleProps[i2] = y2;
//     particleProps[i3] = vx;
//     particleProps[i4] = vy;
//     particleProps[i5] = life;

//     (checkBounds(x, y, canvas) || life > ttl) && initParticle(i);
//   };

// //   const drawParticle = (
// //     x,
// //     y,
// //     x2,
// //     y2,
// //     life,
// //     ttl,
// //     radius,
// //     hue,
// //     ctx,
// //   ) => {
// //     ctx.save();
// //     ctx.lineCap = "round";
// //     ctx.lineWidth = radius;
// //     ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
// //     ctx.beginPath();
// //     ctx.moveTo(x, y);
// //     ctx.lineTo(x2, y2);
// //     ctx.stroke();
// //     ctx.closePath();
// //     ctx.restore();
// //   };


// const drawParticle = (
//   x,
//   y,
//   x2,
//   y2,
//   life,
//   ttl,
//   radius,
//   hue,
//   ctx,
// ) => {
//   ctx.save();
//   ctx.lineCap = "round";
//   ctx.lineWidth = radius;

//   // 🎨 Create a gradient from yellow to saffron/orange
//   const gradient = ctx.createLinearGradient(x, y, x2, y2);
//   gradient.addColorStop(0, `hsla(50, 100%, 60%, ${fadeInOut(life, ttl)})`); // golden yellow
//   gradient.addColorStop(1, `hsla(30, 100%, 50%, ${fadeInOut(life, ttl)})`); // saffron-orange

//   ctx.strokeStyle = gradient;

//   ctx.beginPath();
//   ctx.moveTo(x, y);
//   ctx.lineTo(x2, y2);
//   ctx.stroke();
//   ctx.closePath();
//   ctx.restore();
// };

// const checkBounds = (x, y, canvas) => {
//     return x > canvas.width || x < 0 || y > canvas.height || y < 0;
//   };

//   const resize = (
//     canvas,
//     ctx,
//   ) => {
//     const { innerWidth, innerHeight } = window;

//     canvas.width = innerWidth;
//     canvas.height = innerHeight;

//     center[0] = 0.5 * canvas.width;
//     center[1] = 0.5 * canvas.height;
//   };

//   const renderGlow = (
//     canvas,
//     ctx,
//   ) => {
//     ctx.save();
//     ctx.filter = "blur(8px) brightness(200%)";
//     ctx.globalCompositeOperation = "lighter";
//     ctx.drawImage(canvas, 0, 0);
//     ctx.restore();

//     ctx.save();
//     ctx.filter = "blur(4px) brightness(200%)";
//     ctx.globalCompositeOperation = "lighter";
//     ctx.drawImage(canvas, 0, 0);
//     ctx.restore();
//   };

//   const renderToScreen = (
//     canvas,
//     ctx,
//   ) => {
//     ctx.save();
//     ctx.globalCompositeOperation = "lighter";
//     ctx.drawImage(canvas, 0, 0);
//     ctx.restore();
//   };

//   const handleResize = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext("2d");
//     if (canvas && ctx) {
//       resize(canvas, ctx);
//     }
//   };

//   useEffect(() => {
//     setup();
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       if (animationFrameId.current) {
//         cancelAnimationFrame(animationFrameId.current);
//       }
//     };
//   }, []);

//   return (
//     <div className={cn("relative h-full w-full", props.containerClassName)}>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         ref={containerRef}
//         className="absolute inset-0 z-0 flex h-full w-full items-center justify-center bg-transparent">
//         <canvas ref={canvasRef}></canvas>
//       </motion.div>
//       <div className={cn("relative z-10", props.className)}>
//         {props.children}
//       </div>
//     </div>
//   );
// };




"use client";

import { cn } from "../../../../lib/utils";
import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "motion/react";


export const Vortex = (props) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationFrameId = useRef();
  const particleCount = props.particleCount || 700;
  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  const rangeY = props.rangeY || 100;
  const baseTTL = 50;
  const rangeTTL = 150;
  const baseSpeed = props.baseSpeed || 0.0;
  const rangeSpeed = props.rangeSpeed || 1.5;
  const baseRadius = props.baseRadius || 4;
  const rangeRadius = props.rangeRadius || 5;
  const baseHue = props.baseHue || 220;
  const rangeHue = 100;
  const noiseSteps = 3;
  const xOff = 0.00125;
  const yOff = 0.00125;
  const zOff = 0.0005;
  const backgroundColor = props.backgroundColor || "#000000";
  let tick = 0;
  const noise3D = createNoise3D();
  let particleProps = new Float32Array(particlePropsLength);
  let center = [0, 0];

  const HALF_PI = 0.5 * Math.PI;
  const TAU = 2 * Math.PI;
  const TO_RAD = Math.PI / 180;
  const rand = n => n * Math.random();
  const randRange = n => n - rand(2 * n);
  const fadeInOut = (t, m) => {
    let hm = 0.5 * m;
    return Math.abs(((t + hm) % m) - hm) / hm;
  };
  const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2;

  const setup = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        resize(canvas, ctx);
        initParticles();
        draw(canvas, ctx);
      }
    }
  };

  const initParticles = () => {
    tick = 0;
    // simplex = new SimplexNoise();
    particleProps = new Float32Array(particlePropsLength);

    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i);
    }
  };

const initParticle = (i) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  let x, y, vx, vy, life, ttl, speed, radius, hue;

  x = rand(canvas.width);
  y = 0;  // 🌟 start from top
  vx = (Math.random() - 0.5) * 0.2; // small side drift
  vy = 0.5; // initial downward velocity
  life = 0;
  ttl = baseTTL + rand(rangeTTL);
  speed = baseSpeed + rand(rangeSpeed);
  radius = baseRadius + rand(rangeRadius);
  hue = baseHue + rand(rangeHue);

  particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
};

const draw = (canvas, ctx) => {
    tick++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ctx.fillStyle = backgroundColor;
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawParticles(ctx);
    renderGlow(canvas, ctx);
    renderToScreen(canvas, ctx);

    animationFrameId.current = window.requestAnimationFrame(() =>
      draw(canvas, ctx));
  };

  const drawParticles = (ctx) => {
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      updateParticle(i, ctx);
    }
  };

  const crashEffect = (x, y, hue, ctx) => {
  for (let j = 0; j < 8; j++) { // 8 sparks
    const angle = Math.random() * Math.PI; // upward scatter
    const speed = Math.random() * 4 + 1;

    const x2 = x + Math.cos(angle) * speed;
    const y2 = y - Math.sin(angle) * speed;

    ctx.beginPath();
    ctx.strokeStyle = `hsla(${hue},100%,60%,1)`;
    ctx.lineWidth = 2;
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
};

const explosionEffect = (x, y, hue, ctx) => {
  for (let j = 0; j < 12; j++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 1;

    const x2 = x + Math.cos(angle) * speed;
    const y2 = y + Math.sin(angle) * speed;

    ctx.beginPath();
    ctx.arc(x2, y2, 2, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${hue},100%,60%,0.9)`;
    ctx.fill();
  }
};

  const updateParticle = (i, ctx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let i2 = 1 + i,
      i3 = 2 + i,
      i4 = 3 + i,
      i5 = 4 + i,
      i6 = 5 + i,
      i7 = 6 + i,
      i8 = 7 + i,
      i9 = 8 + i;
    let n, x, y, vx, vy, life, ttl, speed, x2, y2, radius, hue;

    x = particleProps[i];
    y = particleProps[i2];

// 🌟 Gravity-based falling motion
let gravity = 0.02; // 🌟 smaller = slower fall
vx = particleProps[i3];              
vy = particleProps[i4] + gravity;    

life = particleProps[i5];
    ttl = particleProps[i6];
    speed = particleProps[i7];
    x2 = x + vx * speed;
    y2 = y + vy * speed;
    radius = particleProps[i8];
    hue = particleProps[i9];

    // drawParticle(x, y, x2, y2, life, ttl, radius, hue, ctx);

    life++;

    particleProps[i] = x2;
    particleProps[i2] = y2;
    particleProps[i3] = vx;
    particleProps[i4] = vy;
    particleProps[i5] = life;

    // (checkBounds(x, y, canvas) || life > ttl) && initParticle(i);
if (y2 >= canvas.height) {
  initParticle(i); // respawn from top once it touches bottom
} else {
  // Keep falling and fade based on height
  const fade = 1 - y2 / canvas.height; // 1 at top → 0 at bottom
  drawParticle(x, y, x2, y2, life, ttl, radius, hue, ctx, fade);

  life++;
  particleProps[i] = x2;
  particleProps[i2] = y2;
  particleProps[i3] = vx;
  particleProps[i4] = vy;
  particleProps[i5] = life;
}

};

  const drawParticle = (
   x, y, x2, y2, life, ttl, radius, hue, ctx, fade = 1
 ) => {
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineWidth = radius;
   const alpha = fadeInOut(life, ttl) * fade;
 ctx.strokeStyle = `hsla(${hue},100%,60%,${alpha})`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  };


const checkBounds = (x, y, canvas) => {
    return x > canvas.width || x < 0 || y > canvas.height || y < 0;
  };

  const resize = (
    canvas,
    ctx,
  ) => {
    const { innerWidth, innerHeight } = window;

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    center[0] = 0.5 * canvas.width;
    center[1] = 0.5 * canvas.height;
  };

  const renderGlow = (
    canvas,
    ctx,
  ) => {
    ctx.save();
    ctx.filter = "blur(8px) brightness(200%)";
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();

    ctx.save();
    ctx.filter = "blur(4px) brightness(200%)";
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  };

  const renderToScreen = (
    canvas,
    ctx,
  ) => {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      resize(canvas, ctx);
    }
  };

  useEffect(() => {
    setup();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div className={cn("relative h-full w-full", props.containerClassName)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={containerRef}
        className="absolute inset-0 z-0 flex h-full w-full items-center justify-center bg-transparent">
        <canvas ref={canvasRef}></canvas>
      </motion.div>
      <div className={cn("relative z-10", props.className)}>
        {props.children}
      </div>
    </div>
  );
};
