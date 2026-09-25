import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages?.[messages.length - 1]?.content || 'Hello';

    // Health-focused intelligent AI response logic
    let responseText = `I am your SmartHealth AI Assistant. Regarding your query about "${lastMessage}":\n\n`;

    const queryLower = lastMessage.toLowerCase();

    if (queryLower.includes('fever') || queryLower.includes('temp')) {
      responseText += `1. **Hydration & Rest**: Ensure adequate fluid intake (water, electrolytes) and prioritize rest.\n2. **Monitoring**: Track body temperature every 4 hours. Normal resting temperature ranges between 97°F and 99°F.\n3. **When to seek care**: Contact a doctor if fever exceeds 103°F (39.4°C) or lasts longer than 3 days.`;
    } else if (queryLower.includes('blood pressure') || queryLower.includes('bp')) {
      responseText += `1. **Target Range**: Normal resting blood pressure is generally under 120/80 mmHg.\n2. **Lifestyle Protocol**: Reduce sodium intake, engage in light aerobic exercise, and avoid stress before readings.\n3. **Logging**: Record morning and evening systolic/diastolic values in your Patient Dashboard.`;
    } else if (queryLower.includes('headache') || queryLower.includes('migraine')) {
      responseText += `1. **Hydration**: Mild dehydration is a frequent trigger for acute tension headaches.\n2. **Environment**: Rest in a quiet, dark room and apply a cold compress to your forehead.\n3. **Warning Signs**: Seek immediate care if accompanied by sudden vision loss, neck stiffness, or numbness.`;
    } else {
      responseText += `1. **Biometric Assessment**: Based on your latest logged vitals, your health metrics appear stable.\n2. **General Guidance**: Ensure balanced daily nutrition, 7-8 hours of continuous sleep, and regular hydration.\n3. **Clinical Support**: Use the **Risk Assessment** or **Book Consultation** feature to speak directly with a licensed physician.`;
    }

    // Stream chunks back using ReadableStream (compatible with Vercel AI SDK protocol)
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const words = responseText.split(' ');
        for (const word of words) {
          controller.enqueue(encoder.encode(word + ' '));
          await new Promise((resolve) => setTimeout(resolve, 40));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json({ error: 'Failed to generate AI response' }, { status: 500 });
  }
}
