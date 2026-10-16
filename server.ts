import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Gemini API client initialization
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // In-memory rate limiter (max 30 requests per minute per IP)
  const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
  const RATE_LIMIT_WINDOW_MS = 60 * 1000;
  const MAX_REQUESTS_PER_WINDOW = 30;

  // API endpoint for MathBot
  app.post('/api/mathbot', async (req, res) => {
    // Basic IP rate limiting
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const rateData = rateLimitMap.get(clientIp);

    if (rateData && now < rateData.resetTime) {
      if (rateData.count >= MAX_REQUESTS_PER_WINDOW) {
        return res.status(429).json({
          error: 'Em đang hỏi hơi nhanh, hãy đợi 1 chút để MathBot trả lời nhé!',
          reply: '✨ **MathBot đang tiếp nhận nhiều câu hỏi!**\n\nEm vui lòng đợi khoảng 30 giây rồi hãy gửi câu hỏi tiếp theo để đảm bảo chất lượng giải bài nhé!'
        });
      }
      rateData.count += 1;
    } else {
      rateLimitMap.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    }

    try {
      const { message, grade, topic, history } = req.body;

      if (!message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ error: 'Nội dung tin nhắn không hợp lệ' });
      }

      // If Gemini API is available, call gemini-3.8-flash
      if (ai && process.env.GEMINI_API_KEY) {
        const gradeText = grade ? `Lớp ${grade}` : 'THCS';
        const topicText = topic ? `Chủ đề: ${topic}` : '';

        const systemInstruction = `Bạn là MathBot – Gia sư Trợ lý AI Toán học thân thiện, nhiệt huyết dành cho học sinh THCS Việt Nam (${gradeText}).
${topicText}

NGUYÊN TẮC GIẢNG BÀI:
1. Trình bày bằng tiếng Việt trong sáng, gần gũi, khích lệ (gọi em xưng MathBot hoặc thầy/cô bạn đồng hành).
2. GIẢI THÍCH TỪNG BƯỚC rõ ràng (Bước 1, Bước 2,...), ngắn gọn, súc tích, dễ hiểu cho lứa tuổi 11-15 tuổi.
3. Không chỉ đưa đáp án cộc lốc mà phải chỉ ra phương pháp, công thức và bản chất vấn đề.
4. Nếu học sinh hỏi cách làm, hướng dẫn và gợi mở tư duy. Nếu học sinh làm sai, chỉ ra chính xác sai ở bước nào và cách sửa.
5. Cung cấp 1 ví dụ tương tự ngắn hoặc mẹo nhớ nhanh khi phù hợp.
6. Sử dụng ký hiệu Toán học chuẩn mực rõ ràng (ví dụ: x², √, a/b, 30°...). Không lạm dụng ký hiệu LaTeX phức tạp không cần thiết.`;

        // Format history safely
        interface MessagePart {
          role: 'user' | 'model';
          parts: [{ text: string }];
        }
        const contents: MessagePart[] = [];
        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            const textContent = String(item.content || item.text || '').trim();
            if (textContent) {
              contents.push({
                role: item.role === 'user' ? 'user' : 'model',
                parts: [{ text: textContent }],
              });
            }
          }
        }
        contents.push({
          role: 'user',
          parts: [{ text: message.trim() }],
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const reply = response.text || 'MathBot đã nhận được câu hỏi nhưng chưa thể tạo câu trả lời chi tiết. Em hãy thử lại nhé!';
        return res.json({ reply });
      }

      // Offline intelligent educational fallback if API key is not configured
      const fallbackReply = generateFallbackResponse(message, grade);
      return res.json({ reply: fallbackReply });
    } catch (err: unknown) {
      console.error('MathBot Error:', err);
      // Friendly fallback in case of rate limit or connection issue
      const fallbackReply = generateFallbackResponse(req.body?.message || '', req.body?.grade || 6);
      return res.json({ reply: fallbackReply });
    }
  });

  // Local educational rule-based responder for common middle school queries
  function generateFallbackResponse(query: string, gradeNum?: number): string {
    const q = query.toLowerCase();

    if (q.includes('phương trình') || q.includes('tìm x') || q.includes('2x')) {
      return `✨ **Hướng dẫn giải phương trình cho em:**\n\n` +
        `**Nguyên tắc "Chuyển vế đổi dấu":**\n` +
        `• Khi chuyển một số hạng từ vế này sang vế kia, ta phải đổi dấu của số hạng đó (+ thành -, - thành +).\n` +
        `• Ví dụ tìm x: $2x + 5 = 15$\n` +
        `  - **Bước 1:** Chuyển $+5$ sang vế phải thành $-5$:\n` +
        `    $2x = 15 - 5 \\Rightarrow 2x = 10$\n` +
        `  - **Bước 2:** Chia cả hai vế cho $2$:\n` +
        `    $x = 10 : 2 = 5$\n` +
        `  - **Kết luận:** Vậy nghiệm của phương trình là $x = 5$.\n\n` +
        `💡 *Mẹo của MathBot:* Luôn thử lại đáp án bằng cách thay $x$ vào phương trình ban đầu nhé!`;
    }

    if (q.includes('phân số') || q.includes('quy đồng') || q.includes('mẫu số')) {
      return `✨ **Bí quyết với Phân số:**\n\n` +
        `**1. Vì sao 2 phân số bằng nhau?**\n` +
        `Hai phân số a/b = c/d khi và chỉ khi tích chéo bằng nhau: a . d = b . c.\n\n` +
        `**2. Quy đồng mẫu số 3 bước cực dễ:**\n` +
        `• **Bước 1:** Tìm Mẫu số chung (thường là BCNN của các mẫu số).\n` +
        `• **Bước 2:** Tìm thừa số phụ bằng cách lấy Mẫu chung chia cho từng mẫu.\n` +
        `• **Bước 3:** Nhân cả tử và mẫu với thừa số phụ tương ứng.\n\n` +
        `💡 *Ví dụ:* Cộng 1/2 + 1/3 = 3/6 + 2/6 = 5/6. Em đã hiểu chưa nào?`;
    }

    if (q.includes('hình thang') || q.includes('diện tích hình thang')) {
      return `✨ **Công thức diện tích hình thang:**\n\n` +
        `📐 **Công thức:**\n` +
        `S = [(a + b) . h] / 2\n` +
        `Trong đó:\n` +
        `• a: đáy nhỏ, b: đáy lớn (cùng đơn vị đo)\n` +
        `• h: chiều cao tương ứng\n\n` +
        `🎵 *Bài thơ nhớ nhanh:* \n` +
        `"Muốn tính diện tích hình thang\n` +
        `Đáy lớn đáy nhỏ ta mang cộng vào\n` +
        `Thế rồi nhân với chiều cao\n` +
        `Chia đôi lấy nửa thế nào cũng ra!"\n\n` +
        `Em có bài tập hình thang nào cụ thể muốn cùng MathBot giải không?`;
    }

    if (q.includes('tam giác') || q.includes('pythagore') || q.includes('pitago')) {
      return `✨ **Định lý Pythagore (Toán 7 & 8):**\n\n` +
        `📐 **Trong một tam giác vuông:**\n` +
        `Bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông.\n` +
        `$$c^2 = a^2 + b^2$$\n\n` +
        `• Ví dụ bộ ba số quen thuộc: $(3, 4, 5)$ vì $3^2 + 4^2 = 9 + 16 = 25 = 5^2$.\n` +
        `• Bộ ba số: $(6, 8, 10)$, $(5, 12, 13)$.\n\n` +
        `💡 *Ứng dụng:* Khi biết độ dài 2 cạnh bất kì của tam giác vuông, ta luôn tính được cạnh còn lại!`;
    }

    if (q.includes('số âm') || q.includes('số nguyên') || q.includes('dấu')) {
      return `✨ **Quy tắc dấu khi nhân, chia số nguyên:**\n\n` +
        `• **Cùng dấu ra DƯƠNG:**\n` +
        `  $(+) \\times (+) = (+)$\n` +
        `  $(-) \\times (-) = (+)$ (Ví dụ: $(-3) \\times (-4) = +12$)\n\n` +
        `• **Khác dấu ra ÂM:**\n` +
        `  $(+) \\times (-) = (-)$\n` +
        `  $(-) \\times (+) = (-)$ (Ví dụ: $(-3) \\times 4 = -12$)\n\n` +
        `💡 *Cách hiểu dễ nhớ:* "Kẻ thù của kẻ thù là bạn" (âm nhân âm thành dương)!`;
    }

    return `✨ **Chào em! MathBot rất vui được hỗ trợ em môn Toán Lớp ${gradeNum || 6-9}!**\n\n` +
      `Câu hỏi của em: "${query}"\n\n` +
      `Để giải bài này hiệu quả, em hãy chia sẻ thêm:\n` +
      `1. Đề bài chi tiết hoặc số liệu cụ thể.\n` +
      `2. Em đã làm được đến bước nào rồi?\n\n` +
      `MathBot có thể hỗ trợ em các chủ đề: Số học, Phân số, Đại số & Phương trình, Hình học, Thống kê & Xác suất. Hãy gửi đề bài để chúng mình cùng khám phá nhé! 🚀`;
  }

  // Vite development vs production serving
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MathVerse server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
