import React, { useState } from 'react';
import { Calendar } from './Calendar';
import { themeShowcaseStoriesStyles } from './ThemeShowcase.stories.styles';

/**
 * Календарь (single) для Theme Showcase.
 */
export const ThemeShowcaseCalendarBlock = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div style={themeShowcaseStoriesStyles.calendarWrap}>
      <Calendar selectionMode="single" value={selectedDate} onChange={setSelectedDate} />
    </div>
  );
};
