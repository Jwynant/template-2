import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/hooks/useAuth';
import { getDocuments, addDocument, updateDocument, deleteDocument } from '../../lib/firebase/firebaseUtils';
import TabNavigation from '../../components/TabNavigation';

interface Season {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  description: string;
}

const SeasonsPage = () => {
  const { user } = useAuth();
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [newSeason, setNewSeason] = useState<Omit<Season, 'id'>>({
    startDate: '',
    endDate: '',
    title: '',
    description: '',
  });

  useEffect(() => {
    if (user) {
      getDocuments(`users/${user.uid}/seasons`).then((documents) => {
        const seasonData = documents.map((doc) => ({
          id: doc.id,
          startDate: doc.startDate,
          endDate: doc.endDate,
          title: doc.title,
          description: doc.description,
        }));
        setSeasons(seasonData);
      });
    }
  }, [user]);

  const handleAddSeason = async () => {
    if (user) {
      const docRef = await addDocument(`users/${user.uid}/seasons`, newSeason);
      setSeasons([...seasons, { ...newSeason, id: docRef.id }]);
      setNewSeason({ startDate: '', endDate: '', title: '', description: '' });
    }
  };

  const handleUpdateSeason = async (id: string, updatedSeason: Partial<Season>) => {
    if (user) {
      await updateDocument(`users/${user.uid}/seasons`, id, updatedSeason);
      setSeasons(seasons.map(season => season.id === id ? { ...season, ...updatedSeason } : season));
    }
  };

  const handleDeleteSeason = async (id: string) => {
    if (user) {
      await deleteDocument(`users/${user.uid}/seasons`, id);
      setSeasons(seasons.filter(season => season.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <TabNavigation />
      <h1 className="text-3xl font-bold mb-4">Seasons of Life</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Add New Season</h2>
        <input
          type="date"
          value={newSeason.startDate}
          onChange={(e) => setNewSeason({ ...newSeason, startDate: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          value={newSeason.endDate}
          onChange={(e) => setNewSeason({ ...newSeason, endDate: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={newSeason.title}
          onChange={(e) => setNewSeason({ ...newSeason, title: e.target.value })}
          placeholder="Season Title"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={newSeason.description}
          onChange={(e) => setNewSeason({ ...newSeason, description: e.target.value })}
          placeholder="Description"
          className="border p-2 mr-2"
        />
        <button onClick={handleAddSeason} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Season
        </button>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">Your Seasons</h2>
        {seasons.map((season) => (
          <div key={season.id} className="border p-4 mb-4 rounded">
            <h3 className="text-xl font-semibold">{season.title}</h3>
            <p>{season.startDate} - {season.endDate}</p>
            <p>{season.description}</p>
            <button
              onClick={() => handleDeleteSeason(season.id)}
              className="bg-red-500 text-white px-2 py-1 rounded mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonsPage;