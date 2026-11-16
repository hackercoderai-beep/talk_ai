import "dotenv/config";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { nanoid } from "nanoid";
import { agents, type meetingStatus, meetings, user } from "@/db/schema";

const SEED_USER_EMAIL =
  process.env.SEED_USER_EMAIL ?? "hacker.coder.ai@gmail.com";

const db = drizzle(process.env.DATABASE_URL as string);

type MeetingStatusValue = (typeof meetingStatus.enumValues)[number];

const TOPICS_BY_AGENT: Record<string, string[]> = {
  "Biology Tutor": [
    "Cell structure review",
    "Photosynthesis deep dive",
    "Genetics homework help",
    "Human anatomy overview",
  ],
  "Calculus Tutor": [
    "Limits and continuity",
    "Derivatives practice session",
    "Integration techniques review",
  ],
  "Deutsch Language Tutor": [
    "German grammar basics",
    "Conversational practice: Alltag",
    "Vocabulary building session",
  ],
  "Math Tutor": [
    "Algebra fundamentals review",
    "Quadratic equations practice",
    "Linear systems homework help",
    "Factoring polynomials session",
  ],
  "Physics Tutor": [
    "Newton's laws review",
    "Kinematics problem set",
    "Thermodynamics basics",
  ],
  "Statistics Tutor": [
    "Probability distributions review",
    "Hypothesis testing practice",
    "Regression analysis walkthrough",
  ],
};

const STATUS_CYCLE: MeetingStatusValue[] = [
  "scheduled",
  "in_progress",
  "processing",
  "completed",
  "cancelled",
];

function daysAgo(days: number): Date {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

function minutesAfter(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function buildMeeting(
  name: string,
  agentId: string,
  userId: string,
  status: MeetingStatusValue,
  createdDaysAgo: number
) {
  const id = nanoid();
  const createdAt = daysAgo(createdDaysAgo);

  const base = {
    agentId,
    createdAt,
    id,
    name,
    status,
    updatedAt: createdAt,
    userId,
  };

  if (status === "scheduled") {
    return base;
  }

  const startedAt = minutesAfter(createdAt, 10);

  if (status === "in_progress") {
    return { ...base, startedAt };
  }

  const endedAt = minutesAfter(startedAt, 20 + Math.floor(Math.random() * 40));

  if (status === "cancelled") {
    return { ...base, endedAt, startedAt };
  }

  if (status === "processing") {
    return { ...base, endedAt, startedAt };
  }

  // completed
  return {
    ...base,
    endedAt,
    recordingURL: `https://storage.example.com/recordings/${id}.mp4`,
    startedAt,
    summary: `Summary of "${name}": the student and ${name.split(" ")[0]} tutor covered the session's core concepts, worked through practice problems together, and identified follow-up topics for next time.`,
    transcriptURL: `https://storage.example.com/transcripts/${id}.vtt`,
  };
}

async function main() {
  const [existingUser] = await db
    .select()
    .from(user)
    .where(eq(user.email, SEED_USER_EMAIL));

  if (!existingUser) {
    throw new Error(`No user found with email "${SEED_USER_EMAIL}"`);
  }

  const userAgents = await db
    .select()
    .from(agents)
    .where(eq(agents.userId, existingUser.id));

  if (userAgents.length === 0) {
    throw new Error(
      `User "${SEED_USER_EMAIL}" has no agents yet. Create some agents before seeding meetings.`
    );
  }

  const rows: ReturnType<typeof buildMeeting>[] = [];
  let statusIndex = 0;
  let dayOffset = 1;

  for (const agent of userAgents) {
    const topics = TOPICS_BY_AGENT[agent.name] ?? [
      `${agent.name} session ${1}`,
      `${agent.name} session ${2}`,
    ];

    for (const topic of topics) {
      const status = STATUS_CYCLE[statusIndex % STATUS_CYCLE.length];
      statusIndex += 1;

      rows.push(
        buildMeeting(topic, agent.id, existingUser.id, status, dayOffset)
      );
      dayOffset += 1;
    }
  }

  const inserted = await db.insert(meetings).values(rows).returning();

  console.log(`Seeded ${inserted.length} meetings for ${existingUser.email}:`);
  for (const m of inserted) {
    console.log(`  [${m.status}] ${m.name}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
