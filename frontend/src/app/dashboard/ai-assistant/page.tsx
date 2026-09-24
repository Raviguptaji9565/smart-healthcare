'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  'What are normal blood pressure ranges?',
  'How can I improve my sleep quality?',
  'What does fasting blood glucose mean?',
  'How often should I check my heart rate?',
  'Tips for managing diabetes?',
  'What is BMI and how to calculate it?',
];

// Simple rule-based AI responses (no API key needed)
function getAIResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('blood pressure')) {
    return `**Blood Pressure Ranges:**\n\n• **Normal:** Less than 120/80 mmHg ✅\n• **Elevated:** 120–129 / less than 80 mmHg ⚠️\n• **High Stage 1:** 130–139 / 80–89 mmHg 🟠\n• **High Stage 2:** 140+ / 90+ mmHg 🔴\n• **Crisis:** 180+ / 120+ mmHg 🚨\n\nRegular monitoring and a low-sodium diet help maintain healthy blood pressure. Consult your doctor for personalized advice.`;
  }
  if (q.includes('sleep')) {
    return `**Sleep Quality Tips:**\n\n• 🕙 Maintain a consistent sleep schedule\n• 📵 Avoid screens 1 hour before bed\n• 🌡️ Keep your room cool (65–68°F / 18–20°C)\n• ☕ Limit caffeine after 2 PM\n• 🧘 Try relaxation techniques like deep breathing\n• 🏃 Exercise regularly (not close to bedtime)\n\nAdults need **7–9 hours** of quality sleep per night.`;
  }
  if (q.includes('blood glucose') || q.includes('fasting')) {
    return `**Blood Glucose Levels:**\n\n• **Fasting Normal:** 70–99 mg/dL ✅\n• **Pre-diabetes:** 100–125 mg/dL ⚠️\n• **Diabetes:** 126+ mg/dL 🔴\n\n**2 hours after meals:**\n• Normal: Less than 140 mg/dL\n• Pre-diabetes: 140–199 mg/dL\n• Diabetes: 200+ mg/dL\n\nFasting means no food or drink (except water) for at least 8 hours.`;
  }
  if (q.includes('heart rate') || q.includes('pulse')) {
    return `**Heart Rate Information:**\n\n• **Normal resting:** 60–100 bpm ✅\n• **Athletic/fit individuals:** 40–60 bpm\n• **Tachycardia (fast):** 100+ bpm ⚠️\n• **Bradycardia (slow):** Less than 60 bpm\n\n**How to check:** Count heartbeats for 60 seconds at your wrist or neck. Check in the morning before activity for the most accurate resting rate.`;
  }
  if (q.includes('diabetes')) {
    return `**Diabetes Management Tips:**\n\n🥗 **Diet:**\n• Limit refined sugars and white carbs\n• Eat more fiber-rich vegetables\n• Control portion sizes\n\n🏃 **Exercise:**\n• 150 min/week of moderate activity\n• Walking after meals lowers blood sugar\n\n💊 **Medication:**\n• Take medicines as prescribed\n• Never skip doses\n\n📊 **Monitoring:**\n• Check blood glucose regularly\n• Track HbA1c every 3 months\n\nAlways follow your doctor's personalized care plan.`;
  }
  if (q.includes('bmi')) {
    return `**Body Mass Index (BMI):**\n\n**Formula:** BMI = weight (kg) ÷ height² (m)\n\n**Categories:**\n• Underweight: BMI < 18.5\n• Normal weight: BMI 18.5–24.9 ✅\n• Overweight: BMI 25–29.9 ⚠️\n• Obese: BMI 30+ 🔴\n\n**Example:** 70 kg / (1.75 × 1.75) = BMI of 22.9 (Normal)\n\nNote: BMI doesn't account for muscle mass. Consult a doctor for a full health assessment.`;
  }
  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return `Hello! 👋 I'm your **SmartHealth AI Assistant**.\n\nI can help you with:\n• 📊 Understanding health metrics\n• 💊 Medication information\n• 🍎 Nutrition and lifestyle tips\n• ⚕️ General health questions\n\nWhat would you like to know today?`;
  }
  if (q.includes('thank')) {
    return `You're welcome! 😊 Remember, I provide general health information only. For medical advice, always consult a qualified healthcare professional. Stay healthy! 💪`;
  }

  return `Thank you for your question about **"${question}"**.\n\nAs a health information assistant, I can help with general wellness questions. Here are some suggestions:\n\n• Ask about specific health metrics (blood pressure, glucose, heart rate)\n• Ask about sleep, diet, or exercise tips\n• Ask about medication management\n• Ask about BMI or weight management\n\n⚠️ **Important:** I provide general information only, not medical diagnosis. Please consult your doctor for personalized medical advice.`;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: `Hello! 👋 I'm your **SmartHealth AI Health Assistant**.\n\nI can answer general health questions, explain your metrics, and provide wellness tips. Use the quick questions below or type your own!\n\n⚠️ *I provide general health information only — not medical diagnosis.*`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiReply: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: getAIResponse(text),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const formatContent = (text: string) => {
    return text
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={i} className="font-bold text-gray-800 mb-1">{line.replace(/\*\*/g, '')}</p>;
        }
        if (line.includes('**')) {
          const parts = line.split('**');
          return (
            <p key={i} className="mb-0.5">
              {parts.map((part, j) =>
                j % 2 === 1 ? <strong key={j}>{part}</strong> : <span key={j}>{part}</span>
              )}
            </p>
          );
        }
        if (line.startsWith('• ')) {
          return <li key={i} className="ml-4 mb-0.5 list-disc">{line.slice(2)}</li>;
        }
        if (line === '') return <br key={i} />;
        return <p key={i} className="mb-0.5">{line}</p>;
      });
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto p-4 md:p-6">

      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white text-lg">
            🤖
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">AI Health Assistant</h1>
            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" />
              Online — Ready to help
            </p>
          </div>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="mb-4">
        <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wider">Quick Questions</p>
        <div className="flex flex-wrap gap-2">
          {QUICK_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="text-xs bg-white border border-gray-200 text-gray-600 hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 px-3 py-1.5 rounded-full transition"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5
                ${msg.role === 'assistant' ? 'bg-purple-100 text-purple-700' : 'bg-teal-600 text-white'}`}>
                {msg.role === 'assistant' ? '🤖' : '👤'}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed
                  ${msg.role === 'assistant'
                    ? 'bg-gray-50 border border-gray-200 text-gray-700 rounded-tl-sm'
                    : 'bg-teal-600 text-white rounded-tr-sm'
                  }`}
              >
                {msg.role === 'assistant' ? (
                  <div className="space-y-0.5">{formatContent(msg.content)}</div>
                ) : (
                  msg.content
                )}
                <p className={`text-[10px] mt-1.5 ${msg.role === 'assistant' ? 'text-gray-400' : 'text-teal-100'}`}>
                  {msg.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs shrink-0">🤖</div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1 items-center h-4">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-3">
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a health question..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:bg-white transition"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white px-4 py-2.5 rounded-xl transition text-sm font-medium"
            >
              Send
            </button>
          </form>
          <p className="text-center text-[10px] text-gray-400 mt-2">
            ⚠️ General health information only — not a substitute for professional medical advice
          </p>
        </div>
      </div>
    </div>
  );
}
