import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/hooks/useAuth';
import { updateDocument } from '../../lib/firebase/firebaseUtils';
import TabNavigation from '../../components/TabNavigation';

const SettingsPage = () => {
  const { user } = useAuth();
  const [birthdate, setBirthdate] = useState('');

  useEffect(() => {
    if (user) {
      // Fetch user data and set birthdate
    }
  }, [user]);

  const handleSave = async () => {
    if (user) {
      await updateDocument('users', user.uid, { birthdate });
      alert('Settings saved successfully!');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <TabNavigation />
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <div className="mb-4">
        <label htmlFor="birthdate" className="block mb-2">Birthdate:</label>
        <input
          type="date"
          id="birthdate"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className="border p-2"
        />
      </div>
      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
        Save Settings
      </button>
    </div>
  );
};

export default SettingsPage;