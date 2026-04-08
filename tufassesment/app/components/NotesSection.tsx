'use client';

import { useState } from 'react';
import { Edit2, Save, Calendar as CalendarIcon } from 'lucide-react';

interface NotesSectionProps {
  notes: string;
  onNotesChange: (notes: string) => void;
}

export default function NotesSection({ notes, onNotesChange }: NotesSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempNotes, setTempNotes] = useState(notes);

  const handleSave = () => {
    onNotesChange(tempNotes);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempNotes(notes);
    setIsEditing(false);
  };

  return (
    <div className="notes-section">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-semibold text-gray-800">Monthly Notes</h3>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-white rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Edit Notes
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={tempNotes}
            onChange={(e) => setTempNotes(e.target.value)}
            placeholder="Write your notes here... (e.g., Important deadlines, events, reminders)"
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
            autoFocus
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Notes
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-4 min-h-30">
          {notes ? (
            <p className="text-gray-700 whitespace-pre-wrap">{notes}</p>
          ) : (
            <p className="text-gray-400 italic">
              Click "Edit Notes" to add your monthly reminders, events, or important dates...
            </p>
          )}
        </div>
      )}

      <div className="mt-4 text-xs text-gray-400 border-t pt-3">
        💡 Tip: Your notes are automatically saved and will persist when you return!
      </div>
    </div>
  );
}