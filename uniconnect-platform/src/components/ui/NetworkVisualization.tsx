import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'company' | 'university' | 'student';
  radius: number;
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize nodes based on screen size
    const initNodes = () => {
      const nodes: Node[] = [];
      const isMobile = canvas.width < 768;
      
      const numCompanies = isMobile ? 2 : 4;
      const numUniversities = isMobile ? 2 : 3;
      const numStudents = isMobile ? 4 : 8;

      // Companies (left side) - Blue
      for (let i = 0; i < numCompanies; i++) {
        nodes.push({
          x: canvas.width * 0.1 + Math.random() * canvas.width * 0.15,
          y: canvas.height * 0.2 + (i / numCompanies) * canvas.height * 0.6,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          type: 'company',
          radius: isMobile ? 8 : 12,
        });
      }

      // Universities (center) - Purple/Violet
      for (let i = 0; i < numUniversities; i++) {
        nodes.push({
          x: canvas.width * 0.42 + Math.random() * canvas.width * 0.16,
          y: canvas.height * 0.25 + (i / numUniversities) * canvas.height * 0.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          type: 'university',
          radius: isMobile ? 10 : 16,
        });
      }

      // Students (right side) - Cyan/Green
      for (let i = 0; i < numStudents; i++) {
        nodes.push({
          x: canvas.width * 0.7 + Math.random() * canvas.width * 0.2,
          y: canvas.height * 0.15 + (i / numStudents) * canvas.height * 0.7,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          type: 'student',
          radius: isMobile ? 5 : 8,
        });
      }

      return nodes;
    };

    nodesRef.current = initNodes();

    // Create connections (Companies -> Universities -> Students)
    const createConnections = () => {
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
          if (Math.random() > 0.3) {
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
          if (Math.random() > 0.4) {
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
    };

    connectionsRef.current = createConnections();

    const getNodeColor = (type: string): { fill: string; glow: string } => {
      switch (type) {
        case 'company':
          return {
            fill: 'rgba(37, 99, 235, 0.9)', // primary-600
            glow: 'rgba(37, 99, 235, 0.3)',
          };
        case 'university':
          return {
            fill: 'rgba(124, 58, 237, 0.9)', // secondary-600
            glow: 'rgba(124, 58, 237, 0.3)',
          };
        case 'student':
          return {
            fill: 'rgba(8, 145, 178, 0.9)', // accent-600
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
          fromNode.x, fromNode.y,
          toNode.x, toNode.y
        );
        gradient.addColorStop(0, 'rgba(37, 99, 235, 0.15)');
        gradient.addColorStop(0.5, 'rgba(124, 58, 237, 0.15)');
        gradient.addColorStop(1, 'rgba(8, 145, 178, 0.15)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw animated data pulse
        const pulseX = fromNode.x + (toNode.x - fromNode.x) * conn.progress;
        const pulseY = fromNode.y + (toNode.y - fromNode.y) * conn.progress;
        
        // Outer glow
        const pulseGradient = ctx.createRadialGradient(
          pulseX, pulseY, 0,
          pulseX, pulseY, 8
        );
        pulseGradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
        pulseGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 8, 0, Math.PI * 2);
        ctx.fillStyle = pulseGradient;
        ctx.fill();

        // Inner pulse
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
      });

      // Update and draw nodes
      nodesRef.current.forEach((node) => {
        // Update position with smooth movement
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges with margin
        const margin = 80;
        if (node.x < margin || node.x > canvas.width - margin) {
          node.vx *= -0.95; // Slight damping
        }
        if (node.y < margin || node.y > canvas.height - margin) {
          node.vy *= -0.95;
        }

        // Keep in bounds
        node.x = Math.max(margin, Math.min(canvas.width - margin, node.x));
        node.y = Math.max(margin, Math.min(canvas.height - margin, node.y));

        const colors = getNodeColor(node.type);

        // Draw outer glow (larger)
        const outerGlow = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 4
        );
        outerGlow.addColorStop(0, colors.glow);
        outerGlow.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
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
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw inner highlight
        ctx.beginPath();
        ctx.arc(
          node.x - node.radius * 0.3, 
          node.y - node.radius * 0.3, 
          node.radius * 0.4, 
          0, 
          Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();

        // Draw type indicator (optional - small icon representation)
        if (node.type === 'university') {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
};
