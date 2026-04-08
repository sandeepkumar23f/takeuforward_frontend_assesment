'use client';

import { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import NotesSection from './components/NotesSection';
import ImageSelector from './components/ImageSelector';

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState('');
  const [selectedImage, setSelectedImage] = useState('/calendar-bg.jpg');


  useEffect(() => {
    const savedStartDate = localStorage.getItem('calendar-start-date');
    const savedEndDate = localStorage.getItem('calendar-end-date');
    const savedNotes = localStorage.getItem('calendar-notes');
    const savedImage = localStorage.getItem('calendar-image');

    if (savedStartDate) setStartDate(new Date(savedStartDate));
    if (savedEndDate) setEndDate(new Date(savedEndDate));
    if (savedNotes) setNotes(savedNotes);
    if (savedImage) setSelectedImage(savedImage);
  }, []);

  useEffect(() => {
    if (startDate) localStorage.setItem('calendar-start-date', startDate.toISOString());
    if (endDate) localStorage.setItem('calendar-end-date', endDate.toISOString());
    localStorage.setItem('calendar-notes', notes);
    localStorage.setItem('calendar-image', selectedImage);
  }, [startDate, endDate, notes, selectedImage]);

  const handleDateSelect = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date >= startDate) {
        setEndDate(date);
      } else {
        setStartDate(date);
        setEndDate(null);
      }
    }
  };

  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-2">
            Wall Calendar
          </h1>
          <div className="w-24 h-0.5 bg-linear-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/5 bg-linear-to-br from-amber-50 to-orange-50 p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
              <ImageSelector 
                selectedImage={selectedImage} 
                onImageChange={setSelectedImage} 
              />
              <div className="mt-6 text-center">
                <h2 className="text-3xl font-serif text-gray-800">
                  {currentDate.toLocaleString('default', { month: 'long' })}
                </h2>
                <p className="text-gray-600 mt-1">
                  {currentDate.getFullYear()}
                </p>
              </div>
              
              {(startDate || endDate) && (
                <div className="mt-6 p-4 bg-white/60 rounded-lg backdrop-blur-sm">
                  <h3 className="font-semibold text-gray-700 mb-2">Selected Range</h3>
                  {startDate && (
                    <p className="text-sm text-gray-600">
                      Start: {startDate.toLocaleDateString()}
                    </p>
                  )}
                  {endDate && (
                    <p className="text-sm text-gray-600">
                      End: {endDate.toLocaleDateString()}
                    </p>
                  )}
                  <button
                    onClick={clearSelection}
                    className="mt-2 text-sm text-red-500 hover:text-red-600 transition-colors"
                  >
                    Clear Selection →
                  </button>
                </div>
              )}
            </div>

            <div className="lg:w-3/5 p-6">
              <Calendar
                currentDate={currentDate}
                onMonthChange={setCurrentDate}
                startDate={startDate}
                endDate={endDate}
                onDateSelect={handleDateSelect}
              />
            </div>
          </div>

          <div className="border-t border-gray-200 bg-gray-50 p-6">
            <NotesSection notes={notes} onNotesChange={setNotes} />
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>💡 Tip: Click on dates to select a range. Your selections and notes are automatically saved!</p>
        </div>
      </div>
    </main>
  );
}