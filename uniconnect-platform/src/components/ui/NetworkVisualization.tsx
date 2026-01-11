import { useEffect, useRef, useCallback , } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'company' | 'university' | 'student';
  radius: number;
  targetX: number; // For smooth transitions on resize
  targetY: number;
}

interface Connection {
  from: number;
  to: number;
  progress: number;
  speed: number;
}

export const NetworkVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const resizeTimeoutRef = useRef<number | null>(null);  // ✅ Changed from NodeJS.Timeout

  const getResponsiveConfig = useCallback((width: number, height: number) => {
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;
    const isDesktop = width >= 1024;

    return {
      numCompanies: isMobile ? 2 : isTablet ? 3 : 4,
      numUniversities: isMobile ? 2 : 3,
      numStudents: isMobile ? 3 : isTablet ? 5 : 8,
      nodeRadius: {
        company: isMobile ? 6 : isTablet ? 10 : 12,
        university: isMobile ? 8 : isTablet ? 12 : 16,
        student: isMobile ? 4 : isTablet ? 6 : 8,
      },
      speed: isMobile ? 0.5 : 0.8,
      margin: isMobile ? 40 : isTablet ? 60 : 80,
      lineWidth: isMobile ? 1 : 2,
      glowSize: isMobile ? 6 : 8,
    };
  }, []);

  const initNodes = useCallback((width: number, height: number) => {
    const config = getResponsiveConfig(width, height);
    const nodes: Node[] = [];

    // Companies (left side) - Blue
    for (let i = 0; i < config.numCompanies; i++) {
      const x = width * 0.12 + Math.random() * width * 0.12;
      const y = height * 0.2 + (i / Math.max(1, config.numCompanies - 1)) * height * 0.6;
      nodes.push({
        x,
        y,
        targetX: x,
        targetY: y,
        vx: (Math.random() - 0.5) * 0.4 * config.speed,
        vy: (Math.random() - 0.5) * 0.4 * config.speed,
        type: 'company',
        radius: config.nodeRadius.company,
      });
    }

    // Universities (center) - Purple/Violet
    for (let i = 0; i < config.numUniversities; i++) {
      const x = width * 0.44 + Math.random() * width * 0.12;
      const y = height * 0.25 + (i / Math.max(1, config.numUniversities - 1)) * height * 0.5;
      nodes.push({
        x,
        y,
        targetX: x,
        targetY: y,
        vx: (Math.random() - 0.5) * 0.3 * config.speed,
        vy: (Math.random() - 0.5) * 0.3 * config.speed,
        type: 'university',
        radius: config.nodeRadius.university,
      });
    }

    // Students (right side) - Cyan/Green
    for (let i = 0; i < config.numStudents; i++) {
      const x = width * 0.74 + Math.random() * width * 0.14;
      const y = height * 0.15 + (i / Math.max(1, config.numStudents - 1)) * height * 0.7;
      nodes.push({
        x,
        y,
        targetX: x,
        targetY: y,
        vx: (Math.random() - 0.5) * 0.5 * config.speed,
        vy: (Math.random() - 0.5) * 0.5 * config.speed,
        type: 'student',
        radius: config.nodeRadius.student,
      });
    }

    return nodes;
  }, [getResponsiveConfig]);

  const createConnections = useCallback(() => {
    const connections: Connection[] = [];
    const companies = nodesRef.current.filter(n => n.type === 'company');
    const universities = nodesRef.current.filter(n => n.type === 'university');
    const students = nodesRef.current.filter(n => n.type === 'student');

    const companyOffset = 0;
    const universityOffset = companies.length;
    const studentOffset = companies.length + universities.length;

    // Connect companies to universities
    companies.forEach((_, ci) => {
      universities.forEach((_, ui) => {
        if (Math.random() > 0.35) {
          connections.push({
            from: companyOffset + ci,
            to: universityOffset + ui,
            progress: Math.random(),
            speed: 0.002 + Math.random() * 0.003,
          });
        }
      });
    });

    // Connect universities to students
    universities.forEach((_, ui) => {
      students.forEach((_, si) => {
        if (Math.random() > 0.45) {
          connections.push({
            from: universityOffset + ui,
            to: studentOffset + si,
            progress: Math.random(),
            speed: 0.003 + Math.random() * 0.004,
          });
        }
      });
    });

    return connections;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let isInitialized = false;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Set display size (CSS pixels)
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Set actual size in memory (scaled for retina displays)
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Scale context to ensure correct drawing
      ctx.scale(dpr, dpr);

      const displayWidth = rect.width;
      const displayHeight = rect.height;

      if (!isInitialized) {
        // First initialization
        nodesRef.current = initNodes(displayWidth, displayHeight);
        connectionsRef.current = createConnections();
        isInitialized = true;
      } else {
        // On resize, smoothly transition nodes to new positions
        const config = getResponsiveConfig(displayWidth, displayHeight);
        const newNodes = initNodes(displayWidth, displayHeight);
        
        // Update existing nodes with new target positions and radius
        nodesRef.current.forEach((node, index) => {
          if (newNodes[index]) {
            node.targetX = newNodes[index].x;
            node.targetY = newNodes[index].y;
            node.radius = newNodes[index].radius;
          }
        });

        // If number of nodes changed, reinitialize completely
        if (nodesRef.current.length !== newNodes.length) {
          nodesRef.current = newNodes;
          connectionsRef.current = createConnections();
        }
      }
    };

    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        resizeCanvas();
      }, 150); // Debounce resize
    };

    resizeCanvas();
    window.addEventListener('resize', handleResize);

    const getNodeColor = (type: string): { fill: string; glow: string } => {
      switch (type) {
        case 'company':
          return {
            fill: 'rgba(37, 99, 235, 0.9)',
            glow: 'rgba(37, 99, 235, 0.3)',
          };
        case 'university':
          return {
            fill: 'rgba(124, 58, 237, 0.9)',
            glow: 'rgba(124, 58, 237, 0.3)',
          };
        case 'student':
          return {
            fill: 'rgba(8, 145, 178, 0.9)',
            glow: 'rgba(8, 145, 178, 0.3)',
          };
        default:
          return {
            fill: 'rgba(107, 114, 128, 0.8)',
            glow: 'rgba(107, 114, 128, 0.2)',
          };
      }
    };

    const animate = () => {
      const displayWidth = canvas.width / (window.devicePixelRatio || 1);
      const displayHeight = canvas.height / (window.devicePixelRatio || 1);
      const config = getResponsiveConfig(displayWidth, displayHeight);

      ctx.clearRect(0, 0, displayWidth, displayHeight);

      // Draw connections with animated pulses
      connectionsRef.current.forEach((conn) => {
        const fromNode = nodesRef.current[conn.from];
        const toNode = nodesRef.current[conn.to];
        if (!fromNode || !toNode) return;

        conn.progress += conn.speed;
        if (conn.progress > 1) conn.progress = 0;

        // Draw connection line
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);

        const gradient = ctx.createLinearGradient(
          fromNode.x,
          fromNode.y,
          toNode.x,
          toNode.y
        );
        gradient.addColorStop(0, 'rgba(37, 99, 235, 0.12)');
        gradient.addColorStop(0.5, 'rgba(124, 58, 237, 0.12)');
        gradient.addColorStop(1, 'rgba(8, 145, 178, 0.12)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = config.lineWidth;
        ctx.stroke();

        // Draw animated data pulse
        const pulseX = fromNode.x + (toNode.x - fromNode.x) * conn.progress;
        const pulseY = fromNode.y + (toNode.y - fromNode.y) * conn.progress;

        // Outer glow
        const pulseGradient = ctx.createRadialGradient(
          pulseX,
          pulseY,
          0,
          pulseX,
          pulseY,
          config.glowSize
        );
        pulseGradient.addColorStop(0, 'rgba(59, 130, 246, 0.7)');
        pulseGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

        ctx.beginPath();
        ctx.arc(pulseX, pulseY, config.glowSize, 0, Math.PI * 2);
        ctx.fillStyle = pulseGradient;
        ctx.fill();

        // Inner pulse
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.fill();
      });

      // Update and draw nodes
      nodesRef.current.forEach((node) => {
        // Smooth transition to target position (for resize adaptation)
        const dx = node.targetX - node.x;
        const dy = node.targetY - node.y;
        node.x += dx * 0.05;
        node.y += dy * 0.05;

        // Add natural movement
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges with margin
        if (node.x < config.margin || node.x > displayWidth - config.margin) {
          node.vx *= -0.9;
        }
        if (node.y < config.margin || node.y > displayHeight - config.margin) {
          node.vy *= -0.9;
        }

        // Keep in bounds
        node.x = Math.max(config.margin, Math.min(displayWidth - config.margin, node.x));
        node.y = Math.max(config.margin, Math.min(displayHeight - config.margin, node.y));

        // Update target to follow current position (for natural movement)
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
          node.targetX = node.x;
          node.targetY = node.y;
        }

        const colors = getNodeColor(node.type);

        // Draw outer glow
        const glowMultiplier = node.type === 'university' ? 5 : 4;
        const outerGlow = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.radius * glowMultiplier
        );
        outerGlow.addColorStop(0, colors.glow);
        outerGlow.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * glowMultiplier, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();

        // Draw node body
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.fill;
        ctx.fill();

        // Draw node border
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw inner highlight
        ctx.beginPath();
        ctx.arc(
          node.x - node.radius * 0.3,
          node.y - node.radius * 0.3,
          node.radius * 0.35,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();

        // Draw type indicator for universities
        if (node.type === 'university') {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initNodes, createConnections, getResponsiveConfig]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  );
};
