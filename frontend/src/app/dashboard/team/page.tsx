'use client';

import Image from 'next/image';

type AvatarSize = 'sm' | 'md' | 'lg';

interface TeamMember {
  initials: string;
  name: string;
  role: string;
  desc: string;
  image?: string;
}

interface TeamLeader extends TeamMember {
  tag: string;
  primaryContributions: string;
  keyAchievements: string;
}

const FALLBACK_AVATAR =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"%3E%3Crect width="128" height="128" rx="24" fill="%230f766e"/%3E%3Cpath d="M64 65a23 23 0 1 0 0-46 23 23 0 0 0 0 46Zm0 8c-27 0-49 14-49 32v4h98v-4c0-18-22-32-49-32Z" fill="%23ccfbf1"/%3E%3C/svg%3E';

const TEAM_LEADER: TeamLeader = {
  initials: 'RG',
  name: 'Ravi Gupta',
  role: 'Project Manager & Full-Stack Architect',
  tag: 'Group Team Leader',
  image: '/images/ravi.jpg',
  desc: '',
  primaryContributions:
    'Leading the project vision, managing team coordination, and taking charge of the core integration between the React frontend and the Python FastAPI backend.',
  keyAchievements:
    'Designed the system architecture, built the seamless responsive UI, ensured secure real-time API communication, and worked hard to keep the entire team on track to deliver a high-quality product.',
};

const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    initials: 'DM',
    name: 'Dhuru Madhuwal',
    role: 'AI/ML & Healthcare Intelligence',
    desc: 'Focused on health-risk scoring algorithms and ML integration.',
  },
  {
    initials: 'SS',
    name: 'Shikhar Srivastava',
    role: 'Frontend/Mobile UI Developer',
    desc: 'Contributed to Tailwind styling and mobile responsiveness.',
  },
  {
    initials: 'SY',
    name: 'Sachin Yadav',
    role: 'Backend, Database & API',
    desc: 'Handled API routing, backend setup, and data structures.',
  },
];

const AVATAR_SIZES: Record<AvatarSize, { className: string; pixels: number }> = {
  sm: { className: 'h-10 w-10 text-sm', pixels: 40 },
  md: { className: 'h-12 w-12 text-base', pixels: 48 },
  lg: { className: 'h-20 w-20 text-xl sm:h-24 sm:w-24', pixels: 96 },
};

function Avatar({
  initials,
  name,
  image,
  size = 'md',
}: {
  initials: string;
  name: string;
  image?: string;
  size?: AvatarSize;
}) {
  const avatarSize = AVATAR_SIZES[size];

  return (
    <div
      className={`${avatarSize.className} relative shrink-0 overflow-hidden rounded-2xl bg-teal-700 ring-4 ring-white shadow-md`}
    >
      <Image
        src={image?.trim() || FALLBACK_AVATAR}
        alt={`${name} avatar`}
        width={avatarSize.pixels}
        height={avatarSize.pixels}
        unoptimized={image === undefined || image.trim() === ''}
        className="h-full w-full object-cover"
      />
      <span className="sr-only">{initials}</span>
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 p-4 md:p-8">
      <header className="animate-page-enter py-4 text-center">
        <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-teal-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-500" />
          The people behind the platform
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl">
          Meet Our Development Team
        </h1>
        <p className="mx-auto max-w-lg text-sm leading-relaxed text-gray-500">
          The brilliant minds building a smarter, more connected healthcare experience.
        </p>
      </header>

      <section
        aria-labelledby="team-leader-heading"
        className="group animate-page-enter animate-delay-100 relative overflow-hidden rounded-3xl border border-teal-200 bg-gradient-to-br from-white via-white to-teal-50/70 p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-900/10 sm:p-8"
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-teal-100/70 blur-2xl transition-transform duration-700 group-hover:scale-110" />
        <div className="pointer-events-none absolute -bottom-20 right-20 h-36 w-36 rounded-full border-[18px] border-teal-100/50" />
        <div className="pointer-events-none absolute right-8 top-8 h-3 w-3 rounded-full bg-teal-400 shadow-[0_0_0_6px_rgba(45,212,191,0.15)]" />

        <div className="relative z-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-700 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md shadow-teal-700/20">
              <span aria-hidden="true">✦</span>
              {TEAM_LEADER.tag}
            </span>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
              Leadership
            </span>
          </div>

          <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-center">
            <Avatar
              initials={TEAM_LEADER.initials}
              name={TEAM_LEADER.name}
              image={TEAM_LEADER.image}
              size="lg"
            />
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal-600">
                Project leadership
              </p>
              <h2 id="team-leader-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                {TEAM_LEADER.name}
              </h2>
              <p className="mt-1 text-sm font-semibold text-teal-700">{TEAM_LEADER.role}</p>
            </div>
          </div>

          <div className="grid gap-5 border-t border-teal-100 pt-5 text-sm leading-relaxed text-gray-600 md:grid-cols-2">
            <p>
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-800">
                Primary contributions
              </span>
              {TEAM_LEADER.primaryContributions}
            </p>
            <p>
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-800">
                Key achievements
              </span>
              {TEAM_LEADER.keyAchievements}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="team-members-heading">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 id="team-members-heading" className="text-lg font-bold text-gray-800">
              Our specialists
            </h2>
            <p className="mt-1 text-xs text-gray-500">A multidisciplinary team working as one.</p>
          </div>
          <span className="hidden rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500 sm:inline-flex">
            {TEAM_MEMBERS.length} contributors
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TEAM_MEMBERS.map((member, index) => (
            <article
              key={member.name}
              className="animate-page-enter group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg hover:shadow-gray-900/5"
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              <div className="mb-4 flex items-center gap-3">
                <Avatar initials={member.initials} name={member.name} image={member.image} />
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold text-gray-800">{member.name}</h3>
                  <p className="mt-0.5 text-xs font-medium text-teal-600">{member.role}</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-gray-500">{member.desc}</p>
              <div className="mt-4 h-1 w-8 rounded-full bg-teal-100 transition-all duration-300 group-hover:w-14 group-hover:bg-teal-500" />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
