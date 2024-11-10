'use server';

import { CoreMessage, CoreUserMessage, generateText } from 'ai';
import { cookies } from 'next/headers';

import { customModel } from '@/ai';

export async function saveModelId(model: string) {
  const cookieStore = await cookies();
  cookieStore.set('model-id', model);
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: CoreUserMessage;
}) {
  const { text: title } = await generateText({
    model: customModel('gpt-3.5-turbo'),
    system: `\n
    - Anda akan menghasilkan judul pendek berdasarkan pesan pertama yang dikirim pengguna
    - Pastikan judul tidak lebih dari 80 karakter
    - Judul harus berupa ringkasan dari pesan pengguna
    - Jangan gunakan tanda kutip atau titik dua`,
    prompt: JSON.stringify(message),
  });

  return title;
}

export async function generateQuote() {
  try {
    const result = await generateText({
      model: customModel('gpt-4o-mini'),
      system: `\n
        - Kamu adalah motivator handal.
        - Hari ini adalah ${new Date()}.
        - Buat kata-kata motivasi yang menginspirasi dan unik.
        - Langsung berikan jawaban tanpa pembuka dan penutup.
        - Harus singkat dan tidak boleh lebih dari 300 karakter.
        - Kamu akan menyapa dengan selamat pagi, siang, sore, atau malam sesuai waktu sekarang
        - Kamu akan memberikan emoji juga.
        - Bahasanya santai aja, jangan formal.
      `,
      prompt: `Berikan kata-kata motivasi hari ini.`,
    });

    const quote = result?.text; // Pastikan hasil memiliki properti 'text'

    return quote || 'Kutipan tidak tersedia saat ini, coba lagi nanti!';
  } catch (error) {
    console.error('Error generating quote:', error);
    return 'Kutipan tidak dapat dihasilkan saat ini.';
  }
}
