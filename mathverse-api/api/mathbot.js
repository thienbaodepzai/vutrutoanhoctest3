import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
let ai = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (e) {
    console.error("Lỗi khởi tạo GoogleGenAI:", e);
  }
}

export default async function handler(req, res) {
  // Cho phép CORS linh hoạt cho GitHub Pages, localhost và AI Studio dev URL
  const allowedOrigin = req.headers.origin || "*";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Only POST allowed"
    });
  }

  const { message, grade = 6, history = [] } = req.body || {};

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      error: "Thiếu nội dung câu hỏi"
    });
  }

  try {
    if (ai) {
      const contents = [];
      if (Array.isArray(history)) {
        for (const item of history.slice(-4)) {
          const text = (item.content || item.text || "").trim();
          if (text) {
            contents.push({
              role: item.role === "user" ? "user" : "model",
              parts: [{ text }]
            });
          }
        }
      }
      contents.push({
        role: "user",
        parts: [{ text: message.trim() }]
      });

      const systemInstruction = `Bạn là MathBot – Gia sư Trợ lý AI Toán học thân thiện, nhiệt huyết dành cho học sinh THCS Việt Nam (Lớp ${grade}).
NGUYÊN TẮC:
1. Trình bày bằng tiếng Việt trong sáng, gần gũi, khích lệ (gọi em xưng MathBot hoặc thầy).
2. GIẢI THÍCH TỪNG BƯỚC rõ ràng (Bước 1, Bước 2,...), ngắn gọn, súc tích cho lứa tuổi 11-15 tuổi.
3. Không chỉ đưa đáp án mà chỉ ra phương pháp, công thức và bản chất vấn đề.
4. Sử dụng ký hiệu Toán học chuẩn mực rõ ràng (ví dụ: x², √, a/b, 30°...).`;

      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });

      return res.json({
        reply: result.text || "MathBot đã nhận được câu hỏi. Em hãy thử lại nhé!"
      });
    }

    // Fallback if API key is not ready
    return res.json({
      reply: `✨ **MathBot xin chào em!**\n\nĐối với câu hỏi "${message}": Em hãy thử chia sẻ chi tiết hơn số liệu hoặc bước em đang vướng mắc để MathBot giải thích từng bước cho em nhé!`
    });
  } catch (err) {
    console.error("MathBot Handler Error:", err);
    return res.status(200).json({
      reply: `✨ **MathBot sẵn sàng đồng hành cùng em!**\n\nHệ thống AI đang tiếp nhận nhiều lượt hỏi bài. Em hãy gửi lại câu hỏi hoặc nêu rõ số liệu để thầy hướng dẫn em ngay nhé!`
    });
  }
}
