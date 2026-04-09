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
  const [selectedImage, setSelectedImage] = useState('');

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
    else localStorage.removeItem('calendar-start-date');
    
    if (endDate) localStorage.setItem('calendar-end-date', endDate.toISOString());
    else localStorage.removeItem('calendar-end-date');
    
    localStorage.setItem('calendar-notes', notes);
    localStorage.setItem('calendar-image', selectedImage);
  }, [startDate, endDate, notes, selectedImage]);

  useEffect(() => {
  localStorage.removeItem('calendar-image');
}, []);
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
    localStorage.removeItem('calendar-start-date');
    localStorage.removeItem('calendar-end-date');
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-2">
            Wall Calendar
          </h1>
          <div className="w-24 h-0.5 bg-linear-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
          <p className="text-gray-500 mt-2 text-sm">Click on dates to select a range</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-3xl">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/5 bg-linear-to-br from-amber-50 to-orange-50 p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
              <ImageSelector 
                selectedImage={selectedImage} 
                onImageChange={setSelectedImage} 
              />
              <div className="mt-6 text-center">
                <h2 className="text-3xl font-serif text-gray-800">
                  {monthName}
                </h2>
                <p className="text-gray-600 mt-1">
                  {year}
                </p>
              </div>
              
              {(startDate || endDate) && (
                <div className="mt-6 p-4 bg-white/80 rounded-lg backdrop-blur-sm shadow-md animate-slide-up">
                  <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Selected Range
                  </h3>
                  {startDate && (
                    <p className="text-sm text-gray-600">
                      📅 Start: <span className="font-medium">{startDate.toLocaleDateString()}</span>
                    </p>
                  )}
                  {endDate && (
                    <p className="text-sm text-gray-600 mt-1">
                      📅 End: <span className="font-medium">{endDate.toLocaleDateString()}</span>
                    </p>
                  )}
                  {startDate && endDate && (
                    <p className="text-sm text-blue-600 mt-2">
                      Duration: {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                    </p>
                  )}
                  <button
                    onClick={clearSelection}
                    className="mt-3 text-sm text-red-500 hover:text-red-600 transition-colors font-medium"
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
          <div className="flex flex-wrap justify-center gap-4">
            <span>💡 Tip: Click on dates to select a range</span>
            <span>🖼️ Hover over the image to change it</span>
            <span>💾 Your selections and notes are automatically saved!</span>
          </div>
        </div>
      </div>
    </main>
  );
}