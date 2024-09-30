import { useState, useEffect } from 'react';
import { useAuth } from '../lib/hooks/useAuth';
import { getDocuments } from '../lib/firebase/firebaseUtils';

const LifeMatrix = () => {
  const { user } = useAuth();
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const totalWeeks = 5200;

  useEffect(() => {
    if (user) {
      getDocuments(`users/${user.uid}`).then((documents) => {
        const userData = documents[0] as { id: string; birthdate?: string };
        if (userData && userData.birthdate) {
          setBirthdate(new Date(userData.birthdate));
        }
      });
    }
  }, [user]);

  const calculateLivedWeeks = () => {
    if (!birthdate) return 0;
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - birthdate.getTime());
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return Math.min(diffWeeks, totalWeeks);
  };

  const livedWeeks = calculateLivedWeeks();

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">Your Life in Weeks</h2>
      <div className="grid grid-cols-52 gap-1">
        {[...Array(totalWeeks)].map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 ${
              index < livedWeeks ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default LifeMatrix;