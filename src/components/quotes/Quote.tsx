import { useState, useEffect } from 'react';

interface AQuote {
  q: string;
  a: string;
}

const Quote = () => {
  const [quote, setQuote] = useState<AQuote | null>(null);

  useEffect(() => {
    const getQuote = async () => {
      try {
        const response = await fetch('/api/random');                        
        const quotes: AQuote[] = await response.json();
        setQuote(quotes[0]);        
      } catch (error) {
        console.error('Failed to fetch quote:', error);
      }
    };

    getQuote();
  }, []);

  return (
    <div>
      {quote && 
          <blockquote>
            <span>{quote.q}</span><span> - {quote.a}</span>
          </blockquote>
        }
    </div> 
  )
}

export default Quote;