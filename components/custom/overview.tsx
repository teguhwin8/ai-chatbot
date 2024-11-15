import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';

import { generateQuote } from '@/app/(chat)/actions';

import { MessageIcon, VercelIcon } from './icons';

export const Overview = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const generatedQuote = await generateQuote();
        setQuote(generatedQuote || 'Kutipan tidak tersedia.');
      } catch (error) {
        setQuote('Selalu ada jalan untuk maju!');
      }
    };

    fetchQuote();
  }, []);

  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
        <p className="flex flex-row justify-center gap-4 items-center">
          <VercelIcon size={32} />
          <span>+</span>
          <MessageIcon size={32} />
          <span>+</span>
          <Image
            src="/images/teguh-coding.jpg"
            width={36}
            height={36}
            className="rounded-full object-cover"
            alt="Teguh Coding"
          />
        </p>
        <div>
          {/* {quote ? (
            <Typewriter
              words={[quote]}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={1000}
            />
          ) : (
            'Memuat kutipan...'
          )} */}
          {quote}
        </div>
      </div>
    </motion.div>
  );
};
