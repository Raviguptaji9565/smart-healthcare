'use client';

import Image from 'next/image';

const TEAM_LEADER = {
  initials: 'RG',
  name: 'Ravi Gupta',
  role: 'Project Manager & Full-Stack Architect',
  tag: 'GROUP TEAM LEADER',
  image: '/images/ravi.jpg',
  primaryContributions:
    'Leading the project vision, managing team coordination, and taking charge of the core integration between the React frontend and the Python FastAPI backend.',
  keyAchievements:
    'Designed the system architecture, built the seamless responsive UI, ensured secure real-time API communication, and worked hard to keep the entire team on track to deliver a high-quality product.',
};

const TEAM_MEMBERS = [
  {
    initials: 'DM',
    name: 'Dhuru Madhuwal',
    role: 'AI/ML & Healthcare Intelligence',
    image: '', // Baki members ke liye bhi agar image add karni ho toh yahan path de sakte hain
    desc: 'Focused on health-risk scoring algorithms and ML integration.',
  },
  {
    initials: 'SS',
    name: 'Shikhar Srivastava',
    role: 'Frontend/Mobile UI Developer',
    image: '',
    desc: 'Contributed to Tailwind styling and mobile responsiveness.',
  },
  {
    initials: 'SY',
    name: 'Sachin Yadav',
    role: 'Backend, Database & API',
    image: '',
    desc: 'Handled API routing, backend setup, and data structures.',
  },
];

function Avatar({
  initials,
  image,
  size = 'md',
}: {
  initials: string;
  image?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
  };

  const dimensions = {
    sm: 40,
    md: 48,
    lg: 64,
  };

  if (image && image.trim() !== '') {
    return (
      <Image
        src={image}
        alt={initials}
        width={dimensions[size]}
        height={dimensions[size]}
        className={`${sizeClasses[size]} rounded-xl object-cover shrink-0`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-xl bg-teal-600 text-white font-bold flex items-center justify-center shrink-0`}
    >
      {initials}
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">

      {/* Header */}
      <div className="text-center py-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Meet Our Development Team
        </h1>
        <p className="text-sm text-gray-400">
          The brilliant minds behind the Smart Healthcare System
        </p>
      </div>

      {/* ── Leader Card ─────────────────────────────────────────── */}
      <div className="relative bg-white border border-teal-200 rounded-2xl p-6 sm:p-8 overflow-hidden shadow-sm">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-teal-50 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-16 w-20 h-20 bg-teal-50 rounded-full translate-y-1/2 pointer-events-none" />

        <div className="relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-teal-600 text-white text-[10px] font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
            <span>✦</span> {TEAM_LEADER.tag}
          </div>

          {/* Avatar + Name */}
          <div className="flex items-center gap-4 mb-5">
            <Avatar initials={TEAM_LEADER.initials} image={TEAM_LEADER.image} size="lg" />
            <div>
              <h2 className="text-xl font-bold text-gray-800">{TEAM_LEADER.name}</h2>
              <p className="text-teal-600 font-semibold text-sm mt-0.5">{TEAM_LEADER.role}</p>
            </div>
          </div>

          {/* Contributions */}
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              <span className="font-semibold text-gray-800">Primary Contributions: </span>
              {TEAM_LEADER.primaryContributions}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Key Achievements: </span>
              {TEAM_LEADER.keyAchievements}
            </p>
          </div>
        </div>
      </div>

      {/* ── Team Members Grid ───────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.name}
            className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-sm hover:border-teal-200 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <Avatar initials={member.initials} image={member.image} size="md" />
              <div>
                <p className="font-bold text-gray-800 text-sm">{member.name}</p>
                <p className="text-teal-600 text-xs font-medium mt-0.5">{member.role}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{member.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
}